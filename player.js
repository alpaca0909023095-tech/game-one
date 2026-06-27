// 玩家基礎數值從 config.js 讀取。
const PLAYER_MAX_HP = GAME_CONFIG.player.maxHp;
const PLAYER_RADIUS = GAME_CONFIG.player.radius;
const PLAYER_MODEL_SCALE = GAME_CONFIG.player.modelScale;
const PLAYER_START_Y_RATE = GAME_CONFIG.player.startYRate;

const PLAYER_DAMAGE_ON_HIT = GAME_CONFIG.player.damageOnHit;
const PLAYER_HIT_SHAKE_TIME = GAME_CONFIG.player.hitShakeTime;
const PLAYER_HIT_SHAKE_POWER = GAME_CONFIG.player.hitShakePower;

function createPlayer() {
  const startX = W / 2;
  const startY = H * PLAYER_START_Y_RATE;

  return {
    x: startX,
    y: startY,
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


function movePlayerTargetBy(deltaX, deltaY) {
  if (!running) return;

  player.x = clamp(player.x + deltaX, player.r, W - player.r);
  player.y = clamp(player.y + deltaY, player.r + 55, H - player.r);
}

function updatePlayerMovement(dt) {
  player.x = clamp(player.x, player.r, W - player.r);
  player.y = clamp(player.y, player.r + 55, H - player.r);
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
  ctx.scale(scale * PLAYER_MODEL_SCALE, scale * PLAYER_MODEL_SCALE);

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



