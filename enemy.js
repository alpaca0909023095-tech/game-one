// 敵人基礎數值從 config.js 讀取。
const ENEMY_HP = GAME_CONFIG.enemy.hp;
const ENEMY_MIN_SPEED = GAME_CONFIG.enemy.minSpeed;
const ENEMY_MAX_SPEED = GAME_CONFIG.enemy.maxSpeed;
const ENEMY_RADIUS = GAME_CONFIG.enemy.radius;

const ENEMY_HIT_SHAKE_TIME = GAME_CONFIG.enemy.hitShakeTime;
const ENEMY_HIT_SHAKE_POWER = GAME_CONFIG.enemy.hitShakePower;

const ENEMY_SPAWN_MIN_INTERVAL = GAME_CONFIG.enemy.spawnMinInterval;
const ENEMY_SPAWN_MAX_INTERVAL = GAME_CONFIG.enemy.spawnMaxInterval;
const ENEMY_SPAWN_LEVEL_GROWTH = GAME_CONFIG.enemy.spawnLevelGrowth;

const ENEMY_B_START_LEVEL = GAME_CONFIG.enemyB.startLevel;
const ENEMY_B_GROUP_SIZE = GAME_CONFIG.enemyB.maxAlive;
const ENEMY_B_HP = GAME_CONFIG.enemyB.hp;
const ENEMY_B_RADIUS = GAME_CONFIG.enemyB.radius;
const ENEMY_B_ENTER_SPEED = GAME_CONFIG.enemyB.enterSpeed;
const ENEMY_B_HOVER_Y_MIN_RATE = GAME_CONFIG.enemyB.hoverYMinRate;
const ENEMY_B_HOVER_Y_MAX_RATE = GAME_CONFIG.enemyB.hoverYMaxRate;
const ENEMY_B_ATTACK_START_DELAY = GAME_CONFIG.enemyB.attackStartDelay;
const ENEMY_B_SHOT_COUNT = GAME_CONFIG.enemyB.shotCount;
const ENEMY_B_SHOT_GAP = GAME_CONFIG.enemyB.shotGap;
const ENEMY_B_ATTACK_COOLDOWN = GAME_CONFIG.enemyB.attackCooldown;
const ENEMY_B_RESPAWN_DELAY = GAME_CONFIG.enemyB.respawnDelay;
const ENEMY_B_MOVE_INTERVAL_MIN = GAME_CONFIG.enemyB.moveIntervalMin;
const ENEMY_B_MOVE_INTERVAL_MAX = GAME_CONFIG.enemyB.moveIntervalMax;
const ENEMY_B_MOVE_SPEED = GAME_CONFIG.enemyB.moveSpeed;
const ENEMY_B_PRE_ATTACK_TIME = GAME_CONFIG.enemyB.preAttackTime;
const ENEMY_B_PRE_ATTACK_PULSES = GAME_CONFIG.enemyB.preAttackPulses;

const LEVEL_NO_SPAWN_TIME = GAME_CONFIG.level.noSpawnTime;

function nextEnemySpawnDelay() {
  const spawnMultiplier = 1 + Math.max(0, level - 1) * ENEMY_SPAWN_LEVEL_GROWTH;
  return rand(ENEMY_SPAWN_MIN_INTERVAL, ENEMY_SPAWN_MAX_INTERVAL) / spawnMultiplier;
}

function spawnEnemy() {
  enemies.push({
    type: "A",
    x: rand(45, W - 45),
    y: -60,
    r: ENEMY_RADIUS,
    hp: ENEMY_HP,
    maxHp: ENEMY_HP,
    speed: rand(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED),
    hitShake: 0
  });
}

function updateEnemySpawn(dt) {
  if (levelNoSpawnTimer > 0) {
    enemySpawnTimer = 0;
    return;
  }

  enemySpawnTimer -= dt;

  if (enemySpawnTimer <= 0) {
    spawnEnemy();
    enemySpawnTimer = nextEnemySpawnDelay();
  }
}

function getAliveEnemyBCount() {
  let count = 0;

  for (let e of enemies) {
    if (!e.dead && e.type === "B") count++;
  }

  return count;
}

function getEnemyBHoverY() {
  return rand(H * ENEMY_B_HOVER_Y_MIN_RATE, H * ENEMY_B_HOVER_Y_MAX_RATE);
}

function getEnemyBHoverX(index, total) {
  if (total <= 1) return rand(60, W - 60);

  const padding = 60;
  const usableW = Math.max(1, W - padding * 2);
  const slotX = padding + usableW * (index + 0.5) / total;
  return clamp(slotX + rand(-22, 22), padding, W - padding);
}

function resetEnemyBMoveTimer(e) {
  e.moveTimer = rand(ENEMY_B_MOVE_INTERVAL_MIN, ENEMY_B_MOVE_INTERVAL_MAX);
}

function setEnemyBMoveTarget(e) {
  e.targetX = rand(60, W - 60);
  e.targetY = getEnemyBHoverY();
  e.moveLockedAngle = e.faceAngle || getEnemyBAimAngle(e);
  e.faceAngle = e.moveLockedAngle;
  e.moving = 1;
}

function spawnEnemyB(index = 0, total = 1) {
  const x = getEnemyBHoverX(index, total);
  const hoverY = getEnemyBHoverY();

  enemies.push({
    type: "B",
    x: x,
    y: -70,
    r: ENEMY_B_RADIUS,
    hp: ENEMY_B_HP,
    maxHp: ENEMY_B_HP,
    speed: ENEMY_B_ENTER_SPEED,
    targetX: x,
    targetY: hoverY,
    state: "enter",
    hitShake: 0,
    attackStartTimer: ENEMY_B_ATTACK_START_DELAY,
    attackCooldownTimer: 0,
    preAttackTimer: 0,
    shotTimer: 0,
    shotsLeft: 0,
    moveTimer: rand(ENEMY_B_MOVE_INTERVAL_MIN, ENEMY_B_MOVE_INTERVAL_MAX),
    moving: 0,
    faceAngle: Math.PI / 2,
    moveLockedAngle: Math.PI / 2,
    lockedAngle: Math.PI / 2,
    burstVx: 0,
    burstVy: ENEMY_BULLET_SPEED
  });
}

function spawnEnemyBGroup() {
  const count = Math.max(1, Math.floor(ENEMY_B_GROUP_SIZE));

  for (let i = 0; i < count; i++) {
    spawnEnemyB(i, count);
  }

  enemyBGroupActive = 1;
}

function updateEnemyBSpawner(dt) {
  if (level < ENEMY_B_START_LEVEL) return;
  if (levelNoSpawnTimer > 0) return;

  const aliveCount = getAliveEnemyBCount();

  if (enemyBGroupActive && aliveCount > 0) return;

  if (enemyBGroupActive && aliveCount <= 0) {
    enemyBGroupActive = 0;
    enemyBRespawnTimer = ENEMY_B_RESPAWN_DELAY;
  }

  enemyBRespawnTimer -= dt;

  if (enemyBRespawnTimer <= 0 && !enemyBGroupActive) {
    spawnEnemyBGroup();
    enemyBRespawnTimer = ENEMY_B_RESPAWN_DELAY;
  }
}

function getEnemyBAimAngle(e) {
  if (!player) return e.faceAngle || Math.PI / 2;
  return Math.atan2(player.y - e.y, player.x - e.x);
}

function lockEnemyBBurstDirection(e) {
  e.lockedAngle = getEnemyBAimAngle(e);
  e.faceAngle = e.lockedAngle;
  e.burstVx = Math.cos(e.lockedAngle) * ENEMY_BULLET_SPEED;
  e.burstVy = Math.sin(e.lockedAngle) * ENEMY_BULLET_SPEED;
}

function updateEnemyBMove(e, dt) {
  if (e.moving) {
    const dx = e.targetX - e.x;
    const dy = e.targetY - e.y;
    const dist = Math.hypot(dx, dy);
    const step = ENEMY_B_MOVE_SPEED * dt;

    if (dist <= step || dist <= 0.001) {
      e.x = e.targetX;
      e.y = e.targetY;
      e.moving = 0;
      resetEnemyBMoveTimer(e);
    } else {
      e.x += dx / dist * step;
      e.y += dy / dist * step;
    }

    return;
  }

  e.moveTimer -= dt;
  if (e.moveTimer <= 0) setEnemyBMoveTarget(e);
}

function startEnemyBPreAttack(e) {
  lockEnemyBBurstDirection(e);
  e.preAttackTimer = ENEMY_B_PRE_ATTACK_TIME;
  e.moving = 0;
}

function updateEnemyB(e, dt) {
  if (e.state === "enter") {
    e.faceAngle = getEnemyBAimAngle(e);
    e.y += e.speed * dt;

    if (e.y >= e.targetY) {
      e.y = e.targetY;
      e.state = "hover";
      e.attackStartTimer = ENEMY_B_ATTACK_START_DELAY;
      e.attackCooldownTimer = 0;
      e.preAttackTimer = 0;
      e.shotTimer = 0;
      e.shotsLeft = 0;
      resetEnemyBMoveTimer(e);
    }

    return;
  }

  const isAttacking = e.preAttackTimer > 0 || e.shotsLeft > 0;
  if (!isAttacking) {
    if (!e.moving) e.faceAngle = getEnemyBAimAngle(e);
    updateEnemyBMove(e, dt);
  }

  if (e.attackStartTimer > 0) {
    e.attackStartTimer -= dt;
    return;
  }

  if (e.preAttackTimer > 0) {
    e.preAttackTimer -= dt;

    if (e.preAttackTimer <= 0) {
      e.preAttackTimer = 0;
      e.shotsLeft = ENEMY_B_SHOT_COUNT;
      e.shotTimer = 0;
    }

    return;
  }

  if (e.shotsLeft > 0) {
    e.shotTimer -= dt;

    while (e.shotsLeft > 0 && e.shotTimer <= 0) {
      shootEnemyBulletAtPlayer(e, e.burstVx, e.burstVy);
      e.shotsLeft--;

      if (e.shotsLeft > 0) {
        e.shotTimer += ENEMY_B_SHOT_GAP;
      } else {
        e.attackCooldownTimer = ENEMY_B_ATTACK_COOLDOWN;
        e.shotTimer = 0;
      }
    }

    return;
  }

  e.attackCooldownTimer -= dt;

  if (e.attackCooldownTimer <= 0) {
    startEnemyBPreAttack(e);
  }
}

function updateEnemyActions(dt) {
  updateEnemyBSpawner(dt);

  for (let e of enemies) {
    if (e.dead) continue;
    if (e.type === "B") updateEnemyB(e, dt);
  }
}

function drawEnemy(e) {
  if (e.type === "B") {
    drawEnemyB(e);
    return;
  }

  const s = e.r / 22;
  let shakeX = 0;
  let shakeY = 0;

  if (e.hitShake > 0) {
    const rate = e.hitShake / ENEMY_HIT_SHAKE_TIME;
    const power = ENEMY_HIT_SHAKE_POWER * rate;
    shakeX = rand(-power, power);
    shakeY = rand(-power * 0.55, power * 0.55);
  }

  ctx.save();
  ctx.translate(e.x + shakeX, e.y + shakeY);

  ctx.fillStyle = "#ff536d";
  ctx.beginPath();
  ctx.moveTo(0, 23 * s);
  ctx.lineTo(-22 * s, -16 * s);
  ctx.lineTo(0, -6 * s);
  ctx.lineTo(22 * s, -16 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffd1d8";
  ctx.beginPath();
  ctx.arc(0, -3 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  drawEnemyHpBar(e, shakeX, shakeY);
}

function getEnemyBCoreScale(e) {
  if (!e.preAttackTimer || e.preAttackTimer <= 0 || ENEMY_B_PRE_ATTACK_TIME <= 0) return 1;

  const progress = 1 - clamp(e.preAttackTimer / ENEMY_B_PRE_ATTACK_TIME, 0, 1);
  const pulse = Math.sin(progress * Math.PI * 2 * ENEMY_B_PRE_ATTACK_PULSES);
  return 1 + Math.max(0, pulse) * 0.55;
}

function drawEnemyB(e) {
  const s = e.r / 24;
  let shakeX = 0;
  let shakeY = 0;

  if (e.hitShake > 0) {
    const rate = e.hitShake / ENEMY_HIT_SHAKE_TIME;
    const power = ENEMY_HIT_SHAKE_POWER * rate;
    shakeX = rand(-power, power);
    shakeY = rand(-power * 0.55, power * 0.55);
  }

  ctx.save();
  ctx.translate(e.x + shakeX, e.y + shakeY);
  ctx.rotate((e.faceAngle || Math.PI / 2) - Math.PI / 2);

  ctx.fillStyle = "#6b7cff";
  ctx.beginPath();
  ctx.moveTo(0, 24 * s);
  ctx.lineTo(-26 * s, 2 * s);
  ctx.lineTo(-15 * s, -22 * s);
  ctx.lineTo(0, -12 * s);
  ctx.lineTo(15 * s, -22 * s);
  ctx.lineTo(26 * s, 2 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d8dcff";
  ctx.fillRect(-10 * s, -5 * s, 20 * s, 11 * s);

  ctx.save();
  const coreScale = getEnemyBCoreScale(e);
  ctx.scale(coreScale, coreScale);
  ctx.fillStyle = "#ffb45c";
  ctx.beginPath();
  ctx.arc(0, 10 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
  drawEnemyHpBar(e, shakeX, shakeY);
}

function drawEnemyHpBar(e, shakeX, shakeY) {
  const barW = e.r * 2.1;
  const barH = 5;
  const hpRate = clamp(e.hp / e.maxHp, 0, 1);

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fillRect(e.x - barW / 2 + shakeX, e.y - e.r - 15 + shakeY, barW, barH);

  ctx.fillStyle = e.type === "B" ? "#95a0ff" : "#8cff7a";
  ctx.fillRect(e.x - barW / 2 + shakeX, e.y - e.r - 15 + shakeY, barW * hpRate, barH);
}