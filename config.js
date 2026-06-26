// 遊戲基礎數值設定檔
// 修改此檔後，重新整理 index.html 即可套用新數值。
// 開關類參數統一使用 1 / 0：1 代表開啟，0 代表關閉。
window.GAME_CONFIG = {
  player: {
    fingerOffsetY: 50,        // 手指觸控點和玩家飛機的垂直距離，數字越大飛機越靠上。
    maxHp: 100,               // 玩家最大血量。
    radius: 24,               // 玩家碰撞半徑。
    startYRate: 0.72,         // 玩家起始 Y 位置比例，0.72 代表畫面高度 72%。
    followStrength: 700,      // 玩家追向觸控目標的力量，越大移動越靈敏。
    followDamping: 28,        // 玩家移動阻尼，越大越快停下、手感越緊。
    damageOnHit: 20,          // 玩家撞到敵人時受到的傷害。
    hitShakeTime: 0.22,       // 玩家受傷震動時間。
    hitShakePower: 20         // 玩家受傷震動強度。
  },

  bullet: {
    speed: -465,              // 普通子彈速度，負數代表往上飛。
    shootInterval: 0.48,      // 普通射擊間隔，秒數越小射速越快。
    collisionRadius: 6,       // 普通子彈碰撞半徑。
    width: 7,                 // 普通子彈顯示寬度。
    height: 24,               // 普通子彈顯示高度。
    damage: 3,                // 普通子彈傷害。
    hitSplashCount: 0,        // 普通子彈命中時白色方塊數量，0 代表關閉。
    hitSplashSizeMin: 8,      // 普通子彈命中方塊最小尺寸。
    hitSplashSizeMax: 13,     // 普通子彈命中方塊最大尺寸。
    hitSplashColor: "rgba(255,255,255,0.98)", // 普通子彈命中方塊顏色。
    hitSplashSpeedX: 58,      // 普通子彈命中方塊水平速度。
    hitSplashSpeedUp: 70,     // 普通子彈命中方塊向上速度。
    hitSplashSpeedDown: 26,   // 普通子彈命中方塊向下速度。
    trailInterval: 1,         // 普通子彈尾端方塊產生間隔，0 代表關閉。
    trailSizeMin: 6,          // 普通子彈尾端方塊最小尺寸。
    trailSizeMax: 9,          // 普通子彈尾端方塊最大尺寸。
    trailColor: "rgba(255,255,255,0.98)" // 普通子彈尾端方塊顏色。
  },

  skill: {
    bulletSpeed: -525,        // 雙擊技能子彈速度，負數代表往上飛。
    collisionRadius: 9,       // 雙擊技能子彈碰撞半徑。
    width: 14,                // 雙擊技能子彈顯示寬度。
    height: 32,               // 雙擊技能子彈顯示高度。
    damageMultiplier: 2,      // 雙擊技能子彈傷害倍率，乘上普通子彈傷害。
    flashTime: 0.22,          // 發動技能時玩家發光時間。
    lockTime: 0.75,           // 發動技能後不能普通射擊的時間。
    playerShakePower: 13,     // 發動技能時玩家震動強度。
    trailInterval: 0.018,     // 技能子彈拖尾粒子間隔。
    trailColor: "#ff2020",   // 技能子彈拖尾顏色。
    trailSizeMin: 7,          // 技能子彈拖尾最小尺寸。
    trailSizeMax: 13,         // 技能子彈拖尾最大尺寸。
    doubleTapMaxDelay: 300    // 雙擊判定時間，毫秒。
  },

  enemy: {
    hp: 9,                    // 敵人 A 血量。
    minSpeed: 90,             // 敵人 A 最小下落速度。
    maxSpeed: 150,            // 敵人 A 最大下落速度。
    radius: 29,               // 敵人 A 碰撞半徑。
    hitShakeTime: 0.14,       // 敵人受擊震動時間。
    hitShakePower: 8,         // 敵人受擊震動強度。
    spawnMinInterval: 1.0,    // 敵人 A 生成最短間隔。
    spawnMaxInterval: 3.0,    // 敵人 A 生成最長間隔。
    spawnLevelGrowth: 0.2     // 每過一關敵人 A 生成速度成長比例。
  },

  enemyB: {
    startLevel: 2,            // 敵人 B 從第幾關開始出現。
    maxAlive: 3,              // 敵人 B 基礎一組數量。
    groupSizeLevelGrowth: 1,  // 敵人 B 每過一關，一組增加幾隻。
    groupSpawnGap: 0.3,       // 敵人 B 同一組依序進場間隔秒數。
    hp: 30,                   // 敵人 B 血量。
    radius: 30,               // 敵人 B 碰撞半徑。
    enterSpeed: 180,          // 敵人 B 從上方進場速度。
    hoverYMinRate: 0.18,      // 敵人 B 停留區域最上方比例。
    hoverYMaxRate: 0.36,      // 敵人 B 停留區域最下方比例。
    attackStartDelay: 1.0,    // 敵人 B 進場後首次攻擊等待時間。
    shotCount: 3,             // 敵人 B 每輪連射子彈數量。
    shotGap: 0.3,             // 敵人 B 連射子彈間隔。
    attackCooldown: 3.0,      // 敵人 B 每輪攻擊後冷卻。
    respawnDelay: 0.8,        // 一組敵人 B 死光後下一組等待時間。
    moveIntervalMin: 2.0,     // 敵人 B 換位最短間隔。
    moveIntervalMax: 5.0,     // 敵人 B 換位最長間隔。
    moveSpeed: 180,           // 敵人 B 換位移動速度。
    preAttackTime: 1.0,       // 敵人 B 攻擊前搖時間。
    preAttackPulses: 5,       // 敵人 B 前搖縮放次數。
    coreRadius: 6.7,          // 敵人 B 橘色圓形部件半徑，比原本大約 1/3。
    preAttackPulseScale: 0.69 // 敵人 B 前搖縮放幅度，比原本增加約 1/4。
  },

  enemyBullet: {
    speed: 250,               // 敵方子彈速度。
    damage: 10,               // 敵方子彈傷害，目前為原本 5 的加倍。
    radius: 7,                // 敵方子彈碰撞半徑。
    width: 10,                // 敵方子彈顯示寬度。
    height: 18,               // 敵方子彈顯示高度。
    life: 4.0,                // 敵方子彈存在時間。
    color: "#ff8a3d",        // 敵方子彈主色。
    glowColor: "rgba(255,138,61,0.82)", // 敵方子彈螢光顏色。
    glowBlur: 10              // 敵方子彈螢光強度，數字越大越亮。
  },

  level: {
    duration: 10,             // 第 1 關持續時間。
    durationGrowth: 3,        // 每過一關增加的關卡秒數。
    healOnStart: 20,          // 進入下一關前回復的血量。
    textDuration: 2.0,        // 關卡文字顯示時間。
    noSpawnTime: 3.0          // 每關開始後敵人暫停生成時間。
  },

  reward: {
    coinPerEnemy: 1           // 每擊殺一隻敵人獲得金幣。
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
    levelPrices: [3, 5, 7],   // 技能等級價格，依序為等級 1、2、3。
    noAffordableExitDelay: 2000, // 沒有任何買得起技能時，自動離開等待時間。
    skillAppear: {            // 技能是否有機率出現在升級 UI，1 會出現，0 不出現。
      shockwave_1: 1,         // 衝擊波。
      homing_egg_1: 1,        // 追蹤蛋。
      speed_shoot_2: 1,       // 加速射擊。
      fire_team_3: 1,         // 火力班。
      shield_3: 1,            // 護盾。
      shield_amplifier_1: 1   // 護盾放大器。
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
      interval: 4.0,          // 一輪追蹤蛋射完後等待時間。
      shotGap: 0.3,           // 同一輪追蹤蛋每顆間隔。
      damage: 6,              // 追蹤蛋單發傷害。
      speed: 320,             // 追蹤蛋速度。
      turnStrength: 10,       // 追蹤蛋追蹤轉向強度。
      radius: 12,             // 追蹤蛋碰撞半徑。
      width: 17,              // 追蹤蛋顯示寬度。
      height: 22              // 追蹤蛋顯示高度。
    },

    shockwave: {
      countPerPurchase: 1,    // 每次購買衝擊波增加的數量。
      interval: 5.0,          // 一輪衝擊波放完後等待時間。
      waveGap: 0.2,           // 同一輪每道衝擊波間隔。
      maxRadius: 103,         // 衝擊波最大半徑。
      expandSpeed: 200,       // 衝擊波擴散速度。
      lineWidth: 5,           // 衝擊波線寬。
      fadeStartRate: 0.666,   // 擴散到最大半徑多少比例後開始淡出。
      shadowBlur: 8,          // 衝擊波模糊程度。
      burstParticleMin: 1,    // 衝擊波消失時最少方塊粒子。
      burstParticleMax: 3,    // 衝擊波消失時最多方塊粒子。
      burstParticleSizeMin: 5,// 消失粒子最小尺寸。
      burstParticleSizeMax: 9,// 消失粒子最大尺寸。
      burstParticleTrackSpread: 2, // 消失粒子離衝擊波軌道的散布距離。
      burstParticleSpeedMin: 6,    // 消失粒子最小速度。
      burstParticleSpeedMax: 18,   // 消失粒子最大速度。
      burstParticleDrift: 5,       // 消失粒子切線方向漂移速度。
      burstParticleColorA: "rgba(145,235,255,0.95)", // 消失粒子藍色。
      burstParticleColorB: "rgba(255,255,255,0.92)"  // 消失粒子白色。
    },

    shield: {
      countPerPurchase: 1,    // 每次購買護盾增加的數量。
      orbitRadius: 78,        // 護盾環繞半徑。
      orbitSpeed: 2.8,        // 護盾繞主角公轉速度。
      orbitSpeedVariance: 0.08, // 每個護盾公轉速度差異。
      size: 18,               // 護盾方塊大小。
      collisionRadius: 13,    // 護盾碰撞半徑。
      damage: 3,              // 護盾撞到敵人造成的傷害。
      respawnDelay: 4.0,      // 護盾低於最大數量時，每隔多久回復一個。
      color: "#38d6bf",      // 護盾填色。
      edgeColor: "#127f73",  // 護盾邊框色。
      shadowColor: "#38d6bf",// 護盾陰影色。
      shadowBlur: 0,          // 護盾陰影模糊，0 代表純色。
      selfRotateSpeed: 5.33,  // 護盾方塊自轉速度。
      amplifierSizeMultiplier: 1.25 // 護盾放大器每次增加的尺寸倍率。
    }
  }
};