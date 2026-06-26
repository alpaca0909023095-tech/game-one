// 玩家基礎數值從 config.js 讀取。
const FINGER_OFFSET_Y = GAME_CONFIG.player.fingerOffsetY;

const PLAYER_MAX_HP = GAME_CONFIG.player.maxHp;
const PLAYER_RADIUS = GAME_CONFIG.player.radius;
const PLAYER_START_Y_RATE = GAME_CONFIG.player.startYRate;

const PLAYER_FOLLOW_STRENGTH = GAME_CONFIG.player.followStrength;
const PLAYER_FOLLOW_DAMPING = GAME_CONFIG.player.followDamping;

const PLAYER_DAMAGE_ON_HIT = GAME_CONFIG.player.damageOnHit;
const PLAYER_HIT_SHAKE_TIME = GAME_CONFIG.player.hitShakeTime;
const PLAYER_HIT_SHAKE_POWER = GAME_CONFIG.player.hitShakePower;

function createPlayer() {
  const startX = W / 2;
  const startY = H * PLAYER_START_Y_RATE;

  return {
    x: startX,
    y: startY,
    targetX: startX,
    targetY: startY,
    vx: 0,
    vy: 0,
    r: PLAYER_RADIUS,
    hp: PLAYER_MAX_HP,
    invincible: 0,
    skillFlash: 0,
    skillLock: 0,
    hitShake: 0
  };
}

function triggerPlayerHitShake() {
  if (!player) return;
  player.hitShake = PLAYER_HIT_SHAKE_TIME;
}

function setPlayerTarget(clientX, clientY) {
  if (!running) return;

  const targetX = clientX;
  const targetY = clientY - FINGER_OFFSET_Y;

  player.targetX = clamp(targetX, player.r, W - player.r);
  player.targetY = clamp(targetY, player.r + 55, H - player.r);
}

function updatePlayerMovement(dt) {
  const dx = player.targetX - player.x;
  const dy = player.targetY - player.y;

  player.vx += dx * PLAYER_FOLLOW_STRENGTH * dt;
  player.vy += dy * PLAYER_FOLLOW_STRENGTH * dt;

  const damping = Math.exp(-PLAYER_FOLLOW_DAMPING * dt);
  player.vx *= damping;
  player.vy *= damping;

  player.x += player.vx * dt;
  player.y += player.vy * dt;

  if (player.x < player.r) {
    player.x = player.r;
    player.vx = 0;
  }
  if (player.x > W - player.r) {
    player.x = W - player.r;
    player.vx = 0;
  }
  if (player.y < player.r + 55) {
    player.y = player.r + 55;
    player.vy = 0;
  }
  if (player.y > H - player.r) {
    player.y = H - player.r;
    player.vy = 0;
  }
}

function updateHpBar() {
  const hpRate = clamp(player.hp / PLAYER_MAX_HP, 0, 1);
  hpBar.style.width = (hpRate * 100) + "%";

  if (hpRate > 0.55) {
    hpBar.style.background = "linear-gradient(90deg, #50ff8d, #d9ff63)";
  } else if (hpRate > 0.25) {
    hpBar.style.background = "linear-gradient(90deg, #ffe066, #ff9f43)";
  } else {
    hpBar.style.background = "linear-gradient(90deg, #ff4d6d, #ff1f1f)";
  }
}

function drawPlayer() {
  if (!player) return;

  let skillRate = 0;
  let scale = 1;
  let shakeX = 0;
  let shakeY = 0;

  if (player.skillFlash > 0) {
    skillRate = player.skillFlash / SKILL_FLASH_TIME;
    scale = 1 + Math.sin(skillRate * Math.PI) * 0.28;

    const shakePower = SKILL_PLAYER_SHAKE_POWER * skillRate;
    shakeX += rand(-shakePower * 1.65, shakePower * 1.65);
    shakeY += rand(-shakePower * 0.38, shakePower * 0.38);
  }

  if (player.hitShake > 0) {
    const hitRate = clamp(player.hitShake / PLAYER_HIT_SHAKE_TIME, 0, 1);
    const hitPower = PLAYER_HIT_SHAKE_POWER * hitRate;
    shakeX += rand(-hitPower, hitPower);
    shakeY += rand(-hitPower * 0.45, hitPower * 0.45);
  }

  const invincibleBlink = player.invincible > 0 && Math.floor(performance.now() / 80) % 2 === 0;
  const mainColor = player.skillFlash > 0 ? "#fff6a8" : "#5dffb0";
  const bodyColor = player.skillFlash > 0 ? "#ffffff" : "#d8fff0";
  const coreColor = player.skillFlash > 0 ? "rgba(255,255,180,0.95)" : "rgba(100,220,255,0.85)";

  ctx.save();
  ctx.globalAlpha = invincibleBlink ? 0.45 : 1;
  ctx.translate(player.x + shakeX, player.y + shakeY);
  ctx.scale(scale, scale);

  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(-32, 24);
  ctx.lineTo(-10, 14);
  ctx.lineTo(0, 26);
  ctx.lineTo(10, 14);
  ctx.lineTo(32, 24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.lineTo(-10, 10);
  ctx.lineTo(10, 10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = coreColor;
  ctx.beginPath();
  ctx.arc(0, 7, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = player.skillFlash > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-28, 20);
  ctx.lineTo(-8, 8);
  ctx.moveTo(28, 20);
  ctx.lineTo(8, 8);
  ctx.stroke();

  ctx.restore();
}