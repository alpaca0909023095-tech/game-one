// 遊戲基礎數值設定檔（目前遊戲實際讀取這個檔案）
// 修改此檔後，重新整理 index.html 即可套用新數值。
// 開關類參數統一使用 1 / 0：1 代表開啟，0 代表關閉。
window.GAME_CONFIG = {
  player: {
    fingerOffsetY: 50,        // 手指觸控點和玩家飛機的垂直距離，數字越大飛機越靠上。
    maxHp: 50,                // 玩家最大血量。
    radius: 13,               // 玩家碰撞半徑。
    modelScale: 0.7,          // 玩家模型顯示倍率，1 為原始大小。
    startYRate: 0.72,         // 玩家起始 Y 位置比例。
    followStrength: 700,      // 玩家追向拖曳目標的力量。
    followDamping: 28,        // 玩家移動阻尼。
    dragMoveScale: 1.0,       // 相對拖曳位移倍率。
    damageOnHit: 20,          // 玩家撞到一般敵人時受到的傷害。
    hitShakeTime: 0.22,       // 玩家受傷震動持續秒數。
    hitShakePower: 20         // 玩家受傷震動強度。
  },

  bullet: {
    speed: -465,              // 普通子彈速度，負數代表往上飛。
    shootInterval: 0.48,      // 普通射擊間隔。
    collisionRadius: 4,       // 普通子彈碰撞半徑。
    width: 5,                 // 普通子彈顯示寬度。
    height: 16,               // 普通子彈顯示高度。
    damage: 3,                // 普通子彈傷害。
    hitSplashCount: 0,        // 普通子彈命中方塊數量，0 代表關閉。
    hitSplashSizeMin: 5,      // 普通子彈命中方塊最小尺寸。
    hitSplashSizeMax: 9,      // 普通子彈命中方塊最大尺寸。
    hitSplashColor: "rgba(255,255,255,0.98)", // 普通子彈命中方塊顏色。
    hitSplashSpeedX: 58,      // 普通子彈命中方塊水平飛散速度。
    hitSplashSpeedUp: 70,     // 普通子彈命中方塊向上飛散速度。
    hitSplashSpeedDown: 26,   // 普通子彈命中方塊向下飛散速度。
    trailInterval: 1,         // 普通子彈拖尾產生間隔，0 代表關閉。
    trailSizeMin: 4,          // 普通子彈拖尾方塊最小尺寸。
    trailSizeMax: 6,          // 普通子彈拖尾方塊最大尺寸。
    trailColor: "rgba(255,255,255,0.98)" // 普通子彈拖尾顏色。
  },

  skill: {
    bulletSpeed: -525,        // 雙擊技能子彈速度。
    collisionRadius: 6,       // 雙擊技能子彈碰撞半徑。
    width: 9,                 // 雙擊技能子彈顯示寬度。
    height: 21,               // 雙擊技能子彈顯示高度。
    damageMultiplier: 2,      // 雙擊技能子彈傷害倍率，會乘上普通子彈傷害。
    flashTime: 0.22,          // 施放雙擊技能時玩家閃光時間。
    lockTime: 0.75,           // 施放雙擊技能後無法普通射擊的時間。
    playerShakePower: 13,     // 施放雙擊技能時玩家震動強度。
    trailInterval: 0.018,     // 雙擊技能子彈拖尾產生間隔。
    trailColor: "#ff2020",   // 雙擊技能子彈拖尾顏色。
    trailSizeMin: 5,          // 雙擊技能子彈拖尾最小尺寸。
    trailSizeMax: 9,          // 雙擊技能子彈拖尾最大尺寸。
    doubleTapMaxDelay: 300    // 判定快速雙擊的最大間隔，單位毫秒。
  },

  enemy: {
    hp: 9,                    // 敵人 A 血量。
    minSpeed: 170,            // 敵人 A 最小下降速度。
    maxSpeed: 220,            // 敵人 A 最大下降速度。
    radius: 19,               // 敵人 A 碰撞半徑。
    hitShakeTime: 0.14,       // 敵人受擊震動持續秒數。
    hitShakePower: 8,         // 敵人受擊震動強度。
    spawnMinInterval: 1.0,    // 敵人 A 最短生成間隔。
    spawnMaxInterval: 3.0,    // 敵人 A 最長生成間隔。
    spawnLevelGrowth: 0.4     // 每過一關敵人 A 生成速度增加比例。
  },

  enemyB: {
    startLevel: 4,            // 敵人 B 從第幾關開始出現。
    maxAlive: 3,              // 敵人 B 基礎一組數量。
    groupSizeGrowthInterval: 3, // 從開始出現後，每隔幾關增加一組數量。
    groupSizeGrowthAmount: 1, // 每次成長增加幾隻。
    groupSpawnGap: 0.3,       // 敵人 B 同一組每隻生成間隔。
    hp: 30,                   // 敵人 B 血量。
    radius: 20,               // 敵人 B 碰撞半徑。
    enterSpeed: 300,          // 敵人 B 進場速度。
    hoverYMinRate: 0.18,      // 敵人 B 懸停最低上界比例。
    hoverYMaxRate: 0.36,      // 敵人 B 懸停最高下界比例。
    attackStartDelay: 1.0,    // 敵人 B 進場後首次攻擊等待時間。
    shotCount: 5,             // 敵人 B 每輪連射子彈數。
    shotGap: 0.3,             // 敵人 B 連射每發間隔。
    attackCooldown: 2.0,      // 敵人 B 每輪攻擊後冷卻時間。
    respawnDelay: 0.8,        // 敵人 B 整組死亡後再生等待時間。
    moveIntervalMin: 2.0,     // 敵人 B 最短換位間隔。
    moveIntervalMax: 5.0,     // 敵人 B 最長換位間隔。
    moveSpeed: 250,           // 敵人 B 換位移動速度。
    preAttackTime: 1.0,       // 敵人 B 攻擊前搖時間。
    preAttackPulses: 5,       // 敵人 B 攻擊前橘色核心縮放次數。
    coreRadius: 4.5,          // 敵人 B 橘色核心半徑。
    preAttackPulseScale: 0.69 // 敵人 B 前搖核心縮放幅度。
  },

  enemyC: {
    startLevel: 2,            // 敵人 C 從第幾關開始出現。
    hp: 2,                    // 敵人 C 血量。
    radius: 10,               // 敵人 C 碰撞半徑。
    speed: 400,               // 敵人 C 飛行速度。
    damageOnHit: 20,          // 敵人 C 撞到玩家造成傷害。
    columnCount: 7,           // 敵人 C 每個縱隊有幾隻。
    unitGap: 0.2,             // 敵人 C 同縱隊每隻生成間隔。
    groupColumns: 3,          // 敵人 C 每組基礎縱隊數。
    groupColumnsGrowthInterval: 3, // 從開始出現後，每隔幾關增加縱隊數。
    groupColumnsGrowthAmount: 1, // 每次成長增加幾個縱隊。
    columnGap: 0.7,           // 敵人 C 同一組下一個縱隊出現間隔。
    groupCooldown: 5.0,       // 敵人 C 一組結束後下一組等待時間。
    spawnSideOffset: 45,      // 敵人 C 從左右螢幕外生成的距離。
    spawnYMinRate: 0.01,      // 敵人 C 側邊生成最高位置比例。
    spawnYMaxRate: 0.6,       // 敵人 C 側邊生成最低位置比例。
    randomAngleRange: 0.55,   // 敵人 C 初始隨機飛行角度範圍。
    turnTriggerRadiusRate: 1.0, // 敵人 C 靠近玩家多大範圍時觸發轉向，1 約等於螢幕寬度。
    turnStrength: 20,         // 敵人 C 轉向玩家的拉扯強度。
    maxTurnRate: 1,           // 敵人 C 每秒最大轉向比例。
    maxTurnAngle: 5,          // 敵人 C 單次路徑最大轉向角度。
    coreRadius: 3.8,          // 敵人 C 紅色核心半徑。
    corePulseSpeed: 5.0,      // 敵人 C 紅色核心閃爍速度。
    corePulseScale: 0.9       // 敵人 C 紅色核心縮放幅度。
  },

  bossA: {
    everyLevels: 5,           // 每幾關進入 Boss 關，5 代表 5、10、15 關。
    hp: 220,                  // Boss A 基礎血量。
    radius: 42,               // Boss A 碰撞半徑。
    enterSpeed: 180,          // Boss A 從上方進場速度。
    hoverYRate: 0.24,         // Boss A 懸停高度比例。
    hoverDelay: 2.0,          // 進場後第一次懸停時間。
    stateHoverDelay: 1.5,     // 每個狀態結束後，切換下一狀態前懸停時間。
    moveSpeed: 170,           // Boss A 移動狀態的移動速度。
    moveYMinRate: 0.14,       // Boss A 移動目標最上方高度比例。
    moveYMaxRate: 0.42,       // Boss A 移動目標最下方高度比例。
    moveXMargin: 60,          // Boss A 移動目標與左右邊界的最小距離。
    ringBulletCount: 18,      // 狀態 1：圓環每圈子彈數。
    ringCount: 5,             // 狀態 1：連續發射幾圈。
    ringInterval: 0.2,        // 狀態 1：每圈間隔。
    spreadBulletCount: 5,     // 狀態 3：每輪扇形子彈數。
    spreadAngle: 0.78,        // 狀態 3：扇形總角度，0.78 約 45 度。
    spreadRounds: 4,          // 狀態 3：連射輪數。
    spreadInterval: 0.35,     // 狀態 3：每輪間隔。
    spreadBulletSpeed: 230,   // 狀態 3：扇形子彈速度。
    spreadBulletDamage: 8,    // 狀態 3：扇形子彈傷害。
    bulletSpeed: 190,         // 狀態 1：圓環子彈速度。
    bulletDamage: 8,          // 狀態 1：圓環子彈傷害。
    bulletRadius: 5,          // Boss A 子彈碰撞半徑。
    bulletWidth: 7,           // Boss A 子彈顯示寬度。
    bulletHeight: 12,         // Boss A 子彈顯示高度。
    bulletLife: 5.0,          // Boss A 子彈存在時間。
    hpMultiplierPerAppearance: 2, // Boss 每次出現血量倍率，2 代表每次翻倍。
    coinReward: 100,          // Boss 死亡後掉落金幣數。
    deathUiDelay: 3.0         // Boss 死亡後等待幾秒才進入升級 UI。
  },

  enemyBullet: {
    speed: 250,               // 敵方子彈速度。
    damage: 15,               // 敵方子彈傷害。
    radius: 5,                // 敵方子彈碰撞半徑。
    width: 7,                 // 敵方子彈顯示寬度。
    height: 12,               // 敵方子彈顯示高度。
    life: 4.0,                // 敵方子彈存在時間。
    color: "#ff8a3d",        // 敵方子彈主色。
    glowColor: "rgba(255,138,61,0.82)", // 敵方子彈螢光顏色。
    glowBlur: 10              // 敵方子彈螢光強度。
  },

  level: {
    introDuration: 3,         // 關卡開頭秒數，這段不生怪。
    upperDuration: 10,        // 關卡上半段秒數。
    middleDuration: 10,       // 關卡中半段秒數。
    lowerDuration: 10,        // 關卡下半段秒數。
    endingDuration: 5,        // 關卡結尾秒數，這段不生怪。
    healOnStart: 0,           // 進入下一關回復血量，目前 0 代表關閉。
    textDuration: 2.0,        // 關卡文字顯示秒數。
    segmentSpawn: {           // 各敵人在上中下三段是否生成，1 生成，0 不生成。
      enemyA: { upper: 1, middle: 1, lower: 1 }, // 敵人 A 出現區段。
      enemyB: { upper: 0, middle: 1, lower: 1 }, // 敵人 B 出現區段。
      enemyC: { upper: 1, middle: 1, lower: 1 }  // 敵人 C 出現區段。
    }
  },

  reward: {
    coinPerEnemyA: 2,         // 敵人 A 基礎掉落金幣數。
    coinPerEnemyB: 3,         // 敵人 B 基礎掉落金幣數。
    coinPerEnemyC: 1,         // 敵人 C 基礎掉落金幣數。
    goldEnemyChanceA: 0.2,    // 敵人 A 生成為金色怪的機率。
    goldEnemyChanceB: 0.2,    // 敵人 B 生成為金色怪的機率。
    goldEnemyChanceC: 0,      // 敵人 C 生成為金色怪的機率。
    goldEnemyMultiplier: 3,   // 金色怪掉落金幣倍率。
    goldStrokeColor: "#ffd24a", // 金色怪外框顏色。
    goldStrokeWidth: 3,       // 金色怪外框線寬。
    goldPulseSpeed: 5.0,      // 金色怪外框縮放閃爍速度。
    goldPulseScale: 0.72,     // 金色怪外框縮放幅度。
    goldGlowBlur: 10,         // 金色怪外框螢光模糊強度。
    goldHpMultiplier: 1.2,    // 金色怪真實血量倍率。
    coinDropScatter: 100,     // 金幣從敵人死亡處撒開的範圍。
    coinDropSpeedMin: 18,     // 金幣撒出時最小速度。
    coinDropSpeedMax: 70,     // 金幣撒出時最大速度。
    coinFallSpeed: 30,        // 金幣自然下落速度。
    coinMagnetRadius: 200,    // 玩家靠近多少距離會吸附金幣。
    coinCollectRadius: 10,    // 金幣碰到玩家時的額外收集距離。
    coinMagnetSpeed: 520,     // 金幣吸向玩家的速度。
    coinSize: 4               // 掉落金幣顯示大小。
  },

  background: {
    starCount: 60,            // 背景星點數量。
    gridSize: 45              // 背景格線大小。
  },

  upgradeUi: {
    cardEnterDelay: 170,      // 升級卡片依序進場間隔，單位毫秒。
    cardExitDelay: 105,       // 升級卡片依序離場間隔，單位毫秒。
    panelExitTotalTime: 760,  // 升級面板離場總時間，單位毫秒。
    inputDelay: 1500,         // 升級面板出現後多久可以點擊，單位毫秒。
    noAffordableExitDelay: 1200, // 沒有任何買得起技能時，自動離開等待時間。
    skillPrice: {
      defaultBasePrice: 10,   // 沒有在 skillBasePrice 指定時使用的技能初始價格。
      perLevelIncreaseRate: 0.5, // 每過一關價格增加比例，0.5 代表每關貴 50%。
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
      shield_amplifier_1: 10, // 護盾放大器初始價格。
      health_potion: 10,      // 血瓶初始價格。
      kill_heal: 30           // 擊殺回血初始價格。
    },
    skillAppear: {            // 技能是否有機率出現在升級 UI，1 會出現，0 不出現。
      shockwave_1: 1,
      homing_egg_1: 1,
      speed_shoot_2: 1,
      fire_team_3: 1,
      shield_3: 1,
      shield_amplifier_1: 1,
      health_potion: 1,
      kill_heal: 1
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
      interval: 1.0,          // 一輪追蹤蛋射完後等待時間。
      shotGap: 0.2,           // 同一輪追蹤蛋每顆間隔。
      damage: 8,              // 追蹤蛋單發傷害。
      speed: 320,             // 追蹤蛋速度。
      turnStrength: 3,        // 追蹤蛋追蹤轉向強度。
      radius: 8,              // 追蹤蛋碰撞半徑。
      width: 11,              // 追蹤蛋顯示寬度。
      height: 15              // 追蹤蛋顯示高度。
    },

    shockwave: {
      countPerPurchase: 1,    // 每次購買衝擊波增加的數量。
      interval: 5.0,          // 一輪衝擊波放完後等待時間。
      waveGap: 0.2,           // 同一輪每道衝擊波間隔。
      maxRadius: 90,         // 衝擊波最大半徑。
      expandSpeed: 150,       // 衝擊波擴散速度。
      lineWidth: 5,           // 衝擊波線寬。
      fadeStartRate: 0.666,   // 擴散到最大半徑多少比例後開始淡出。
      shadowBlur: 12,          // 衝擊波模糊程度。
      burstParticleMin: 2,    // 衝擊波消失時最少方塊粒子。
      burstParticleMax: 5,    // 衝擊波消失時最多方塊粒子。
      burstParticleSizeMin: 3,// 衝擊波消失粒子最小尺寸。
      burstParticleSizeMax: 8,// 衝擊波消失粒子最大尺寸。
      burstParticleTrackSpread: 1.3, // 粒子離衝擊波消失軌道的隨機距離。
      burstParticleSpeedMin: 6, // 粒子最小飛散速度。
      burstParticleSpeedMax: 18, // 粒子最大飛散速度。
      burstParticleDrift: 7,  // 粒子額外隨機漂移量。
      burstParticleColorA: "rgba(145,235,255,0.95)", // 衝擊波粒子藍色。
      burstParticleColorB: "rgba(255,255,255,0.92)" // 衝擊波粒子白色。
    },

    healthPotion: {
      missingHpHealRate: 1    // 血瓶回復已損失血量比例，1 代表回滿血。
    },

    killHeal: {
      chance: 0.2,            // 擊殺回血觸發機率。
      healPerStack: 1         // 擊殺回血每層回復量。
    },

    shield: {
      countPerPurchase: 1,    // 每次購買護盾增加的數量。
      orbitRadius: 60,        // 護盾環繞半徑。
      orbitSpeed: 2.8,        // 護盾繞主角公轉速度。
      orbitSpeedVariance: 0.08, // 每個護盾公轉速度差異。
      size: 12,               // 護盾方塊大小。
      collisionRadius: 9,     // 護盾碰撞半徑。
      damage: 3,              // 護盾撞到敵人造成的傷害。
      respawnDelay: 5.0,      // 護盾低於最大數量時，每隔多久回復一個。
      color: "#38d6bf",      // 護盾主色。
      edgeColor: "#127f73",  // 護盾邊線顏色。
      shadowColor: "#38d6bf", // 護盾陰影顏色。
      shadowBlur: 0,          // 護盾陰影模糊，0 代表無螢光。
      selfRotateSpeed: 7.33,  // 護盾方塊自轉速度。
      amplifierSizeMultiplier: 1.25 // 護盾放大器尺寸倍率。
    }
  }
};
