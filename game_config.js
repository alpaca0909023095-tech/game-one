// 遊戲基礎數值設定檔（目前遊戲實際讀取這個檔案）
// 修改此檔後，重新整理 index.html 即可套用新數值；舊 config.js 已不再被遊戲載入。
// 開關類參數統一使用 1 / 0：1 代表開啟，0 代表關閉。
window.GAME_CONFIG = {
  player: {
    fingerOffsetY: 50,        // 手指觸控點和玩家飛機的垂直距離，數字越大飛機越靠上。
    maxHp: 100,               // 玩家最大血量。
    radius: 13,               // 玩家碰撞半徑。
    modelScale: 0.7,          // 玩家肉眼看到的模型倍率，1 為原始模型大小。
    startYRate: 0.72,         // 玩家起始 Y 位置比例，0.72 代表畫面高度 72%。
    followStrength: 700,      // 玩家追向拖曳目標的力量，越大越靈敏。
    followDamping: 28,        // 玩家移動阻尼，越大越快停下。
    dragMoveScale: 1.0,       // 相對拖曳位移倍率，1 代表手指移動多少，玩家目標就移動多少。
    damageOnHit: 20,          // 玩家撞到一般敵人時受到的傷害。
    hitShakeTime: 0.22,       // 玩家受傷震動持續秒數。
    hitShakePower: 20         // 玩家受傷震動強度。
  },

  bullet: {
    speed: -465,              // 普通子彈速度，負數代表往上飛。
    shootInterval: 0.48,      // 普通射擊間隔，秒數越小射速越快。
    collisionRadius: 4,       // 普通子彈碰撞半徑。
    width: 5,                 // 普通子彈顯示寬度。
    height: 16,               // 普通子彈顯示高度。
    damage: 3,                // 普通子彈傷害。
    hitSplashCount: 0,        // 普通子彈命中方塊數量，0 代表關閉。
    hitSplashSizeMin: 5,      // 命中方塊最小尺寸。
    hitSplashSizeMax: 9,      // 命中方塊最大尺寸。
    hitSplashColor: "rgba(255,255,255,0.98)", // 命中方塊顏色。
    hitSplashSpeedX: 58,      // 命中方塊水平飛濺速度。
    hitSplashSpeedUp: 70,     // 命中方塊向上飛濺速度。
    hitSplashSpeedDown: 26,   // 命中方塊向下飛濺速度。
    trailInterval: 1,         // 普通子彈尾端方塊產生間隔，0 代表關閉。
    trailSizeMin: 4,          // 普通子彈拖尾最小尺寸。
    trailSizeMax: 6,          // 普通子彈拖尾最大尺寸。
    trailColor: "rgba(255,255,255,0.98)" // 普通子彈拖尾顏色。
  },

  skill: {
    bulletSpeed: -525,        // 雙擊技能子彈速度，負數代表往上飛。
    collisionRadius: 6,       // 雙擊技能子彈碰撞半徑。
    width: 9,                 // 雙擊技能子彈顯示寬度。
    height: 21,               // 雙擊技能子彈顯示高度。
    damageMultiplier: 2,      // 雙擊技能子彈傷害倍率，乘上普通子彈傷害。
    flashTime: 0.22,          // 發動雙擊技能時玩家閃光時間。
    lockTime: 0.75,           // 發動雙擊技能後不能普通射擊的時間。
    playerShakePower: 13,     // 發動雙擊技能時玩家震動強度。
    trailInterval: 0.018,     // 技能子彈拖尾粒子間隔。
    trailColor: "#ff2020",   // 技能子彈拖尾顏色。
    trailSizeMin: 5,          // 技能子彈拖尾最小尺寸。
    trailSizeMax: 9,          // 技能子彈拖尾最大尺寸。
    doubleTapMaxDelay: 300    // 雙擊判定時間，毫秒。
  },

  enemy: {
    hp: 9,                    // 敵人 A 血量。
    minSpeed: 140,            // 敵人 A 最小下落速度。
    maxSpeed: 190,            // 敵人 A 最大下落速度。
    radius: 19,               // 敵人 A 碰撞半徑。
    hitShakeTime: 0.14,       // 敵人受擊震動持續秒數。
    hitShakePower: 8,         // 敵人受擊震動強度。
    spawnMinInterval: 1.0,    // 敵人 A 生成最短間隔。
    spawnMaxInterval: 3.0,    // 敵人 A 生成最長間隔。
    spawnLevelGrowth: 0.3     // 每過一關敵人 A 生成速度成長比例。
  },

  enemyB: {
    startLevel: 5,            // 敵人 B 從第幾關開始出現。
    maxAlive: 3,              // 敵人 B 基礎一組數量。
    groupSizeLevelGrowth: 0,  // 敵人 B 每過一關，一組增加幾隻。
    groupSpawnGap: 0.3,       // 敵人 B 同一組依序進場間隔秒數。
    hp: 50,                   // 敵人 B 血量。
    radius: 20,               // 敵人 B 碰撞半徑。
    enterSpeed: 300,          // 敵人 B 從上方進場速度。
    hoverYMinRate: 0.18,      // 敵人 B 停留區域最上方比例。
    hoverYMaxRate: 0.36,      // 敵人 B 停留區域最下方比例。
    attackStartDelay: 1.0,    // 敵人 B 進場後首次攻擊等待時間。
    shotCount: 5,             // 敵人 B 每輪連射子彈數量。
    shotGap: 0.2,             // 敵人 B 連射子彈間隔。
    attackCooldown: 2.0,      // 敵人 B 每輪攻擊後冷卻秒數。
    respawnDelay: 0.8,        // 一組敵人 B 死光後下一組等待時間。
    moveIntervalMin: 2.0,     // 敵人 B 換位最短間隔。
    moveIntervalMax: 5.0,     // 敵人 B 換位最長間隔。
    moveSpeed: 250,           // 敵人 B 換位移動速度。
    preAttackTime: 1.0,       // 敵人 B 攻擊前搖時間。
    preAttackPulses: 5,       // 敵人 B 前搖縮放次數。
    coreRadius: 4.5,          // 敵人 B 橘色圓形部件半徑。
    preAttackPulseScale: 0.69 // 敵人 B 前搖縮放幅度。
  },

  enemyC: {
    startLevel: 2,            // 敵人 C 從第幾關開始出現。
    hp: 5,                    // 敵人 C 血量。
    radius: 10,               // 敵人 C 碰撞半徑。
    speed: 400,               // 敵人 C 沿路徑移動速度。
    damageOnHit: 30,          // 敵人 C 撞到玩家造成的傷害。
    columnCount: 7,           // 每一縱隊的敵人數量。
    unitGap: 0.2,             // 同一縱隊每隻敵人生成間隔。
    groupColumns: 3,          // 每一攻擊群組包含幾個縱隊。
    columnGap: 0.7,           // 同一群組內下一縱隊生成間隔。
    groupCooldown: 5.0,       // 一個群組完成後下一群組等待時間。
    spawnSideOffset: 45,      // 從螢幕左右側外多遠的位置生成。
    spawnYMinRate: 0.01,      // 側邊生成最高位置比例。
    spawnYMaxRate: 0.6,       // 側邊生成最低位置比例，數字越大越往下。
    randomAngleRange: 0.55,   // 初始隨機直線方向角度範圍，弧度。
    turnTriggerRadiusRate: 1.0, // 進入玩家附近範圍後觸發轉向，1 約等於螢幕寬度。
    turnStrength: 20,         // 轉向玩家的拉扯強度。
    maxTurnRate: 1,           // 每秒最大轉向弧度，限制轉彎半徑。
    maxTurnAngle: 5,          // 單次路徑改變最多轉多少弧度，只觸發一次。
    coreRadius: 3.8,          // 紅色閃爍核心半徑。
    corePulseSpeed: 5.0,      // 紅色核心縮放閃爍速度。
    corePulseScale: 0.9       // 紅色核心縮放幅度。
  },

  enemyBullet: {
    speed: 350,               // 敵方子彈速度。
    damage: 10,               // 敵方子彈傷害。
    radius: 5,                // 敵方子彈碰撞半徑。
    width: 7,                 // 敵方子彈顯示寬度。
    height: 12,               // 敵方子彈顯示高度。
    life: 4.0,                // 敵方子彈存在時間。
    color: "#ff8a3d",        // 敵方子彈主色。
    glowColor: "rgba(255,138,61,0.82)", // 敵方子彈螢光顏色。
    glowBlur: 30              // 敵方子彈螢光強度。
  },

  level: {
    duration: 30,             // 每一關固定持續時間。
    durationGrowth: 0,        // 每過一關增加秒數，0 代表固定時間。
    healOnStart: 20,          // 進入下一關前回復血量。
    textDuration: 2.0,        // 關卡文字顯示時間。
    noSpawnTime: 3.0          // 每關開始後敵人暫停生成時間。
  },

  reward: {
    coinPerEnemyA: 2,         // 敵人 A 基礎掉落金幣數。
    coinPerEnemyB: 4,         // 敵人 B 基礎掉落金幣數。
    coinPerEnemyC: 1,         // 敵人 C 基礎掉落金幣數。
    goldEnemyChanceA: 0.2,  // 敵人 A 生成為金色怪的機率。
    goldEnemyChanceB: 0.2,  // 敵人 B 生成為金色怪的機率。
    goldEnemyChanceC: 0,      // 敵人 C 生成為金色怪的機率。
    goldEnemyMultiplier: 3,   // 金色怪掉落金幣倍率。
    goldStrokeColor: "#ffd24a", // 金色怪外框顏色。
    goldStrokeWidth: 5,       // 金色怪外框線寬。
    coinDropScatter: 100,     // 金幣從敵人死亡處撒開的範圍。
    coinDropSpeedMin: 18,     // 金幣撒出時最小速度。
    coinDropSpeedMax: 70,     // 金幣撒出時最大速度。
    coinFallSpeed: 30,        // 金幣自然下落速度。
    coinMagnetRadius: 200,    // 玩家靠近多少距離會吸附金幣。
    coinCollectRadius: 10,    // 金幣碰到玩家時的額外收集距離。
    coinMagnetSpeed: 520,     // 金幣吸向玩家的速度。
    coinSize: 3               // 掉落金幣顯示大小。
  },

  background: {
    starCount: 60,            // 背景星點數量。
    gridSize: 45              // 背景格線大小。
  },

  upgradeUi: {
    cardEnterDelay: 170,      // 升級卡片依序進場間隔。
    cardExitDelay: 105,       // 升級卡片依序離場間隔。
    panelExitTotalTime: 760,  // 升級面板離場總時間。
    inputDelay: 1500,         // 升級面板出現後多久可以點擊。
    noAffordableExitDelay: 1200, // 沒有任何買得起技能時，自動離開等待時間。
    skillPrice: {
      defaultBasePrice: 10,   // 沒有在 skillBasePrice 指定時使用的技能初始價格。
      perLevelIncreaseRate: 0.4, // 每過一關價格增加比例，0.3 代表每關貴 30%。
      roundTo: 10,            // 價格未超過門檻時，取最接近此數字的倍數。
      highPriceThreshold: 200,// 價格超過此數字後，改用高價取整單位。
      highPriceRoundTo: 200   // 價格超過門檻後，取最接近此數字的倍數。
    },
    skillBasePrice: {         // 每個技能的初始價格，可單獨調整。
      shockwave_1: 10,        // 衝擊波初始價格。
      homing_egg_1: 10,       // 追蹤蛋初始價格。
      speed_shoot_2: 20,      // 加速射擊初始價格。
      fire_team_3: 30,        // 火力班初始價格。
      shield_3: 10,           // 護盾初始價格。
      shield_amplifier_1: 10  // 護盾放大器初始價格。
    },
    skillAppear: {            // 技能是否有機率出現在升級 UI，1 會出現，0 不出現。
      shockwave_1: 1,
      homing_egg_1: 1,
      speed_shoot_2: 1,
      fire_team_3: 1,
      shield_3: 1,
      shield_amplifier_1: 1
    }
  },

  skills: {
    speedShoot: {
      shootIntervalMultiplier: 0.8 // 加速射擊：普通射擊間隔乘以此值，0.8 約等於攻速 +20%。
    },

    fireTeam: {
      laneBonus: 1            // 火力班：普通彈道增加幾條。
    },

    homingEgg: {
      countPerPurchase: 1,    // 每次購買追蹤蛋增加的數量。
      interval: 3.0,          // 一輪追蹤蛋射完後等待時間。
      shotGap: 0.3,           // 同一輪追蹤蛋每顆間隔。
      damage: 6,              // 追蹤蛋單發傷害。
      speed: 320,             // 追蹤蛋速度。
      turnStrength: 10,       // 追蹤蛋追蹤轉向強度。
      radius: 8,              // 追蹤蛋碰撞半徑。
      width: 11,              // 追蹤蛋顯示寬度。
      height: 15              // 追蹤蛋顯示高度。
    },

    shockwave: {
      countPerPurchase: 1,    // 每次購買衝擊波增加的數量。
      interval: 5.0,          // 一輪衝擊波放完後等待時間。
      waveGap: 0.2,           // 同一輪每道衝擊波間隔。
      maxRadius: 69,          // 衝擊波最大半徑。
      expandSpeed: 200,       // 衝擊波擴散速度。
      lineWidth: 3,           // 衝擊波線寬。
      fadeStartRate: 0.666,   // 擴散到最大半徑多少比例後開始淡出。
      shadowBlur: 8,          // 衝擊波模糊程度。
      burstParticleMin: 1,    // 衝擊波消失時最少方塊粒子。
      burstParticleMax: 3,    // 衝擊波消失時最多方塊粒子。
      burstParticleSizeMin: 3,
      burstParticleSizeMax: 6,
      burstParticleTrackSpread: 1.3,
      burstParticleSpeedMin: 6,
      burstParticleSpeedMax: 18,
      burstParticleDrift: 5,
      burstParticleColorA: "rgba(145,235,255,0.95)",
      burstParticleColorB: "rgba(255,255,255,0.92)"
    },

    shield: {
      countPerPurchase: 1,    // 每次購買護盾增加的數量。
      orbitRadius: 52,        // 護盾環繞半徑。
      orbitSpeed: 2.8,        // 護盾繞主角公轉速度。
      orbitSpeedVariance: 0.08, // 每個護盾公轉速度差異。
      size: 12,               // 護盾方塊大小。
      collisionRadius: 9,     // 護盾碰撞半徑。
      damage: 3,              // 護盾撞到敵人造成的傷害。
      respawnDelay: 4.0,      // 護盾低於最大數量時，每隔多久回復一個。
      color: "#38d6bf",
      edgeColor: "#127f73",
      shadowColor: "#38d6bf",
      shadowBlur: 0,
      selfRotateSpeed: 5.33,
      amplifierSizeMultiplier: 1.25
    }
  }
};
