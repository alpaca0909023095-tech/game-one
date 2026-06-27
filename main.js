// 遊戲主要流程與全域狀態，數值從 config.js 讀取。
const COIN_DROP_SCATTER = GAME_CONFIG.reward.coinDropScatter;
const COIN_DROP_SPEED_MIN = GAME_CONFIG.reward.coinDropSpeedMin;
const COIN_DROP_SPEED_MAX = GAME_CONFIG.reward.coinDropSpeedMax;
const COIN_FALL_SPEED = GAME_CONFIG.reward.coinFallSpeed;
const COIN_MAGNET_RADIUS = GAME_CONFIG.reward.coinMagnetRadius;
const COIN_COLLECT_RADIUS = GAME_CONFIG.reward.coinCollectRadius;
const COIN_MAGNET_SPEED = GAME_CONFIG.reward.coinMagnetSpeed;
const COIN_DROP_SIZE = GAME_CONFIG.reward.coinSize;
const LEVEL_DURATION = GAME_CONFIG.level.duration;
const LEVEL_DURATION_GROWTH = GAME_CONFIG.level.durationGrowth;
const LEVEL_HEAL_ON_START = GAME_CONFIG.level.healOnStart;
const LEVEL_TEXT_DURATION = GAME_CONFIG.level.textDuration;

const STAR_COUNT = GAME_CONFIG.background.starCount;
const GRID_SIZE = GAME_CONFIG.background.gridSize;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const hpBox = document.getElementById("hpBox");
const hpBarBack = document.getElementById("hpBarBack");
const hpBar = document.getElementById("hpBar");
const coinText = document.getElementById("coinText");
const coinNumber = document.getElementById("coinNumber");
const timeNumber = document.getElementById("timeNumber");
const finalText = document.getElementById("finalText");
const debugError = document.getElementById("debugError");

const startPanel = document.getElementById("startPanel");
const gameOverPanel = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const skillPanel = document.getElementById("skillPanel");
const skillCards = Array.from(document.querySelectorAll(".skillCard"))
  .sort((a, b) => Number(a.dataset.skill) - Number(b.dataset.skill));

let W = 0;
let H = 0;

let player;
let bullets = [];
let enemyBullets = [];
let enemies = [];
let particles = [];
let coinDrops = [];
let shockwaves = [];

let shields = [];
let running = 0;
let choosingSkill = 0;
let closingSkillPanel = 0;
let skillInputReady = 0;

let lastTime = performance.now();
let enemySpawnTimer = 0;
let shootTimer = 0;
let homingEggTimer = HOMING_EGG_INTERVAL;
let homingEggBurstTimer = 0;
let homingEggBurstLeft = 0;
let shockwaveTimer = SHOCKWAVE_INTERVAL;
let shockwaveBurstTimer = 0;
let shockwaveBurstLeft = 0;
let shieldRespawnTimer = 0;
let shieldOrbitAngle = 0;
let enemyBRespawnTimer = 0;
let enemyBGroupActive = 0;
let enemyBGroupSpawnLeft = 0;
let enemyBGroupSpawnIndex = 0;
let enemyBGroupSpawnTotal = 0;
let enemyBGroupSpawnTimer = 0;
let enemyCGroupTimer = 0;
let enemyCGroupActive = 0;
let enemyCColumnsLeft = 0;
let enemyCColumnTimer = 0;
let enemyCUnitsLeft = 0;
let enemyCUnitTimer = 0;
let enemyCPath = null;
let enemyCColumnIndex = 0;
let enemyCGroupFirstSide = "left";
let enemyCColumnQueues = [];
let coins = 0;

let level = 1;
let levelStartTime = performance.now();
let levelTextTimer = 0;
let levelNoSpawnTimer = 0;
let levelText = "\u7b2c " + level + " \u95dc";

let touching = 0;
let lastTapTime = 0;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}


function formatDebugError(error) {
  if (!error) return "?芰?航炊";
  if (error.stack) return error.stack;
  if (error.message) return error.message;
  return String(error);
}

function showDebugError(error, label) {
  const text = (label ? label + "\n" : "") + formatDebugError(error);
  console.error(text);

  if (debugError) {
    debugError.style.display = "block";
    debugError.textContent = text;
  }
}

window.addEventListener("error", function (event) {
  showDebugError(event.error || event.message, "window error");
});

window.addEventListener("unhandledrejection", function (event) {
  showDebugError(event.reason, "promise error");
});
function triggerHpHitEffect() {
  hpBox.classList.remove("hurt");
  hpBarBack.classList.remove("hurtFlash");
  void hpBox.offsetWidth;
  void hpBarBack.offsetWidth;
  hpBox.classList.add("hurt");
  hpBarBack.classList.add("hurtFlash");
}

function triggerCoinEffect() {
  coinText.classList.remove("coinPop");
  void coinText.offsetWidth;
  coinText.classList.add("coinPop");
}

function getCurrentLevelDuration() {
  return LEVEL_DURATION + Math.max(0, level - 1) * LEVEL_DURATION_GROWTH;
}

function healPlayerForNewLevel(newLevel) {
  if (!player || newLevel <= 1 || LEVEL_HEAL_ON_START <= 0) return;
  player.hp = clamp(player.hp + LEVEL_HEAL_ON_START, 0, PLAYER_MAX_HP);
  updateHpBar();
}

function resetEnemyBGroupState() {
  enemyBRespawnTimer = 0;
  enemyBGroupActive = 0;
  enemyBGroupSpawnLeft = 0;
  enemyBGroupSpawnIndex = 0;
  enemyBGroupSpawnTotal = 0;
  enemyBGroupSpawnTimer = 0;
}

function resetEnemyCGroupState() {
  enemyCGroupTimer = 0;
  enemyCGroupActive = 0;
  enemyCColumnsLeft = 0;
  enemyCColumnTimer = 0;
  enemyCUnitsLeft = 0;
  enemyCUnitTimer = 0;
  enemyCPath = null;
  enemyCColumnIndex = 0;
  enemyCGroupFirstSide = "left";
  enemyCColumnQueues = [];
}

function startLevel(newLevel) {
  healPlayerForNewLevel(newLevel);
  level = newLevel;
  levelStartTime = performance.now();
  levelText = "\u7b2c " + level + " \u95dc";
  levelTextTimer = LEVEL_TEXT_DURATION;
  levelNoSpawnTimer = LEVEL_NO_SPAWN_TIME;
  enemySpawnTimer = 0;
  resetEnemyBGroupState();
  resetEnemyCGroupState();
  shootTimer = 0;
  resetHomingEggTimers();
  resetShockwaveTimers();
  bullets = [];
  enemyBullets = [];
  enemies = [];
  particles = [];
  coinDrops = [];
  shockwaves = [];
  resetShieldsForCurrentSkills();
  timeNumber.textContent = getCurrentLevelDuration() + "s";
}

function resetGame() {
  resetSkillState();
  player = createPlayer();

  bullets = [];
  enemyBullets = [];
  enemies = [];
  particles = [];
  coinDrops = [];

  coins = 0;
  coinNumber.textContent = coins;
  coinText.classList.remove("coinPop");

  enemySpawnTimer = 0;
  resetEnemyBGroupState();
  resetEnemyCGroupState();
  shootTimer = 0;
  resetHomingEggTimers();
  resetShockwaveTimers();
  shockwaves = [];
  shields = [];
  shieldRespawnTimer = 0;
  shieldOrbitAngle = 0;
  lastTapTime = 0;
  lastTime = performance.now();

  running = 1;
  choosingSkill = 0;
  closingSkillPanel = 0;
  skillInputReady = 0;
  touching = 0;

  hpBar.style.width = "100%";
  hpBar.style.background = "linear-gradient(90deg, #50ff8d, #d9ff63)";
  hpBox.classList.remove("hurt");
  hpBarBack.classList.remove("hurtFlash");

  closeSkillPanelInstant();
  startLevel(1);

  startPanel.style.display = "none";
  gameOverPanel.style.display = "none";
}

function bindPress(el, fn) {
  let lock = 0;

  function run(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (lock) return;
    lock = 1;

    fn(e);

    setTimeout(() => {
      lock = 0;
    }, 250);
  }

  el.addEventListener("click", run);
  el.addEventListener("touchstart", run, { passive: false });
  el.addEventListener("pointerdown", run);
}

function bindInput() {
  bindPress(startBtn, resetGame);
  bindPress(restartBtn, resetGame);
  bindSkillCards();

  startPanel.addEventListener("click", () => {
    if (!running && !choosingSkill) resetGame();
  });

  startPanel.addEventListener("touchstart", e => {
    if (!running && !choosingSkill) {
      e.preventDefault();
      resetGame();
    }
  }, { passive: false });

  startPanel.addEventListener("pointerdown", e => {
    if (e) e.preventDefault();
    if (!running && !choosingSkill) resetGame();
  }, { passive: false });

  function startPointerControl(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    if (!running) return;

    touching = 1;
    lastInputX = e.clientX;
    lastInputY = e.clientY;
    if (canvas.setPointerCapture && e.pointerId !== undefined) {
      canvas.setPointerCapture(e.pointerId);
    }
    checkDoubleTap();
  }

  function movePointerControl(e) {
    e.preventDefault();
    if (!touching || !running) return;

    const deltaX = e.clientX - lastInputX;
    const deltaY = e.clientY - lastInputY;
    lastInputX = e.clientX;
    lastInputY = e.clientY;
    movePlayerTargetBy(deltaX, deltaY);
  }

  function endPointerControl(e) {
    if (e) e.preventDefault();
    touching = 0;
    if (canvas.releasePointerCapture && e && e.pointerId !== undefined) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (error) {}
    }
  }

  if (window.PointerEvent) {
    canvas.addEventListener("pointerdown", startPointerControl, { passive: false });
    canvas.addEventListener("pointermove", movePointerControl, { passive: false });
    window.addEventListener("pointerup", endPointerControl, { passive: false });
    window.addEventListener("pointercancel", endPointerControl, { passive: false });
    return;
  }

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    if (!running) return;

    touching = 1;
    const t = e.touches[0];
    lastInputX = t.clientX;
    lastInputY = t.clientY;
    checkDoubleTap();
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!touching || !running) return;

    const t = e.touches[0];
    const deltaX = t.clientX - lastInputX;
    const deltaY = t.clientY - lastInputY;
    lastInputX = t.clientX;
    lastInputY = t.clientY;
    movePlayerTargetBy(deltaX, deltaY);
  }, { passive: false });

  canvas.addEventListener("touchend", e => {
    e.preventDefault();
    touching = 0;
  }, { passive: false });

  canvas.addEventListener("mousedown", e => {
    if (!running) return;

    touching = 1;
    lastInputX = e.clientX;
    lastInputY = e.clientY;
    checkDoubleTap();
  });

  window.addEventListener("mousemove", e => {
    if (!touching || !running) return;

    const deltaX = e.clientX - lastInputX;
    const deltaY = e.clientY - lastInputY;
    lastInputX = e.clientX;
    lastInputY = e.clientY;
    movePlayerTargetBy(deltaX, deltaY);
  });

  window.addEventListener("mouseup", () => {
    touching = 0;
  });
}

function createExplosion(x, y, scale = 1) {
  for (let i = 0; i < 16; i++) {
    particles.push({
      x: x,
      y: y,
      vx: rand(-160, 160) * scale,
      vy: rand(-160, 160) * scale,
      r: rand(2, 5) * scale,
      life: rand(0.25, 0.55),
      color: "#ffd36d",
      square: 0
    });
  }
}

function spawnCoinDrops(x, y, amount) {
  const count = Math.max(0, Math.floor(amount));

  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const scatter = rand(0, COIN_DROP_SCATTER);
    const speed = rand(COIN_DROP_SPEED_MIN, COIN_DROP_SPEED_MAX);

    coinDrops.push({
      x: x + Math.cos(angle) * scatter,
      y: y + Math.sin(angle) * scatter,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      value: 1,
      r: COIN_DROP_SIZE,
      magnet: 0
    });
  }
}

function collectCoinDrop(drop) {
  if (drop.dead) return;
  drop.dead = 1;
  coins += drop.value || 1;
  coinNumber.textContent = coins;
  triggerCoinEffect();
}

function killEnemy(enemy, explosionScale = 1.3) {
  if (!enemy || enemy.dead) return;

  enemy.dead = 1;
  const reward = enemy.coinReward !== undefined ? enemy.coinReward : 0;
  if (reward > 0) spawnCoinDrops(enemy.x, enemy.y, reward);
  createExplosion(enemy.x, enemy.y, explosionScale);

  if (enemy.type === "B") {
    enemyBRespawnTimer = ENEMY_B_RESPAWN_DELAY;
  }
}
function resetHomingEggTimers() {
  homingEggTimer = HOMING_EGG_INTERVAL;
  homingEggBurstTimer = 0;
  homingEggBurstLeft = 0;
}

function updateHomingEggSpawner(dt) {
  const eggCount = getCurrentHomingEggCount();
  if (eggCount <= 0) return;

  if (homingEggBurstLeft <= 0) {
    homingEggTimer -= dt;
    if (homingEggTimer <= 0) {
      homingEggBurstLeft = eggCount;
      homingEggBurstTimer = 0;
    } else {
      return;
    }
  }

  homingEggBurstTimer -= dt;

  while (homingEggBurstLeft > 0 && homingEggBurstTimer <= 0) {
    spawnHomingEgg();
    homingEggBurstLeft--;

    if (homingEggBurstLeft > 0) {
      homingEggBurstTimer += HOMING_EGG_SHOT_GAP;
    } else {
      homingEggTimer = HOMING_EGG_INTERVAL;
      homingEggBurstTimer = 0;
    }
  }
}
function resetShockwaveTimers() {
  shockwaveTimer = SHOCKWAVE_INTERVAL;
  shockwaveBurstTimer = 0;
  shockwaveBurstLeft = 0;
}

function spawnShockwave() {
  if (!player) return;

  shockwaves.push({
    x: player.x,
    y: player.y,
    r: 0,
    maxR: SHOCKWAVE_MAX_RADIUS,
    speed: SHOCKWAVE_EXPAND_SPEED,
    life: 1,
    burstDone: 0
  });
}

function updateShockwaveSpawner(dt) {
  const count = getCurrentShockwaveCount();
  if (count <= 0) return;

  if (shockwaveBurstLeft <= 0) {
    shockwaveTimer -= dt;
    if (shockwaveTimer <= 0) {
      shockwaveBurstLeft = count;
      shockwaveBurstTimer = 0;
    } else {
      return;
    }
  }

  shockwaveBurstTimer -= dt;

  while (shockwaveBurstLeft > 0 && shockwaveBurstTimer <= 0) {
    spawnShockwave();
    shockwaveBurstLeft--;

    if (shockwaveBurstLeft > 0) {
      shockwaveBurstTimer += SHOCKWAVE_WAVE_GAP;
    } else {
      shockwaveTimer = SHOCKWAVE_INTERVAL;
      shockwaveBurstTimer = 0;
    }
  }
}

function createShockwaveBurst(w) {
  const count = Math.floor(rand(SHOCKWAVE_BURST_PARTICLE_MIN, SHOCKWAVE_BURST_PARTICLE_MAX + 1));

  for (let i = 0; i < count; i++) {
    const a = rand(0, Math.PI * 2);
    const radius = w.maxR + rand(-SHOCKWAVE_BURST_PARTICLE_TRACK_SPREAD, SHOCKWAVE_BURST_PARTICLE_TRACK_SPREAD);
    const speed = rand(SHOCKWAVE_BURST_PARTICLE_SPEED_MIN, SHOCKWAVE_BURST_PARTICLE_SPEED_MAX);

    particles.push({
      x: w.x + Math.cos(a) * radius,
      y: w.y + Math.sin(a) * radius,
      vx: Math.cos(a) * speed + rand(-SHOCKWAVE_BURST_PARTICLE_DRIFT, SHOCKWAVE_BURST_PARTICLE_DRIFT),
      vy: Math.sin(a) * speed + rand(-SHOCKWAVE_BURST_PARTICLE_DRIFT, SHOCKWAVE_BURST_PARTICLE_DRIFT),
      r: rand(SHOCKWAVE_BURST_PARTICLE_SIZE_MIN, SHOCKWAVE_BURST_PARTICLE_SIZE_MAX),
      life: rand(0.22, 0.42),
      color: rand(0, 1) > 0.5 ? SHOCKWAVE_BURST_PARTICLE_COLOR_A : SHOCKWAVE_BURST_PARTICLE_COLOR_B,
      square: 1
    });
  }
}

function getShockwaveAlpha(w) {
  const fadeStartRadius = w.maxR * SHOCKWAVE_FADE_START_RATE;
  if (w.r <= fadeStartRadius) return 1;

  return clamp(1 - (w.r - fadeStartRadius) / (w.maxR - fadeStartRadius), 0, 1);
}

function updateShockwaves(dt) {
  for (let w of shockwaves) {
    w.r += w.speed * dt;
    w.life = getShockwaveAlpha(w);

    if (w.r >= w.maxR && !w.burstDone) {
      w.burstDone = 1;
      createShockwaveBurst(w);
    }
  }

  shockwaves = shockwaves.filter(w => w.r < w.maxR);
}

function updateShockwaveEnemyBulletCollision() {
  if (typeof enemyBullets === "undefined" || enemyBullets.length <= 0) return;
  if (shockwaves.length <= 0) return;

  const baseThickness = Math.max(8, SHOCKWAVE_LINE_WIDTH * 1.8);

  for (let w of shockwaves) {
    if (w.r <= 0 || w.life <= 0) continue;

    for (let bullet of enemyBullets) {
      if (bullet.dead || bullet.life <= 0) continue;

      const d = distance(w.x, w.y, bullet.x, bullet.y);
      const ringHit = Math.abs(d - w.r) <= baseThickness + bullet.r;

      if (ringHit) {
        bullet.dead = 1;
        bullet.life = 0;

        particles.push({
          x: bullet.x,
          y: bullet.y,
          vx: rand(-22, 22),
          vy: rand(-22, 22),
          r: rand(4, 7),
          life: rand(0.16, 0.28),
          color: "rgba(170,235,255,0.9)",
          square: 1
        });
      }
    }
  }

  enemyBullets = enemyBullets.filter(b => !b.dead && b.life > 0);
}
function drawShockwaves() {
  for (let w of shockwaves) {
    ctx.save();
    ctx.globalAlpha = w.life;
    ctx.strokeStyle = "rgba(145, 235, 255, 0.92)";
    ctx.lineWidth = SHOCKWAVE_LINE_WIDTH * (0.45 + w.life * 0.55);
    ctx.shadowColor = "#9df0ff";
    ctx.shadowBlur = SHOCKWAVE_SHADOW_BLUR;
    ctx.beginPath();
    ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = w.life * 0.36;
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w.x, w.y, w.r + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function createShield(index, count, randomAngle) {
  const baseAngle = randomAngle ? rand(0, Math.PI * 2) : shieldOrbitAngle + index * Math.PI * 2 / Math.max(1, count);

  return {
    slot: index,
    total: count,
    x: player ? player.x : 0,
    y: player ? player.y : 0,
    angle: baseAngle,
    speedRate: 1 + (index % 2 === 0 ? 1 : -1) * SHIELD_ORBIT_SPEED_VARIANCE * (0.55 + (index % 3) * 0.18)
  };
}

function rebuildShieldsForCurrentSkills() {
  const count = getCurrentShieldCount();
  shields = [];

  for (let i = 0; i < count; i++) {
    shields.push(createShield(i, count, 0));
  }

  shieldRespawnTimer = 0;
}

function resetShieldsForCurrentSkills() {
  shieldOrbitAngle = 0;
  rebuildShieldsForCurrentSkills();
}

function updateShieldPosition(shield, dt) {
  shield.angle += SHIELD_ORBIT_SPEED * shield.speedRate * dt;
  shield.x = player.x + Math.cos(shield.angle) * SHIELD_ORBIT_RADIUS;
  shield.y = player.y + Math.sin(shield.angle) * SHIELD_ORBIT_RADIUS;
}

function addOneShield(desiredCount) {
  if (shields.length >= desiredCount) return;

  shields.push(createShield(shields.length, desiredCount, 1));
  for (let shield of shields) {
    shield.total = desiredCount;
  }
}

function damageEnemyByShield(enemy, shield) {
  enemy.hp -= SHIELD_DAMAGE;
  enemy.hitShake = ENEMY_HIT_SHAKE_TIME;

  if (enemy.hp <= 0) killEnemy(enemy, 1.1);


  shield.dead = 1;
}

function updateShieldEnemyBulletCollision(shield) {
  if (typeof enemyBullets === "undefined") return;

  const shieldRadius = getCurrentShieldCollisionRadius();

  for (let bullet of enemyBullets) {
    if (bullet.dead || bullet.life <= 0) continue;

    const bulletRadius = bullet.r || bullet.radius || 0;
    if (distance(shield.x, shield.y, bullet.x, bullet.y) < shieldRadius + bulletRadius) {
      bullet.dead = 1;
      bullet.life = 0;
      shield.dead = 1;
      return;
    }
  }
}

function updateShieldRespawn(dt, desiredCount) {
  if (shields.length >= desiredCount) {
    shieldRespawnTimer = 0;
    return;
  }

  if (shieldRespawnTimer <= 0) {
    shieldRespawnTimer = SHIELD_RESPAWN_DELAY;
    return;
  }

  shieldRespawnTimer -= dt;
  while (shieldRespawnTimer <= 0.000001 && shields.length < desiredCount) {
    addOneShield(desiredCount);
    shieldRespawnTimer = shields.length < desiredCount ? shieldRespawnTimer + SHIELD_RESPAWN_DELAY : 0;
  }
}

function updateShields(dt) {
  const desiredCount = getCurrentShieldCount();
  if (!player || desiredCount <= 0) return;

  shieldOrbitAngle += SHIELD_ORBIT_SPEED * dt;

  if (shields.length > desiredCount) {
    shields = shields.slice(0, desiredCount);
  }

  for (let shield of shields) {
    shield.total = desiredCount;
    updateShieldPosition(shield, dt);

    for (let enemy of enemies) {
      if (enemy.dead) continue;

      if (distance(shield.x, shield.y, enemy.x, enemy.y) < getCurrentShieldCollisionRadius() + enemy.r) {
        damageEnemyByShield(enemy, shield);
        break;
      }
    }

    if (!shield.dead) {
      updateShieldEnemyBulletCollision(shield);
    }
  }

  shields = shields.filter(shield => !shield.dead);
  updateShieldRespawn(dt, desiredCount);
}

function drawShields() {
  for (let shield of shields) {
    ctx.save();
    ctx.translate(shield.x, shield.y);
    ctx.rotate(shield.angle - performance.now() / 1000 * SHIELD_SELF_ROTATE_SPEED);
    const shieldSize = getCurrentShieldSize();
    ctx.shadowColor = SHIELD_SHADOW_COLOR;
    ctx.shadowBlur = SHIELD_SHADOW_BLUR;
    ctx.fillStyle = SHIELD_COLOR;
    ctx.strokeStyle = SHIELD_EDGE_COLOR;
    ctx.lineWidth = 2;
    ctx.fillRect(-shieldSize / 2, -shieldSize / 2, shieldSize, shieldSize);
    ctx.strokeRect(-shieldSize / 2, -shieldSize / 2, shieldSize, shieldSize);
    ctx.restore();
  }
}
function updateLevelTimer(dt) {
  levelTextTimer -= dt;
  levelNoSpawnTimer -= dt;

  const elapsed = (performance.now() - levelStartTime) / 1000;
  const levelDuration = getCurrentLevelDuration();
  const remain = Math.max(0, Math.ceil(levelDuration - elapsed));

  timeNumber.textContent = remain + "s";

  if (elapsed >= levelDuration) {
    openSkillPanel();
  }
}

function damagePlayer(amount) {
  if (player.invincible > 0) return;

  player.hp -= amount;
  player.invincible = 0.7;

  triggerHpHitEffect();
  triggerPlayerHitShake();
  createExplosion(player.x, player.y, 1.1);

  if (player.hp <= 0) {
    player.hp = 0;
    running = 0;
    finalText.innerHTML = "本次成績<br>關卡：" + level + "<br>金幣：" + coins;
    gameOverPanel.style.display = "flex";
  }
}

function updateEnemyCollision(dt) {
  for (let e of enemies) {
    if (e.type !== "B" && e.type !== "C") e.y += e.speed * dt;
    e.hitShake -= dt;

    if (distance(player.x, player.y, e.x, e.y) < player.r + e.r) {
      const damage = e.damageOnHit || PLAYER_DAMAGE_ON_HIT;
      damagePlayer(damage);

      if (e.type === "C") {
        e.dead = 1;
        createExplosion(e.x, e.y, 0.8);
      }
    }
  }
}

function updateBullets(dt) {
  for (let b of bullets) {
    if (b.team && b.team !== "player") continue;

    createSkillTrail(b, dt);
    createPlayerBulletTrail(b, dt);
    updateHomingEgg(b, dt);

    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;

    for (let e of enemies) {
      if (e.dead) continue;

      if (distance(b.x, b.y, e.x, e.y) < b.r + e.r) {
        b.life = 0;
        e.hp -= b.damage;
        e.hitShake = ENEMY_HIT_SHAKE_TIME;

        if (b.skill || b.homingEgg) {
          particles.push({
            x: b.x,
            y: b.y,
            vx: rand(-60, 60),
            vy: rand(-80, 40),
            r: b.skill ? 8 : 4,
            life: 0.25,
            color: b.skill ? SKILL_TRAIL_COLOR : "#b45cff",
            square: 1
          });
        }

        if (!b.skill && !b.homingEgg) {
          for (let i = 0; i < PLAYER_BULLET_HIT_SPLASH_COUNT; i++) {
            particles.push({
              x: b.x + rand(-6, 6),
              y: b.y + rand(-6, 6),
              vx: rand(-PLAYER_BULLET_HIT_SPLASH_SPEED_X, PLAYER_BULLET_HIT_SPLASH_SPEED_X),
              vy: rand(-PLAYER_BULLET_HIT_SPLASH_SPEED_UP, PLAYER_BULLET_HIT_SPLASH_SPEED_DOWN),
              r: rand(PLAYER_BULLET_HIT_SPLASH_SIZE_MIN, PLAYER_BULLET_HIT_SPLASH_SIZE_MAX),
              life: rand(0.24, 0.42),
              color: PLAYER_BULLET_HIT_SPLASH_COLOR,
              square: 1
            });
          }
        }

        if (e.hp <= 0) killEnemy(e, 1.3);


        break;
      }
    }
  }

  bullets = bullets.filter(b => b.life > 0 && b.y > -80 && b.y < H + 100 && b.x > -100 && b.x < W + 100);
}

function updateCoinDrops(dt) {
  if (!player || coinDrops.length <= 0) return;

  for (let drop of coinDrops) {
    const dx = player.x - drop.x;
    const dy = player.y - drop.y;
    const d = Math.max(0.001, Math.hypot(dx, dy));

    const collectDistance = player.r + drop.r + COIN_COLLECT_RADIUS;
    if (d <= collectDistance) {
      collectCoinDrop(drop);
      continue;
    }

    if (d <= COIN_MAGNET_RADIUS || drop.magnet) {
      drop.magnet = 1;
      drop.vx = dx / d * COIN_MAGNET_SPEED;
      drop.vy = dy / d * COIN_MAGNET_SPEED;
    } else if (!drop.magnet) {
      drop.vx *= 0.92;
      drop.vy = drop.vy * 0.92 + COIN_FALL_SPEED * 0.08;
    }

    drop.x += drop.vx * dt;
    drop.y += drop.vy * dt;

    if (!drop.magnet) drop.y += COIN_FALL_SPEED * dt;
  }

  coinDrops = coinDrops.filter(drop => !drop.dead && drop.y < H + 80 && drop.x > -80 && drop.x < W + 80);
}
function updateParticles(dt) {
  for (let p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.life -= dt;
  }

  particles = particles.filter(p => p.life > 0);
}

function update(dt) {
  if (!running) return;

  updatePlayerMovement(dt);
  updateLevelTimer(dt);

  if (!running) return;

  shootTimer -= dt;
  player.invincible -= dt;
  player.skillFlash -= dt;
  player.skillLock -= dt;
  player.hitShake -= dt;

  if (player.skillLock <= 0 && shootTimer <= 0) {
    shootBullet();
    shootTimer = getCurrentShootInterval();
  }

  updateEnemySpawn(dt);
  updateEnemyActions(dt);
  updateHomingEggSpawner(dt);
  updateShockwaveSpawner(dt);
  updateShockwaves(dt);
  updateEnemyBullets(dt);
  updateShockwaveEnemyBulletCollision();
  updateShields(dt);
  updateEnemyBulletPlayerCollision();
  updateEnemyCollision(dt);
  updateBullets(dt);

  enemies = enemies.filter(e => !e.dead && e.y < H + 120 && e.x > -120 && e.x < W + 120);

  updateCoinDrops(dt);
  updateParticles(dt);
  updateHpBar();
}

function drawBackground() {
  ctx.fillStyle = "#050814";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;

  for (let y = 0; y < H; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  for (let x = 0; x < W; x += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  for (let i = 0; i < STAR_COUNT; i++) {
    const x = (i * 71) % W;
    const y = (i * 137 + performance.now() * 0.03) % H;
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(x, y, 2, 2);
  }
}

function drawCoinDrops() {
  for (let drop of coinDrops) {
    ctx.save();
    ctx.translate(drop.x, drop.y);
    ctx.fillStyle = "#ffd23c";
    ctx.shadowColor = "rgba(255,210,60,0.7)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, drop.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(-drop.r * 0.25, -drop.r * 0.3, drop.r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawParticles() {
  for (let p of particles) {
    ctx.globalAlpha = Math.max(0, p.life * 3);
    ctx.fillStyle = p.color || "#ffd36d";

    if (p.square === 1) {
      ctx.fillRect(p.x - p.r / 2, p.y - p.r / 2, p.r, p.r);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

function drawLevelText() {
  if (levelTextTimer <= 0) return;

  const alpha = clamp(levelTextTimer / LEVEL_TEXT_DURATION, 0, 1);
  const scale = 1 + (1 - alpha) * 0.18;

  ctx.save();
  ctx.globalAlpha = alpha * 0.58;
  ctx.fillStyle = "white";
  ctx.font = "bold " + Math.floor(54 * scale) + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(levelText, W / 2, H / 2);
  ctx.restore();
}

function drawPauseDim() {
  if (!choosingSkill) return;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function draw() {
  drawBackground();
  drawShockwaves();
  drawParticles();
  drawCoinDrops();

  for (let b of enemyBullets) {
    drawEnemyBullet(b);
  }

  for (let b of bullets) {
    if (b.homingEgg) {
      drawHomingEgg(b);
    } else {
      drawBullet(b);
    }
  }

  for (let e of enemies) {
    drawEnemy(e);
  }

  drawPlayer();
  drawShields();
  drawLevelText();
  drawPauseDim();
}

function loop(now) {
  let dt = (now - lastTime) / 1000;
  lastTime = now;

  if (dt > 0.04) dt = 0.04;

  try {
    update(dt);
    draw();
  } catch (error) {
    showDebugError(error, "game loop error");
    running = 0;

    try {
      drawBackground();
      if (player) drawPlayer();
      drawPauseDim();
    } catch (drawError) {
      showDebugError(drawError, "fallback draw error");
    }
  }

  requestAnimationFrame(loop);
}

resize();
window.addEventListener("resize", resize);
bindInput();
requestAnimationFrame(loop);

















































