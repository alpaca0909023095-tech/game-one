// 主動技能基礎數值從 config.js 讀取。
const SKILL_BULLET_SPEED = GAME_CONFIG.skill.bulletSpeed;
const SKILL_BULLET_COLLISION_RADIUS = GAME_CONFIG.skill.collisionRadius;
const SKILL_BULLET_WIDTH = GAME_CONFIG.skill.width;
const SKILL_BULLET_HEIGHT = GAME_CONFIG.skill.height;
const SKILL_BULLET_DAMAGE = PLAYER_BULLET_DAMAGE * GAME_CONFIG.skill.damageMultiplier;

const SKILL_FLASH_TIME = GAME_CONFIG.skill.flashTime;
const SKILL_LOCK_TIME = GAME_CONFIG.skill.lockTime;
const SKILL_PLAYER_SHAKE_POWER = GAME_CONFIG.skill.playerShakePower;

const SKILL_TRAIL_INTERVAL = GAME_CONFIG.skill.trailInterval;
const SKILL_TRAIL_COLOR = GAME_CONFIG.skill.trailColor;
const SKILL_TRAIL_SIZE_MIN = GAME_CONFIG.skill.trailSizeMin;
const SKILL_TRAIL_SIZE_MAX = GAME_CONFIG.skill.trailSizeMax;

const DOUBLE_TAP_MAX_DELAY = GAME_CONFIG.skill.doubleTapMaxDelay;

function checkDoubleTap() {
  if (!running) return;

  const now = performance.now();

  if (now - lastTapTime <= DOUBLE_TAP_MAX_DELAY) {
    triggerSkill();
    lastTapTime = 0;
  } else {
    lastTapTime = now;
  }
}

function triggerSkill() {
  if (!running) return;

  player.skillFlash = SKILL_FLASH_TIME;
  player.skillLock = SKILL_LOCK_TIME;
  shootTimer = PLAYER_SHOOT_INTERVAL;

  bullets.push({
    x: player.x,
    y: player.y - 52,
    vx: 0,
    vy: SKILL_BULLET_SPEED,
    r: SKILL_BULLET_COLLISION_RADIUS,
    w: SKILL_BULLET_WIDTH,
    h: SKILL_BULLET_HEIGHT,
    damage: SKILL_BULLET_DAMAGE,
    color: "#ff2020",
    life: 1.2,
    skill: 1,
    trailTimer: 0
  });
}

function createSkillTrail(b, dt) {
  if (!b.skill) return;
  if (SKILL_TRAIL_INTERVAL <= 0) return;

  b.trailTimer -= dt;

  while (b.trailTimer <= 0) {
    const size = rand(SKILL_TRAIL_SIZE_MIN, SKILL_TRAIL_SIZE_MAX);

    particles.push({
      x: b.x + rand(-b.w * 0.45, b.w * 0.45),
      y: b.y + b.h * 0.55 + rand(0, 10),
      vx: rand(-36, 36),
      vy: rand(55, 120),
      r: size,
      life: rand(0.18, 0.34),
      color: SKILL_TRAIL_COLOR,
      square: 1
    });

    b.trailTimer += SKILL_TRAIL_INTERVAL;
  }
}

