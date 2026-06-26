// 子彈基礎數值從 config.js 讀取。
const PLAYER_BULLET_SPEED = GAME_CONFIG.bullet.speed;
const PLAYER_SHOOT_INTERVAL = GAME_CONFIG.bullet.shootInterval;
const PLAYER_BULLET_COLLISION_RADIUS = GAME_CONFIG.bullet.collisionRadius;
const PLAYER_BULLET_WIDTH = GAME_CONFIG.bullet.width;
const PLAYER_BULLET_HEIGHT = GAME_CONFIG.bullet.height;
const PLAYER_BULLET_DAMAGE = GAME_CONFIG.bullet.damage;

const PLAYER_BULLET_HIT_SPLASH_COUNT = GAME_CONFIG.bullet.hitSplashCount;
const PLAYER_BULLET_HIT_SPLASH_SIZE_MIN = GAME_CONFIG.bullet.hitSplashSizeMin;
const PLAYER_BULLET_HIT_SPLASH_SIZE_MAX = GAME_CONFIG.bullet.hitSplashSizeMax;
const PLAYER_BULLET_HIT_SPLASH_COLOR = GAME_CONFIG.bullet.hitSplashColor;
const PLAYER_BULLET_HIT_SPLASH_SPEED_X = GAME_CONFIG.bullet.hitSplashSpeedX;
const PLAYER_BULLET_HIT_SPLASH_SPEED_UP = GAME_CONFIG.bullet.hitSplashSpeedUp;
const PLAYER_BULLET_HIT_SPLASH_SPEED_DOWN = GAME_CONFIG.bullet.hitSplashSpeedDown;
const PLAYER_BULLET_TRAIL_INTERVAL = GAME_CONFIG.bullet.trailInterval;
const PLAYER_BULLET_TRAIL_SIZE_MIN = GAME_CONFIG.bullet.trailSizeMin;
const PLAYER_BULLET_TRAIL_SIZE_MAX = GAME_CONFIG.bullet.trailSizeMax;
const PLAYER_BULLET_TRAIL_COLOR = GAME_CONFIG.bullet.trailColor;

function shootBullet() {
  const laneCount = getCurrentBulletLaneCount();
  const laneSpacing = PLAYER_BULLET_WIDTH + 9;

  for (let i = 0; i < laneCount; i++) {
    const offsetX = (i - (laneCount - 1) / 2) * laneSpacing;

    bullets.push({
      x: player.x + offsetX,
      y: player.y - 48,
      vx: 0,
      vy: getCurrentBulletSpeed(),
      r: PLAYER_BULLET_COLLISION_RADIUS,
      w: PLAYER_BULLET_WIDTH,
      h: PLAYER_BULLET_HEIGHT,
      damage: getCurrentBulletDamage(),
      color: "#ffffff",
      life: 1.2,
      skill: 0,
      trailTimer: 0
    });
  }
}

function createPlayerBulletTrail(b, dt) {
  if (b.skill || b.homingEgg) return;
  if (PLAYER_BULLET_TRAIL_INTERVAL <= 0) return;

  b.trailTimer -= dt;

  while (b.trailTimer <= 0) {
    const size = rand(PLAYER_BULLET_TRAIL_SIZE_MIN, PLAYER_BULLET_TRAIL_SIZE_MAX);

    particles.push({
      x: b.x + rand(-b.w * 0.45, b.w * 0.45),
      y: b.y + b.h * 0.55 + rand(0, 7),
      vx: rand(-12, 12),
      vy: rand(24, 52),
      r: size,
      life: rand(0.18, 0.32),
      color: PLAYER_BULLET_TRAIL_COLOR,
      square: 1
    });

    b.trailTimer += PLAYER_BULLET_TRAIL_INTERVAL;
  }
}

function drawBullet(b) {
  ctx.fillStyle = b.color;

  if (b.skill) {
    ctx.shadowColor = "#ff3030";
    ctx.shadowBlur = 10;
  }

  ctx.fillRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
  ctx.shadowBlur = 0;
}





function findNearestEnemy(x, y) {
  let bestEnemy = null;
  let bestDistance = Infinity;

  for (let e of enemies) {
    if (e.dead) continue;

    const d = distance(x, y, e.x, e.y);
    if (d < bestDistance) {
      bestDistance = d;
      bestEnemy = e;
    }
  }

  return bestEnemy;
}

function spawnHomingEgg() {
  const target = findNearestEnemy(player.x, player.y);

  bullets.push({
    x: player.x,
    y: player.y - 54,
    vx: 0,
    vy: -getCurrentHomingEggSpeed(),
    r: HOMING_EGG_RADIUS,
    w: HOMING_EGG_WIDTH,
    h: HOMING_EGG_HEIGHT,
    damage: getCurrentHomingEggDamage(),
    color: "#b45cff",
    life: 3.0,
    skill: 0,
    homingEgg: 1,
    target: target,
    trailTimer: 0
  });
}

function createHomingEggTrail(b, dt) {
  b.trailTimer -= dt;

  while (b.trailTimer <= 0) {
    particles.push({
      x: b.x + rand(-b.w * 0.35, b.w * 0.35),
      y: b.y + rand(-b.h * 0.2, b.h * 0.35),
      vx: rand(-28, 28),
      vy: rand(28, 72),
      r: rand(5, 10),
      life: rand(0.18, 0.34),
      color: rand(0, 1) > 0.45 ? "rgba(210,90,255,0.95)" : "rgba(255,255,255,0.82)",
      square: 1
    });

    b.trailTimer += 0.035;
  }
}

function updateHomingEgg(b, dt) {
  if (!b.homingEgg) return;

  if (!b.target || b.target.dead) {
    b.target = findNearestEnemy(b.x, b.y);
  }

  if (b.target && !b.target.dead) {
    const dx = b.target.x - b.x;
    const dy = b.target.y - b.y;
    const len = Math.max(0.001, Math.hypot(dx, dy));
    const homingSpeed = getCurrentHomingEggSpeed();
    const targetVx = dx / len * homingSpeed;
    const targetVy = dy / len * homingSpeed;
    const turn = 1 - Math.exp(-HOMING_EGG_TURN_STRENGTH * dt);

    b.vx += (targetVx - b.vx) * turn;
    b.vy += (targetVy - b.vy) * turn;
  }

  createHomingEggTrail(b, dt);
}

function drawHomingEgg(b) {
  ctx.save();
  ctx.translate(b.x, b.y);

  const angle = Math.atan2(b.vy, b.vx) + Math.PI / 2;
  const flash = (Math.sin(performance.now() * 0.026 + b.x * 0.04) + 1) / 2;
  const bodyColor = flash > 0.52 ? "#f8ecff" : "#d64cff";
  const coreColor = flash > 0.52 ? "rgba(255,255,255,0.95)" : "rgba(190,30,255,0.95)";

  ctx.rotate(angle);

  ctx.shadowColor = flash > 0.52 ? "#ffffff" : "#d64cff";
  ctx.shadowBlur = 24;
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(0, 0, b.w * 0.5, b.h * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 10;
  ctx.fillStyle = coreColor;
  ctx.beginPath();
  ctx.ellipse(-3, -5, b.w * 0.18, b.h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}





