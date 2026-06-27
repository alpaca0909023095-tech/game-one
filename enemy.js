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
const ENEMY_B_GROUP_SPAWN_GAP = GAME_CONFIG.enemyB.groupSpawnGap;
const ENEMY_B_GROUP_SIZE_GROWTH_INTERVAL = GAME_CONFIG.enemyB.groupSizeGrowthInterval;
const ENEMY_B_GROUP_SIZE_GROWTH_AMOUNT = GAME_CONFIG.enemyB.groupSizeGrowthAmount;
const ENEMY_B_CORE_RADIUS = GAME_CONFIG.enemyB.coreRadius;
const ENEMY_B_PRE_ATTACK_PULSE_SCALE = GAME_CONFIG.enemyB.preAttackPulseScale;

const ENEMY_C_START_LEVEL = GAME_CONFIG.enemyC.startLevel;
const ENEMY_C_HP = GAME_CONFIG.enemyC.hp;
const ENEMY_C_RADIUS = GAME_CONFIG.enemyC.radius;
const ENEMY_C_SPEED = GAME_CONFIG.enemyC.speed;
const ENEMY_C_DAMAGE_ON_HIT = GAME_CONFIG.enemyC.damageOnHit;
const ENEMY_C_COLUMN_COUNT = GAME_CONFIG.enemyC.columnCount;
const ENEMY_C_UNIT_GAP = GAME_CONFIG.enemyC.unitGap;
const ENEMY_C_GROUP_COLUMNS = GAME_CONFIG.enemyC.groupColumns;
const ENEMY_C_GROUP_COLUMNS_GROWTH_INTERVAL = GAME_CONFIG.enemyC.groupColumnsGrowthInterval;
const ENEMY_C_GROUP_COLUMNS_GROWTH_AMOUNT = GAME_CONFIG.enemyC.groupColumnsGrowthAmount;
const ENEMY_C_COLUMN_GAP = GAME_CONFIG.enemyC.columnGap;
const ENEMY_C_GROUP_COOLDOWN = GAME_CONFIG.enemyC.groupCooldown;
const ENEMY_C_SPAWN_SIDE_OFFSET = GAME_CONFIG.enemyC.spawnSideOffset;
const ENEMY_C_SPAWN_Y_MIN_RATE = GAME_CONFIG.enemyC.spawnYMinRate;
const ENEMY_C_SPAWN_Y_MAX_RATE = GAME_CONFIG.enemyC.spawnYMaxRate;
const ENEMY_C_RANDOM_ANGLE_RANGE = GAME_CONFIG.enemyC.randomAngleRange;
const ENEMY_C_TURN_TRIGGER_RADIUS_RATE = GAME_CONFIG.enemyC.turnTriggerRadiusRate;
const ENEMY_C_TURN_STRENGTH = GAME_CONFIG.enemyC.turnStrength;
const ENEMY_C_MAX_TURN_RATE = GAME_CONFIG.enemyC.maxTurnRate;
const ENEMY_C_MAX_TURN_ANGLE = GAME_CONFIG.enemyC.maxTurnAngle;
const ENEMY_C_CORE_RADIUS = GAME_CONFIG.enemyC.coreRadius;
const ENEMY_C_CORE_PULSE_SPEED = GAME_CONFIG.enemyC.corePulseSpeed;
const ENEMY_C_CORE_PULSE_SCALE = GAME_CONFIG.enemyC.corePulseScale;

const BOSS_A_EVERY_LEVELS = GAME_CONFIG.bossA.everyLevels;
const BOSS_A_HP = GAME_CONFIG.bossA.hp;
const BOSS_A_RADIUS = GAME_CONFIG.bossA.radius;
const BOSS_A_ENTER_SPEED = GAME_CONFIG.bossA.enterSpeed;
const BOSS_A_HOVER_Y_RATE = GAME_CONFIG.bossA.hoverYRate;
const BOSS_A_HOVER_DELAY = GAME_CONFIG.bossA.hoverDelay;
const BOSS_A_STATE_HOVER_DELAY = GAME_CONFIG.bossA.stateHoverDelay;
const BOSS_A_MOVE_SPEED = GAME_CONFIG.bossA.moveSpeed;
const BOSS_A_MOVE_Y_MIN_RATE = GAME_CONFIG.bossA.moveYMinRate;
const BOSS_A_MOVE_Y_MAX_RATE = GAME_CONFIG.bossA.moveYMaxRate;
const BOSS_A_MOVE_X_MARGIN = GAME_CONFIG.bossA.moveXMargin;
const BOSS_A_RING_BULLET_COUNT = GAME_CONFIG.bossA.ringBulletCount;
const BOSS_A_RING_COUNT = GAME_CONFIG.bossA.ringCount;
const BOSS_A_RING_INTERVAL = GAME_CONFIG.bossA.ringInterval;
const BOSS_A_SPREAD_BULLET_COUNT = GAME_CONFIG.bossA.spreadBulletCount;
const BOSS_A_SPREAD_ANGLE = GAME_CONFIG.bossA.spreadAngle;
const BOSS_A_SPREAD_ROUNDS = GAME_CONFIG.bossA.spreadRounds;
const BOSS_A_SPREAD_INTERVAL = GAME_CONFIG.bossA.spreadInterval;
const BOSS_A_SPREAD_BULLET_SPEED = GAME_CONFIG.bossA.spreadBulletSpeed;
const BOSS_A_SPREAD_BULLET_DAMAGE = GAME_CONFIG.bossA.spreadBulletDamage;
const BOSS_A_BULLET_SPEED = GAME_CONFIG.bossA.bulletSpeed;
const BOSS_A_BULLET_DAMAGE = GAME_CONFIG.bossA.bulletDamage;
const BOSS_A_BULLET_RADIUS = GAME_CONFIG.bossA.bulletRadius;
const BOSS_A_BULLET_WIDTH = GAME_CONFIG.bossA.bulletWidth;
const BOSS_A_BULLET_HEIGHT = GAME_CONFIG.bossA.bulletHeight;
const BOSS_A_BULLET_LIFE = GAME_CONFIG.bossA.bulletLife;
const BOSS_A_HP_MULTIPLIER_PER_APPEARANCE = GAME_CONFIG.bossA.hpMultiplierPerAppearance;
const BOSS_A_COIN_REWARD = GAME_CONFIG.bossA.coinReward;
const ENEMY_GOLD_HP_MULTIPLIER = GAME_CONFIG.reward.goldHpMultiplier;

const ENEMY_COIN_REWARD_A = GAME_CONFIG.reward.coinPerEnemyA;
const ENEMY_COIN_REWARD_B = GAME_CONFIG.reward.coinPerEnemyB;
const ENEMY_COIN_REWARD_C = GAME_CONFIG.reward.coinPerEnemyC;
const ENEMY_GOLD_CHANCE_A = GAME_CONFIG.reward.goldEnemyChanceA;
const ENEMY_GOLD_CHANCE_B = GAME_CONFIG.reward.goldEnemyChanceB;
const ENEMY_GOLD_CHANCE_C = GAME_CONFIG.reward.goldEnemyChanceC;
const ENEMY_GOLD_MULTIPLIER = GAME_CONFIG.reward.goldEnemyMultiplier;
const ENEMY_GOLD_STROKE_COLOR = GAME_CONFIG.reward.goldStrokeColor;
const ENEMY_GOLD_STROKE_WIDTH = GAME_CONFIG.reward.goldStrokeWidth;
const ENEMY_GOLD_PULSE_SPEED = GAME_CONFIG.reward.goldPulseSpeed;
const ENEMY_GOLD_PULSE_SCALE = GAME_CONFIG.reward.goldPulseScale;
const ENEMY_GOLD_GLOW_BLUR = GAME_CONFIG.reward.goldGlowBlur;


function rollGoldEnemy(type) {
  let chance = ENEMY_GOLD_CHANCE_A;
  if (type === "B") chance = ENEMY_GOLD_CHANCE_B;
  if (type === "C") chance = ENEMY_GOLD_CHANCE_C;
  return Math.random() < chance ? 1 : 0;
}

function getEnemyBaseCoinReward(type) {
  if (type === "B") return ENEMY_COIN_REWARD_B;
  if (type === "C") return ENEMY_COIN_REWARD_C;
  return ENEMY_COIN_REWARD_A;
}

function getEnemyCoinReward(type, isGold) {
  const baseReward = getEnemyBaseCoinReward(type);
  return Math.max(0, Math.floor(baseReward * (isGold ? ENEMY_GOLD_MULTIPLIER : 1)));
}

function getEnemyHp(baseHp, isGold) {
  const hpMultiplier = isGold ? ENEMY_GOLD_HP_MULTIPLIER : 1;
  return Math.max(1, Math.round(baseHp * hpMultiplier));
}
function nextEnemySpawnDelay() {
  const spawnMultiplier = 1 + Math.max(0, level - 1) * ENEMY_SPAWN_LEVEL_GROWTH;
  return rand(ENEMY_SPAWN_MIN_INTERVAL, ENEMY_SPAWN_MAX_INTERVAL) / spawnMultiplier;
}

function spawnEnemy() {
  const gold = rollGoldEnemy("A");
  const hp = getEnemyHp(ENEMY_HP, gold);

  enemies.push({
    type: "A",
    gold: gold,
    coinReward: getEnemyCoinReward("A", gold),
    x: rand(45, W - 45),
    y: -60,
    r: ENEMY_RADIUS,
    hp: hp,
    maxHp: hp,
    speed: rand(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED),
    hitShake: 0
  });
}

function updateEnemySpawn(dt) {
  if (!canSpawnEnemyType("A")) {
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
  const gold = rollGoldEnemy("B");
  const hp = getEnemyHp(ENEMY_B_HP, gold);
  const x = getEnemyBHoverX(index, total);
  const hoverY = getEnemyBHoverY();

  enemies.push({
    type: "B",
    gold: gold,
    coinReward: getEnemyCoinReward("B", gold),
    x: x,
    y: -70,
    r: ENEMY_B_RADIUS,
    hp: hp,
    maxHp: hp,
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

function getEnemyCSpawnX(side) {
  return side === "left" ? -ENEMY_C_SPAWN_SIDE_OFFSET : W + ENEMY_C_SPAWN_SIDE_OFFSET;
}

function getEnemyCSpawnY() {
  return rand(H * ENEMY_C_SPAWN_Y_MIN_RATE, H * ENEMY_C_SPAWN_Y_MAX_RATE);
}

function normalizeAngleDiff(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function getEnemyCInitialAngle(side) {
  const baseAngle = side === "left" ? 0 : Math.PI;
  return baseAngle + rand(-ENEMY_C_RANDOM_ANGLE_RANGE, ENEMY_C_RANDOM_ANGLE_RANGE);
}

function getEnemyCPath(side) {
  const startX = getEnemyCSpawnX(side);
  const startY = getEnemyCSpawnY();
  const angle = getEnemyCInitialAngle(side);

  return {
    x: startX,
    y: startY,
    angle: angle,
    t: 0,
    turnTriggered: 0,
    turnedAmount: 0,
    targetX: 0,
    targetY: 0,
    history: [{ t: 0, x: startX, y: startY, angle: angle }]
  };
}

function updateEnemyCPath(path, dt) {
  if (!path || path.done) return;

  if (!path.turnTriggered && player) {
    const triggerRadius = W * ENEMY_C_TURN_TRIGGER_RADIUS_RATE;
    if (distance(path.x, path.y, player.x, player.y) <= triggerRadius) {
      path.turnTriggered = 1;
      path.targetX = player.x;
      path.targetY = player.y;
    }
  }

  if (path.turnTriggered && path.turnedAmount < ENEMY_C_MAX_TURN_ANGLE) {
    const desiredAngle = Math.atan2(path.targetY - path.y, path.targetX - path.x);
    const diff = normalizeAngleDiff(desiredAngle - path.angle);
    const maxStep = ENEMY_C_MAX_TURN_RATE * dt;
    let step = clamp(diff * ENEMY_C_TURN_STRENGTH * dt, -maxStep, maxStep);
    const remain = ENEMY_C_MAX_TURN_ANGLE - path.turnedAmount;

    if (Math.abs(step) > remain) step = Math.sign(step) * remain;
    path.angle += step;
    path.turnedAmount += Math.abs(step);
  }

  path.x += Math.cos(path.angle) * ENEMY_C_SPEED * dt;
  path.y += Math.sin(path.angle) * ENEMY_C_SPEED * dt;
  path.t += dt;
  path.history.push({ t: path.t, x: path.x, y: path.y, angle: path.angle });

  if (path.x < -140 || path.x > W + 140 || path.y < -140 || path.y > H + 140) {
    path.done = 1;
  }
}

function sampleEnemyCPath(path, age) {
  if (!path || !path.history || path.history.length <= 0) return null;

  const history = path.history;
  if (age <= 0) return history[0];
  if (age >= history[history.length - 1].t) return history[history.length - 1];

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1];
    const next = history[i];
    if (age <= next.t) {
      const rate = clamp((age - prev.t) / Math.max(0.001, next.t - prev.t), 0, 1);
      const angle = prev.angle + normalizeAngleDiff(next.angle - prev.angle) * rate;
      return {
        x: prev.x + (next.x - prev.x) * rate,
        y: prev.y + (next.y - prev.y) * rate,
        angle: angle
      };
    }
  }

  return history[history.length - 1];
}

function spawnEnemyCUnit(path) {
  const gold = rollGoldEnemy("C");
  const hp = getEnemyHp(ENEMY_C_HP, gold);
  const start = sampleEnemyCPath(path, 0) || path;

  enemies.push({
    type: "C",
    gold: gold,
    coinReward: getEnemyCoinReward("C", gold),
    x: start.x,
    y: start.y,
    r: ENEMY_C_RADIUS,
    hp: hp,
    maxHp: hp,
    speed: ENEMY_C_SPEED,
    path: path,
    pathAge: 0,
    angle: start.angle,
    damageOnHit: ENEMY_C_DAMAGE_ON_HIT,
    hitShake: 0
  });
}

function createEnemyCColumnQueue(index, firstSide) {
  const side = index % 2 === 0 ? firstSide : (firstSide === "left" ? "right" : "left");

  return {
    side: side,
    startTimer: index * ENEMY_C_COLUMN_GAP,
    unitTimer: 0,
    unitsLeft: ENEMY_C_COLUMN_COUNT,
    path: null
  };
}

function getEnemyCGroupColumns() {
  const growthInterval = Math.max(1, ENEMY_C_GROUP_COLUMNS_GROWTH_INTERVAL || 1);
  const levelStep = Math.floor(Math.max(0, level - ENEMY_C_START_LEVEL) / growthInterval);
  const levelBonus = levelStep * ENEMY_C_GROUP_COLUMNS_GROWTH_AMOUNT;
  return Math.max(1, Math.floor(ENEMY_C_GROUP_COLUMNS + levelBonus));
}

function startEnemyCGroup() {
  enemyCGroupActive = 1;
  enemyCGroupFirstSide = Math.random() < 0.5 ? "left" : "right";
  enemyCColumnQueues = [];

  const groupColumns = getEnemyCGroupColumns();
  for (let i = 0; i < groupColumns; i++) {
    enemyCColumnQueues.push(createEnemyCColumnQueue(i, enemyCGroupFirstSide));
  }
}

function updateEnemyCSpawner(dt) {
  if (level < ENEMY_C_START_LEVEL) return;
  if (!canSpawnEnemyType("C")) return;

  if (!enemyCGroupActive) {
    enemyCGroupTimer -= dt;
    if (enemyCGroupTimer <= 0) startEnemyCGroup();
    return;
  }

  for (let queue of enemyCColumnQueues) {
    if (queue.done) continue;

    if (queue.startTimer > 0) {
      queue.startTimer -= dt;
      if (queue.startTimer > 0) continue;
    }

    if (!queue.path) queue.path = getEnemyCPath(queue.side);

    queue.unitTimer -= dt;
    while (queue.unitsLeft > 0 && queue.unitTimer <= 0) {
      spawnEnemyCUnit(queue.path);
      queue.unitsLeft--;
      queue.unitTimer += ENEMY_C_UNIT_GAP;
    }

    if (queue.unitsLeft <= 0) queue.done = 1;
  }

  enemyCColumnQueues = enemyCColumnQueues.filter(queue => !queue.done);

  if (enemyCColumnQueues.length <= 0) {
    enemyCGroupActive = 0;
    enemyCGroupTimer = ENEMY_C_GROUP_COOLDOWN;
  }
}

function updateEnemyCSharedPaths(dt) {
  const paths = [];

  for (let queue of enemyCColumnQueues) {
    if (queue.path && paths.indexOf(queue.path) < 0) paths.push(queue.path);
  }

  for (let e of enemies) {
    if (!e.dead && e.type === "C" && e.path && paths.indexOf(e.path) < 0) paths.push(e.path);
  }

  for (let path of paths) {
    updateEnemyCPath(path, dt);
  }
}

function updateEnemyC(e, dt) {
  e.pathAge += dt;
  const point = sampleEnemyCPath(e.path, e.pathAge);

  if (point) {
    e.x = point.x;
    e.y = point.y;
    e.angle = point.angle;
  }

  if (e.x < -120 || e.x > W + 120 || e.y < -120 || e.y > H + 120) {
    e.dead = 1;
  }
}
function getEnemyBGroupSize() {
  const growthInterval = Math.max(1, ENEMY_B_GROUP_SIZE_GROWTH_INTERVAL || 1);
  const levelStep = Math.floor(Math.max(0, level - ENEMY_B_START_LEVEL) / growthInterval);
  const levelBonus = levelStep * ENEMY_B_GROUP_SIZE_GROWTH_AMOUNT;
  return Math.max(1, Math.floor(ENEMY_B_GROUP_SIZE + levelBonus));
}

function startEnemyBGroupSpawn() {
  enemyBGroupSpawnTotal = getEnemyBGroupSize();
  enemyBGroupSpawnLeft = enemyBGroupSpawnTotal;
  enemyBGroupSpawnIndex = 0;
  enemyBGroupSpawnTimer = 0;
  enemyBGroupActive = 1;
}

function updateEnemyBGroupSpawn(dt) {
  if (enemyBGroupSpawnLeft <= 0) return;

  enemyBGroupSpawnTimer -= dt;
  if (enemyBGroupSpawnTimer > 0) return;

  spawnEnemyB(enemyBGroupSpawnIndex, enemyBGroupSpawnTotal);
  enemyBGroupSpawnIndex++;
  enemyBGroupSpawnLeft--;
  enemyBGroupSpawnTimer = ENEMY_B_GROUP_SPAWN_GAP;
}

function updateEnemyBSpawner(dt) {
  if (level < ENEMY_B_START_LEVEL) return;
  if (!canSpawnEnemyType("B")) return;

  if (enemyBGroupActive) {
    updateEnemyBGroupSpawn(dt);

    const aliveCount = getAliveEnemyBCount();
    if (aliveCount > 0 || enemyBGroupSpawnLeft > 0) return;

    enemyBGroupActive = 0;
    enemyBRespawnTimer = ENEMY_B_RESPAWN_DELAY;
  }

  enemyBRespawnTimer -= dt;

  if (enemyBRespawnTimer <= 0 && !enemyBGroupActive) {
    startEnemyBGroupSpawn();
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

function getBossAAppearanceIndex() {
  return Math.max(0, Math.floor(level / Math.max(1, BOSS_A_EVERY_LEVELS)) - 1);
}

function getBossAHp() {
  return Math.max(1, Math.round(BOSS_A_HP * Math.pow(BOSS_A_HP_MULTIPLIER_PER_APPEARANCE, getBossAAppearanceIndex())));
}

function spawnBossA() {
  const hp = getBossAHp();

  enemies.push({
    type: "BossA",
    boss: 1,
    x: W / 2,
    y: -BOSS_A_RADIUS - 30,
    r: BOSS_A_RADIUS,
    hp: hp,
    maxHp: hp,
    coinReward: BOSS_A_COIN_REWARD,
    speed: 0,
    state: "enter",
    stateTimer: 0,
    targetX: W / 2,
    targetY: H * BOSS_A_HOVER_Y_RATE,
    ringTimer: 0,
    ringsLeft: 0,
    hitShake: 0
  });
}

function startBossAStateHover(e) {
  e.state = "stateHover";
  e.stateTimer = BOSS_A_STATE_HOVER_DELAY;
}

function chooseBossAState(e) {
  const roll = Math.floor(rand(0, 3));

  if (roll === 0) {
    e.state = "ring";
    e.ringsLeft = BOSS_A_RING_COUNT;
    e.ringTimer = 0;
    e.ringStartAngle = 0;
    return;
  }

  if (roll === 1) {
    e.state = "move";
    e.targetX = rand(BOSS_A_MOVE_X_MARGIN, W - BOSS_A_MOVE_X_MARGIN);
    e.targetY = rand(H * BOSS_A_MOVE_Y_MIN_RATE, H * BOSS_A_MOVE_Y_MAX_RATE);
    return;
  }

  e.state = "spread";
  e.spreadRoundsLeft = BOSS_A_SPREAD_ROUNDS;
  e.spreadTimer = 0;
}

function pushBossABullet(e, angle, speed, damage) {
  enemyBullets.push({
    team: "enemy",
    x: e.x,
    y: e.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: BOSS_A_BULLET_RADIUS,
    w: BOSS_A_BULLET_WIDTH,
    h: BOSS_A_BULLET_HEIGHT,
    damage: damage,
    color: ENEMY_BULLET_COLOR,
    life: BOSS_A_BULLET_LIFE,
    dead: 0
  });
}

function shootBossARing(e) {
  const count = Math.max(1, Math.floor(BOSS_A_RING_BULLET_COUNT));
  const startAngle = e.ringStartAngle || 0;

  for (let i = 0; i < count; i++) {
    const angle = startAngle + Math.PI * 2 * i / count;
    pushBossABullet(e, angle, BOSS_A_BULLET_SPEED, BOSS_A_BULLET_DAMAGE);
  }
}

function shootBossASpread(e) {
  const count = Math.max(1, Math.floor(BOSS_A_SPREAD_BULLET_COUNT));
  const aim = player ? Math.atan2(player.y - e.y, player.x - e.x) : Math.PI / 2;
  const start = aim - BOSS_A_SPREAD_ANGLE / 2;
  const step = count <= 1 ? 0 : BOSS_A_SPREAD_ANGLE / (count - 1);

  for (let i = 0; i < count; i++) {
    pushBossABullet(e, start + step * i, BOSS_A_SPREAD_BULLET_SPEED, BOSS_A_SPREAD_BULLET_DAMAGE);
  }
}

function updateBossA(e, dt) {
  if (e.state === "enter") {
    e.y += BOSS_A_ENTER_SPEED * dt;

    if (e.y >= e.targetY) {
      e.y = e.targetY;
      e.state = "hover";
      e.stateTimer = BOSS_A_HOVER_DELAY;
    }

    return;
  }

  if (e.state === "hover" || e.state === "stateHover") {
    e.stateTimer -= dt;
    if (e.stateTimer <= 0) chooseBossAState(e);
    return;
  }

  if (e.state === "ring") {
    e.ringTimer -= dt;

    while (e.ringsLeft > 0 && e.ringTimer <= 0) {
      shootBossARing(e);
      e.ringsLeft--;
      e.ringTimer += BOSS_A_RING_INTERVAL;
    }

    if (e.ringsLeft <= 0) startBossAStateHover(e);
    return;
  }

  if (e.state === "move") {
    const dx = e.targetX - e.x;
    const dy = e.targetY - e.y;
    const d = Math.hypot(dx, dy);

    if (d <= Math.max(4, BOSS_A_MOVE_SPEED * dt)) {
      e.x = e.targetX;
      e.y = e.targetY;
      startBossAStateHover(e);
    } else {
      e.x += dx / d * BOSS_A_MOVE_SPEED * dt;
      e.y += dy / d * BOSS_A_MOVE_SPEED * dt;
    }

    return;
  }

  if (e.state === "spread") {
    e.spreadTimer -= dt;

    while (e.spreadRoundsLeft > 0 && e.spreadTimer <= 0) {
      shootBossASpread(e);
      e.spreadRoundsLeft--;
      e.spreadTimer += BOSS_A_SPREAD_INTERVAL;
    }

    if (e.spreadRoundsLeft <= 0) startBossAStateHover(e);
  }
}
function updateEnemyActions(dt) {
  updateEnemyBSpawner(dt);
  updateEnemyCSpawner(dt);
  updateEnemyCSharedPaths(dt);

  for (let e of enemies) {
    if (e.dead) continue;
    if (e.type === "B") updateEnemyB(e, dt);
    if (e.type === "C") updateEnemyC(e, dt);
    if (e.type === "BossA") updateBossA(e, dt);
  }
}

function getGoldEnemyPulse() {
  return 0.5 + Math.sin(performance.now() / 1000 * ENEMY_GOLD_PULSE_SPEED) * 0.5;
}

function drawGoldEnemyOutline(scale = 1) {
  const pulse = getGoldEnemyPulse();

  ctx.save();
  ctx.scale(1 + pulse * ENEMY_GOLD_PULSE_SCALE, 1 + pulse * ENEMY_GOLD_PULSE_SCALE);
  ctx.strokeStyle = ENEMY_GOLD_STROKE_COLOR;
  ctx.lineWidth = ENEMY_GOLD_STROKE_WIDTH * scale;
  ctx.shadowColor = ENEMY_GOLD_STROKE_COLOR;
  ctx.shadowBlur = ENEMY_GOLD_GLOW_BLUR * (0.35 + pulse * 0.65) * scale;
  ctx.globalAlpha = 0.78 + pulse * 0.22;
  ctx.stroke();
  ctx.restore();
}
function drawEnemy(e) {
  if (e.type === "BossA") {
    drawBossA(e);
    return;
  }

  if (e.type === "B") {
    drawEnemyB(e);
    return;
  }

  if (e.type === "C") {
    drawEnemyC(e);
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

  if (e.gold) drawGoldEnemyOutline(s);


  ctx.fillStyle = "#ffd1d8";
  ctx.beginPath();
  ctx.arc(0, -3 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  drawEnemyHpBar(e, shakeX, shakeY);
}

function drawEnemyC(e) {
  const s = e.r / 12;
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
  ctx.rotate((e.angle || Math.PI / 2) - Math.PI / 2);

  ctx.fillStyle = "#4b1232";
  ctx.beginPath();
  ctx.moveTo(0, 18 * s);
  ctx.lineTo(-13 * s, -13 * s);
  ctx.lineTo(0, -8 * s);
  ctx.lineTo(13 * s, -13 * s);
  ctx.closePath();
  ctx.fill();

  if (e.gold) drawGoldEnemyOutline(s);


  ctx.fillStyle = "#2a061d";
  ctx.fillRect(-4 * s, -4 * s, 8 * s, 12 * s);

  const pulse = 1 + (0.5 + Math.sin(performance.now() / 1000 * ENEMY_C_CORE_PULSE_SPEED) * 0.5) * ENEMY_C_CORE_PULSE_SCALE;
  ctx.save();
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#ff2b3d";
  ctx.shadowColor = "#ff2442";
  ctx.shadowBlur = 10 * s;
  ctx.beginPath();
  ctx.arc(0, 4 * s, ENEMY_C_CORE_RADIUS * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
  drawEnemyHpBar(e, shakeX, shakeY);
}

function getEnemyBCoreScale(e) {
  if (!e.preAttackTimer || e.preAttackTimer <= 0 || ENEMY_B_PRE_ATTACK_TIME <= 0) return 1;

  const progress = 1 - clamp(e.preAttackTimer / ENEMY_B_PRE_ATTACK_TIME, 0, 1);
  const pulse = Math.sin(progress * Math.PI * 2 * ENEMY_B_PRE_ATTACK_PULSES);
  return 1 + Math.max(0, pulse) * ENEMY_B_PRE_ATTACK_PULSE_SCALE;
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

  if (e.gold) drawGoldEnemyOutline(s);


  ctx.fillStyle = "#d8dcff";
  ctx.fillRect(-10 * s, -5 * s, 20 * s, 11 * s);

  ctx.save();
  const coreScale = getEnemyBCoreScale(e);
  ctx.scale(coreScale, coreScale);
  ctx.fillStyle = "#ffb45c";
  ctx.beginPath();
  ctx.arc(0, 10 * s, ENEMY_B_CORE_RADIUS * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
  drawEnemyHpBar(e, shakeX, shakeY);
}

function drawBossA(e) {
  let shakeX = 0;
  let shakeY = 0;

  if (e.hitShake > 0) {
    const rate = e.hitShake / ENEMY_HIT_SHAKE_TIME;
    const power = ENEMY_HIT_SHAKE_POWER * rate;
    shakeX = rand(-power, power);
    shakeY = rand(-power * 0.55, power * 0.55);
  }

  const pulse = 0.5 + Math.sin(performance.now() / 1000 * 3.2) * 0.5;
  const s = e.r / 42;

  ctx.save();
  ctx.translate(e.x + shakeX, e.y + shakeY);
  ctx.fillStyle = "#7f2048";
  ctx.beginPath();
  ctx.moveTo(0, 44 * s);
  ctx.lineTo(-46 * s, 10 * s);
  ctx.lineTo(-34 * s, -34 * s);
  ctx.lineTo(0, -48 * s);
  ctx.lineTo(34 * s, -34 * s);
  ctx.lineTo(46 * s, 10 * s);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#ff6b8d";
  ctx.lineWidth = 3 * s;
  ctx.stroke();

  ctx.fillStyle = "#ffb25c";
  ctx.shadowColor = "#ff8a3d";
  ctx.shadowBlur = 12 * s;
  ctx.beginPath();
  ctx.arc(0, 8 * s, (11 + pulse * 4) * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffe0ec";
  ctx.fillRect(-18 * s, -12 * s, 36 * s, 12 * s);
  ctx.restore();

  drawEnemyHpBar(e, shakeX, shakeY);
}
function drawEnemyHpBar(e, shakeX, shakeY) {
  const barW = e.r * 2.1;
  const barH = 5;
  const hpRate = clamp(e.hp / e.maxHp, 0, 1);
  const barY = e.y - e.r - 15 + shakeY;

  ctx.fillStyle = e.gold ? "rgba(255,210,74,0.24)" : "rgba(255,255,255,0.25)";
  ctx.fillRect(e.x - barW / 2 + shakeX, barY, barW, barH);

  ctx.fillStyle = e.gold ? ENEMY_GOLD_STROKE_COLOR : (e.type === "B" ? "#95a0ff" : (e.type === "C" ? "#ffe36d" : "#8cff7a"));
  ctx.fillRect(e.x - barW / 2 + shakeX, barY, barW * hpRate, barH);
}





