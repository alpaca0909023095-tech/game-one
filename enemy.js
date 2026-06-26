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

const LEVEL_NO_SPAWN_TIME = GAME_CONFIG.level.noSpawnTime;

function nextEnemySpawnDelay() {
  const spawnMultiplier = 1 + Math.max(0, level - 1) * ENEMY_SPAWN_LEVEL_GROWTH;
  return rand(ENEMY_SPAWN_MIN_INTERVAL, ENEMY_SPAWN_MAX_INTERVAL) / spawnMultiplier;
}

function spawnEnemy() {
  const x = rand(45, W - 45);

  enemies.push({
    x: x,
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

function drawEnemy(e) {
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

  const barW = e.r * 2.1;
  const barH = 5;
  const hpRate = e.hp / e.maxHp;

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fillRect(e.x - barW / 2 + shakeX, e.y - e.r - 15 + shakeY, barW, barH);

  ctx.fillStyle = "#8cff7a";
  ctx.fillRect(e.x - barW / 2 + shakeX, e.y - e.r - 15 + shakeY, barW * hpRate, barH);
}


