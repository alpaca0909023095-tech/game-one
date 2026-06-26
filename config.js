// 遊戲基礎數值設定檔
// 修改此檔後，重新整理 index.html 或 test.html 即可套用新數值。
// 開關類參數統一使用 1 / 0：1 代表開啟，0 代表關閉。
window.GAME_CONFIG = {
  player: {
    fingerOffsetY: 50,        // 手指觸控點和玩家飛機的垂直距離，數字越大飛機越靠上。
    maxHp: 100,               // 玩家最大血量。
    radius: 24,               // 玩家碰撞半徑。
    startYRate: 0.72,         // 玩家起始 Y 位置比例。
    followStrength: 700,      // 玩家追向觸控目標的力量，越大移動越靈敏。
    followDamping: 28,        // 玩家移動阻尼，越大越快停下。
    damageOnHit: 20,          // 玩家撞到敵人時受到的傷害。
    hitShakeTime: 0.22,       // 玩家扣血時模型震動持續秒數。
    hitShakePower: 20         // 玩家扣血時模型震動強度。
  },

  bullet: {
    speed: -465,              // 普通子彈速度，負數代表往上飛。
    shootInterval: 0.48,      // 普通射擊間隔，秒數越小射速越快。
    collisionRadius: 6,       // 普通子彈碰撞半徑。
    width: 7,                 // 普通子彈顯示寬度。
    height: 24,               // 普通子彈顯示高度。
    damage: 3,                // 普通子彈傷害。
    hitSplashCount: 0,        // 普通子彈命中時噴出的白色方塊數量，0 代表關閉。
    hitSplashSizeMin: 8,      // 普通子彈命中白色方塊最小尺寸。
    hitSplashSizeMax: 13,     // 普通子彈命中白色方塊最大尺寸。
    hitSplashColor: "rgba(255,255,255,0.98)", // 普通子彈命中方塊顏色。
    hitSplashSpeedX: 58,      // 普通子彈命中方塊水平飛濺速度。
    hitSplashSpeedUp: 70,     // 普通子彈命中方塊向上飛濺速度。
    hitSplashSpeedDown: 26,   // 普通子彈命中方塊向下飛濺速度。
    trailInterval: 0,         // 普通子彈尾端白色方塊產生間隔，0 代表關閉。
    trailSizeMin: 6,          // 普通子彈尾端白色方塊最小尺寸。
    trailSizeMax: 9,          // 普通子彈尾端白色方塊最大尺寸。
    trailColor: "rgba(255,255,255,0.98)" // 普通子彈尾端方塊顏色。
  },

  skill: {
    bulletSpeed: -525,        // 雙擊技能子彈速度，負數代表往上飛。
    collisionRadius: 9,       // 雙擊技能子彈碰撞半徑。
    width: 14,                // 雙擊技能子彈顯示寬度。
    height: 32,               // 雙擊技能子彈顯示高度。
    damageMultiplier: 2,      // 雙擊技能子彈傷害倍率，會乘上普通子彈傷害。
    flashTime: 0.22,          // 施放雙擊技能時玩家閃光時間。
    lockTime: 0.75,           // 施放雙擊技能後不能普通射擊的時間。
    playerShakePower: 13,     // 施放雙擊技能時玩家震動強度。
    trailInterval: 0.018,     // 雙擊技能子彈拖尾粒子產生間隔。
    trailColor: "#ff2020",   // 雙擊技能子彈拖尾顏色。
    trailSizeMin: 7,          // 雙擊技能拖尾粒子最小尺寸。
    trailSizeMax: 13,         // 雙擊技能拖尾粒子最大尺寸。
    doubleTapMaxDelay: 300    // 雙擊判定時間，單位毫秒。
  },

  enemy: {
    hp: 9,                    // 敵人 A 血量。
    minSpeed: 90,             // 敵人 A 最慢下落速度。
    maxSpeed: 150,            // 敵人 A 最快下落速度。
    radius: 29,               // 敵人 A 碰撞半徑。
    hitShakeTime: 0.14,       // 敵人被擊中時震動持續時間。
    hitShakePower: 8,         // 敵人被擊中時震動強度。
    spawnMinInterval: 1.0,    // 敵人 A 生成最短間隔。
    spawnMaxInterval: 3.0 ,   // 敵人 A 生成最長間隔。
    spawnLevelGrowth: 0.2     // 每過一關敵人 A 生成量增加比例。
  },

  enemyB: {
    startLevel: 2,            // 敵人 B 從第幾關開始出現。
    maxAlive: 3,              // 敵人 B 每一組生成幾隻；整組死光後才會生成下一組。
    hp: 30,                   // 敵人 B 血量。
    radius: 30,               // 敵人 B 碰撞半徑。
    enterSpeed: 180,          // 敵人 B 從上方飛進畫面的速度。
    hoverYMinRate: 0.18,      // 敵人 B 懸停高度最上緣，畫面高度比例。
    hoverYMaxRate: 0.36,      // 敵人 B 懸停高度最下緣，畫面高度比例。
    attackStartDelay: 1.0,    // 敵人 B 懸停後等待幾秒才開始第一輪攻擊。
    shotCount: 3,             // 敵人 B 每輪發射幾枚子彈。
    shotGap: 0.3,             // 敵人 B 同一輪中每枚子彈間隔秒數。
    attackCooldown: 3.0,      // 敵人 B 一輪攻擊結束後冷卻秒數。
    respawnDelay: 0.8,        // 整組敵人 B 死光後，下一組生成前等待秒數。
    moveIntervalMin: 2.0,     // 敵人 B 換位置最短間隔。
    moveIntervalMax: 5.0,     // 敵人 B 換位置最長間隔。
    moveSpeed: 180,           // 敵人 B 換位置時的移動速度。
    preAttackTime: 1,      // 敵人 B 連射前搖時間。
    preAttackPulses: 5        // 敵人 B 連射前橘色核心縮放次數。
  },

  enemyBullet: {
    speed: 250,               // 敵方子彈飛行速度。
    damage: 5,                // 敵方子彈命中主角時造成的傷害。
    radius: 7,                // 敵方子彈碰撞半徑。
    width: 10,                // 敵方子彈顯示寬度。
    height: 18,               // 敵方子彈顯示高度。
    life: 4.0,                // 敵方子彈最長存在秒數。
    color: "#ff8a3d"          // 敵方子彈顏色。
  },

  level: {
    duration: 30,             // 每一關持續時間，秒數到後進入升級選擇。
    textDuration: 2.0,        // 關卡文字顯示時間。
    noSpawnTime: 3.0          // 每關開始後不生成敵人的緩衝時間。
  },

  reward: {
    coinPerEnemy: 1           // 每擊倒一個敵人獲得的金幣數。
  },

  background: {
    starCount: 60,            // 背景星點數量。
    gridSize: 45              // 背景格線間距。
  },

  upgradeUi: {
    cardEnterDelay: 170,      // 升級卡片依序進場的間隔，單位毫秒。
    cardExitDelay: 105,       // 升級卡片依序退場的間隔，單位毫秒。
    panelExitTotalTime: 760,  // 收起升級面板後，進入下一關前等待時間。
    inputDelay: 1500,         // 升級面板出現後多久才能點選卡片，單位毫秒。
    levelPrices: [3, 5, 7],   // 技能等級價格，依序代表等級 1、等級 2、等級 3。
    noAffordableExitDelay: 2000, // 沒有任何可購買卡片時，自動進下一關前等待時間。
    skillAppear: {            // 技能是否有機率出現在升級 UI，1 代表會出現，0 代表不出現。
      shockwave_1: 1,         // 衝擊波。
      homing_egg_1: 1,        // 追蹤蛋。
      speed_shoot_2: 1,       // 加速射擊。
      fire_team_3: 1,         // 火力班。
      shield_3: 1,            // 護盾。
      shield_amplifier_1: 1   // 護盾放大器；仍需先擁有護盾才會出現。
    }
  },

  skills: {
    speedShoot: {
      shootIntervalMultiplier: 0.8 // 加速射擊每次購買後，普通射擊間隔倍率；0.8 代表攻速約 +20%。
    },

    fireTeam: {
      laneBonus: 1            // 火力班每次購買後，普通子彈彈道增加幾條。
    },

    homingEgg: {
      countPerPurchase: 1,    // 追蹤蛋每次購買後，單輪多發射幾枚。
      interval: 4.0,          // 追蹤蛋整組發射完後，等待幾秒再進入下一輪。
      shotGap: 0.3,           // 同一輪中，每一枚追蹤蛋的發射間隔。
      damage: 6,              // 追蹤蛋單發傷害。
      speed: 320,             // 追蹤蛋飛行速度。
      turnStrength: 10,       // 追蹤蛋轉向追蹤強度。
      radius: 12,             // 追蹤蛋碰撞半徑。
      width: 17,              // 追蹤蛋顯示寬度。
      height: 22              // 追蹤蛋顯示高度。
    },

    shockwave: {
      countPerPurchase: 1,    // 衝擊波每次購買後，單輪多放幾道。
      interval: 5.0,          // 衝擊波整組放完後，等待幾秒再進入下一輪。
      waveGap: 0.2,           // 同一輪中，每一道衝擊波的生成間隔。
      maxRadius: 103,         // 衝擊波最大半徑。
      expandSpeed: 200,       // 衝擊波擴散速度。
      lineWidth: 5,           // 衝擊波主圈線寬。
      fadeStartRate: 0.666,   // 半徑到最大半徑多少比例後才開始變透明。
      shadowBlur: 8,          // 衝擊波發光模糊程度。
      burstParticleMin: 1,    // 衝擊波消失時最少產生幾個方塊粒子。
      burstParticleMax: 3,    // 衝擊波消失時最多產生幾個方塊粒子。
      burstParticleSizeMin: 5, // 消失方塊粒子最小尺寸。
      burstParticleSizeMax: 9, // 消失方塊粒子最大尺寸。
      burstParticleTrackSpread: 2, // 消失粒子離衝擊波軌道的隨機距離。
      burstParticleSpeedMin: 6,    // 消失粒子向外飄散的最小速度。
      burstParticleSpeedMax: 18,   // 消失粒子向外飄散的最大速度。
      burstParticleDrift: 5,       // 消失粒子的額外亂飄速度。
      burstParticleColorA: "rgba(145,235,255,0.95)", // 消失粒子藍色。
      burstParticleColorB: "rgba(255,255,255,0.92)"  // 消失粒子白色。
    },

    shield: {
      countPerPurchase: 1,    // 護盾每次購買後增加幾顆。
      orbitRadius: 78,        // 護盾繞主角旋轉的半徑。
      orbitSpeed: 2.8,        // 護盾平均繞主角旋轉速度。
      orbitSpeedVariance: 0.08, // 每顆護盾轉速差異比例。
      size: 18,               // 護盾方塊顯示尺寸。
      collisionRadius: 13,    // 護盾碰撞半徑。
      damage: 3,              // 護盾撞到敵方單位時造成的傷害。
      respawnDelay: 4.0,      // 場上護盾少於最大值時，每隔幾秒補回 1 顆。
      color: "#38d6bf",      // 護盾純色主體顏色。
      edgeColor: "#127f73",  // 護盾外框顏色。
      shadowColor: "#38d6bf", // 護盾陰影顏色。
      shadowBlur: 0,          // 護盾發光模糊程度，0 代表純色無螢光。
      selfRotateSpeed: 5.33,  // 護盾方塊自轉速度。
      amplifierSizeMultiplier: 1.25 // 護盾放大器的尺寸與碰撞半徑倍率。
    }
  }
};