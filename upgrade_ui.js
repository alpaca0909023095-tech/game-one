// 升級 UI 基礎數值從 config.js 讀取。
const SKILL_CARD_ENTER_DELAY = GAME_CONFIG.upgradeUi.cardEnterDelay;
const SKILL_CARD_EXIT_DELAY = GAME_CONFIG.upgradeUi.cardExitDelay;
const SKILL_PANEL_EXIT_TOTAL_TIME = GAME_CONFIG.upgradeUi.panelExitTotalTime;
const SKILL_INPUT_DELAY = GAME_CONFIG.upgradeUi.inputDelay;
const UPGRADE_NO_AFFORDABLE_EXIT_DELAY = GAME_CONFIG.upgradeUi.noAffordableExitDelay;

const upgradeCoinText = document.getElementById("upgradeCoinText");
const upgradeSkipBtn = document.getElementById("upgradeSkipBtn");

let upgradeExitTimer = 0;
let currentUpgradeSkills = [];

function updateUpgradeCoinText() {
  if (upgradeCoinText) {
    upgradeCoinText.textContent = "金幣 " + coins;
  }
}

function setupUpgradeCard(card, skillDef) {
  const price = getSkillPrice(skillDef);
  card.dataset.skillId = skillDef.id;
  card.dataset.level = skillDef.level;
  card.dataset.price = price;
  card.dataset.bought = "0";

  const name = card.querySelector(".skillName");
  const desc = card.querySelector(".skillDesc");
  const icon = card.querySelector(".skillIcon");

  if (icon) icon.textContent = "$";
  if (name) name.textContent = skillDef.name;
  if (desc) desc.textContent = skillDef.description;

  let priceNode = card.querySelector(".skillPrice");
  if (!priceNode) {
    priceNode = document.createElement("div");
    priceNode.className = "skillPrice";
    card.appendChild(priceNode);
  }
  priceNode.textContent = price;

  card.classList.remove("upgradeLevel1", "upgradeLevel2", "upgradeLevel3");
  card.classList.add("upgradeLevel" + skillDef.level);
}

function isCardAvailable(card) {
  if (card.dataset.bought === "1") return 0;
  if (card.classList.contains("exit")) return 0;
  return Number(card.dataset.price) <= coins ? 1 : 0;
}

function refreshUpgradeAffordability() {
  updateUpgradeCoinText();

  for (let card of skillCards) {
    if (card.dataset.bought === "1" || card.classList.contains("exit")) {
      card.classList.remove("clickable", "unaffordable", "notEnough");
      card.style.pointerEvents = "none";
      continue;
    }

    if (!skillInputReady) {
      card.classList.remove("clickable", "unaffordable", "notEnough");
      card.style.pointerEvents = "none";
      continue;
    }

    card.classList.add("clickable");
    card.style.pointerEvents = "auto";

    if (isCardAvailable(card)) {
      card.classList.remove("unaffordable");
    } else {
      card.classList.add("unaffordable");
    }
  }
}

function hasAnyVisibleUpgradeCard() {
  return skillCards.some(card => card.dataset.bought !== "1" && !card.classList.contains("exit"));
}

function hasAnyAffordableUpgradeCard() {
  return skillCards.some(card => isCardAvailable(card));
}

function clearUpgradeExitTimer() {
  if (upgradeExitTimer) {
    clearTimeout(upgradeExitTimer);
    upgradeExitTimer = 0;
  }
}

function scheduleNoAffordableExit() {
  if (!choosingSkill || closingSkillPanel || upgradeExitTimer) return;
  if (hasAnyAffordableUpgradeCard()) return;

  upgradeExitTimer = setTimeout(() => {
    upgradeExitTimer = 0;
    closeUpgradePanelWithRemainingCards();
  }, UPGRADE_NO_AFFORDABLE_EXIT_DELAY);
}

function exitUpgradeCard(card, delay) {
  setTimeout(() => {
    card.style.pointerEvents = "none";
    card.classList.remove("clickable", "enter", "settled", "unaffordable", "notEnough", "selected");
    card.classList.add("exit");
  }, delay);
}

function finishUpgradePanel() {
  setTimeout(() => {
    closeSkillPanelInstant();

    choosingSkill = 0;
    closingSkillPanel = 0;

    startLevel(level + 1);

    lastTime = performance.now();
    running = 1;
  }, SKILL_PANEL_EXIT_TOTAL_TIME);
}

function closeUpgradePanelWithRemainingCards() {
  if (!choosingSkill || closingSkillPanel) return;

  closingSkillPanel = 1;
  skillInputReady = 0;
  clearUpgradeExitTimer();

  if (upgradeSkipBtn) upgradeSkipBtn.disabled = true;

  let exitIndex = 0;
  for (let card of skillCards) {
    if (card.dataset.bought === "1" || card.classList.contains("exit")) continue;
    exitUpgradeCard(card, exitIndex * SKILL_CARD_EXIT_DELAY);
    exitIndex++;
  }

  finishUpgradePanel();
}

function flashNotEnoughAndExit(card) {
  if (!choosingSkill || closingSkillPanel) return;

  clearUpgradeExitTimer();
  skillInputReady = 0;
  card.classList.remove("enter", "notEnough");
  card.classList.add("settled");
  void card.offsetWidth;
  card.classList.add("notEnough");

  for (let otherCard of skillCards) {
    otherCard.style.pointerEvents = "none";
    otherCard.classList.remove("clickable");
  }
  if (upgradeSkipBtn) upgradeSkipBtn.disabled = true;

  setTimeout(() => {
    if (!choosingSkill || closingSkillPanel) return;

    card.classList.remove("notEnough");
    skillCards.forEach(card => {
      if (!card.classList.contains("exit")) {
        card.classList.remove("enter");
        card.classList.add("settled");
      }
    });
    skillInputReady = 1;
    if (upgradeSkipBtn) upgradeSkipBtn.disabled = false;
    refreshUpgradeAffordability();
    scheduleNoAffordableExit();
  }, 520);
}

function openSkillPanel() {
  if (choosingSkill || closingSkillPanel) return;

  choosingSkill = 1;
  running = 0;
  touching = 0;
  skillInputReady = 0;
  clearUpgradeExitTimer();

  bullets = [];
  enemies = [];
  particles = [];

  skillPanel.classList.add("active");
  if (upgradeSkipBtn) upgradeSkipBtn.disabled = true;
  updateUpgradeCoinText();

  currentUpgradeSkills = rollUpgradeSkills(skillCards.length);

  skillCards.forEach((card, index) => {
    setupUpgradeCard(card, currentUpgradeSkills[index]);
    card.classList.remove("enter", "settled", "exit", "selected", "clickable", "unaffordable", "notEnough");
    card.style.pointerEvents = "none";
  });

  skillCards.forEach((card, index) => {
    setTimeout(() => {
      if (!choosingSkill || closingSkillPanel) return;
      card.classList.add("enter");
    }, index * SKILL_CARD_ENTER_DELAY);
  });

  setTimeout(() => {
    if (!choosingSkill || closingSkillPanel) return;

    skillCards.forEach(card => {
      if (!card.classList.contains("exit")) {
        card.classList.remove("enter");
        card.classList.add("settled");
      }
    });
    skillInputReady = 1;
    if (upgradeSkipBtn) upgradeSkipBtn.disabled = false;
    refreshUpgradeAffordability();
    scheduleNoAffordableExit();
  }, SKILL_INPUT_DELAY);
}

function closeSkillPanelInstant() {
  skillPanel.classList.remove("active");
  clearUpgradeExitTimer();

  if (upgradeSkipBtn) upgradeSkipBtn.disabled = true;

  for (let card of skillCards) {
    card.classList.remove("enter", "settled", "exit", "selected", "clickable", "unaffordable", "notEnough", "upgradeLevel1", "upgradeLevel2", "upgradeLevel3");
    card.style.pointerEvents = "none";
    card.dataset.bought = "0";
    card.dataset.level = "0";
    card.dataset.skillId = "";
  }

  currentUpgradeSkills = [];
  skillInputReady = 0;
}

function chooseSkill(skillIndex) {
  if (!choosingSkill || closingSkillPanel) return;
  if (!skillInputReady) return;

  const selectedCard = skillCards.find(card => Number(card.dataset.skill) === Number(skillIndex));
  if (!selectedCard || selectedCard.dataset.bought === "1" || selectedCard.classList.contains("exit")) return;

  if (!isCardAvailable(selectedCard)) {
    flashNotEnoughAndExit(selectedCard);
    return;
  }

  clearUpgradeExitTimer();

  const price = Number(selectedCard.dataset.price);
  coins -= price;
  coinNumber.textContent = coins;
  updateUpgradeCoinText();
  triggerCoinEffect();
  applyPurchasedSkill(selectedCard.dataset.skillId);

  selectedCard.dataset.bought = "1";
  selectedCard.classList.add("selected");
  exitUpgradeCard(selectedCard, 120);

  setTimeout(() => {
    refreshUpgradeAffordability();

    if (!hasAnyVisibleUpgradeCard()) {
      closeUpgradePanelWithRemainingCards();
      return;
    }

    scheduleNoAffordableExit();
  }, 180);
}

function bindSkillCards() {
  for (let card of skillCards) {
    bindPress(card, () => {
      chooseSkill(card.dataset.skill);
    });
  }

  if (upgradeSkipBtn) {
    bindPress(upgradeSkipBtn, () => {
      if (!choosingSkill || closingSkillPanel || !skillInputReady) return;
      closeUpgradePanelWithRemainingCards();
    });
  }
}






