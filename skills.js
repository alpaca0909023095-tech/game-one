// 技能資料與效果系統。
// 之後新增技能時，主要改 SKILL_POOL：name 是 UI 名稱，id 對應 game_config.js 的 skillBasePrice / skillAppear。
// 數值加成分區：normalBullet 只影響普通白色子彈；homingEgg 只影響追蹤蛋；skillBullet 只影響雙擊技能彈；shield 只影響護盾。
const SPEED_SHOOT_INTERVAL_MULTIPLIER = GAME_CONFIG.skills.speedShoot.shootIntervalMultiplier;
const FIRE_TEAM_LANE_BONUS = GAME_CONFIG.skills.fireTeam.laneBonus;

const HOMING_EGG_COUNT_PER_PURCHASE = GAME_CONFIG.skills.homingEgg.countPerPurchase;
const HOMING_EGG_INTERVAL = GAME_CONFIG.skills.homingEgg.interval;
const HOMING_EGG_SHOT_GAP = GAME_CONFIG.skills.homingEgg.shotGap;
const HOMING_EGG_DAMAGE = GAME_CONFIG.skills.homingEgg.damage;
const HOMING_EGG_SPEED = GAME_CONFIG.skills.homingEgg.speed;
const HOMING_EGG_TURN_STRENGTH = GAME_CONFIG.skills.homingEgg.turnStrength;
const HOMING_EGG_RADIUS = GAME_CONFIG.skills.homingEgg.radius;
const HOMING_EGG_WIDTH = GAME_CONFIG.skills.homingEgg.width;
const HOMING_EGG_HEIGHT = GAME_CONFIG.skills.homingEgg.height;

const SHOCKWAVE_COUNT_PER_PURCHASE = GAME_CONFIG.skills.shockwave.countPerPurchase;
const SHOCKWAVE_INTERVAL = GAME_CONFIG.skills.shockwave.interval;
const SHOCKWAVE_MAX_RADIUS = GAME_CONFIG.skills.shockwave.maxRadius;
const SHOCKWAVE_EXPAND_SPEED = GAME_CONFIG.skills.shockwave.expandSpeed;
const SHOCKWAVE_WAVE_GAP = GAME_CONFIG.skills.shockwave.waveGap;
const SHOCKWAVE_LINE_WIDTH = GAME_CONFIG.skills.shockwave.lineWidth;
const SHOCKWAVE_FADE_START_RATE = GAME_CONFIG.skills.shockwave.fadeStartRate;
const SHOCKWAVE_SHADOW_BLUR = GAME_CONFIG.skills.shockwave.shadowBlur;
const SHOCKWAVE_BURST_PARTICLE_MIN = GAME_CONFIG.skills.shockwave.burstParticleMin;
const SHOCKWAVE_BURST_PARTICLE_MAX = GAME_CONFIG.skills.shockwave.burstParticleMax;
const SHOCKWAVE_BURST_PARTICLE_SIZE_MIN = GAME_CONFIG.skills.shockwave.burstParticleSizeMin;
const SHOCKWAVE_BURST_PARTICLE_SIZE_MAX = GAME_CONFIG.skills.shockwave.burstParticleSizeMax;
const SHOCKWAVE_BURST_PARTICLE_TRACK_SPREAD = GAME_CONFIG.skills.shockwave.burstParticleTrackSpread;
const SHOCKWAVE_BURST_PARTICLE_SPEED_MIN = GAME_CONFIG.skills.shockwave.burstParticleSpeedMin;
const SHOCKWAVE_BURST_PARTICLE_SPEED_MAX = GAME_CONFIG.skills.shockwave.burstParticleSpeedMax;
const SHOCKWAVE_BURST_PARTICLE_DRIFT = GAME_CONFIG.skills.shockwave.burstParticleDrift;
const SHOCKWAVE_BURST_PARTICLE_COLOR_A = GAME_CONFIG.skills.shockwave.burstParticleColorA;
const SHOCKWAVE_BURST_PARTICLE_COLOR_B = GAME_CONFIG.skills.shockwave.burstParticleColorB;

const SHIELD_COUNT_PER_PURCHASE = GAME_CONFIG.skills.shield.countPerPurchase;
const SHIELD_ORBIT_RADIUS = GAME_CONFIG.skills.shield.orbitRadius;
const SHIELD_ORBIT_SPEED = GAME_CONFIG.skills.shield.orbitSpeed;
const SHIELD_ORBIT_SPEED_VARIANCE = GAME_CONFIG.skills.shield.orbitSpeedVariance;
const SHIELD_SIZE = GAME_CONFIG.skills.shield.size;
const SHIELD_COLLISION_RADIUS = GAME_CONFIG.skills.shield.collisionRadius;
const SHIELD_DAMAGE = GAME_CONFIG.skills.shield.damage;
const SHIELD_RESPAWN_DELAY = GAME_CONFIG.skills.shield.respawnDelay;
const SHIELD_COLOR = GAME_CONFIG.skills.shield.color;
const SHIELD_EDGE_COLOR = GAME_CONFIG.skills.shield.edgeColor;
const SHIELD_SHADOW_COLOR = GAME_CONFIG.skills.shield.shadowColor;
const SHIELD_SHADOW_BLUR = GAME_CONFIG.skills.shield.shadowBlur;
const SHIELD_SELF_ROTATE_SPEED = GAME_CONFIG.skills.shield.selfRotateSpeed;
const SHIELD_AMPLIFIER_SIZE_MULTIPLIER = GAME_CONFIG.skills.shield.amplifierSizeMultiplier;

const HEALTH_POTION_MISSING_HP_HEAL_RATE = GAME_CONFIG.skills.healthPotion.missingHpHealRate;
const KILL_HEAL_CHANCE = GAME_CONFIG.skills.killHeal.chance;
const KILL_HEAL_PER_STACK = GAME_CONFIG.skills.killHeal.healPerStack;

const PLAYER_MODS_BASE = {
  normalBullet: {
    shootIntervalMultiplier: 1,
    damageMultiplier: 1,
    speedMultiplier: 1,
    laneBonus: 0
  },
  homingEgg: {
    count: 0,
    damageMultiplier: 1,
    speedMultiplier: 1
  },
  skillBullet: {
    damageMultiplier: 1,
    speedMultiplier: 1
  },
  shockwave: {
    count: 0
  },
  shield: {
    count: 0,
    sizeMultiplier: 1
  },
  killHeal: {
    stacks: 0
  }
};

let playerMods = createBasePlayerMods();
let purchasedSkills = [];

const SKILL_POOL = [
  {
    id: "shockwave_1",
    name: "衝擊波",
    description: "連放後等待 5 秒",
    apply: function () {
      playerMods.shockwave.count += SHOCKWAVE_COUNT_PER_PURCHASE;
    }
  },
  {
    id: "homing_egg_1",
    name: "追蹤蛋",
    description: "連射後等待 4 秒",
    apply: function () {
      playerMods.homingEgg.count += HOMING_EGG_COUNT_PER_PURCHASE;
    }
  },
  {
    id: "speed_shoot_2",
    name: "加速射擊",
    description: "普通攻速 +20%",
    apply: function () {
      playerMods.normalBullet.shootIntervalMultiplier *= SPEED_SHOOT_INTERVAL_MULTIPLIER;
    }
  },
  {
    id: "fire_team_3",
    name: "火力班",
    description: "普通彈道 +1",
    apply: function () {
      playerMods.normalBullet.laneBonus += FIRE_TEAM_LANE_BONUS;
    }
  },
  {
    id: "shield_3",
    name: "護盾",
    description: "環繞方塊護盾 +1",
    apply: function () {
      playerMods.shield.count += SHIELD_COUNT_PER_PURCHASE;
    }
  },
  {
    id: "shield_amplifier_1",
    name: "護盾放大器",
    description: "護盾尺寸 +25%",
    requires: {
      mod: "shield",
      minCount: 1
    },
    apply: function () {
      playerMods.shield.sizeMultiplier *= SHIELD_AMPLIFIER_SIZE_MULTIPLIER;
    }
  },
  {
    id: "health_potion",
    name: "血瓶",
    description: "回復一半已損血量",
    apply: function () {
      healPlayerByMissingHpRate(HEALTH_POTION_MISSING_HP_HEAL_RATE);
    }
  },
  {
    id: "kill_heal",
    name: "擊殺回血",
    description: "擊殺時 50% 回血，重複取得每層 +1",
    apply: function () {
      playerMods.killHeal.stacks += 1;
    }
  }
];

function createBasePlayerMods() {
  return {
    normalBullet: Object.assign({}, PLAYER_MODS_BASE.normalBullet),
    homingEgg: Object.assign({}, PLAYER_MODS_BASE.homingEgg),
    skillBullet: Object.assign({}, PLAYER_MODS_BASE.skillBullet),
    shockwave: Object.assign({}, PLAYER_MODS_BASE.shockwave),
    shield: Object.assign({}, PLAYER_MODS_BASE.shield),
    killHeal: Object.assign({}, PLAYER_MODS_BASE.killHeal)
  };
}

function resetSkillState() {
  playerMods = createBasePlayerMods();
  purchasedSkills = [];
}

function getSkillBasePrice(skillDef) {
  const prices = GAME_CONFIG.upgradeUi.skillBasePrice || {};
  const skillPriceConfig = GAME_CONFIG.upgradeUi.skillPrice || {};
  const defaultPrice = skillPriceConfig.defaultBasePrice || 10;
  return prices[skillDef.id] !== undefined ? prices[skillDef.id] : defaultPrice;
}

function roundSkillPrice(value, unit) {
  const safeUnit = Math.max(1, unit || 10);
  return Math.max(safeUnit, Math.round(value / safeUnit) * safeUnit);
}

function getSkillPrice(skillDef) {
  const priceConfig = GAME_CONFIG.upgradeUi.skillPrice || {};
  const basePrice = getSkillBasePrice(skillDef);
  const increaseRate = priceConfig.perLevelIncreaseRate !== undefined ? priceConfig.perLevelIncreaseRate : 0.3;
  const rawPrice = basePrice * (1 + Math.max(0, level - 1) * increaseRate);
  const threshold = priceConfig.highPriceThreshold !== undefined ? priceConfig.highPriceThreshold : 200;
  const unit = rawPrice > threshold ? priceConfig.highPriceRoundTo : priceConfig.roundTo;
  return roundSkillPrice(rawPrice, unit || 10);
}

function isSkillEnabledForUi(skillDef) {
  const skillAppear = GAME_CONFIG.upgradeUi.skillAppear || {};
  return skillAppear[skillDef.id] === 0 ? 0 : 1;
}

function isSkillRequirementMet(skillDef) {
  if (!skillDef.requires) return 1;

  if (skillDef.requires.mod === "shield") {
    return getCurrentShieldCount() >= (skillDef.requires.minCount || 1) ? 1 : 0;
  }

  return 1;
}

function canSkillAppearInUpgrade(skillDef) {
  return isSkillEnabledForUi(skillDef) && isSkillRequirementMet(skillDef) ? 1 : 0;
}

function pickRandomFromList(list) {
  return list[Math.floor(rand(0, list.length))];
}

function pickUpgradeSkill(usedIds) {
  const candidates = SKILL_POOL.filter(skillDef => !usedIds.includes(skillDef.id) && canSkillAppearInUpgrade(skillDef));

  if (candidates.length > 0) {
    return pickRandomFromList(candidates);
  }

  const fallbackCandidates = SKILL_POOL.filter(skillDef => canSkillAppearInUpgrade(skillDef));
  if (fallbackCandidates.length > 0) {
    return pickRandomFromList(fallbackCandidates);
  }

  return {
    id: "empty_skill",
    name: "待新增技能",
    description: "尚未設定效果",
    apply: function () {}
  };
}

function rollUpgradeSkills(cardCount) {
  const result = [];
  const usedIds = [];

  for (let i = 0; i < cardCount; i++) {
    const skillDef = pickUpgradeSkill(usedIds);
    usedIds.push(skillDef.id);
    result.push(skillDef);
  }

  return result;
}

function applyPurchasedSkill(skillId) {
  const skillDef = SKILL_POOL.find(item => item.id === skillId);
  if (!skillDef) return;

  skillDef.apply();
  purchasedSkills.push(skillId);
}

function healPlayerAmount(amount) {
  if (!player || amount <= 0) return;
  player.hp = clamp(player.hp + amount, 0, PLAYER_MAX_HP);
  updateHpBar();
}

function healPlayerByMissingHpRate(rate) {
  if (!player || rate <= 0) return;
  const missingHp = Math.max(0, PLAYER_MAX_HP - player.hp);
  healPlayerAmount(Math.ceil(missingHp * rate));
}

function tryApplyKillHeal() {
  const stacks = playerMods.killHeal ? playerMods.killHeal.stacks : 0;
  if (stacks <= 0) return;
  if (Math.random() > KILL_HEAL_CHANCE) return;
  healPlayerAmount(stacks * KILL_HEAL_PER_STACK);
}

function getCurrentShootInterval() {
  return PLAYER_SHOOT_INTERVAL * playerMods.normalBullet.shootIntervalMultiplier;
}

function getCurrentBulletDamage() {
  return PLAYER_BULLET_DAMAGE * playerMods.normalBullet.damageMultiplier;
}

function getCurrentBulletSpeed() {
  return PLAYER_BULLET_SPEED * playerMods.normalBullet.speedMultiplier;
}

function getCurrentBulletLaneCount() {
  return 1 + playerMods.normalBullet.laneBonus;
}

function getCurrentHomingEggCount() {
  return playerMods.homingEgg.count;
}

function getCurrentHomingEggDamage() {
  return HOMING_EGG_DAMAGE * playerMods.homingEgg.damageMultiplier;
}

function getCurrentHomingEggSpeed() {
  return HOMING_EGG_SPEED * playerMods.homingEgg.speedMultiplier;
}

function getCurrentSkillBulletDamage(baseDamage) {
  return baseDamage * playerMods.skillBullet.damageMultiplier;
}

function getCurrentSkillBulletSpeed(baseSpeed) {
  return baseSpeed * playerMods.skillBullet.speedMultiplier;
}

function getCurrentShockwaveCount() {
  return playerMods.shockwave.count;
}

function getCurrentShieldCount() {
  return playerMods.shield.count;
}

function getCurrentShieldSize() {
  return SHIELD_SIZE * playerMods.shield.sizeMultiplier;
}

function getCurrentShieldCollisionRadius() {
  return SHIELD_COLLISION_RADIUS * playerMods.shield.sizeMultiplier;
}
