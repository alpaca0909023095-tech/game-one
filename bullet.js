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

const ENEMY_BULLET_SPEED = GAME_CONFIG.enemyBullet.speed;
const ENEMY_BULLET_DAMAGE = GAME_CONFIG.enemyBullet.damage;
const ENEMY_BULLET_RADIUS = GAME_CONFIG.enemyBullet.radius;
const ENEMY_BULLET_WIDTH = GAME_CONFIG.enemyBullet.width;
const ENEMY_BULLET_HEIGHT = GAME_CONFIG.enemyBullet.height;
const ENEMY_BULLET_LIFE = GAME_CONFIG.enemyBullet.life;
const ENEMY_BULLET_COLOR = GAME_CONFIG.enemyBullet.color;
const ENEMY_BULLET_GLOW_COLOR = GAME_CONFIG.enemyBullet.glowColor;
const ENEMY_BULLET_GLOW_BLUR = GAME_CONFIG.enemyBullet.glowBlur;

function shootBullet() {
  const laneCount = getCurrentBulletLaneCount();
  const laneSpacing = PLAYER_BULLET_WIDTH + 9;

  for (let i = 0; i < laneCount; i++) {
    const offsetX = (i - (laneCount - 1) / 2) * laneSpacing;

    bullets.push({
      team: "player",
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
  if (b.team !== "player") return;
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

function shootEnemyBulletAtPlayer(enemy, fixedVx, fixedVy) {
  if (!player) return;

  let vx = fixedVx;
  let vy = fixedVy;

  if (vx === undefined || vy === undefined) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const len = Math.max(0.001, Math.hypot(dx, dy));
    vx = dx / len * ENEMY_BULLET_SPEED;
    vy = dy / len * ENEMY_BULLET_SPEED;
  }

  enemyBullets.push({
    team: "enemy",
    x: enemy.x,
    y: enemy.y + enemy.r * 0.6,
    vx: vx,
    vy: vy,
    r: ENEMY_BULLET_RADIUS,
    w: ENEMY_BULLET_WIDTH,
    h: ENEMY_BULLET_HEIGHT,
    damage: ENEMY_BULLET_DAMAGE,
    color: ENEMY_BULLET_COLOR,
    life: ENEMY_BULLET_LIFE,
    dead: 0
  });
}

function updateEnemyBullets(dt) {
  for (let b of enemyBullets) {
    if (b.dead) continue;

    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
  }

  enemyBullets = enemyBullets.filter(b => !b.dead && b.life > 0 && b.y > -100 && b.y < H + 120 && b.x > -120 && b.x < W + 120);
}

function updateEnemyBulletPlayerCollision() {
  for (let b of enemyBullets) {
    if (b.dead || b.life <= 0) continue;

    if (distance(b.x, b.y, player.x, player.y) < b.r + player.r) {
      b.dead = 1;
      b.life = 0;

      if (player.invincible <= 0) {
        player.hp -= b.damage;
        player.invincible = 0.7;

        triggerHpHitEffect();
        triggerPlayerHitShake();
        createExplosion(player.x, player.y, 0.9);

        if (player.hp <= 0) {
          player.hp = 0;
          running = 0;
          finalText.innerHTML = "本次成績<br>關卡：" + level + "<br>金幣：" + coins;
          gameOverPanel.style.display = "flex";
        }
      }
    }
  }

  enemyBullets = enemyBullets.filter(b => !b.dead && b.life > 0);
}

function drawEnemyBullet(b) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
  ctx.fillStyle = b.color;
  ctx.shadowColor = ENEMY_BULLET_GLOW_COLOR;
  ctx.shadowBlur = ENEMY_BULLET_GLOW_BLUR;
  ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
  ctx.restore();
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
    team: "player",
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