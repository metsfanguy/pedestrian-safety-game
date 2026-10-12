/**
 * SAFE STEPS: CITY WALK
 * Pedestrian Safety Interactive Web Game for Kids
 * 4 Background Themes + Guaranteed Sidewalk Walking & Crosswalk Crossing
 */

// ============================================================================
// AUDIO SYNTHESIZER (Pure Web Audio API - Zero External Dependencies)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainLevel = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  step() {
    this.playTone(180 + Math.random() * 40, 'triangle', 0.08, 0.04);
  }

  correct() {
    if (!this.enabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.25, 0.12), idx * 90);
    });
  }

  wrong() {
    if (!this.enabled) return;
    this.init();
    this.playTone(260, 'sawtooth', 0.18, 0.08);
    setTimeout(() => this.playTone(210, 'sawtooth', 0.25, 0.08), 120);
  }

  carBrake() {
    if (!this.enabled) return;
    this.init();
    this.playTone(380, 'sawtooth', 0.15, 0.05);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.2, 0.04), 80);
  }

  buzz() {
    if (!this.enabled) return;
    this.init();
    this.playTone(180, 'sawtooth', 0.25, 0.12);
  }

  loseChance() {
    if (!this.enabled) return;
    this.init();
    this.playTone(330, 'sawtooth', 0.2, 0.12);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.3, 0.15), 110);
  }

  gameOver() {
    if (!this.enabled) return;
    this.init();
    const notes = [392, 349.23, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.16), idx * 160);
    });
  }

  tick() {
    if (!this.enabled) return;
    this.init();
    this.playTone(850, 'sine', 0.04, 0.06);
  }

  walkSignalChirp() {
    if (!this.enabled) return;
    this.init();
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.playTone(1350, 'sine', 0.06, 0.08), i * 130);
    }
  }

  thud() {
    if (!this.enabled) return;
    this.init();
    this.playTone(130, 'triangle', 0.22, 0.2);
    setTimeout(() => this.playTone(85, 'sine', 0.28, 0.18), 50);
  }

  buttonPress() {
    if (!this.enabled) return;
    this.init();
    this.playTone(880, 'sine', 0.08, 0.15);
    setTimeout(() => this.playTone(1174, 'sine', 0.12, 0.12), 60);
  }

  fanfare() {
    if (!this.enabled) return;
    this.init();
    const notes = [392, 523, 659, 784, 1046];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.35, 0.15), idx * 120);
    });
  }

  cyberChime() {
    if (!this.enabled) return;
    this.init();
    const freqs = [440, 554.37, 659.25, 880, 1108.73];
    freqs.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.16, 0.08), idx * 70);
    });
  }

  itemPickup() {
    if (!this.enabled) return;
    this.init();
    this.playTone(587.33, 'sine', 0.15, 0.12);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.14), 70);
  }

  cashRegister() {
    if (!this.enabled) return;
    this.init();
    this.playTone(1760, 'sine', 0.35, 0.2);
    setTimeout(() => this.playTone(2349, 'triangle', 0.4, 0.2), 90);
    setTimeout(() => this.playTone(3520, 'sine', 0.45, 0.15), 180);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.12, 0.08), 240);
  }

  doorChime() {
    if (!this.enabled) return;
    this.init();
    this.playTone(783.99, 'sine', 0.25, 0.15);
    setTimeout(() => this.playTone(659.25, 'sine', 0.3, 0.15), 140);
  }

  barcodeScan() {
    if (!this.enabled) return;
    this.init();
    this.playTone(2400, 'sine', 0.08, 0.18);
  }

  coinClink() {
    if (!this.enabled) return;
    this.init();
    this.playTone(1975, 'sine', 0.06, 0.12);
    setTimeout(() => this.playTone(2637, 'sine', 0.08, 0.1), 35);
  }

  guardWhistle() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t0 = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(2600, t0);
      osc2.frequency.setValueAtTime(2850, t0);

      // Whistle vibrato / pea trill
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(28, t0);
      lfoGain.gain.setValueAtTime(100, t0);
      lfo.connect(osc1.frequency);
      lfo.connect(osc2.frequency);

      gain.gain.setValueAtTime(0.12, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      lfo.start(t0);
      osc1.start(t0);
      osc2.start(t0);
      lfo.stop(t0 + 0.35);
      osc1.stop(t0 + 0.35);
      osc2.stop(t0 + 0.35);
    } catch (e) {
      console.warn("Whistle error:", e);
    }
  }

  dogHappy() {
    if (!this.enabled) return;
    this.init();
    const freqs = [587.33, 880, 1174.66];
    freqs.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.15, 0.1), idx * 80);
    });
  }

  dogWarning() {
    if (!this.enabled) return;
    this.init();
    this.playTone(160, 'sawtooth', 0.35, 0.14);
    setTimeout(() => this.playTone(130, 'sawtooth', 0.4, 0.14), 140);
  }

  dogBark() {
    if (!this.enabled) return;
    this.init();
    this.playTone(220, 'sawtooth', 0.09, 0.2);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.14, 0.22), 80);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.18, 0.18), 190);
  }
}

const sfx = new SoundEffects();

// ============================================================================
// CHALLENGE DATABASE (Pedestrian Safety Scenarios)
// ============================================================================
const CHALLENGE_POOL = [
  {
    id: 'countdown_light',
    tag: '🚦 CROSSWALK SIGNAL',
    icon: '✋',
    visualIcon: '⏱️',
    visualText: 'Flashing red hand with only 3 seconds left on countdown!',
    title: 'Signal Running Out Before Crossing!',
    description: 'You are on the sidewalk curb ready to cross the street, but the red hand is flashing with only 3 seconds left.',
    options: [
      { text: 'Wait safely on the sidewalk for the next Walk signal!', correct: true },
      { text: 'Sprint as fast as you can across the road!', correct: false },
      { text: 'Step halfway and wait in the middle of the street.', correct: false }
    ],
    feedbackCorrect: 'Super safe! If the countdown is low, never rush into the street. Always wait safely on the sidewalk for the next fresh walk signal.',
    feedbackWrong: 'Never dash into the road when the timer is almost out! Stay on the sidewalk and wait for the next full walk cycle.',
    actionType: 'wait_then_cross'
  },
  {
    id: 'look_left_right',
    tag: '👀 LOOK LEFT-RIGHT-LEFT',
    icon: '🚚',
    visualIcon: '👀',
    visualText: 'Cars are driving across the road. Always check both ways!',
    title: 'Cars Approaching the Crosswalk!',
    description: 'Before stepping off the sidewalk curb onto the zebra crosswalk, what must you always do?',
    options: [
      { text: 'Stop at curb: Look Left, Right, then Left again, and make eye contact with drivers.', correct: true },
      { text: 'Step straight out without looking because crosswalks give you right-of-way.', correct: false },
      { text: 'Look down at your phone while walking across.', correct: false }
    ],
    feedbackCorrect: 'Spot on! Looking Left-Right-Left and making eye contact ensures drivers actually see you before you cross!',
    feedbackWrong: 'Even in a crosswalk, drivers might be distracted! Always stop on the sidewalk, look Left, Right, then Left again before stepping out.',
    actionType: 'look_and_cross'
  },
  {
    id: 'group_crossing',
    tag: '🚸 CROSSING WITH FRIENDS',
    icon: '🎒',
    visualIcon: '👥',
    visualText: 'A group of school friends is waiting on the sidewalk to cross!',
    title: 'Group of Friends at the Crosswalk!',
    description: 'You reach the crosswalk where several students and friends are waiting to cross.',
    options: [
      { text: 'Cross together as a group when the signal turns safe!', correct: true },
      { text: 'Race ahead across the street by yourself.', correct: false },
      { text: 'Push your friends into the road as a joke.', correct: false }
    ],
    feedbackCorrect: 'Great teamwork! Crossing together as a tight group makes everyone much bigger and easier for drivers to spot.',
    feedbackWrong: 'Never run ahead alone! Drivers spot a unified group of pedestrians much easier than an unexpected single child.',
    actionType: 'group_cross'
  },
  {
    id: 'pedestrian_bridge',
    tag: '🌉 SAFE CROSSING CHOICE',
    icon: '🌉',
    visualIcon: '🛣️',
    visualText: 'Busy 4-lane avenue with an overhead pedestrian walkway available!',
    title: 'Pedestrian Overpass Bridge Available!',
    description: 'This wide street has lots of fast-moving traffic, but there is a dedicated pedestrian bridge over it.',
    options: [
      { text: 'Use the pedestrian bridge to walk safely over the traffic!', correct: true },
      { text: 'Try to dash between cars to save 15 seconds.', correct: false },
      { text: 'Walk along the median divider.', correct: false }
    ],
    feedbackCorrect: 'Brilliant! Whenever there is a pedestrian bridge or tunnel, always use it to avoid traffic completely.',
    feedbackWrong: 'Crossing a busy avenue without using the bridge is very risky. The bridge guarantees 100% safety!',
    actionType: 'bridge_cross'
  },
  {
    id: 'stranger_alert',
    tag: '🚫 STRANGER SAFETY',
    icon: '🛑',
    visualIcon: '🚙',
    visualText: 'An unfamiliar car slows down and someone calls over!',
    title: 'Stranger Calling from an Idling Car!',
    description: 'As you wait on the sidewalk corner, an unfamiliar driver calls out: "Hey kid, come over here!"',
    options: [
      { text: 'Ignore them, stay well away on the sidewalk, and cross safely with the walk signal!', correct: true },
      { text: 'Walk over to the car window to hear what they want.', correct: false },
      { text: 'Get inside the vehicle to help them.', correct: false }
    ],
    feedbackCorrect: 'Safe and smart! Never approach unfamiliar vehicles. Stay on the sidewalk in open view and keep moving safely.',
    feedbackWrong: 'Never approach a stranger calling to you from a vehicle. Stay on the sidewalk, keep your distance, and stay in public view.',
    actionType: 'ignore_cross'
  },
  {
    id: 'sidewalk_construction',
    tag: '🚧 SIDEWALK DETOUR',
    icon: '🚧',
    visualIcon: '⚠️',
    visualText: 'Work zone barrels and cones near the curb ramp!',
    title: 'Construction Near the Crosswalk!',
    description: 'The regular curb ramp has repair cones and a sign pointing to the designated safe walkway detour.',
    options: [
      { text: 'Follow the marked pedestrian detour path across the street.', correct: true },
      { text: 'Walk into live car lanes next to oncoming traffic.', correct: false },
      { text: 'Climb over the construction fence and barrels.', correct: false }
    ],
    feedbackCorrect: 'Great judgment! Always follow designated pedestrian detour signs around work zones.',
    feedbackWrong: 'Never step into active car lanes or jump over construction barriers! Always follow the safe detour path.',
    actionType: 'detour_cross'
  }
];

// ============================================================================
// GAME ENGINE CLASS
// ============================================================================
class PedestrianGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // UI Elements
    this.startMenu = document.getElementById('start-menu');
    this.challengeModal = document.getElementById('challenge-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.gameHud = document.getElementById('game-hud');
    this.progressHud = document.getElementById('progress-hud');
    this.walkingControls = document.getElementById('walking-controls');
    this.movementGuide = document.getElementById('movement-guide');
    this.btnUp = document.getElementById('btn-walk-up');
    this.btnDown = document.getElementById('btn-walk-down');
    this.btnLeft = document.getElementById('btn-walk-left');
    this.btnRight = document.getElementById('btn-walk-right');
    this.btnAction = document.getElementById('btn-touch-action');
    this.touchActionIcon = document.getElementById('touch-action-icon');
    this.touchActionLabel = document.getElementById('touch-action-label');
    this.btnForward = this.btnUp;
    this.btnBackward = this.btnDown;
    this.starCountEl = document.getElementById('star-count');
    this.progressFillEl = document.getElementById('progress-fill');
    this.progressAvatarMarker = document.getElementById('progress-avatar-marker');
    this.progressAvatarImg = document.getElementById('progress-avatar-img');
    this.destinationIconEl = document.getElementById('destination-icon');
    this.destinationTextEl = document.getElementById('destination-text');
    this.endPointLabelEl = document.getElementById('end-point-label');

    // Info Page Modal Elements
    this.infoModal = document.getElementById('info-modal');
    this.infoBtn = document.getElementById('info-btn');
    this.btnCloseInfo = document.getElementById('btn-close-info');
    this.btnGotItInfo = document.getElementById('btn-got-it-info');

    // Safety Chances & Practice Reset (Game Over) Modal
    this.gameOverModal = document.getElementById('game-over-modal');
    this.maxSafetyChances = 3;
    this.safetyChances = 3;
    this.lastSafetyTip = '';

    // Level Mode Selection (Level 1: Bakery Walk, Level 2: Grocery Store Adventure)
    this.gameLevel = 1;
    this.selectLevel1 = document.getElementById('select-level-1');
    this.selectLevel2 = document.getElementById('select-level-2');

    // Store HUD & Checkout Modal Elements
    this.storeHud = document.getElementById('store-hud');
    this.storeItemsCounter = document.getElementById('store-items-counter');
    this.storeChecklist = document.getElementById('store-checklist');
    this.storeGoalBanner = document.getElementById('store-goal-banner');
    this.checkoutModal = document.getElementById('checkout-modal');
    this.checkoutMinigameModal = document.getElementById('checkout-minigame-modal');
    this.homeVictoryModal = document.getElementById('home-victory-modal');
    this.storePlayAgainBtn = document.getElementById('store-play-again-btn');
    this.storeMainMenuBtn = document.getElementById('store-main-menu-btn');
    this.storeBagImage = this.loadImage('assets/shopping/items/57_grocery_bag.png');
    this.isWalkingHome = false;
    this.hasGroceries = false;
    this.returnCrossingIndex = 0;
    this.checkoutTotalDue = 0;
    this.checkoutPaidSoFar = 0;

    // Keyboard & Touch Movement Keys (Supports all 4 directions & diagonals)
    this.keys = { up: false, down: false, left: false, right: false };

    // Mouse & Pointer Following Control (Moves in all directions following cursor when clicked/held)
    this.mouseControl = {
      isDown: false,
      targetWorldX: null,
      targetWorldY: null
    };

    // Preload All 5 Custom Built-In Neighborhood Blocks with Built-in Sidewalks!
    this.environmentImages = {
      block_1: this.loadImage('assets/backgrounds/block-1-cottages.jpg'),
      block_2: this.loadImage('assets/backgrounds/block-2-park-pond.jpg'),
      block_3: this.loadImage('assets/backgrounds/block-3-autumn.jpg'),
      block_4: this.loadImage('assets/backgrounds/block-4-playground.jpg'),
      block_5: this.loadImage('assets/backgrounds/block-5-bakery-town.jpg')
    };

    // Preload Character Sprites:
    // Full 8-directional walking sets for Boy:
    // • up (walking away / back of character)
    // • down (walking towards camera / front of character)
    // • left, right (profiles)
    // • up_left, up_right, down_left, down_right (diagonals)
    // • fall (stumble & fall recovery sequence)
    this.sprites = {
      boy: {
        directions: {
          up: [
            this.loadImage('assets/characters/boy/directions/up/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/up/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/up/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/up/frame_4.png')
          ],
          down: [
            this.loadImage('assets/characters/boy/directions/down/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/down/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/down/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/down/frame_4.png')
          ],
          left: [
            this.loadImage('assets/characters/boy/directions/left/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/left/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/left/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/left/frame_4.png')
          ],
          right: [
            this.loadImage('assets/characters/boy/directions/right/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/right/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/right/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/right/frame_4.png')
          ],
          up_left: [
            this.loadImage('assets/characters/boy/directions/up_left/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/up_left/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/up_left/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/up_left/frame_4.png')
          ],
          up_right: [
            this.loadImage('assets/characters/boy/directions/up_right/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/up_right/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/up_right/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/up_right/frame_4.png')
          ],
          down_left: [
            this.loadImage('assets/characters/boy/directions/down_left/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/down_left/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/down_left/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/down_left/frame_4.png')
          ],
          down_right: [
            this.loadImage('assets/characters/boy/directions/down_right/frame_1.png'),
            this.loadImage('assets/characters/boy/directions/down_right/frame_2.png'),
            this.loadImage('assets/characters/boy/directions/down_right/frame_3.png'),
            this.loadImage('assets/characters/boy/directions/down_right/frame_4.png')
          ]
        },
        back: [
          this.loadImage('assets/characters/boy/boy-idle.png'),
          this.loadImage('assets/characters/boy/boy-walk-left-step.png'),
          this.loadImage('assets/characters/boy/boy-walk-mid-step.png'),
          this.loadImage('assets/characters/boy/boy-walk-right-step.png')
        ],
        front: [
          this.loadImage('assets/characters/boy/boy-front-idle.png'),
          this.loadImage('assets/characters/boy/boy-front-walk-left-step.png'),
          this.loadImage('assets/characters/boy/boy-front-walk-mid-step.png'),
          this.loadImage('assets/characters/boy/boy-front-walk-right-step.png')
        ],
        fall: [
          this.loadImage('assets/characters/boy/fall/boy-fall-01.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-02.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-03.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-04.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-05.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-06.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-07.png'),
          this.loadImage('assets/characters/boy/fall/boy-fall-08.png')
        ],
        petDog: [
          this.loadImage('assets/characters/boy/pet_dog/pet_1.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_2.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_3.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_4.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_5.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_6.png'),
          this.loadImage('assets/characters/boy/pet_dog/pet_7.png')
        ]
      },
      girl: {
        directions: {
          up: [
            this.loadImage('assets/characters/girl/directions/up/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/up/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/up/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/up/frame_4.png')
          ],
          down: [
            this.loadImage('assets/characters/girl/directions/down/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/down/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/down/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/down/frame_4.png')
          ],
          left: [
            this.loadImage('assets/characters/girl/directions/left/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/left/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/left/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/left/frame_4.png')
          ],
          right: [
            this.loadImage('assets/characters/girl/directions/right/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/right/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/right/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/right/frame_4.png')
          ],
          up_left: [
            this.loadImage('assets/characters/girl/directions/up_left/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/up_left/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/up_left/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/up_left/frame_4.png')
          ],
          up_right: [
            this.loadImage('assets/characters/girl/directions/up_right/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/up_right/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/up_right/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/up_right/frame_4.png')
          ],
          down_left: [
            this.loadImage('assets/characters/girl/directions/down_left/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/down_left/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/down_left/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/down_left/frame_4.png')
          ],
          down_right: [
            this.loadImage('assets/characters/girl/directions/down_right/frame_1.png'),
            this.loadImage('assets/characters/girl/directions/down_right/frame_2.png'),
            this.loadImage('assets/characters/girl/directions/down_right/frame_3.png'),
            this.loadImage('assets/characters/girl/directions/down_right/frame_4.png')
          ]
        },
        back: [
          this.loadImage('assets/characters/girl/girl-idle.png'),
          this.loadImage('assets/characters/girl/girl-walk-left-step.png'),
          this.loadImage('assets/characters/girl/girl-walk-mid-step.png'),
          this.loadImage('assets/characters/girl/girl-walk-right-step.png')
        ],
        front: [
          this.loadImage('assets/characters/girl/girl-front-idle.png'),
          this.loadImage('assets/characters/girl/girl-front-walk-left-step.png'),
          this.loadImage('assets/characters/girl/girl-front-walk-mid-step.png'),
          this.loadImage('assets/characters/girl/girl-front-walk-right-step.png')
        ],
        fall: [
          this.loadImage('assets/characters/girl/fall/girl-fall-01.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-02.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-03.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-04.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-05.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-06.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-07.png'),
          this.loadImage('assets/characters/girl/fall/girl-fall-08.png')
        ],
        petDog: [
          this.loadImage('assets/characters/girl/pet_dog/pet_1.png'),
          this.loadImage('assets/characters/girl/pet_dog/pet_2.png'),
          this.loadImage('assets/characters/girl/pet_dog/pet_3.png'),
          this.loadImage('assets/characters/girl/pet_dog/pet_4.png'),
          this.loadImage('assets/characters/girl/pet_dog/pet_5.png'),
          this.loadImage('assets/characters/girl/pet_dog/pet_6.png')
        ]
      }
    };

    // Preload Authentic Pedestrian Crossing Signals
    this.signalImages = {
      stop: this.loadImage('assets/ui/signals/signal-stop-hand.png'),
      walk: this.loadImage('assets/ui/signals/signal-walk.png'),
      blank: this.loadImage('assets/ui/signals/signal-blank.png')
    };

    // Preload School Crossing Guard Sprites (All 9 Frames)
    this.guardSprites = [
      this.loadImage('assets/characters/crossing_guard/guard_1.png'), // 0: paddle up ready
      this.loadImage('assets/characters/crossing_guard/guard_2.png'), // 1: paddle down idle
      this.loadImage('assets/characters/crossing_guard/guard_3.png'), // 2: palm stop 1
      this.loadImage('assets/characters/crossing_guard/guard_4.png'), // 3: palm stop 2
      this.loadImage('assets/characters/crossing_guard/guard_5.png'), // 4: palm stop 3
      this.loadImage('assets/characters/crossing_guard/guard_6.png'), // 5: wave safe 1
      this.loadImage('assets/characters/crossing_guard/guard_7.png'), // 6: wave safe 2
      this.loadImage('assets/characters/crossing_guard/guard_8.png'), // 7: wave safe 3
      this.loadImage('assets/characters/crossing_guard/guard_9.png')  // 8: hold paddle firm
    ];

    // Preload Group of 2 Sprites (4 walking frames)
    this.groupOf2Sprites = [
      this.loadImage('assets/characters/group_of_2/group2_1.png'),
      this.loadImage('assets/characters/group_of_2/group2_2.png'),
      this.loadImage('assets/characters/group_of_2/group2_3.png'),
      this.loadImage('assets/characters/group_of_2/group2_4.png')
    ];

    // Preload Group of 3 Sprites (4 walking frames)
    this.groupOf3Sprites = [
      this.loadImage('assets/characters/group_of_3/group3_1.png'),
      this.loadImage('assets/characters/group_of_3/group3_2.png'),
      this.loadImage('assets/characters/group_of_3/group3_3.png'),
      this.loadImage('assets/characters/group_of_3/group3_4.png')
    ];

    // Preload Strangers with Dogs Sprites
    this.strangerDogSprites = [
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_1.png'),
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_2.png'),
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_3.png'),
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_4.png'),
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_5.png'),
      this.loadImage('assets/characters/strangers_dogs/stranger_dog_6.png')
    ];

    // Preload Pedestrian Footbridge Sprite (trimmed with no invisible margins)
    this.bridgeSprite = this.loadImage('assets/bridge/pedestrian_footbridge_trimmed.png');

    // Preload Real Car Sprites from To Delete (Directional: left & right)
    this.carSprites = {
      car_1: {
        left: this.loadImage('assets/cars/left/car_1.png'),
        right: this.loadImage('assets/cars/right/car_1.png')
      },
      car_2: {
        left: this.loadImage('assets/cars/left/car_2.png'),
        right: this.loadImage('assets/cars/right/car_2.png')
      },
      car_3: {
        left: this.loadImage('assets/cars/left/car_3.png'),
        right: this.loadImage('assets/cars/right/car_3.png')
      },
      car_4: {
        left: this.loadImage('assets/cars/left/car_4.png'),
        right: this.loadImage('assets/cars/right/car_4.png')
      },
      car_5: {
        left: this.loadImage('assets/cars/left/car_5.png'),
        right: this.loadImage('assets/cars/right/car_5.png')
      },
      cybertruck: {
        left: this.loadImage('assets/cars/left/cybertruck.png'),
        right: this.loadImage('assets/cars/right/cybertruck.png')
      }
    };

    // Cybertruck & Flawless Run Tracking:
    this.hasEverFallen = false;
    this.cybertruckSpawned = false;
    this.cybertruckFinished = false;

    // State
    this.state = 'START_MENU'; // START_MENU | WALKING_SIDEWALK | AT_CROSSWALK | CROSSING_ROAD | WALKING_TO_GOAL | VICTORY
    this.selectedChar = 'boy';
    this.destination = {
      title: 'Grandma’s Bakery & Town Park',
      icon: '🧁',
      desc: 'Fresh cupcakes & the playground are at the end of the avenue!'
    };

    this.safetyStars = 0;
    this.currentCrossingIndex = 0;
    this.totalCrossings = 4;
    this.activeChallenges = [];
    this.activeChallenge = null;

    // World Dimensions (Tall, spacious, unsquished environment world)
    this.worldWidth = 768;
    this.worldHeight = 4000;
    this.scale = 1;
    this.offsetX = 0;

    // Pedestrian Sidewalk & Crosswalk Geometry (Centered in the middle of the world)
    this.pathCenterX = 384;
    this.sidewalkWidth = 104;
    this.sidewalkX = 332; // Exactly pathCenterX - sidewalkWidth / 2 = 384 - 52 = 332

    this.startY = 3640;
    this.destinationY = 40;

    // 1. Group Crossing NPCs
    this.groupOf2 = {
      x: this.pathCenterX - 22,
      y: 1516,
      startX: this.pathCenterX - 22,
      startY: 1516,
      targetY: 1370,
      drawW: 76,
      drawH: 58,
      speed: 1.35,
      isWalking: false,
      animFrame: 0,
      state: 'WAITING'
    };

    this.groupOf3 = {
      x: this.pathCenterX + 24,
      y: 1516,
      startX: this.pathCenterX + 24,
      startY: 1516,
      targetY: 1370,
      drawW: 98,
      drawH: 58,
      speed: 1.35,
      isWalking: false,
      animFrame: 0,
      state: 'WAITING'
    };

    // 2. School Crossing Guard NPC
    this.crossingGuard = {
      zoneId: 0,
      x: this.pathCenterX + 44,
      y: 1512,
      targetX: this.pathCenterX + 44,
      targetY: 1512,
      state: 'WAIT_ON_CURB',
      animTimer: 0,
      whistlePlayed: false
    };

    // 3. Strangers with Dogs NPCs
    this.strangersWithDogs = [
      {
        id: 'dog_friendly',
        name: 'Elena & Biscuit',
        spriteIndex: 3,
        x: this.sidewalkX + 18,
        y: 1230,
        drawW: 66,
        drawH: 66,
        interacted: false,
        decision: 'THUMBS_UP',
        speechText: 'Sure! You can pet my dog! Friendly pup! 🐶',
        initialDist: null,
        status: 'IDLE'
      },
      {
        id: 'dog_nervous',
        name: 'David & Rex',
        spriteIndex: 5,
        x: this.sidewalkX + 82,
        y: 810,
        drawW: 68,
        drawH: 68,
        interacted: false,
        decision: 'THUMBS_DOWN',
        speechText: 'No, please don’t pet! My dog is nervous! Walk away! ⚠️',
        initialDist: null,
        status: 'IDLE'
      }
    ];

    // 4. Pedestrian Footbridge (Enlarged, placed to the side of the path)
    this.pedestrianBridge = {
      zoneId: 0,
      x: this.pathCenterX + 120,
      y: 1440,
      drawW: 124,
      drawH: 224,
      southStairY: 1544,
      northStairY: 1336
    };

    // 5. Stranger Near Van Hazard (Parked above or below roads)
    this.strangerVanSprites = {
      left: this.loadImage('assets/characters/stranger_van/stranger_van_left.png'),
      right: this.loadImage('assets/characters/stranger_van/stranger_van_right.png')
    };
    this.strangerVans = [];

    // Player State
    this.player = {
      x: this.pathCenterX,
      y: this.startY,
      facing: 'up',
      walkAnimFrame: 0,
      isWalking: false,
      isFalling: false,
      fallFrame: 0,
      fallTimer: 0,
      speed: 2.2,
      withGroup: false,
      onBridge: false,
      fallTargetY: null,
      isPettingDog: false,
      pettingFrame: 0,
      pettingTimer: 0
    };
    this.pettingSequence = null;

    this.cameraY = this.startY - 400;
    this.cars = [];
    this.confettiParticles = [];

    // Initialize randomized trials and environment blocks
    this.randomizeTrialsAndEnvironments();
    this.confettiParticles = [];
    this.activeInWorldAlert = null;
    this.lastTime = performance.now();

    // Store assets & grocery catalog preloading
    this.storeImage = this.loadImage('assets/shopping/store_interior_topdown_minimal.jpg');
    this.storeCatalog = this.getStoreCatalog();
    this.shoppingItemImages = {};
    this.storeCatalog.forEach(item => {
      this.shoppingItemImages[item.file] = this.loadImage(`assets/shopping/items/${item.file}`);
    });
    this.storeItems = [];
    this.shoppingList = [];

    this.initCanvasResize();
    this.bindEvents();
    this.setupTraffic();
    this.setLevel(1);
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  loadImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      img.isLoaded = true;
    };
    return img;
  }

  randomizeTrialsAndEnvironments() {
    // Random number of trials between 3 and 10 per game!
    const numTrials = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    this.totalCrossings = numTrials;
    this.currentCrossingIndex = 0;

    // Destination at the top (Grandma's Bakery Courtyard)
    this.destinationY = 40;
    const goalBlockTop = -240;
    const goalBlockBottom = 360;

    const trialTypes = ['GROUP_CROSSING', 'CROSSING_GUARD', 'PEDESTRIAN_BRIDGE', 'TRAFFIC_LIGHT'];
    const intermediateThemes = ['block_1', 'block_2', 'block_3', 'block_4'];
    let lastTrial = null;
    let lastTheme = null;

    let currentY = goalBlockBottom; // starts at 360

    const tempRoads = [];
    const tempBlocks = [];

    // Construct roads and blocks going downwards (from road N-1 down to road 0)
    for (let k = numTrials - 1; k >= 0; k--) {
      // Pick trial type different from previous road
      const availTrials = trialTypes.filter(t => t !== lastTrial);
      const trial = availTrials[Math.floor(Math.random() * availTrials.length)];
      lastTrial = trial;

      const road = {
        id: k,
        trialType: trial,
        northCurbY: currentY,
        roadCenterY: currentY + 60,
        southCurbY: currentY + 120,
        roadHeight: 120,
        carsHalted: false,
        waitTime: 0,
        walkGranted: false,
        trafficLanes: [
          { y: currentY + 30, dir: -1, speed: 3.1 + Math.random() * 0.5 },
          { y: currentY + 90, dir: 1, speed: 2.9 + Math.random() * 0.5 }
        ]
      };
      currentY += 120; // past the road

      // Block k sits below Road k
      const blockH = (k === 0) ? 760 : 720;
      const availThemes = intermediateThemes.filter(th => th !== lastTheme);
      const theme = (k === 0) ? 'block_1' : availThemes[Math.floor(Math.random() * availThemes.length)];
      lastTheme = theme;

      const block = {
        id: k,
        top: currentY,
        bottom: currentY + blockH,
        theme: theme
      };
      currentY += blockH;

      tempRoads.unshift(road);
      tempBlocks.unshift(block);
    }

    // Road 0 is at index 0, Block 0 is at index 0. Goal block is at index numTrials.
    const goalBlock = {
      id: numTrials,
      top: goalBlockTop,
      bottom: goalBlockBottom,
      theme: 'block_5'
    };

    this.crossingZones = tempRoads;
    this.blocks = [...tempBlocks, goalBlock];

    // Set player starting Y on Block 0
    this.startY = this.blocks[0].bottom - 120;
    this.worldHeight = this.blocks[0].bottom + 400;

    // Apply specific entity state to each road:
    this.crossingZones.forEach((zone) => {
      if (zone.trialType === 'GROUP_CROSSING') {
        zone.hasGroupCrossing = true;
        zone.hasCrossingGuard = false;
        zone.hasBridge = false;
        zone.noCrosswalk = false;
        zone.signalState = 'STOP';

        zone.groupOf2 = {
          zoneId: zone.id,
          x: this.pathCenterX - 24,
          y: zone.southCurbY + 18,
          startX: this.pathCenterX - 24,
          startY: zone.southCurbY + 18,
          targetY: zone.northCurbY - 14,
          drawW: 76,
          drawH: 58,
          speed: 1.35,
          isWalking: false,
          animFrame: 0,
          state: 'WAITING'
        };

        zone.groupOf3 = {
          zoneId: zone.id,
          x: this.pathCenterX + 24,
          y: zone.southCurbY + 18,
          startX: this.pathCenterX + 24,
          startY: zone.southCurbY + 18,
          targetY: zone.northCurbY - 14,
          drawW: 98,
          drawH: 58,
          speed: 1.35,
          isWalking: false,
          animFrame: 0,
          state: 'WAITING'
        };

      } else if (zone.trialType === 'CROSSING_GUARD') {
        zone.hasCrossingGuard = true;
        zone.hasGroupCrossing = false;
        zone.hasBridge = false;
        zone.noCrosswalk = false;
        zone.signalState = 'STOP';

        zone.crossingGuard = {
          zoneId: zone.id,
          x: this.pathCenterX + 44,
          y: zone.southCurbY + 14,
          targetX: this.pathCenterX + 44,
          targetY: zone.southCurbY + 14,
          state: 'WAIT_ON_CURB',
          animTimer: 0,
          whistlePlayed: false
        };

      } else if (zone.trialType === 'PEDESTRIAN_BRIDGE') {
        zone.hasBridge = true;
        zone.noCrosswalk = true;
        zone.hasGroupCrossing = false;
        zone.hasCrossingGuard = false;
        zone.signalState = 'NO_CROSSWALK';

        // Randomize whether bridge is on the right (+1) or left (-1)!
        const sideDir = Math.random() < 0.5 ? 1 : -1;
        zone.bridge = {
          sideDir: sideDir,
          zoneId: zone.id,
          x: this.pathCenterX + (sideDir * 120),
          y: zone.roadCenterY,
          drawW: 124,
          drawH: 224,
          southStairY: zone.southCurbY + 44,
          northStairY: zone.northCurbY - 44
        };

      } else if (zone.trialType === 'TRAFFIC_LIGHT') {
        zone.hasBridge = false;
        zone.noCrosswalk = false;
        zone.hasGroupCrossing = false;
        zone.hasCrossingGuard = false;
        // Sometimes solid STOP hand, sometimes FLASHING blinking light!
        zone.initialSignalState = Math.random() < 0.5 ? 'STOP' : 'FLASHING';
        zone.signalState = zone.initialSignalState;
        zone.pedestrianButtonPressed = false;
      }
    });

    // Generate Random Strangers with Dogs across intermediate sidewalk blocks [1 to numTrials-1]:
    const dogPool = [
      { name: 'Elena & Biscuit', spriteIndex: 3, decision: 'THUMBS_UP', speechText: 'Sure! You can pet Biscuit! Friendly pup! 🐶' },
      { name: 'David & Rex', spriteIndex: 5, decision: 'THUMBS_DOWN', speechText: 'No, please don’t pet! Rex is nervous! Walk away! ⚠️' },
      { name: 'Maya & Peanut', spriteIndex: 0, decision: 'THUMBS_UP', speechText: 'Peanut loves friends! Give him a gentle pat! 🐕' },
      { name: 'Victor & Spike', spriteIndex: 1, decision: 'THUMBS_DOWN', speechText: 'Grrr! Spike is grumpy today! Please back away! 🛑' },
      { name: 'Chloe & Daisy', spriteIndex: 2, decision: 'THUMBS_UP', speechText: 'Daisy is super gentle! She wags her tail for you! 🌸' },
      { name: 'Marcus & Shadow', spriteIndex: 4, decision: 'THUMBS_DOWN', speechText: 'Shadow gets startled easily! Keep a safe distance! ⚠️' }
    ];

    this.strangersWithDogs = [];
    const availableBlocks = [];
    for (let b = 1; b < numTrials; b++) {
      availableBlocks.push(b);
    }
    const shuffledBlockIds = availableBlocks.sort(() => Math.random() - 0.5);
    const countDogs = Math.min(dogPool.length, Math.max(2, Math.round(availableBlocks.length * 0.65)));

    for (let i = 0; i < countDogs; i++) {
      const blockId = shuffledBlockIds[i];
      const blk = this.blocks[blockId];
      if (!blk) continue;

      const template = dogPool[i % dogPool.length];
      const side = Math.random() < 0.5 ? -1 : 1;
      const dogX = this.pathCenterX + (side * 46);
      const dogY = Math.round((blk.top + blk.bottom) / 2) + Math.round((Math.random() - 0.5) * 80);

      this.strangersWithDogs.push({
        id: `dog_${blockId}_${i}`,
        name: template.name,
        spriteIndex: template.spriteIndex,
        x: dogX,
        y: dogY,
        drawW: 66,
        drawH: 66,
        interacted: false,
        decision: template.decision,
        speechText: template.speechText,
        initialDist: null,
        status: 'IDLE'
      });
    }

    // Generate Stranger Near Van Hazards (parked either right below or above a road!)
    this.strangerVans = [];
    const numVans = Math.max(1, Math.min(3, Math.round(numTrials * 0.35)));
    const candidateZones = this.crossingZones.filter(z => !z.hasBridge);
    const shuffledZones = candidateZones.sort(() => Math.random() - 0.5);

    for (let v = 0; v < Math.min(numVans, shuffledZones.length); v++) {
      const zone = shuffledZones[v];
      const isBelow = Math.random() < 0.5;
      const side = Math.random() < 0.5 ? -1 : 1;
      const vanY = isBelow ? (zone.southCurbY + 68) : (zone.northCurbY - 68);
      const vanX = this.pathCenterX + (side * 92);
      const strangerX = side === -1 ? (vanX + 31) : (vanX - 31);
      const strangerY = vanY + 8;

      this.strangerVans.push({
        id: `van_${zone.id}_${v}`,
        zoneId: zone.id,
        position: isBelow ? 'BELOW_ROAD' : 'ABOVE_ROAD',
        side: side,
        spriteKey: side === -1 ? 'right' : 'left',
        x: vanX,
        y: vanY,
        drawW: 136,
        drawH: 116,
        strangerX: strangerX,
        strangerY: strangerY,
        avoided: false
      });
    }
  }

  getDirection8(dx, dy) {
    const angle = Math.atan2(dy, dx);
    const norm = angle >= 0 ? angle : angle + Math.PI * 2;
    // 8 sectors of 45° (PI/4 rad), offset by 22.5° (PI/8 rad)
    const sector = Math.floor(((norm + Math.PI / 8) % (Math.PI * 2)) / (Math.PI / 4));
    const dirs = ['right', 'down_right', 'down', 'down_left', 'left', 'up_left', 'up', 'up_right'];
    return dirs[sector] || 'up';
  }

  getCanvasWorldCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const canvasX = (clientX - rect.left) * (this.canvas.width / rect.width);
    const canvasY = (clientY - rect.top) * (this.canvas.height / rect.height);

    if (this.state === 'STORE_SHOPPING') {
      const storeScale = this.canvas.width / 1024;
      const worldX = canvasX / storeScale;
      const worldY = canvasY / storeScale;
      return { worldX, worldY, canvasX, canvasY };
    }

    const worldX = (canvasX - this.offsetX) / this.scale;
    const worldY = (canvasY / this.scale) + this.cameraY;

    return { worldX, worldY, canvasX, canvasY };
  }

  initCanvasResize() {
    const resize = () => {
      const box = document.getElementById('game-screen-box') || this.canvas.parentElement;
      const rect = box.getBoundingClientRect();
      const w = Math.floor(rect.width) || 480;
      const h = Math.floor(rect.height) || 480;

      this.canvas.width = w;
      this.canvas.height = h;

      // Scale so that worldWidth (768) matches the square box width
      this.scale = this.canvas.width / this.worldWidth;
      this.offsetX = 0;

      if (this.state === 'START_MENU') {
        this.cameraY = 1350 - (this.canvas.height / this.scale) * 0.55;
      }
    };
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) {
      const box = document.getElementById('game-screen-box');
      if (box) {
        new ResizeObserver(resize).observe(box);
      }
    }
    requestAnimationFrame(resize);
    resize();
  }

  bindEvents() {
    // Character Selection
    const boyBtn = document.getElementById('select-boy');
    const girlBtn = document.getElementById('select-girl');

    boyBtn.addEventListener('click', () => {
      this.selectedChar = 'boy';
      boyBtn.classList.add('selected');
      girlBtn.classList.remove('selected');
      if (this.progressAvatarImg) {
        this.progressAvatarImg.src = 'assets/characters/boy/face.png';
      }
      sfx.playTone(400, 'sine', 0.1);
    });

    girlBtn.addEventListener('click', () => {
      this.selectedChar = 'girl';
      girlBtn.classList.add('selected');
      boyBtn.classList.remove('selected');
      if (this.progressAvatarImg) {
        this.progressAvatarImg.src = 'assets/characters/girl/face.png';
      }
      sfx.playTone(450, 'sine', 0.1);
    });

    // Stay & Walk Picture Buttons
    const stayBtn = document.getElementById('btn-choice-stay');
    const walkBtn = document.getElementById('btn-choice-walk');

    if (stayBtn) {
      stayBtn.addEventListener('click', () => {
        this.handlePictureAction('STAY');
      });
    }

    if (walkBtn) {
      walkBtn.addEventListener('click', () => {
        this.handlePictureAction('WALK');
      });
    }

    // Start Button
    document.getElementById('start-game-btn').addEventListener('click', () => {
      sfx.init();
      sfx.playTone(523, 'triangle', 0.2);
      this.startGame();
    });

    // Level Mode Selection (Level 1: Bakery Walk vs Level 2: Grocery Store Adventure)
    if (this.selectLevel1) {
      this.selectLevel1.addEventListener('click', () => {
        sfx.playTone(420, 'sine', 0.1);
        this.setLevel(1);
      });
    }

    if (this.selectLevel2) {
      this.selectLevel2.addEventListener('click', () => {
        sfx.playTone(560, 'sine', 0.1);
        this.setLevel(2);
      });
    }

    // Play Again Button (Victory Modal - Level 1)
    document.getElementById('play-again-btn').addEventListener('click', () => {
      sfx.playTone(523, 'triangle', 0.2);
      this.resetToStartMenu();
    });

    // Store Checkout Modal Buttons (Level 2)
    if (this.storePlayAgainBtn) {
      this.storePlayAgainBtn.addEventListener('click', () => {
        sfx.playTone(523, 'triangle', 0.2);
        if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
        this.setLevel(2);
        this.startGame();
      });
    }

    if (this.storeMainMenuBtn) {
      this.storeMainMenuBtn.addEventListener('click', () => {
        sfx.buttonPress();
        if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
        this.resetToStartMenu();
      });
    }

    // Toggle Shopping List Clipboard Minimize / Expand
    const toggleListBtn = document.getElementById('btn-toggle-list');
    const shoppingClipboard = document.querySelector('.shopping-clipboard');
    if (toggleListBtn && shoppingClipboard) {
      toggleListBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.buttonPress();
        shoppingClipboard.classList.toggle('minimized');
        toggleListBtn.textContent = shoppingClipboard.classList.contains('minimized') ? '➕' : '➖';
      });
    }

    // Checkout Mini-Game Payment Buttons
    const payOneBtn = document.getElementById('btn-pay-one');
    if (payOneBtn) payOneBtn.addEventListener('click', () => this.handleCheckoutMoneyInput(1.00));

    const payFiveBtn = document.getElementById('btn-pay-five');
    if (payFiveBtn) payFiveBtn.addEventListener('click', () => this.handleCheckoutMoneyInput(5.00));

    const payQuarterBtn = document.getElementById('btn-pay-quarter');
    if (payQuarterBtn) payQuarterBtn.addEventListener('click', () => this.handleCheckoutMoneyInput(0.25));

    const payCardBtn = document.getElementById('btn-pay-card');
    if (payCardBtn) payCardBtn.addEventListener('click', () => this.handleCheckoutCardTap());

    // Button to start walking back home from checkout
    const btnTakeHome = document.getElementById('btn-take-groceries-home');
    if (btnTakeHome) {
      btnTakeHome.addEventListener('click', () => {
        sfx.buttonPress();
        this.startWalkHome();
      });
    }

    // Home Arrival Victory Modal Buttons (Level 2 Completion)
    const homePlayAgain = document.getElementById('home-play-again-btn');
    if (homePlayAgain) {
      homePlayAgain.addEventListener('click', () => {
        sfx.playTone(523, 'triangle', 0.2);
        this.startLevel2StoreGame();
      });
    }

    const homeMainMenu = document.getElementById('home-main-menu-btn');
    if (homeMainMenu) {
      homeMainMenu.addEventListener('click', () => {
        sfx.buttonPress();
        if (this.homeVictoryModal) this.homeVictoryModal.classList.add('hidden');
        this.resetToStartMenu();
      });
    }

    // Safety Practice Again Button (Game Over Modal)
    const practiceAgainBtn = document.getElementById('practice-again-btn');
    if (practiceAgainBtn) {
      practiceAgainBtn.addEventListener('click', () => {
        sfx.buttonPress();
        if (this.gameOverModal) this.gameOverModal.classList.add('hidden');
        this.startGame();
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        sfx.enabled = !sfx.enabled;
        soundBtn.textContent = sfx.enabled ? '🔊' : '🔇';
        if (sfx.enabled) sfx.playTone(600, 'sine', 0.15);
      });
    }

    // Info Modal Event Listeners
    const openInfoModal = () => {
      if (this.infoModal) {
        this.infoModal.classList.remove('hidden');
        // Release walking keys
        this.keys.up = false;
        this.keys.down = false;
        this.keys.left = false;
        this.keys.right = false;
        this.resetButtonStyles();
        sfx.tick();
      }
    };

    const closeInfoModal = () => {
      if (this.infoModal) {
        this.infoModal.classList.add('hidden');
        sfx.tick();
      }
    };

    if (this.infoBtn) {
      this.infoBtn.addEventListener('click', openInfoModal);
    }
    if (this.btnCloseInfo) {
      this.btnCloseInfo.addEventListener('click', closeInfoModal);
    }
    if (this.btnGotItInfo) {
      this.btnGotItInfo.addEventListener('click', closeInfoModal);
    }

    // Close Info modal when clicking the blurred backdrop
    if (this.infoModal) {
      this.infoModal.addEventListener('click', (e) => {
        if (e.target === this.infoModal) {
          closeInfoModal();
        }
      });
    }

    // Close Info modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.infoModal && !this.infoModal.classList.contains('hidden')) {
        closeInfoModal();
      }
    });

    // ========================================================================
    // KEYBOARD CONTROLS (ALL 4 DIRECTIONS & DIAGONALS: W/A/S/D & ARROW KEYS)
    // ========================================================================
    const isUpKey = (e) => ['ArrowUp', 'KeyW'].includes(e.code) || ['ArrowUp', 'w', 'W'].includes(e.key);
    const isDownKey = (e) => ['ArrowDown', 'KeyS'].includes(e.code) || ['ArrowDown', 's', 'S'].includes(e.key);
    const isLeftKey = (e) => ['ArrowLeft', 'KeyA'].includes(e.code) || ['ArrowLeft', 'a', 'A'].includes(e.key);
    const isRightKey = (e) => ['ArrowRight', 'KeyD'].includes(e.code) || ['ArrowRight', 'd', 'D'].includes(e.key);

    window.addEventListener('keydown', (e) => {
      if (this.infoModal && !this.infoModal.classList.contains('hidden')) {
        return;
      }

      if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL' && this.state !== 'STORE_SHOPPING' &&
          this.state !== 'WALKING_HOME_SIDEWALK' && this.state !== 'CROSSING_ROAD_HOME' && this.state !== 'WALKING_HOME_TO_DOOR') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (this.btnAction) this.btnAction.classList.add('pressed');
        this.handleSpaceAction();
        return;
      }

      if (isUpKey(e)) {
        this.keys.up = true;
        if (this.btnUp) this.btnUp.classList.add('pressed');
        e.preventDefault();
      } else if (isDownKey(e)) {
        this.keys.down = true;
        if (this.btnDown) this.btnDown.classList.add('pressed');
        e.preventDefault();
      } else if (isLeftKey(e)) {
        this.keys.left = true;
        if (this.btnLeft) this.btnLeft.classList.add('pressed');
        e.preventDefault();
      } else if (isRightKey(e)) {
        this.keys.right = true;
        if (this.btnRight) this.btnRight.classList.add('pressed');
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        if (this.btnAction) this.btnAction.classList.remove('pressed');
      }
      if (isUpKey(e)) {
        this.keys.up = false;
        if (this.btnUp) this.btnUp.classList.remove('pressed');
      } else if (isDownKey(e)) {
        this.keys.down = false;
        if (this.btnDown) this.btnDown.classList.remove('pressed');
      } else if (isLeftKey(e)) {
        this.keys.left = false;
        if (this.btnLeft) this.btnLeft.classList.remove('pressed');
      } else if (isRightKey(e)) {
        this.keys.right = false;
        if (this.btnRight) this.btnRight.classList.remove('pressed');
      }
    });

    // ========================================================================
    // MOUSE & POINTER FOLLOWING CONTROLS (MOVE IN ALL DIRECTIONS ON CLICK / DRAG)
    // ========================================================================
    const onPointerDown = (e) => {
      if (this.infoModal && !this.infoModal.classList.contains('hidden')) return;
      if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL' && this.state !== 'STORE_SHOPPING' &&
          this.state !== 'WALKING_HOME_SIDEWALK' && this.state !== 'CROSSING_ROAD_HOME' && this.state !== 'WALKING_HOME_TO_DOOR') {
        return;
      }
      if (e.target !== this.canvas) return;

      e.preventDefault();
      const coords = this.getCanvasWorldCoords(e);
      if (this.state === 'STORE_SHOPPING') {
        if (this.checkStoreItemClick(coords.worldX, coords.worldY)) {
          return;
        }
        if (this.checkStoreCashierClick(coords.worldX, coords.worldY)) {
          return;
        }
      }
      if (this.checkSignalButtonClick(coords.worldX, coords.worldY)) {
        return;
      }
      if (this.checkStrangerClick(coords.worldX, coords.worldY)) {
        return;
      }
      this.mouseControl.isDown = true;
      this.mouseControl.targetWorldX = coords.worldX;
      this.mouseControl.targetWorldY = coords.worldY;
    };

    const onPointerMove = (e) => {
      if (!this.mouseControl.isDown) return;
      const coords = this.getCanvasWorldCoords(e);
      this.mouseControl.targetWorldX = coords.worldX;
      this.mouseControl.targetWorldY = coords.worldY;
    };

    const onPointerUp = () => {
      if (this.mouseControl.isDown) {
        this.mouseControl.isDown = false;
        this.mouseControl.targetWorldX = null;
        this.mouseControl.targetWorldY = null;
      }
    };

    this.canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // On-Screen Directional Touch & Mouse Buttons (4-way D-Pad)
    const setupCtrlBtn = (btn, dirKey) => {
      if (!btn) return;
      const startPress = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL' && this.state !== 'STORE_SHOPPING' &&
            this.state !== 'WALKING_HOME_SIDEWALK' && this.state !== 'CROSSING_ROAD_HOME' && this.state !== 'WALKING_HOME_TO_DOOR') {
          return;
        }
        this.keys[dirKey] = true;
        btn.classList.add('pressed');
      };

      const endPress = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.keys[dirKey] = false;
        btn.classList.remove('pressed');
      };

      btn.addEventListener('mousedown', startPress);
      btn.addEventListener('mouseup', endPress);
      btn.addEventListener('mouseleave', endPress);
      btn.addEventListener('touchstart', startPress, { passive: false });
      btn.addEventListener('touchend', endPress, { passive: false });
      btn.addEventListener('touchcancel', endPress, { passive: false });
    };

    setupCtrlBtn(this.btnUp, 'up');
    setupCtrlBtn(this.btnDown, 'down');
    setupCtrlBtn(this.btnLeft, 'left');
    setupCtrlBtn(this.btnRight, 'right');

    // On-Screen Interactive Action Button (Spacebar replacement for touch screen)
    if (this.btnAction) {
      const triggerAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.btnAction.classList.add('pressed');
        sfx.tick();
        this.handleSpaceAction();
        setTimeout(() => {
          if (this.btnAction) this.btnAction.classList.remove('pressed');
        }, 160);
      };

      this.btnAction.addEventListener('mousedown', triggerAction);
      this.btnAction.addEventListener('touchstart', triggerAction, { passive: false });
    }
  }

  setupTraffic() {
    this.cars = [];
    const regularCarTypes = ['car_1', 'car_2', 'car_3', 'car_4', 'car_5'];

    this.crossingZones.forEach(zone => {
      zone.trafficLanes.forEach((lane, laneIdx) => {
        // 2 nicely spaced cars per lane
        for (let i = 0; i < 2; i++) {
          const spawnX = lane.dir === 1 ? -90 - i * 420 : this.worldWidth + 90 + i * 420;
          const carType = regularCarTypes[(zone.id * 2 + laneIdx + i) % regularCarTypes.length];
          this.cars.push({
            zoneId: zone.id,
            x: spawnX,
            y: lane.y,
            dir: lane.dir,
            speed: lane.speed + (Math.random() - 0.5) * 0.3,
            currentSpeed: lane.speed,
            type: carType,
            drawW: 86,
            drawH: 86,
            isBraking: false
          });
        }
      });
    });
  }

  startGame() {
    this.currentCrossingIndex = 0;
    this.safetyStars = 0;
    this.safetyChances = 3;
    this.lastSafetyTip = '';
    this.hasEverFallen = false;
    this.cybertruckSpawned = false;
    this.cybertruckFinished = false;
    if (this.starCountEl) this.starCountEl.textContent = '0';
    this.updateSafetyChancesDisplay();
    this.activeInWorldAlert = null;

    if (this.progressAvatarImg) {
      this.progressAvatarImg.src = this.selectedChar === 'girl'
        ? 'assets/characters/girl/face.png'
        : 'assets/characters/boy/face.png';
    }

    // Reset In-World Signals at the intersection corners
    this.randomizeTrialsAndEnvironments();

    // Player positioned dead-center on the lower sidewalk
    this.player.x = this.pathCenterX;
    this.player.y = this.startY;
    this.player.facing = 'up'; // Defaults to facing forward (walking away)
    this.player.walkAnimFrame = 0;
    this.player.isWalking = false;
    this.player.isFalling = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.withGroup = false;
    this.player.onBridge = false;
    this.player.isPettingDog = false;
    this.player.pettingFrame = 0;
    this.player.pettingTimer = 0;
    this.pettingSequence = null;

    // Immediately position camera centered on player so the world slides from the very first step
    this.cameraY = this.player.y - (this.canvas.height / this.scale) * 0.55;

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    if (this.destinationIconEl) this.destinationIconEl.textContent = this.destination.icon;
    if (this.destinationTextEl) this.destinationTextEl.textContent = `Heading to ${this.destination.title}`;
    if (this.endPointLabelEl) this.endPointLabelEl.textContent = this.gameLevel === 2 ? '🛒 Fresh Market' : '🧁 Bakery & Park';

    this.startMenu.classList.add('hidden');
    this.victoryModal.classList.add('hidden');
    if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
    if (this.checkoutMinigameModal) this.checkoutMinigameModal.classList.add('hidden');
    if (this.homeVictoryModal) this.homeVictoryModal.classList.add('hidden');
    if (this.storeHud) this.storeHud.classList.add('hidden');
    if (this.gameOverModal) this.gameOverModal.classList.add('hidden');
    this.challengeModal.classList.add('hidden'); // Modal is never used now!
    this.gameHud.classList.remove('hidden');
    this.progressHud.classList.remove('hidden');
    if (this.walkingControls) this.walkingControls.classList.remove('hidden');
    if (this.movementGuide) this.movementGuide.classList.remove('hidden');

    this.isWalkingHome = false;
    this.hasGroceries = false;
    this.returnCrossingIndex = 0;

    this.setupTraffic();
    this.updateProgressBar();
    this.state = 'WALKING_SIDEWALK';
  }

  updateProgressBar() {
    let pct = 0;
    if (this.isWalkingHome) {
      const returnDist = this.player.y - this.destinationY;
      const totalReturn = this.startY - this.destinationY;
      pct = Math.max(0, Math.min(100, Math.round((returnDist / totalReturn) * 100)));
      if (this.destinationTextEl) {
        this.destinationTextEl.textContent = 'Heading Back Home with Groceries 🏡🛍️';
      }
    } else {
      const totalDist = this.startY - this.destinationY;
      const currentDist = this.startY - this.player.y;
      pct = Math.max(0, Math.min(100, Math.round((currentDist / totalDist) * 100)));
      if (this.destinationTextEl) {
        const crossingNum = Math.min(this.totalCrossings, this.currentCrossingIndex + 1);
        this.destinationTextEl.textContent = `Crossing ${crossingNum} of ${this.totalCrossings} • ${this.destination.title}`;
      }
    }

    if (this.progressFillEl) this.progressFillEl.style.width = `${pct}%`;
    if (this.progressAvatarMarker) this.progressAvatarMarker.style.left = `${pct}%`;
  }

  // ==========================================================================
  // MAIN ANIMATION & UPDATE LOOP
  // ==========================================================================
  animate(timestamp) {
    const dt = Math.min(0.08, (timestamp - this.lastTime) / 1000);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.animate);
  }

  update(dt) {
    if (this.state === 'STORE_SHOPPING') {
      this.updateStore(dt);
      return;
    }

    this.updateTraffic(dt);
    this.updateCrossingGuard(dt);
    this.updateGroupCrossing(dt);
    this.updateStrangersWithDogs(dt);
    this.updateStrangerVans(dt);
    this.updatePedestrianBridge(dt);
    this.updatePettingDog(dt);
    this.updateTouchActionButton();

    if (this.confettiParticles.length > 0) {
      this.confettiParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.vRot;
      });
      this.confettiParticles = this.confettiParticles.filter(p => p.y < this.canvas.height + 50);
    }

    // Update floating in-world alerts
    if (this.activeInWorldAlert) {
      this.activeInWorldAlert.timer -= dt;
      if (this.activeInWorldAlert.timer <= 0) {
        this.activeInWorldAlert = null;
      }
    }

    if (this.state === 'START_MENU') {
      const targetCamY = (this.startY - 180) - (this.canvas.height / this.scale) * 0.55;
      this.cameraY += (targetCamY - this.cameraY) * 0.1;
      return;
    }

    // ========================================================================
    // PETTING DOG SEQUENCE (Smooth approach & 7-frame animation)
    // ========================================================================
    if (this.state === 'PETTING_DOG') {
      const idealCamY = this.player.y - (this.canvas.height / this.scale) * 0.55;
      this.cameraY += (idealCamY - this.cameraY) * 0.2;
      return;
    }

    // ========================================================================
    // PLAYER FALLING DOWN SEQUENCE (When walking forward at the wrong time!)
    // ========================================================================
    if (this.state === 'PLAYER_FALLING') {
      this.player.isWalking = false;
      this.player.fallTimer += dt;
      const t = this.player.fallTimer;

      // Custom Timing:
      // 0.00s - 0.12s: Frame 0 (stumble)
      // 0.12s - 0.25s: Frame 1 (losing balance)
      // 0.25s - 0.40s: Frame 2 (mid-fall backward)
      // 0.40s - 2.25s: Frame 3 (SEATED ON GROUND - 1.85 seconds of sitting on bottom!)
      // 2.25s - 2.50s: Frame 4 (start getting up)
      // 2.50s - 2.70s: Frame 5 (halfway up)
      // 2.70s - 2.90s: Frame 6 (regaining balance)
      // 2.90s - 3.15s: Frame 7 (recovered standing)
      let frame = 0;
      if (t < 0.12) {
        frame = 0;
      } else if (t < 0.25) {
        frame = 1;
      } else if (t < 0.40) {
        frame = 2;
      } else if (t < 2.25) {
        frame = 3; // Sitting on the ground!
        if (!this.player.hasThudded) {
          this.player.hasThudded = true;
          sfx.thud();
        }
      } else if (t < 2.50) {
        frame = 4;
      } else if (t < 2.70) {
        frame = 5;
      } else if (t < 2.90) {
        frame = 6;
      } else {
        frame = 7;
      }
      this.player.fallFrame = frame;

      // Gently retreat character backward onto the safe sidewalk curb ONLY if fallTargetY was set (e.g. road crossing mistakes)
      if (this.player.fallTargetY !== null && this.player.fallTargetY !== undefined) {
        this.player.y += (this.player.fallTargetY - this.player.y) * 0.12;
      }

      // Complete fall & recovered standing:
      if (t >= 3.15) {
        this.player.isFalling = false;
        this.player.hasThudded = false;
        this.player.fallFrame = 0;
        this.player.fallTimer = 0;
        this.player.facing = this.isWalkingHome ? 'down' : 'up';
        if (this.player.fallTargetY !== null && this.player.fallTargetY !== undefined) {
          this.player.y = this.player.fallTargetY;
        }
        this.player.fallTargetY = null;

        if (this.safetyChances <= 0) {
          this.triggerGameOver();
          return;
        }

        this.state = this.isWalkingHome ? 'WALKING_HOME_SIDEWALK' : 'WALKING_SIDEWALK';
      }

      // Camera smoothly follows player
      const idealCamY = this.player.y - (this.canvas.height / this.scale) * 0.55;
      this.cameraY += (idealCamY - this.cameraY) * 0.2;
      return;
    }

    // ========================================================================
    // INTERACTIVE WALKING MOVEMENT (MOUSE FOLLOWING & KEYBOARD CONTROLS)
    // ========================================================================
    const canMove = (
      this.state === 'WALKING_SIDEWALK' ||
      this.state === 'CROSSING_ROAD' ||
      this.state === 'WALKING_TO_GOAL' ||
      this.state === 'WALKING_HOME_SIDEWALK' ||
      this.state === 'CROSSING_ROAD_HOME' ||
      this.state === 'WALKING_HOME_TO_DOOR'
    );

    if (canMove) {
      let moveVx = 0;
      let moveVy = 0;
      let isMoving = false;

      // 1. Mouse / Touch Pointer Following (When mouse is clicked/held down)
      if (this.mouseControl.isDown && this.mouseControl.targetWorldX !== null) {
        const dx = this.mouseControl.targetWorldX - this.player.x;
        const dy = this.mouseControl.targetWorldY - this.player.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 8) {
          isMoving = true;
          this.player.facing = this.getDirection8(dx, dy);
          const stepSpeed = this.player.speed * 60 * dt;
          const step = Math.min(dist, stepSpeed);
          moveVx = (dx / dist) * step;
          moveVy = (dy / dist) * step;
        }
      } else if (this.keys.up || this.keys.down || this.keys.left || this.keys.right) {
        // 2. Keyboard & On-Screen Button Controls:
        let kx = 0;
        let ky = 0;
        if (this.keys.up) ky -= 1;
        if (this.keys.down) ky += 1;
        if (this.keys.left) kx -= 1;
        if (this.keys.right) kx += 1;

        if (kx !== 0 || ky !== 0) {
          const kDist = Math.hypot(kx, ky);
          isMoving = true;
          this.player.facing = this.getDirection8(kx, ky);
          const speed = this.player.speed * 60 * dt;
          moveVx = (kx / kDist) * speed;
          moveVy = (ky / kDist) * speed;
        }
      }

      if (isMoving) {
        this.player.isWalking = true;
        this.player.x += moveVx;
        this.player.y += moveVy;
        this.player.walkAnimFrame += dt * 9;
        this.stepSoundCheck();
      } else {
        this.player.isWalking = false;
      }

      // Constrain player horizontally within world screen boundaries
      this.player.x = Math.max(40, Math.min(this.worldWidth - 40, this.player.x));

      if (this.isWalkingHome) {
        this.updateWalkHome(dt);
        const idealCamY = this.player.y - (this.canvas.height / this.scale) * 0.55;
        this.cameraY += (idealCamY - this.cameraY) * 0.25;
        return;
      }

      // Constrain player within playable world boundaries:
      // Cannot walk off bottom of world or back across previous road
      const maxBottomY = (this.currentCrossingIndex === 0) ? (this.startY + 20) : (this.crossingZones[this.currentCrossingIndex - 1].northCurbY + 12);
      if (this.player.y > maxBottomY) {
        this.player.y = maxBottomY;
      }

      // 1. AT OR APPROACHING CROSSWALK / INTERSECTION:
      const currentZone = this.crossingZones[this.currentCrossingIndex];
      if (currentZone) {
        // SPECIAL INTERSECTION: ROAD WITH PEDESTRIAN FOOTBRIDGE (NO STREET CROSSWALK)
        if (currentZone.hasBridge) {
          const bridge = currentZone.bridge || this.pedestrianBridge;
          const isAtBridgeStairs = (this.player.y <= currentZone.southCurbY + 46 &&
                                    this.player.y >= currentZone.northCurbY - 46 &&
                                    Math.abs(this.player.x - bridge.x) <= 38);
          if (isAtBridgeStairs) {
            this.player.onBridge = true;
            this.player.x = Math.max(bridge.x - 26, Math.min(bridge.x + 26, this.player.x));
            if (this.player.y < currentZone.southCurbY) {
              this.state = 'CROSSING_ROAD';
            }
          } else {
            // Player is NOT on the footbridge:
            // If user chooses to step directly onto the road, they fall down!
            if (this.player.y < currentZone.southCurbY && this.player.y > currentZone.northCurbY && !this.player.onBridge) {
              this.triggerPlayerFallFromDangerousRoad(currentZone);
              return;
            }
          }
        } else {
          // Standard Crosswalks (Group Crossing, Crossing Guard, Traffic Light)
          const isNearCurb = (this.player.y <= currentZone.southCurbY + 80 && this.player.y >= currentZone.southCurbY - 4);

          // A. SAFE WAITING ON SIDEWALK:
          if (currentZone.signalState !== 'WALK') {
            const isWalkingIntoRoad = (this.keys.up || (this.mouseControl.isDown && this.mouseControl.targetWorldY < currentZone.southCurbY));
            if (isNearCurb && !isWalkingIntoRoad) {
              currentZone.waitTime = (currentZone.waitTime || 0) + dt;

              if (currentZone.hasGroupCrossing) {
                // Group Crossing: Wait safely on the curb together!
                const g2 = currentZone.groupOf2 || this.groupOf2;
                const g3 = currentZone.groupOf3 || this.groupOf3;
                if (currentZone.waitTime >= 2.0 && !currentZone.walkGranted) {
                  currentZone.signalState = 'WALK';
                  currentZone.walkGranted = true;
                  currentZone.carsHalted = true;
                  if (g2) {
                    g2.isWalking = true;
                    g2.state = 'CROSSING';
                  }
                  if (g3) {
                    g3.isWalking = true;
                    g3.state = 'CROSSING';
                  }
                  sfx.walkSignalChirp();
                  sfx.correct();
                  this.safetyStars++;
                  if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
                }
              } else if (currentZone.hasCrossingGuard) {
                // Crossing guard manages wait & stepping out in updateCrossingGuard()
              } else {
                // Traditional Traffic Light Trial:
                // Player must press the crosswalk button (SPACEBAR or tap/click) first!
                if (currentZone.pedestrianButtonPressed) {
                  currentZone.waitTime = (currentZone.waitTime || 0) + dt;
                  if (currentZone.waitTime >= 2.5 && !currentZone.walkGranted) {
                    currentZone.signalState = 'WALK';
                    currentZone.walkGranted = true;
                    currentZone.carsHalted = true;
                    sfx.walkSignalChirp();
                    sfx.correct();
                    this.safetyStars++;
                    if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
                    this.showInWorldFeedback('🟢 Walk sign is on! Safe to cross now! 🚶', '#2e7d32');
                  }
                }
              }
            }

            // B. WRONG TIME CHECK: Player walks forward into the road while signal is STOP!
            if (this.player.y < currentZone.southCurbY && this.player.y > currentZone.northCurbY) {
              this.triggerPlayerFall(currentZone);
              return;
            }
          } else {
            // Signal is WALK!
            if (this.player.y < currentZone.southCurbY && this.player.y > currentZone.northCurbY) {
              this.state = 'CROSSING_ROAD';

              // If Group Crossing: Make sure you don't run ahead of the people walking!
              // If you do, the people will stop and the character will fall down!
              const g2 = currentZone.groupOf2 || this.groupOf2;
              const g3 = currentZone.groupOf3 || this.groupOf3;
              if (currentZone.hasGroupCrossing && g2 && g3 && (g2.state === 'CROSSING' || g3.state === 'CROSSING')) {
                const leadGroupY = Math.min(g2.y, g3.y);
                if (this.player.y < leadGroupY - 14) {
                  // Player sprinted ahead of the walking people!
                  g2.isWalking = false;
                  g3.isWalking = false;
                  g2.state = 'STOPPED';
                  g3.state = 'STOPPED';
                  this.triggerPlayerFallFromGroup(currentZone);
                  return;
                }
              }
            }
          }
        }
      }

      // 2. CROSSING THE ROAD: Walking across zebra stripes or bridge to North Curb
      if (this.state === 'CROSSING_ROAD') {
        const currentZone = this.crossingZones[this.currentCrossingIndex];
        const bridge = currentZone && currentZone.bridge ? currentZone.bridge : this.pedestrianBridge;
        if (this.player.onBridge && bridge) {
          this.player.x = Math.max(bridge.x - 26, Math.min(bridge.x + 26, this.player.x));
        }
        // Safely reached the opposite sidewalk!
        if (currentZone && this.player.y <= currentZone.northCurbY) {
          this.player.y = currentZone.northCurbY;
          this.player.isWalking = false;
          this.mouseControl.isDown = false;
          if (this.player.onBridge) {
            this.player.onBridge = false;
          }
          this.finishRoadCrossing(currentZone);
        }
      }

      // 3. WALKING INTO FINAL DESTINATION
      if (this.state === 'WALKING_TO_GOAL') {
        if (this.player.y <= this.destinationY) {
          this.player.y = this.destinationY;
          this.player.isWalking = false;
          this.mouseControl.isDown = false;
          if (this.gameLevel === 2) {
            this.enterStoreScene();
          } else {
            this.triggerVictory();
          }
        }
      }

      this.updateProgressBar();
    }

    // Camera moves locked with the character so the image actually slides as the character walks
    const idealCamY = this.player.y - (this.canvas.height / this.scale) * 0.55;
    this.cameraY += (idealCamY - this.cameraY) * 0.25;
  }

  stepSoundCheck() {
    if (Math.floor(this.player.walkAnimFrame) % 4 === 0) {
      if (!this.lastStepFrame || this.lastStepFrame !== Math.floor(this.player.walkAnimFrame)) {
        sfx.step();
        this.lastStepFrame = Math.floor(this.player.walkAnimFrame);
      }
    }
  }

  updateTraffic(dt) {
    this.cars.forEach(car => {
      const zone = this.crossingZones[car.zoneId];
      let targetSpeed = car.speed;
      car.isBraking = false;

      // 1. Stop cars before the crosswalk if halted for pedestrian
      if (zone && zone.carsHalted) {
        const distToCrosswalk = car.dir === 1 ? (this.pathCenterX - 85 - car.x) : (car.x - (this.pathCenterX + 85));

        if (distToCrosswalk > 0 && distToCrosswalk < 160) {
          targetSpeed = 0;
          car.isBraking = true;
        }
      }

      // 2. Anti-Collision & Vehicle-Following Distance in the same lane
      let minGap = Infinity;
      let leadCar = null;

      for (const other of this.cars) {
        if (other === car) continue;
        if (other.zoneId !== car.zoneId || other.dir !== car.dir) continue;
        if (Math.abs(other.y - car.y) > 16) continue; // must be in same lane

        const gap = car.dir === 1 ? (other.x - car.x) : (car.x - other.x);
        if (gap > 0 && gap < minGap) {
          minGap = gap;
          leadCar = other;
        }
      }

      // If there is a vehicle ahead, maintain safe bumper-to-bumper stopping distance
      if (leadCar !== null) {
        // Minimum visual gap between vehicle centers (~86px wide car + 18px clear air = 104px)
        if (minGap < 104) {
          targetSpeed = 0;
          car.isBraking = true;
          // Hard physical barrier: strictly prevent cars from stopping on top of each other
          if (minGap <= 96) {
            car.currentSpeed = 0;
            if (car.dir === 1) {
              car.x = leadCar.x - 98;
            } else {
              car.x = leadCar.x + 98;
            }
          }
        } else if (minGap < 170) {
          // Smooth deceleration matching or falling behind lead car
          targetSpeed = Math.min(targetSpeed, Math.max(0, leadCar.currentSpeed * 0.75));
          car.isBraking = true;
        }
      }

      if (car.isBraking && !car.wasBraking && car.currentSpeed > 1) {
        sfx.carBrake();
      }
      car.wasBraking = car.isBraking;

      car.currentSpeed += (targetSpeed - car.currentSpeed) * 0.16;
      car.x += car.dir * car.currentSpeed * 60 * dt;
    });

    const regularCarTypes = ['car_1', 'car_2', 'car_3', 'car_4', 'car_5'];

    // Wrap regular traffic or permanently despawn Cybertruck (shows up only ONCE!)
    this.cars = this.cars.filter(car => {
      if (car.dir === 1 && car.x > this.worldWidth + 160) {
        if (car.isCybertruck) {
          this.cybertruckFinished = true;
          return false; // Remove Cybertruck: it only shows up ONCE!
        }
        // Avoid spawning on top of cars queued at the edge
        const laneCars = this.cars.filter(c => c !== car && c.zoneId === car.zoneId && c.dir === 1 && Math.abs(c.y - car.y) <= 16);
        const minX = laneCars.reduce((min, c) => Math.min(min, c.x), -160);
        car.x = Math.min(-160, minX - 160);
        car.type = regularCarTypes[Math.floor(Math.random() * regularCarTypes.length)];
      } else if (car.dir === -1 && car.x < -160) {
        if (car.isCybertruck) {
          this.cybertruckFinished = true;
          return false; // Remove Cybertruck: it only shows up ONCE!
        }
        const laneCars = this.cars.filter(c => c !== car && c.zoneId === car.zoneId && c.dir === -1 && Math.abs(c.y - car.y) <= 16);
        const maxX = laneCars.reduce((max, c) => Math.max(max, c.x), this.worldWidth + 160);
        car.x = Math.max(this.worldWidth + 160, maxX + 160);
        car.type = regularCarTypes[Math.floor(Math.random() * regularCarTypes.length)];
      }
      return true;
    });
  }

  spawnCybertruck() {
    if (this.cybertruckSpawned || this.hasEverFallen) return;
    this.cybertruckSpawned = true;

    const lastZone = this.crossingZones[this.crossingZones.length - 1];
    if (!lastZone) return;

    // Drives by once on the final road after user finishes the last crossing!
    this.cars.push({
      zoneId: lastZone.id,
      isCybertruck: true,
      type: 'cybertruck',
      x: -160,
      y: lastZone.trafficLanes[lastZone.trafficLanes.length - 1].y,
      dir: 1,
      speed: 3.4,
      currentSpeed: 3.4,
      drawW: 104,
      drawH: 104,
      isBraking: false
    });

    sfx.cyberChime();
  }

  updateCrossingGuard(dt) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasCrossingGuard || !zone.crossingGuard) return;
      const guard = zone.crossingGuard;
      guard.animTimer += dt;

      const isCurrentRoad = (this.currentCrossingIndex === zone.id);
      const playerNearCurb = isCurrentRoad && (this.player.y <= zone.southCurbY + 55 && this.player.y >= zone.southCurbY - 4);

      switch (guard.state) {
        case 'WAIT_ON_CURB': {
          guard.targetX = this.pathCenterX + 44;
          guard.targetY = zone.southCurbY + 12;

          // Keep guard on target curb spot
          guard.x += (guard.targetX - guard.x) * 0.15;
          guard.y += (guard.targetY - guard.y) * 0.15;

          // If player is waiting safely at the curb without stepping into the street
          const isWalkingIntoRoad = (this.keys.up || (this.mouseControl.isDown && this.mouseControl.targetWorldY < zone.southCurbY));
          if (playerNearCurb && !isWalkingIntoRoad && !zone.walkGranted) {
            zone.waitTime = (zone.waitTime || 0) + dt;

            if (zone.waitTime >= 1.6) {
              // Guard blows whistle, halts cars, and steps into the street!
              guard.state = 'STEPPING_OUT';
              guard.targetX = this.pathCenterX + 34;
              guard.targetY = zone.roadCenterY;
              zone.carsHalted = true;
              if (!guard.whistlePlayed) {
                sfx.guardWhistle();
                guard.whistlePlayed = true;
              }
            }
          }
          break;
        }

        case 'STEPPING_OUT': {
          // Guard steps into center of road to halt cars
          const dy = guard.targetY - guard.y;
          const dx = guard.targetX - guard.x;
          const dist = Math.hypot(dx, dy);

          if (dist > 2) {
            guard.x += (dx / dist) * 75 * dt;
            guard.y += (dy / dist) * 75 * dt;
          } else {
            guard.x = guard.targetX;
            guard.y = guard.targetY;
            // Reached road center! Grant safe cross and start waving!
            guard.state = 'WAVING_CROSS';
            zone.signalState = 'WALK';
            zone.walkGranted = true;
            zone.carsHalted = true;
            sfx.correct();
            this.safetyStars++;
            if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
          }
          break;
        }

        case 'WAVING_CROSS': {
          // Guard stays in center of road, holding paddle to cars and waving child across
          guard.targetX = this.pathCenterX + 34;
          guard.targetY = zone.roadCenterY;
          break;
        }

        case 'RETURNING': {
          // Player crossed safely, guard returns to curb
          guard.targetX = this.pathCenterX + 44;
          guard.targetY = zone.southCurbY + 12;
          const dy = guard.targetY - guard.y;
          const dx = guard.targetX - guard.x;
          const dist = Math.hypot(dx, dy);

          if (dist > 2) {
            guard.x += (dx / dist) * 65 * dt;
            guard.y += (dy / dist) * 65 * dt;
          } else {
            guard.x = guard.targetX;
            guard.y = guard.targetY;
            guard.state = 'DONE';
            zone.carsHalted = false; // traffic safely resumes
          }
          break;
        }

        case 'DONE': {
          break;
        }
      }
    });
  }

  // ==========================================================================
  // SAFETY CHANCES (3 TRIES) & GAME OVER / PRACTICE RESET
  // ==========================================================================
  updateSafetyChancesDisplay(withAnimation = false) {
    for (let i = 1; i <= 3; i++) {
      const heartEl = document.getElementById(`chance-heart-${i}`);
      if (heartEl) {
        if (i <= this.safetyChances) {
          heartEl.textContent = '❤️';
          heartEl.classList.remove('lost');
          heartEl.classList.add('active');
        } else {
          heartEl.textContent = '🖤';
          heartEl.classList.remove('active');
          heartEl.classList.add('lost');
          if (withAnimation && i === this.safetyChances + 1) {
            heartEl.classList.add('losing');
            setTimeout(() => {
              if (heartEl) heartEl.classList.remove('losing');
            }, 600);
          }
        }
      }
    }
  }

  registerSafetyMistake(reason, tipText) {
    this.hasEverFallen = true; // Flawless run revoked
    this.cars = this.cars.filter(c => !c.isCybertruck); // Remove Cybertruck if active
    this.safetyChances = Math.max(0, this.safetyChances - 1);
    this.lastSafetyTip = tipText;
    this.updateSafetyChancesDisplay(true);

    sfx.loseChance();

    const chancesLeft = this.safetyChances;
    let chancesMsg = '';
    if (chancesLeft === 2) {
      chancesMsg = ' (2 Chances Left ❤️❤️)';
    } else if (chancesLeft === 1) {
      chancesMsg = ' (⚠️ 1 Chance Left! ❤️)';
    } else {
      chancesMsg = ' (🛑 Safety Check! Practice Time!)';
    }
    return chancesMsg;
  }

  triggerGameOver() {
    this.state = 'GAME_OVER';
    this.player.isWalking = false;
    this.player.isFalling = false;
    this.keys = { up: false, down: false, left: false, right: false };
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    if (this.walkingControls) this.walkingControls.classList.add('hidden');
    if (this.movementGuide) this.movementGuide.classList.add('hidden');

    sfx.gameOver();

    const tipEl = document.getElementById('practice-tip-text');
    if (tipEl) {
      tipEl.textContent = this.lastSafetyTip || 'Always stop at the curb, look both ways, and wait for the white or green WALK signal!';
    }
    const statCrossings = document.getElementById('practice-stat-crossings');
    if (statCrossings) {
      statCrossings.textContent = `${this.currentCrossingIndex} / ${this.totalCrossings}`;
    }
    const statStars = document.getElementById('practice-stat-stars');
    if (statStars) {
      statStars.textContent = this.safetyStars;
    }

    if (this.gameOverModal) {
      this.gameOverModal.classList.remove('hidden');
    }
  }

  // ==========================================================================
  // IN-WORLD CORNER SIGNAL & FALLING DOWN MECHANICS
  // ==========================================================================
  triggerPlayerFall(zone) {
    if (this.player.isFalling) return;

    let tip = 'Always stop behind the curb and wait for the white or green WALK signal before stepping into the crosswalk!';
    if (zone.signalState === 'FLASHING') {
      tip = 'A flashing walk sign means DO NOT START CROSSING! Wait safely on the curb for a fresh walk cycle.';
    }
    const chancesMsg = this.registerSafetyMistake('RED_SIGNAL', tip);

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = this.isWalkingHome ? 'down' : 'up';

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    // Reset signal state on mistake so player must follow the safe sequence again
    if (zone.hasCrossingGuard) {
      zone.signalState = 'STOP';
      zone.waitTime = 0;
      zone.walkGranted = false;
      const guard = zone.crossingGuard || this.crossingGuard;
      if (guard) {
        guard.state = 'WAIT_ON_CURB';
        guard.x = this.pathCenterX + 44;
        guard.y = zone.southCurbY + 12;
        guard.targetX = this.pathCenterX + 44;
        guard.targetY = zone.southCurbY + 12;
        guard.whistlePlayed = false;
      }
      sfx.guardWhistle();
    } else if (zone.hasBridge) {
      zone.signalState = 'NO_CROSSWALK';
      zone.waitTime = 0;
      zone.walkGranted = false;
    } else {
      zone.signalState = zone.initialSignalState || (Math.random() < 0.5 ? 'STOP' : 'FLASHING');
      zone.waitTime = 0;
      zone.walkGranted = false;
      zone.pedestrianButtonPressed = false;
    }

    this.player.fallTargetY = this.isWalkingHome ? (zone.northCurbY - 10) : (zone.southCurbY + 10);

    // Sound: car screech + buzzer
    sfx.carBrake();
    sfx.buzz();

    // Immediately stop cars near the crosswalk so they don't roll over the child
    this.cars.forEach(car => {
      if (car.zoneId === zone.id && Math.abs(car.x - this.pathCenterX) < 220) {
        car.currentSpeed = 0;
        car.isBraking = true;
      }
    });

    let warningText = '💥 WHOOPS! 🛑 WAIT ON SIDEWALK FOR GREEN SIGN!';
    if (zone.trialType === 'TRAFFIC_LIGHT' && !zone.pedestrianButtonPressed) {
      warningText = '💥 WHOOPS! 🛑 Walk to the crosswalk sign & press SPACE to request WALK!';
    } else if (zone.signalState === 'FLASHING') {
      warningText = '💥 WHOOPS! 🛑 WAIT ON SIDEWALK! BLINKING LIGHT MEANS DON’T WALK!';
    }
    this.showInWorldFeedback(warningText + chancesMsg, '#d32f2f');
  }

  showInWorldFeedback(text, color = '#2e7d32') {
    this.activeInWorldAlert = {
      text: text,
      color: color,
      timer: 2.8
    };
  }

  finishRoadCrossing(zone) {
    // Safely reached the opposite sidewalk!
    if (zone.hasGroupCrossing) {
      const g2 = zone.groupOf2 || this.groupOf2;
      const g3 = zone.groupOf3 || this.groupOf3;
      if (g2) {
        g2.isWalking = false;
        g2.state = 'SAFELY_CROSSED';
      }
      if (g3) {
        g3.isWalking = false;
        g3.state = 'SAFELY_CROSSED';
      }
      zone.carsHalted = false;
    } else if (zone.hasCrossingGuard) {
      const guard = zone.crossingGuard || this.crossingGuard;
      if (guard) {
        guard.state = 'RETURNING';
      }
    } else {
      zone.carsHalted = false;
    }
    zone.pedestrianButtonPressed = false;
    this.player.withGroup = false;
    this.player.onBridge = false;

    this.safetyStars++;
    if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;

    sfx.correct();
    this.showInWorldFeedback('🎉 Safe Crossing! Keep walking! ⭐', '#2e7d32');

    this.currentCrossingIndex++;

    if (this.currentCrossingIndex >= this.totalCrossings) {
      this.state = 'WALKING_TO_GOAL';
      // User has completed the last cross!
      // If they got everything right without falling down at all, Cybertruck drives by now:
      if (!this.hasEverFallen && !this.cybertruckSpawned) {
        this.spawnCybertruck();
      }
    } else {
      // Continue walking along the sidewalk of the next block!
      this.state = 'WALKING_SIDEWALK';
    }
  }

  triggerPlayerFallFromGroup(zone) {
    if (this.player.isFalling) return;
    const chancesMsg = this.registerSafetyMistake(
      'RUN_AHEAD',
      'Never dash ahead into the road alone! Always wait and cross the street together with your group.'
    );

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = 'up';
    this.player.fallTargetY = zone.southCurbY + 10;

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    // Reset group back to curb waiting position so they can cross together again
    const g2 = zone.groupOf2 || this.groupOf2;
    const g3 = zone.groupOf3 || this.groupOf3;
    if (g2) {
      g2.x = g2.startX;
      g2.y = g2.startY;
      g2.isWalking = false;
      g2.animFrame = 0;
      g2.state = 'WAITING';
    }

    if (g3) {
      g3.x = g3.startX;
      g3.y = g3.startY;
      g3.isWalking = false;
      g3.animFrame = 0;
      g3.state = 'WAITING';
    }

    zone.signalState = 'STOP';
    zone.waitTime = 0;
    zone.walkGranted = false;

    sfx.carBrake();
    sfx.buzz();

    this.cars.forEach(car => {
      if (car.zoneId === zone.id && Math.abs(car.x - this.pathCenterX) < 220) {
        car.currentSpeed = 0;
        car.isBraking = true;
      }
    });

    this.showInWorldFeedback('💥 DON’T RUN AHEAD! 🛑 The group stopped! Cross together!' + chancesMsg, '#d32f2f');
  }

  triggerPlayerFallFromDangerousRoad(zone) {
    if (this.player.isFalling) return;
    const chancesMsg = this.registerSafetyMistake(
      'HIGHWAY_NO_BRIDGE',
      'Never cross a busy multi-lane highway directly on foot! Always use the pedestrian overpass footbridge.'
    );

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = 'up';
    this.player.fallTargetY = zone.southCurbY + 12;

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    sfx.carBrake();
    sfx.buzz();

    this.showInWorldFeedback('💥 DANGEROUS! ⛔ NO CROSSWALK HERE! Use the pedestrian bridge! 🌉' + chancesMsg, '#d32f2f');
  }

  triggerPlayerFallFromDog(stranger) {
    if (this.player.isFalling) return;
    const chancesMsg = this.registerSafetyMistake(
      'DOG_NO',
      'Always ask the dog’s owner before petting, and step away calmly if they say no (thumbs down)!'
    );

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = 'up';
    this.player.fallTargetY = null; // Fall down right in place on the sidewalk! Do not move to intersection!

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    sfx.buzz();

    // Fall down right here where the dog startled the player
    stranger.status = 'IDLE';

    // Position player safely on the sidewalk center at comfortable distance
    this.player.x = this.pathCenterX;
    if (this.player.y < stranger.y) {
      this.player.y = stranger.y - 62;
    } else {
      this.player.y = stranger.y + 62;
    }

    this.showInWorldFeedback('💥 STARTLED! 🛑 When an owner says NO, always walk away!' + chancesMsg, '#d32f2f');
  }

  triggerPlayerFallFromDogWithoutAsking(stranger) {
    if (this.player.isFalling) return;
    const chancesMsg = this.registerSafetyMistake(
      'DOG_WITHOUT_ASKING',
      'Never approach or try to touch a dog without asking the owner first! Always stop at a safe distance and ASK.'
    );

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = 'up';
    this.player.fallTargetY = null; // Fall down right here on the sidewalk!

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    sfx.buzz();

    // Reset status and nudge character back to safe asking distance on the sidewalk
    stranger.status = 'IDLE';
    this.player.x = this.pathCenterX;
    if (this.player.y < stranger.y) {
      this.player.y = stranger.y - 62;
    } else {
      this.player.y = stranger.y + 62;
    }

    this.showInWorldFeedback('💥 STARTLED! 🛑 ALWAYS ASK THE OWNER FIRST before approaching a dog!' + chancesMsg, '#d32f2f');
  }

  triggerPlayerFallFromStrangerVan(van) {
    if (this.player.isFalling) return;
    const chancesMsg = this.registerSafetyMistake(
      'STRANGER_VAN',
      'Stay on the sidewalk path! Never go near parked stranger vans or talk to strangers calling from vehicles.'
    );

    this.state = 'PLAYER_FALLING';
    this.player.isFalling = true;
    this.player.isWalking = false;
    this.player.fallFrame = 0;
    this.player.fallTimer = 0;
    this.player.facing = 'up';
    this.player.fallTargetY = null; // Fall down right in place!

    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    sfx.buzz();
    sfx.carBrake();

    // Keep player on the path center away from the stranger and van
    this.player.x = this.pathCenterX;

    this.showInWorldFeedback('💥 STRANGER DANGER! 🛑 Never approach strangers near vans!' + chancesMsg, '#d32f2f');
  }

  updateGroupCrossing(dt) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasGroupCrossing) return;
      const g2 = zone.groupOf2;
      const g3 = zone.groupOf3;
      if (!g2 || !g3) return;

      if (g2.isWalking) {
        g2.y -= g2.speed * 60 * dt;
        g2.animFrame += dt * 8;
        if (g2.y <= g2.targetY) {
          g2.y = g2.targetY;
          g2.isWalking = false;
          g2.state = 'SAFELY_CROSSED';
        }
      }

      if (g3.isWalking) {
        g3.y -= g3.speed * 60 * dt;
        g3.animFrame += dt * 8;
        if (g3.y <= g3.targetY) {
          g3.y = g3.targetY;
          g3.isWalking = false;
          g3.state = 'SAFELY_CROSSED';
        }
      }
    });
  }

  updateStrangersWithDogs(dt) {
    if (this.player.isFalling) return;

    this.strangersWithDogs.forEach(stranger => {
      const dist = Math.hypot(this.player.x - stranger.x, this.player.y - stranger.y);

      // Check 1: Going to the dog BEFORE asking the owner
      if (stranger.status === 'IDLE' && dist < 42) {
        sfx.dogBark();
        this.triggerPlayerFallFromDogWithoutAsking(stranger);
        return;
      }

      // Check 2: If owner said NO (THUMBS_DOWN), player must walk away
      if (stranger.status === 'THUMBS_DOWN') {
        // If they give you a thumbs down, you have to walk away, and if you walk closer, you'll fall down
        if (stranger.initialDist !== null && (dist < stranger.initialDist - 10 || dist < 38)) {
          sfx.dogBark();
          this.triggerPlayerFallFromDog(stranger);
        } else if (dist > 94) {
          stranger.status = 'WALKED_AWAY_SAFELY';
          sfx.correct();
          this.safetyStars++;
          if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
          this.showInWorldFeedback('⭐ Safe pedestrian! You respected the owner and walked away! 👍', '#2e7d32');
        }
      }
    });
  }

  updateStrangerVans(dt) {
    if (this.player.isFalling) return;

    this.strangerVans.forEach(van => {
      // Distance from player to stranger standing by van
      const distToStranger = Math.hypot(this.player.x - van.strangerX, this.player.y - van.strangerY);

      // Hazard check: If player approaches too close to the stranger near the van
      if (distToStranger < 48) {
        this.triggerPlayerFallFromStrangerVan(van);
        return;
      }

      // Safe bypass check: If player safely steers past the van without approaching
      if (!van.avoided && this.player.y < van.y - 45 && this.player.y > van.y - 150) {
        van.avoided = true;
        this.safetyStars++;
        if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
        sfx.correct();
        this.showInWorldFeedback('⭐ Smart pedestrian! You avoided the stranger near the van! 👍', '#2e7d32');
      }
    });
  }

  startPettingDog(stranger) {
    if (this.player.isFalling || this.player.isPettingDog) return;
    if (!stranger || stranger.status !== 'THUMBS_UP') return;

    this.state = 'PETTING_DOG';
    this.keys = { up: false, down: false, left: false, right: false };
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    // Position player slightly below (south of) the stranger & dog, facing north toward them
    const approachOffsetX = stranger.x > this.pathCenterX ? -12 : 12;
    const targetX = stranger.x + approachOffsetX;
    const targetY = stranger.y + 34;

    this.pettingSequence = {
      stranger: stranger,
      stage: 'WALKING_TO_DOG',
      targetX: targetX,
      targetY: targetY,
      timer: 0,
      heartTimer: 0,
      hearts: []
    };

    this.player.isPettingDog = true;
    this.player.pettingFrame = 0;
    this.player.pettingTimer = 0;
  }

  updatePettingDog(dt) {
    if (!this.pettingSequence) return;
    const seq = this.pettingSequence;

    if (seq.stage === 'WALKING_TO_DOG') {
      const dx = seq.targetX - this.player.x;
      const dy = seq.targetY - this.player.y;
      const dist = Math.hypot(dx, dy);

      this.player.isWalking = true;
      if (dist > 3) {
        this.player.facing = this.getDirection8(dx, dy);
        const speed = 75;
        const step = Math.min(dist, speed * dt);
        this.player.x += (dx / dist) * step;
        this.player.y += (dy / dist) * step;
        this.player.walkAnimFrame += dt * 8;
        this.stepSoundCheck();
      } else {
        this.player.x = seq.targetX;
        this.player.y = seq.targetY;
        this.player.isWalking = false;
        this.player.facing = 'up'; // Face forward toward the dog
        seq.stage = 'PETTING';
        seq.timer = 0;
        seq.heartTimer = 0;
        this.player.pettingFrame = 0;
        sfx.dogHappy();
        this.showInWorldFeedback('🐾 Petting gently... Good doggy! ❤️', '#2e7d32');
      }
    } else if (seq.stage === 'PETTING') {
      seq.timer += dt;

      const charObj = this.sprites[this.selectedChar] || this.sprites.boy;
      const petFrames = (charObj && charObj.petDog) ? charObj.petDog : this.sprites.boy.petDog;
      const totalFrames = petFrames ? petFrames.length : 6;

      const totalDuration = 2.45;
      const frame = Math.min(totalFrames - 1, Math.floor((seq.timer / totalDuration) * totalFrames));
      this.player.pettingFrame = frame;

      // Floating hearts & sparkles
      seq.heartTimer = (seq.heartTimer || 0) + dt;
      if (seq.heartTimer >= 0.28) {
        seq.heartTimer = 0;
        const icons = ['❤️', '✨', '🐾', '💖', '⭐'];
        seq.hearts.push({
          x: this.player.x + (Math.random() - 0.5) * 26,
          y: this.player.y - 18 - Math.random() * 8,
          vy: -28 - Math.random() * 16,
          vx: (Math.random() - 0.5) * 16,
          icon: icons[Math.floor(Math.random() * icons.length)],
          alpha: 1.0,
          life: 1.0
        });
      }

      // Update hearts
      seq.hearts.forEach(h => {
        h.x += h.vx * dt;
        h.y += h.vy * dt;
        h.life -= dt * 0.9;
        h.alpha = Math.max(0, h.life);
      });
      seq.hearts = seq.hearts.filter(h => h.life > 0);

      if (seq.timer >= totalDuration) {
        seq.stranger.hasBeenPetted = true;
        if (!seq.stranger.pettedReward) {
          seq.stranger.pettedReward = true;
          this.safetyStars++;
          if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
        }
        sfx.correct();
        this.showInWorldFeedback('🎉 The dog loved being petted! Great job! ⭐🐾', '#2e7d32');
        this.player.isPettingDog = false;
        this.pettingSequence = null;
        this.state = 'WALKING_SIDEWALK';
        this.player.facing = 'up';
      }
    }
  }

  interactWithNearbyStranger() {
    if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL') return;
    if (this.player.isFalling || this.player.isPettingDog) return;

    let nearest = null;
    let minDist = 85;

    this.strangersWithDogs.forEach(stranger => {
      const dist = Math.hypot(this.player.x - stranger.x, this.player.y - stranger.y);
      if (dist < minDist) {
        minDist = dist;
        nearest = stranger;
      }
    });

    if (nearest) {
      if (nearest.status === 'IDLE') {
        nearest.interacted = true;
        nearest.initialDist = minDist;
        if (nearest.decision === 'THUMBS_UP') {
          nearest.status = 'THUMBS_UP';
          sfx.dogHappy();
          this.safetyStars++;
          if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
          this.showInWorldFeedback('👍 Owner said YES! Press SPACE or PET DOG to pet! 🐾', '#2e7d32');
        } else {
          nearest.status = 'THUMBS_DOWN';
          sfx.dogWarning();
          this.showInWorldFeedback('🛑 Owner said NO! Step away safely!', '#d32f2f');
        }
      } else if (nearest.status === 'THUMBS_UP') {
        this.startPettingDog(nearest);
      }
    }
  }

  checkStrangerClick(worldX, worldY) {
    if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL') return false;
    if (this.player.isFalling || this.player.isPettingDog) return false;

    for (const stranger of this.strangersWithDogs) {
      const dist = Math.hypot(worldX - stranger.x, worldY - stranger.y);
      if (dist < 60) {
        if (stranger.status === 'IDLE') {
          this.interactWithNearbyStranger();
          return true;
        } else if (stranger.status === 'THUMBS_UP') {
          this.startPettingDog(stranger);
          return true;
        }
      }
    }
    return false;
  }

  interactWithSignalButton() {
    if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL' &&
        this.state !== 'WALKING_HOME_SIDEWALK' && this.state !== 'CROSSING_ROAD_HOME' && this.state !== 'WALKING_HOME_TO_DOOR') return false;
    if (this.player.isFalling) return false;

    const currentZone = this.isWalkingHome ? this.crossingZones[this.returnCrossingIndex] : this.crossingZones[this.currentCrossingIndex];
    if (!currentZone || currentZone.trialType !== 'TRAFFIC_LIGHT') return false;
    if (currentZone.walkGranted) return false;

    const postX = this.sidewalkX + this.sidewalkWidth + 18;
    const postY = this.isWalkingHome ? (currentZone.northCurbY - 14) : (currentZone.southCurbY + 14);
    const targetCurbY = this.isWalkingHome ? currentZone.northCurbY : currentZone.southCurbY;
    const distToPost = Math.hypot(this.player.x - postX, this.player.y - postY);
    const isNearPostOrCurb = (distToPost < 115) || (Math.abs(this.player.y - targetCurbY) < 95 && this.player.x > this.pathCenterX - 45);

    if (isNearPostOrCurb) {
      if (!currentZone.pedestrianButtonPressed) {
        currentZone.pedestrianButtonPressed = true;
        currentZone.waitTime = 0;
        sfx.buttonPress();
        this.safetyStars++;
        if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
        this.showInWorldFeedback('🛎️ BUTTON PRESSED! "Wait to cross!" ⏳', '#f57c00');
        return true;
      } else {
        sfx.buttonPress();
        this.showInWorldFeedback('⏳ Signal already activated! Wait on sidewalk for green WALK sign!', '#f57c00');
        return true;
      }
    }
    return false;
  }

  checkSignalButtonClick(worldX, worldY) {
    const currentZone = this.isWalkingHome ? this.crossingZones[this.returnCrossingIndex] : this.crossingZones[this.currentCrossingIndex];
    if (!currentZone || currentZone.trialType !== 'TRAFFIC_LIGHT') return false;
    const postX = this.sidewalkX + this.sidewalkWidth + 18;
    const postY = this.isWalkingHome ? (currentZone.northCurbY - 14) : (currentZone.southCurbY + 14);
    const dist = Math.hypot(worldX - postX, worldY - postY);
    if (dist < 55) {
      return this.interactWithSignalButton();
    }
    return false;
  }

  handleSpaceAction() {
    if (this.state === 'STORE_SHOPPING') {
      this.handleStoreAction();
      return;
    }

    if (this.state !== 'WALKING_SIDEWALK' && this.state !== 'CROSSING_ROAD' && this.state !== 'WALKING_TO_GOAL' &&
        this.state !== 'WALKING_HOME_SIDEWALK' && this.state !== 'CROSSING_ROAD_HOME' && this.state !== 'WALKING_HOME_TO_DOOR') return;
    if (this.player.isFalling || this.player.isPettingDog) return;

    // 1. Check if near crosswalk button at a traffic light intersection
    if (this.interactWithSignalButton()) {
      return;
    }

    // 2. Check if near stranger with dog
    this.interactWithNearbyStranger();
  }

  resetButtonStyles() {
    if (this.btnUp) this.btnUp.classList.remove('pressed');
    if (this.btnDown) this.btnDown.classList.remove('pressed');
    if (this.btnLeft) this.btnLeft.classList.remove('pressed');
    if (this.btnRight) this.btnRight.classList.remove('pressed');
    if (this.btnAction) this.btnAction.classList.remove('pressed');
  }

  updateTouchActionButton() {
    if (!this.btnAction) return;

    if (this.state === 'STORE_SHOPPING') {
      const nearItem = this.getNearbyStoreItem();
      const nearCashier = this.isNearCashier();
      const remaining = this.shoppingList ? this.shoppingList.filter(t => !t.collected).length : 0;

      if (nearItem) {
        this.btnAction.classList.add('highlight-dog');
        this.btnAction.classList.remove('highlight-signal');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '🧺';
        if (this.touchActionLabel) this.touchActionLabel.textContent = nearItem.onList ? 'TAKE ITEM' : 'INSPECT';
      } else if (nearCashier) {
        this.btnAction.classList.add('highlight-signal');
        this.btnAction.classList.remove('highlight-dog');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '💳';
        if (this.touchActionLabel) this.touchActionLabel.textContent = remaining === 0 ? 'PAY CASHIER' : 'REGISTER';
      } else {
        this.btnAction.classList.remove('highlight-signal', 'highlight-dog');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '🛒';
        if (this.touchActionLabel) this.touchActionLabel.textContent = 'SHOP';
      }
      return;
    }

    if (this.player.isFalling || this.player.isPettingDog || this.state === 'START_MENU' || this.state === 'VICTORY' || this.state === 'GAME_OVER' || this.state === 'STORE_CHECKOUT') {
      this.btnAction.classList.remove('highlight-signal', 'highlight-dog');
      if (this.touchActionIcon) this.touchActionIcon.textContent = '🛎️';
      if (this.touchActionLabel) this.touchActionLabel.textContent = 'ACTION';
      return;
    }

    // 1. Proximity to traffic light intersection button
    const currentZone = this.isWalkingHome ? this.crossingZones[this.returnCrossingIndex] : this.crossingZones[this.currentCrossingIndex];
    let isNearSignal = false;
    if (currentZone && currentZone.trialType === 'TRAFFIC_LIGHT' && !currentZone.walkGranted) {
      const postX = this.sidewalkX + this.sidewalkWidth + 18;
      const postY = this.isWalkingHome ? (currentZone.northCurbY - 14) : (currentZone.southCurbY + 14);
      const targetCurbY = this.isWalkingHome ? currentZone.northCurbY : currentZone.southCurbY;
      const distToPost = Math.hypot(this.player.x - postX, this.player.y - postY);
      isNearSignal = (distToPost < 115) || (Math.abs(this.player.y - targetCurbY) < 95 && this.player.x > this.pathCenterX - 45);
    }

    // 2. Proximity to stranger with dog
    let nearDog = null;
    if (this.strangersWithDogs) {
      for (const stranger of this.strangersWithDogs) {
        const dist = Math.hypot(this.player.x - stranger.x, this.player.y - stranger.y);
        if (dist < 90) {
          nearDog = stranger;
          break;
        }
      }
    }

    if (isNearSignal) {
      this.btnAction.classList.add('highlight-signal');
      this.btnAction.classList.remove('highlight-dog');
      if (this.touchActionIcon) this.touchActionIcon.textContent = '🛎️';
      if (this.touchActionLabel) {
        this.touchActionLabel.textContent = currentZone.pedestrianButtonPressed ? 'WAITING' : 'PRESS SIGN';
      }
    } else if (nearDog) {
      if (nearDog.status === 'IDLE') {
        this.btnAction.classList.add('highlight-dog');
        this.btnAction.classList.remove('highlight-signal');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '🐕';
        if (this.touchActionLabel) this.touchActionLabel.textContent = 'ASK OWNER';
      } else if (nearDog.status === 'THUMBS_UP') {
        this.btnAction.classList.add('highlight-dog');
        this.btnAction.classList.remove('highlight-signal');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '🐾';
        if (this.touchActionLabel) this.touchActionLabel.textContent = nearDog.hasBeenPetted ? 'PET AGAIN' : 'PET DOG';
      } else if (nearDog.status === 'THUMBS_DOWN') {
        this.btnAction.classList.add('highlight-signal');
        this.btnAction.classList.remove('highlight-dog');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '⚠️';
        if (this.touchActionLabel) this.touchActionLabel.textContent = 'STEP BACK';
      } else {
        this.btnAction.classList.remove('highlight-signal', 'highlight-dog');
        if (this.touchActionIcon) this.touchActionIcon.textContent = '🛎️';
        if (this.touchActionLabel) this.touchActionLabel.textContent = 'ACTION';
      }
    } else {
      this.btnAction.classList.remove('highlight-signal', 'highlight-dog');
      if (this.touchActionIcon) this.touchActionIcon.textContent = '🛎️';
      if (this.touchActionLabel) {
        this.touchActionLabel.textContent = 'ACTION';
      }
    }
  }

  updatePedestrianBridge(dt) {
    const currentZone = this.crossingZones[this.currentCrossingIndex];
    if (!currentZone || !currentZone.hasBridge || !currentZone.bridge) {
      if (this.player.onBridge && (!currentZone || !currentZone.hasBridge)) {
        this.player.onBridge = false;
      }
      return;
    }

    // Check if player is currently in the footbridge walkway corridor
    const bridge = currentZone.bridge;
    const inBridgeCorridor = (this.player.y <= currentZone.southCurbY + 38 &&
                              this.player.y >= currentZone.northCurbY - 38 &&
                              Math.abs(this.player.x - bridge.x) <= 34);
    if (inBridgeCorridor) {
      this.player.onBridge = true;
      this.player.x = Math.max(bridge.x - 26, Math.min(bridge.x + 26, this.player.x));
    } else if (this.player.y > currentZone.southCurbY + 38 || this.player.y < currentZone.northCurbY - 38) {
      this.player.onBridge = false;
    }
  }

  // ==========================================================================
  // VICTORY CELEBRATION
  // ==========================================================================
  triggerVictory() {
    this.state = 'VICTORY';
    this.player.isWalking = false;
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.resetButtonStyles();
    if (this.walkingControls) this.walkingControls.classList.add('hidden');
    if (this.movementGuide) this.movementGuide.classList.add('hidden');
    this.updateProgressBar();

    sfx.fanfare();

    this.confettiParticles = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        vRot: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8
      });
    }

    document.getElementById('victory-dest-icon').textContent = this.destination.icon;
    document.getElementById('victory-title').textContent = `Welcome to the Bakery & Park!`;
    document.getElementById('stat-stars').textContent = `${this.safetyStars} / ${this.totalCrossings}`;
    document.getElementById('stat-challenges').textContent = `${this.totalCrossings}`;

    const subEl = document.getElementById('victory-sub');
    if (subEl) {
      if (!this.hasEverFallen) {
        subEl.innerHTML = '⚡ <strong>FLAWLESS RUN!</strong> You got everything right without falling down and unlocked the Cybertruck!';
      } else {
        subEl.textContent = 'You made safe choices every step of the way.';
      }
    }

    this.victoryModal.classList.remove('hidden');
  }

  resetToStartMenu() {
    this.state = 'START_MENU';
    this.keys = { up: false, down: false, left: false, right: false };
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.hasEverFallen = false;
    this.cybertruckSpawned = false;
    this.currentCrossingIndex = 0;
    this.safetyStars = 0;
    this.safetyChances = 3;
    this.updateSafetyChancesDisplay();
    if (this.starCountEl) this.starCountEl.textContent = '0';

    this.victoryModal.classList.add('hidden');
    if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
    if (this.checkoutMinigameModal) this.checkoutMinigameModal.classList.add('hidden');
    if (this.homeVictoryModal) this.homeVictoryModal.classList.add('hidden');
    if (this.storeHud) this.storeHud.classList.add('hidden');
    if (this.gameOverModal) this.gameOverModal.classList.add('hidden');
    if (this.walkingControls) this.walkingControls.classList.add('hidden');
    if (this.movementGuide) this.movementGuide.classList.add('hidden');
    this.isWalkingHome = false;
    this.hasGroceries = false;
    this.returnCrossingIndex = 0;
    this.startMenu.classList.remove('hidden');
    this.setLevel(this.gameLevel || 1);

    this.randomizeTrialsAndEnvironments();

    this.player.x = this.pathCenterX;
    this.player.y = this.startY;
    this.player.facing = 'up';
    this.player.isWalking = false;
    this.player.isFalling = false;
    this.player.withGroup = false;
    this.player.onBridge = false;
    this.player.isPettingDog = false;
    this.player.pettingFrame = 0;
    this.player.pettingTimer = 0;
    this.pettingSequence = null;

    this.cameraY = this.startY - (this.canvas.height / this.scale) * 0.55;

    this.updateProgressBar();
    this.setupTraffic();
  }

  // ==========================================================================
  // RENDERING ENGINE
  // ==========================================================================
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'STORE_SHOPPING' || this.state === 'STORE_CHECKOUT') {
      this.renderStore(ctx);
      return;
    }

    ctx.save();
    ctx.translate(this.offsetX, -this.cameraY * this.scale);
    ctx.scale(this.scale, this.scale);

    // Extended ground fill so world is seamless when camera moves past edges
    ctx.fillStyle = '#659c35';
    ctx.fillRect(-100, -500, this.worldWidth + 200, this.worldHeight + 1100);

    // 1. Draw Environment Scenery Blocks (Image -> Road -> Image -> Road...)
    this.drawEnvironmentBlocks(ctx);

    // 2. Draw Horizontal Asphalt Roads Across the Scene
    this.drawRoadways(ctx);

    // 3. Draw The Pedestrian Sidewalk (Clearly visible pavement)
    this.drawSidewalkSegments(ctx);

    // 4. Draw Crisp White Zebra Crosswalks (Connecting the sidewalks across the road)
    this.drawCrosswalks(ctx);

    // 4.5 Draw Pedestrian Bridge Underlay & Piers (Road 3)
    this.drawBridgeUnderlay(ctx);

    // 5. Draw Pedestrian Signal Lights & Overpass Signs at Curbs
    this.drawSignalLights(ctx);

    // 6. Draw Moving Cars (driving horizontally across the road, passing under footbridge)
    this.drawCars(ctx);

    // 6.5 Draw School Crossing Guard NPC (Road 2)
    this.drawCrossingGuard(ctx);

    // 6.6 Draw Group Crossing NPCs (Road 1)
    this.drawGroups(ctx);

    // 6.7 Draw Strangers with Dogs NPCs (Sidewalks)
    this.drawStrangersWithDogs(ctx);

    // 6.8 Draw Stranger near Parked Van Hazard (Sidewalks)
    this.drawStrangerVans(ctx);

    // 7. Draw Pedestrian Bridge Deck & Railings (Road 3)
    this.drawBridgeOverlay(ctx);

    // 8. Draw Player Avatar (Strictly walking on sidewalk, crosswalk, or on bridge)
    this.drawPlayer(ctx);

    // 8.5 Draw Mouse Click/Hold Target Indicator
    if (this.mouseControl.isDown && this.mouseControl.targetWorldX !== null && this.player.isWalking) {
      this.drawMouseTargetIndicator(ctx);
    }

    // 9. Draw In-World Floating Alert Banner
    this.drawInWorldAlert(ctx);

    ctx.restore();

    // 10. Draw Confetti (Screen space)
    if (this.confettiParticles.length > 0) {
      this.drawConfetti(ctx);
    }
  }

  drawMouseTargetIndicator(ctx) {
    const tx = this.mouseControl.targetWorldX;
    const ty = this.mouseControl.targetWorldY;

    ctx.save();
    const t = (Date.now() % 750) / 750; // 0 to 1 cycle
    const r = 8 + t * 18;
    const alpha = (1 - t) * 0.85;

    // Expanding beacon ripple ring
    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tx, ty, r, 0, Math.PI * 2);
    ctx.stroke();

    // Inner fixed target ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(tx, ty, 6, 0, Math.PI * 2);
    ctx.stroke();

    // Center glow dot
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawInWorldAlert(ctx) {
    // Disabled text boxes above player's head per user request
    return;
  }

  drawEnvironmentBlocks(ctx) {
    if (!this.blocks) return;

    this.blocks.forEach(block => {
      const img = this.environmentImages ? this.environmentImages[block.theme] : null;
      const h = block.bottom - block.top;

      if (img && img.isLoaded) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, block.top, this.worldWidth, h);
        ctx.clip();

        // 1:1 Natural Scale Drawing - NEVER vertically squished or horizontally stretched!
        const imgW = img.naturalWidth || 768;
        const imgH = img.naturalHeight || 1376;
        const scale = this.worldWidth / imgW;
        const drawH = imgH * scale; // 1376px
        // Vertically center the full-height natural image inside the tall block
        const drawY = block.top - Math.max(0, (drawH - h) * 0.5);

        ctx.drawImage(img, 0, drawY, this.worldWidth, drawH);
        ctx.restore();
      } else {
        // Fallback pleasant park green
        ctx.fillStyle = block.id % 2 === 0 ? '#7cb342' : '#689f38';
        ctx.fillRect(0, block.top, this.worldWidth, h);
      }
    });
  }

  drawRoadways(ctx) {
    this.crossingZones.forEach(zone => {
      // Dark asphalt road spanning completely across from left to right
      ctx.fillStyle = '#263238';
      ctx.fillRect(0, zone.northCurbY, this.worldWidth, zone.roadHeight);

      // White Shoulder Edge Lines
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, zone.northCurbY + 3, this.worldWidth, 3);
      ctx.fillRect(0, zone.southCurbY - 6, this.worldWidth, 3);

      // Yellow Dashed Center Divider
      ctx.strokeStyle = '#fdd835';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 16]);
      ctx.beginPath();
      ctx.moveTo(0, zone.roadCenterY);
      ctx.lineTo(this.worldWidth, zone.roadCenterY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Stop Line for cars before crosswalk (Left and Right sides)
      ctx.fillStyle = '#ffffff';
      // Left stop line for eastbound cars
      ctx.fillRect(this.pathCenterX - 85, zone.roadCenterY + 4, 8, (zone.roadHeight / 2) - 8);
      // Right stop line for westbound cars
      ctx.fillRect(this.pathCenterX + 77, zone.northCurbY + 4, 8, (zone.roadHeight / 2) - 8);
    });
  }

  drawSidewalkSegments(ctx) {
    // The 5 custom neighborhood images now feature high-resolution illustrated sidewalks
    // built directly into the game (both the central vertical walkway and the horizontal sidewalks at both road ends)!
    return;
  }

  drawCrosswalks(ctx) {
    this.crossingZones.forEach(zone => {
      if (zone.noCrosswalk) {
        // Road has NO street crosswalk! Pedestrians must walk sideways to overpass footbridge on the right or left.
        const bridge = zone.bridge || this.pedestrianBridge;
        const bridgeX = bridge ? bridge.x : (this.pathCenterX + 120);
        const isRight = bridgeX > this.pathCenterX;
        const curbW = 100;
        const curbX = this.pathCenterX - curbW / 2;

        // South Curb Red Warning Paint directly in front of the central path
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(curbX, zone.southCurbY - 4, curbW, 8);
        ctx.strokeStyle = '#ffd54f';
        ctx.lineWidth = 2;
        for (let x = curbX; x < curbX + curbW; x += 12) {
          ctx.beginPath();
          ctx.moveTo(x, zone.southCurbY + 4);
          ctx.lineTo(x + 8, zone.southCurbY - 4);
          ctx.stroke();
        }

        // North Curb Red Warning Paint
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(curbX, zone.northCurbY - 4, curbW, 8);
        for (let x = curbX; x < curbX + curbW; x += 12) {
          ctx.beginPath();
          ctx.moveTo(x, zone.northCurbY + 4);
          ctx.lineTo(x + 8, zone.northCurbY - 4);
          ctx.stroke();
        }

        // Warning Text directly on the road asphalt in front of central path
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⛔ NO CROSSWALK HERE', this.pathCenterX, zone.roadCenterY - 10);
        ctx.fillStyle = '#ffd54f';
        ctx.font = 'bold 9.5px Fredoka, sans-serif';
        const guideText = isRight ? 'WALK RIGHT TO FOOTBRIDGE ➡️' : '⬅️ WALK LEFT TO FOOTBRIDGE';
        ctx.fillText(guideText, this.pathCenterX, zone.roadCenterY + 12);
        ctx.restore();
        return;
      }

      // Crisp White Crosswalk Lines - HORIZONTAL lines across the crosswalk width!
      ctx.fillStyle = '#ffffff';
      const crosswalkW = 96;
      const crosswalkX = this.pathCenterX - crosswalkW / 2;
      const stripeH = 8;
      const stripeGap = 9;

      // Draw horizontal crosswalk bars from north curb to south curb
      for (let y = zone.northCurbY + 8; y < zone.southCurbY - 6; y += stripeH + stripeGap) {
        ctx.fillRect(crosswalkX, y, crosswalkW, stripeH);
      }

      // Solid side boundary lines for clean ladder crosswalk definition
      ctx.fillRect(crosswalkX, zone.northCurbY + 2, 4, zone.roadHeight - 4);
      ctx.fillRect(crosswalkX + crosswalkW - 4, zone.northCurbY + 2, 4, zone.roadHeight - 4);
    });
  }

  drawBridgeUnderlay(ctx) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasBridge || !zone.bridge) return;
      const bridge = zone.bridge;

      // Ground cast shadow of the footbridge deck across the asphalt road
      ctx.fillStyle = 'rgba(0, 0, 0, 0.38)';
      ctx.beginPath();
      ctx.roundRect(bridge.x - bridge.drawW / 2 + 10, zone.northCurbY, bridge.drawW - 20, zone.roadHeight, 6);
      ctx.fill();

      // Concrete Structural Support Piers on curb edges
      const pierW = 12;
      const pierH = 14;
      ctx.fillStyle = '#37474f';
      // South curb piers
      ctx.fillRect(bridge.x - bridge.drawW / 2 + 8, zone.southCurbY - 4, pierW, pierH);
      ctx.fillRect(bridge.x + bridge.drawW / 2 - 20, zone.southCurbY - 4, pierW, pierH);
      // North curb piers
      ctx.fillRect(bridge.x - bridge.drawW / 2 + 8, zone.northCurbY - 10, pierW, pierH);
      ctx.fillRect(bridge.x + bridge.drawW / 2 - 20, zone.northCurbY - 10, pierW, pierH);
    });
  }

  drawSignalLights(ctx) {
    this.crossingZones.forEach(zone => {
      if (zone.hasCrossingGuard) {
        // Authentic Fluorescent Yellow-Green Pentagon School Crossing Signs with Flashing Amber Beacons
        const posts = [
          { x: this.sidewalkX + this.sidewalkWidth + 18, y: zone.southCurbY + 14 },
          { x: this.sidewalkX - 18, y: zone.northCurbY - 14 }
        ];

        posts.forEach(post => {
          const postX = post.x;
          const postY = post.y;

          // Steel Post
          ctx.fillStyle = '#90a4ae';
          ctx.fillRect(postX - 3, postY - 46, 6, 60);
          // Base Flange
          ctx.fillStyle = '#455a64';
          ctx.fillRect(postX - 8, postY + 14, 16, 5);

          // Flashing Amber Warning Beacon on Top of Post
          const beaconY = postY - 52;
          const amberBlink = Math.sin(Date.now() / 180) > 0;
          ctx.fillStyle = '#263238';
          ctx.beginPath();
          ctx.arc(postX, beaconY, 8, 0, Math.PI * 2);
          ctx.fill();

          if (amberBlink) {
            const halo = ctx.createRadialGradient(postX, beaconY, 2, postX, beaconY, 22);
            halo.addColorStop(0, 'rgba(255, 179, 0, 0.9)');
            halo.addColorStop(0.5, 'rgba(255, 179, 0, 0.4)');
            halo.addColorStop(1, 'rgba(255, 179, 0, 0)');
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(postX, beaconY, 22, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fff9c4';
            ctx.beginPath();
            ctx.arc(postX, beaconY, 5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#ff8f00';
            ctx.beginPath();
            ctx.arc(postX, beaconY, 5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Pentagon School Crossing Sign (MUTCD S1-1 standard)
          const signW = 38;
          const signH = 38;
          const signX = postX;
          const signY = postY - 22;

          ctx.save();
          ctx.translate(signX, signY);

          const drawPentagon = (w, h) => {
            ctx.beginPath();
            ctx.moveTo(0, -h / 2);
            ctx.lineTo(w / 2, -h / 6);
            ctx.lineTo(w / 2, h / 2);
            ctx.lineTo(-w / 2, h / 2);
            ctx.lineTo(-w / 2, -h / 6);
            ctx.closePath();
          };

          // Soft drop shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.translate(2, 2);
          drawPentagon(signW, signH);
          ctx.fill();
          ctx.translate(-2, -2);

          // Outer Neon Yellow-Green
          ctx.fillStyle = '#ccff00';
          drawPentagon(signW, signH);
          ctx.fill();

          // Black Borders
          ctx.strokeStyle = '#212121';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.strokeStyle = '#212121';
          ctx.lineWidth = 1;
          drawPentagon(signW - 6, signH - 6);
          ctx.stroke();

          // School Children Crossing Emoji
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🚸', 0, 3);

          // Rectangular Sub-Plaque: "SCHOOL"
          ctx.fillStyle = '#ccff00';
          ctx.fillRect(-18, signH / 2 + 2, 36, 11);
          ctx.strokeStyle = '#212121';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-18, signH / 2 + 2, 36, 11);

          ctx.fillStyle = '#212121';
          ctx.font = 'bold 8px Fredoka, sans-serif';
          ctx.fillText('SCHOOL', 0, signH / 2 + 8);

          ctx.restore();
        });
        return;
      }

      if (zone.hasBridge) {
        // Pedestrian Overpass Footbridge Entrance Signpost & No Crosswalk Guide
        const bridge = zone.bridge || this.pedestrianBridge;
        const bridgeX = bridge ? bridge.x : (this.pathCenterX + 120);
        const isRight = bridgeX > this.pathCenterX;
        const signArrow = isRight ? 'BRIDGE ➡️' : '⬅️ BRIDGE';
        const signPostX = isRight ? (bridgeX + 68) : (bridgeX - 68);

        const posts = [
          { x: signPostX, y: zone.southCurbY + 14, isPrimary: true },
          { x: signPostX, y: zone.northCurbY - 14, isPrimary: false }
        ];

        posts.forEach(post => {
          const postX = post.x;
          const postY = post.y;

          // Steel Post
          ctx.fillStyle = '#90a4ae';
          ctx.fillRect(postX - 3, postY - 46, 6, 60);
          ctx.fillStyle = '#455a64';
          ctx.fillRect(postX - 8, postY + 14, 16, 5);

          // Overpass Blue Directional Sign
          const signW = 44;
          const signH = 46;
          const signX = postX - signW / 2;
          const signY = postY - 56;

          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.beginPath();
          ctx.roundRect(signX + 2, signY + 2, signW, signH, 6);
          ctx.fill();

          ctx.fillStyle = '#0288d1';
          ctx.beginPath();
          ctx.roundRect(signX, signY, signW, signH, 6);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🌉', postX, signY + 20);
          ctx.font = 'bold 7.5px Fredoka, sans-serif';
          ctx.fillText('OVERPASS', postX, signY + 33);
          ctx.fillText(signArrow, postX, signY + 42);

          // Floating In-World Pill Badge
          if (post.isPrimary) {
            const distToPlayer = Math.abs(this.player.y - zone.southCurbY);
            if (distToPlayer < 550) {
              ctx.save();
              const badgeY = signY - 24;
              const badgeX = postX;
              const badgeW = 162;
              const badgeH = 26;

              ctx.fillStyle = 'rgba(0,0,0,0.3)';
              ctx.beginPath();
              ctx.roundRect(badgeX - badgeW / 2 + 2, badgeY - badgeH / 2 + 2, badgeW, badgeH, 13);
              ctx.fill();

              ctx.fillStyle = '#0277bd';
              ctx.beginPath();
              ctx.roundRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 13);
              ctx.fill();
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2.5;
              ctx.stroke();

              // Pointer notch
              ctx.fillStyle = '#0277bd';
              ctx.beginPath();
              ctx.moveTo(badgeX - 6, badgeY + badgeH / 2);
              ctx.lineTo(badgeX + 6, badgeY + badgeH / 2);
              ctx.lineTo(badgeX, badgeY + badgeH / 2 + 6);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 11px Fredoka, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('🌉 CHOOSE FOOTBRIDGE! ⬆️', badgeX, badgeY);
              ctx.restore();
            }
          }
        });
        return;
      }

      // Place Signal Box Posts at both the South Curb (near) and North Curb (far) corners
      const posts = [
        { x: this.sidewalkX + this.sidewalkWidth + 18, y: zone.southCurbY + 14, isPrimary: true },
        { x: this.sidewalkX + this.sidewalkWidth + 18, y: zone.northCurbY - 14, isPrimary: false }
      ];

      posts.forEach(post => {
        const postX = post.x;
        const postY = post.y;

        // 1. Heavy-duty Signal Post with yellow hazard accents
        ctx.fillStyle = '#90a4ae';
        ctx.fillRect(postX - 3, postY - 36, 6, 50);
        // Base flange plate
        ctx.fillStyle = '#455a64';
        ctx.fillRect(postX - 8, postY + 14, 16, 5);
        // Yellow safety hazard stripes on lower post
        ctx.fillStyle = '#fbc02d';
        ctx.fillRect(postX - 3, postY + 2, 6, 4);
        ctx.fillRect(postX - 3, postY + 8, 6, 4);

        const isPrimaryForApproach = this.isWalkingHome ? !post.isPrimary : post.isPrimary;

        // Push button box on primary/approaching post
        if (isPrimaryForApproach) {
          const btnActive = zone.pedestrianButtonPressed;
          // Pedestrian Push Button Box (Accessible Pedestrian Signal plate)
          const pBoxW = 16;
          const pBoxH = 24;
          ctx.fillStyle = '#ffb300';
          ctx.beginPath();
          ctx.roundRect(postX - pBoxW / 2, postY - 10, pBoxW, pBoxH, 4);
          ctx.fill();
          ctx.strokeStyle = '#e65100';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Button LED indicator (glows green when requested, red when unpressed)
          ctx.fillStyle = btnActive ? '#76ff03' : '#d32f2f';
          ctx.beginPath();
          ctx.arc(postX, postY - 4, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Push button circle
          ctx.fillStyle = btnActive ? '#ffeb3b' : '#eeeeee';
          ctx.beginPath();
          ctx.arc(postX, postY + 4, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#424242';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Pulsing prompt beacon if player is near curb and button has not been pressed yet!
          const approachCurbY = this.isWalkingHome ? zone.northCurbY : zone.southCurbY;
          const distToPlayer = Math.hypot(this.player.x - postX, this.player.y - postY);
          const isPlayerNear = distToPlayer < 120 || (Math.abs(this.player.y - approachCurbY) < 95 && this.player.x > this.pathCenterX - 45);

          if (zone.trialType === 'TRAFFIC_LIGHT' && !zone.walkGranted && !btnActive && isPlayerNear) {
            // Ripple ring around button
            const t = (Date.now() % 900) / 900;
            ctx.strokeStyle = `rgba(255, 179, 0, ${1 - t})`;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(postX, postY + 4, 6 + t * 16, 0, Math.PI * 2);
            ctx.stroke();

            // Interactive prompt floating beside / above the post
            const promptY = postY - 80;
            this.drawInteractivePrompt(
              ctx,
              postX - 25,
              promptY,
              '⌨️ [SPACE] or Tap Sign: Press Button! 🚦',
              '#ff8f00'
            );
          }
        }

        // 2. Pedestrian Signal Housing Box (Larger & clearer: 46x58px)
        const boxW = 46;
        const boxH = 58;
        const boxX = postX - boxW / 2;
        const boxY = postY - 62;

        // Soft drop shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
        ctx.beginPath();
        ctx.roundRect(boxX + 3, boxY + 4, boxW, boxH, 8);
        ctx.fill();

        // Outer vibrant municipal yellow housing
        ctx.fillStyle = '#ffb300';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        ctx.fill();
        ctx.strokeStyle = '#e65100';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Sun Visor Hood over top and sides
        ctx.fillStyle = '#1c1c1c';
        ctx.beginPath();
        ctx.moveTo(boxX - 4, boxY + 2);
        ctx.lineTo(boxX + boxW + 4, boxY + 2);
        ctx.lineTo(boxX + boxW + 1, boxY - 9);
        ctx.lineTo(boxX - 1, boxY - 9);
        ctx.closePath();
        ctx.fill();

        // Inner Bezel (dark frame around lens)
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.roundRect(boxX + 3, boxY + 3, boxW - 6, boxH - 6, 5);
        ctx.fill();

        // High-contrast deep black glass lens face
        ctx.fillStyle = '#060606';
        ctx.beginPath();
        ctx.roundRect(boxX + 5, boxY + 5, boxW - 10, boxH - 10, 4);
        ctx.fill();

        // Signal State Image & Glow
        const isWalk = zone.signalState === 'WALK';
        const isFlashing = zone.signalState === 'FLASHING';

        if (isWalk) {
          // Dynamic Green Radial Glow
          const pulse = 1 + Math.sin(Date.now() / 200) * 0.15;
          const grad = ctx.createRadialGradient(boxX + boxW / 2, boxY + boxH / 2, 4, boxX + boxW / 2, boxY + boxH / 2, 28 * pulse);
          grad.addColorStop(0, 'rgba(76, 175, 80, 0.45)');
          grad.addColorStop(1, 'rgba(76, 175, 80, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(boxX + boxW / 2, boxY + boxH / 2, 28 * pulse, 0, Math.PI * 2);
          ctx.fill();

          // Draw Walk Figure image
          if (this.signalImages.walk && this.signalImages.walk.isLoaded) {
            ctx.drawImage(this.signalImages.walk, boxX + 6, boxY + 7, boxW - 12, boxH - 14);
          }
        } else if (isFlashing) {
          // Flashing Amber/Yellow Stop Hand cycles with Blank
          const blinkOn = Math.floor(Date.now() / 380) % 2 === 0;
          if (blinkOn) {
            const grad = ctx.createRadialGradient(boxX + boxW / 2, boxY + boxH / 2, 4, boxX + boxW / 2, boxY + boxH / 2, 28);
            grad.addColorStop(0, 'rgba(255, 152, 0, 0.55)');
            grad.addColorStop(1, 'rgba(255, 152, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(boxX + boxW / 2, boxY + boxH / 2, 28, 0, Math.PI * 2);
            ctx.fill();

            if (this.signalImages.stop && this.signalImages.stop.isLoaded) {
              ctx.drawImage(this.signalImages.stop, boxX + 6, boxY + 7, boxW - 12, boxH - 14);
            }
          } else {
            if (this.signalImages.blank && this.signalImages.blank.isLoaded) {
              ctx.drawImage(this.signalImages.blank, boxX + 6, boxY + 7, boxW - 12, boxH - 14);
            }
          }
        } else {
          // Solid Red Stop Hand with warm pulsing glow
          const pulse = 1 + Math.sin(Date.now() / 300) * 0.1;
          const grad = ctx.createRadialGradient(boxX + boxW / 2, boxY + boxH / 2, 4, boxX + boxW / 2, boxY + boxH / 2, 28 * pulse);
          grad.addColorStop(0, 'rgba(244, 67, 54, 0.45)');
          grad.addColorStop(1, 'rgba(244, 67, 54, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(boxX + boxW / 2, boxY + boxH / 2, 28 * pulse, 0, Math.PI * 2);
          ctx.fill();

          if (this.signalImages.stop && this.signalImages.stop.isLoaded) {
            ctx.drawImage(this.signalImages.stop, boxX + 6, boxY + 7, boxW - 12, boxH - 14);
          }
        }

        // 3. Floating In-World Child-Friendly Badge above approaching signal box
        if (isPrimaryForApproach) {
          const approachCurbY = this.isWalkingHome ? zone.northCurbY : zone.southCurbY;
          const distToPlayer = Math.abs(this.player.y - approachCurbY);
          if (distToPlayer < 550) {
            ctx.save();
            const badgeY = boxY - 26;
            const badgeX = boxX + boxW / 2;

            let badgeBg = '#d32f2f';
            let badgeIcon = '🛑 WAIT ON CURB';
            if (isWalk) {
              badgeBg = '#2e7d32';
              badgeIcon = '🟢 SAFE TO WALK';
            } else if (zone.trialType === 'TRAFFIC_LIGHT' && !zone.pedestrianButtonPressed) {
              badgeBg = '#d32f2f';
              badgeIcon = '🛑 PRESS BUTTON TO CROSS [SPACE]';
            } else if (isFlashing) {
              badgeBg = '#f57c00';
              badgeIcon = '⚠️ SIGNAL REQUESTED: WAIT FOR WALK!';
            } else {
              badgeBg = '#f57c00';
              badgeIcon = '⏳ BUTTON PRESSED: WAIT FOR WALK!';
            }

            // Draw Badge Pill
            ctx.font = 'bold 12px Fredoka, sans-serif';
            const badgeW = ctx.measureText(badgeIcon).width + 26;
            const badgeH = 26;
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.roundRect(badgeX - badgeW / 2 + 2, badgeY - badgeH / 2 + 2, badgeW, badgeH, 13);
            ctx.fill();

            ctx.fillStyle = badgeBg;
            ctx.beginPath();
            ctx.roundRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 13);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Pointer triangle down to the signal box
            ctx.fillStyle = badgeBg;
            ctx.beginPath();
            ctx.moveTo(badgeX - 6, badgeY + badgeH / 2);
            ctx.lineTo(badgeX + 6, badgeY + badgeH / 2);
            ctx.lineTo(badgeX, badgeY + badgeH / 2 + 7);
            ctx.closePath();
            ctx.fill();

            // Text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(badgeIcon, badgeX, badgeY);

            // Safe Waiting Progress Cue when player is standing at the curb
            if (!isWalk && zone.pedestrianButtonPressed && zone.waitTime > 0 && distToPlayer < 95) {
              const waitPct = Math.min(1, zone.waitTime / 2.5);
              ctx.strokeStyle = '#ffd54f';
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.arc(badgeX, badgeY, 18, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * waitPct);
              ctx.stroke();
            }

            ctx.restore();
          }
        }
      });
    });
  }

  drawCrossingGuard(ctx) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasCrossingGuard || !zone.crossingGuard) return;
      const guard = zone.crossingGuard;

      let spriteIdx = 0;
      const t = guard.animTimer;

      switch (guard.state) {
        case 'WAIT_ON_CURB': {
          const distToPlayer = Math.abs(this.player.y - (zone.southCurbY + 12));
          if (distToPlayer < 160) {
            // Player is nearby! Guard motions with open palm: "Wait on the sidewalk!"
            const palmFrames = [2, 3, 4, 3];
            spriteIdx = palmFrames[Math.floor(t * 4) % palmFrames.length];
          } else {
            spriteIdx = 0; // guard_1
          }
          break;
        }
        case 'STEPPING_OUT': {
          spriteIdx = 8; // guard_9
          break;
        }
        case 'WAVING_CROSS': {
          const waveFrames = [5, 6, 7, 6];
          spriteIdx = waveFrames[Math.floor(t * 4.5) % waveFrames.length];
          break;
        }
        case 'RETURNING': {
          spriteIdx = 0; // guard_1
          break;
        }
        case 'DONE': {
          spriteIdx = 1; // guard_2 (paddle down relaxed)
          break;
        }
      }

      const guardSprite = this.guardSprites[spriteIdx];
      const gW = 68;
      const gH = 68;

      ctx.save();
      ctx.translate(guard.x, guard.y);

      // Soft drop shadow on pavement
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, 22, 18, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Guard Sprite
      if (guardSprite && guardSprite.isLoaded) {
        ctx.drawImage(guardSprite, -gW / 2, -gH / 2 - 6, gW, gH);
      }

      // Floating Guard Status Speech Badge above Guard's Head
      const distToPlayer = Math.abs(this.player.y - guard.y);
      if (distToPlayer < 550 && guard.state !== 'DONE') {
        let badgeText = '🛑 GUARD: "Wait on curb!"';
        let badgeBg = '#d32f2f';

        if (guard.state === 'STEPPING_OUT') {
          badgeText = '🚸 GUARD: "Halting traffic!"';
          badgeBg = '#f57c00';
        } else if (guard.state === 'WAVING_CROSS') {
          badgeText = '🟢 GUARD: "Safe to cross! Walk now! 🚶"';
          badgeBg = '#2e7d32';
        } else if (guard.state === 'RETURNING') {
          badgeText = '👍 GUARD: "Great job crossing!"';
          badgeBg = '#1976d2';
        }

        ctx.font = 'bold 12px Fredoka, sans-serif';
        const textWidth = ctx.measureText(badgeText).width;
        const bW = textWidth + 24;
        const bH = 26;
        const bY = -gH / 2 - 24;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.roundRect(-bW / 2 + 2, bY - bH / 2 + 2, bW, bH, 13);
        ctx.fill();

        // Background pill
        ctx.fillStyle = badgeBg;
        ctx.beginPath();
        ctx.roundRect(-bW / 2, bY - bH / 2, bW, bH, 13);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Pointer notch
        ctx.fillStyle = badgeBg;
        ctx.beginPath();
        ctx.moveTo(-5, bY + bH / 2);
        ctx.lineTo(5, bY + bH / 2);
        ctx.lineTo(0, bY + bH / 2 + 6);
        ctx.closePath();
        ctx.fill();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, 0, bY);

        // Waiting progress ring around badge when waiting
        if (guard.state === 'WAIT_ON_CURB' && zone.waitTime > 0 && distToPlayer < 90) {
          const waitPct = Math.min(1, zone.waitTime / 1.6);
          ctx.strokeStyle = '#ffd54f';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(0, bY, 18, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * waitPct);
          ctx.stroke();
        }
      }

      ctx.restore();
    });
  }

  drawGroups(ctx) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasGroupCrossing) return;

      // 1. Group of 2 (Left side of crosswalk)
      const g2 = zone.groupOf2;
      if (g2) {
        const frameIdx = Math.floor(g2.animFrame) % 4;
        const sprite = (this.groupOf2Sprites && this.groupOf2Sprites[frameIdx]) ? this.groupOf2Sprites[frameIdx] : null;

        ctx.save();
        ctx.translate(g2.x, g2.y);

        // Ground shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 26, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sprite
        if (sprite && sprite.isLoaded) {
          ctx.drawImage(sprite, -g2.drawW / 2, -g2.drawH / 2 - 4, g2.drawW, g2.drawH);
        } else {
          ctx.fillStyle = '#42a5f5';
          ctx.beginPath();
          ctx.arc(-12, 0, 14, 0, Math.PI * 2);
          ctx.arc(12, 0, 14, 0, Math.PI * 2);
          ctx.fill();
        }

        // Group Status Speech Bubble
        if (g2.state === 'STOPPED') {
          this.drawSpeechBubble(ctx, 0, -g2.drawH / 2 - 20, "🛑 'Don't run ahead!'", '#d32f2f');
        } else if (g2.state === 'CROSSING') {
          this.drawSpeechBubble(ctx, 0, -g2.drawH / 2 - 20, "👥 'Crossing together!'", '#1976d2');
        } else if (g2.state === 'WAITING' && Math.abs(this.player.y - g2.y) < 140) {
          this.drawSpeechBubble(ctx, 0, -g2.drawH / 2 - 20, "👥 'Wait with us!'", '#546e7a');
        } else if (g2.state === 'SAFELY_CROSSED') {
          this.drawSpeechBubble(ctx, 0, -g2.drawH / 2 - 20, "🎉 'Crossed safely!'", '#2e7d32');
        }

        ctx.restore();
      }

      // 2. Group of 3 (Right side of crosswalk)
      const g3 = zone.groupOf3;
      if (g3) {
        const frameIdx = Math.floor(g3.animFrame) % 4;
        const sprite = (this.groupOf3Sprites && this.groupOf3Sprites[frameIdx]) ? this.groupOf3Sprites[frameIdx] : null;

        ctx.save();
        ctx.translate(g3.x, g3.y);

        // Ground shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 34, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sprite
        if (sprite && sprite.isLoaded) {
          ctx.drawImage(sprite, -g3.drawW / 2, -g3.drawH / 2 - 4, g3.drawW, g3.drawH);
        } else {
          ctx.fillStyle = '#66bb6a';
          ctx.beginPath();
          ctx.arc(-20, 0, 13, 0, Math.PI * 2);
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.arc(20, 0, 13, 0, Math.PI * 2);
          ctx.fill();
        }

        // Group Status Speech Bubble
        if (g3.state === 'STOPPED') {
          this.drawSpeechBubble(ctx, 0, -g3.drawH / 2 - 20, "⚠️ 'Stay with the group!'", '#d32f2f');
        } else if (g3.state === 'CROSSING') {
          this.drawSpeechBubble(ctx, 0, -g3.drawH / 2 - 20, "🚶 'Walk, don't run!'", '#2e7d32');
        } else if (g3.state === 'WAITING' && Math.abs(this.player.y - g3.y) < 140) {
          this.drawSpeechBubble(ctx, 0, -g3.drawH / 2 - 20, "👥 'Wait for the signal!'", '#546e7a');
        } else if (g3.state === 'SAFELY_CROSSED') {
          this.drawSpeechBubble(ctx, 0, -g3.drawH / 2 - 20, "⭐ 'Great teamwork!'", '#1976d2');
        }

        ctx.restore();
      }
    });
  }

  drawStrangersWithDogs(ctx) {
    this.strangersWithDogs.forEach(stranger => {
      const sprite = (this.strangerDogSprites && this.strangerDogSprites[stranger.spriteIndex]) ? this.strangerDogSprites[stranger.spriteIndex] : null;
      const dist = Math.hypot(this.player.x - stranger.x, this.player.y - stranger.y);

      ctx.save();
      ctx.translate(stranger.x, stranger.y);

      // Ground shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, 22, 22, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Danger ring if dog gave Thumbs Down and player is approaching
      if (stranger.status === 'THUMBS_DOWN') {
        const pulse = 1 + Math.sin(Date.now() / 150) * 0.08;
        ctx.strokeStyle = '#f44336';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, 46 * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (stranger.status === 'IDLE' && dist < 75) {
        // Caution buffer ring: Ask before stepping closer!
        ctx.strokeStyle = '#ffa000';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Sprite
      if (sprite && sprite.isLoaded) {
        ctx.drawImage(sprite, -stranger.drawW / 2, -stranger.drawH / 2 - 4, stranger.drawW, stranger.drawH);
      } else {
        ctx.fillStyle = '#ff7043';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      // Interactive Prompts and Speech Bubbles
      if (stranger.status === 'IDLE') {
        if (dist < 85) {
          const bounce = Math.sin(Date.now() / 200) * 3;
          this.drawInteractivePrompt(ctx, 0, -stranger.drawH / 2 - 24 + bounce, '⌨️ [SPACE] or Tap: Ask to pet dog! 🐕', '#ff8f00');
        }
      } else if (stranger.status === 'THUMBS_UP') {
        if (!stranger.hasBeenPetted) {
          const bounce = Math.sin(Date.now() / 180) * 3;
          this.drawInteractivePrompt(ctx, 0, -stranger.drawH / 2 - 38 + bounce, '⌨️ [SPACE] or Tap: Pet the dog! 🐾', '#2e7d32');
          this.drawSpeechBubble(ctx, 0, -stranger.drawH / 2 - 16, `👍 THUMBS UP! "You can pet ${stranger.name.split('&')[1]?.trim() || 'the dog'}!" 🐕`, '#2e7d32');
        } else {
          this.drawSpeechBubble(ctx, 0, -stranger.drawH / 2 - 20, `❤️ Happy doggy! Wagging its tail! 🐕✨`, '#2e7d32');
        }
      } else if (stranger.status === 'THUMBS_DOWN') {
        const blink = Math.sin(Date.now() / 120) > 0;
        this.drawSpeechBubble(ctx, 0, -stranger.drawH / 2 - 24, '👎 THUMBS DOWN! "Nervous dog! WALK AWAY!" ⚠️', blink ? '#d32f2f' : '#b71c1c');
      } else if (stranger.status === 'WALKED_AWAY_SAFELY') {
        this.drawSpeechBubble(ctx, 0, -stranger.drawH / 2 - 24, '⭐ Safe choice! Backed away safely! (+1 Star)', '#1976d2');
      }

      ctx.restore();
    });
  }

  drawStrangerVans(ctx) {
    this.strangerVans.forEach(van => {
      const sprite = (this.strangerVanSprites && this.strangerVanSprites[van.spriteKey]) ? this.strangerVanSprites[van.spriteKey] : null;
      const isPlayerNearby = Math.abs(this.player.y - van.y) < 280;

      ctx.save();

      // 1. Ground Shadow under van
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.beginPath();
      ctx.ellipse(van.x, van.y + van.drawH / 2 - 12, van.drawW * 0.46, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shadow under stranger
      ctx.beginPath();
      ctx.ellipse(van.strangerX, van.strangerY + 22, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Stranger Danger Hazard Warning Zone (Pulsing dashed ring around stranger)
      if (!van.avoided) {
        const pulse = 1 + Math.sin(Date.now() / 160) * 0.08;
        ctx.strokeStyle = '#f44336';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(van.strangerX, van.strangerY, 46 * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Draw Sprite
      if (sprite && sprite.isLoaded) {
        ctx.drawImage(
          sprite,
          van.x - van.drawW / 2,
          van.y - van.drawH / 2,
          van.drawW,
          van.drawH
        );
      } else {
        // Fallback van rectangle
        ctx.fillStyle = '#fbc02d';
        ctx.fillRect(van.x - van.drawW / 2, van.y - van.drawH / 2, van.drawW, van.drawH);
      }

      // 4. Stranger Speech Bubble / Lure Prompt
      if (!van.avoided) {
        if (isPlayerNearby) {
          const bounce = Math.sin(Date.now() / 200) * 2;
          this.drawSpeechBubble(
            ctx,
            van.strangerX,
            van.strangerY - 42 + bounce,
            '🍬 "Hey kid! Come check out my van!"',
            '#d32f2f'
          );

          // Overhead Alert Pill to clearly instruct player
          const pillY = van.y - van.drawH / 2 - 28;
          ctx.save();
          const pillText = '⚠️ STRANGER DANGER! WALK AROUND & AVOID! 🛑';
          ctx.font = 'bold 11px Fredoka, sans-serif';
          const textW = ctx.measureText(pillText).width;
          const pillW = textW + 24;
          const pillH = 24;

          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.beginPath();
          ctx.roundRect(van.x - pillW / 2 + 2, pillY - pillH / 2 + 2, pillW, pillH, 12);
          ctx.fill();

          ctx.fillStyle = '#b71c1c';
          ctx.beginPath();
          ctx.roundRect(van.x - pillW / 2, pillY - pillH / 2, pillW, pillH, 12);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pillText, van.x, pillY);
          ctx.restore();
        }
      } else {
        // Player successfully avoided the stranger!
        this.drawSpeechBubble(
          ctx,
          van.strangerX,
          van.strangerY - 40,
          '⭐ "Smart pedestrian! You stayed away!"',
          '#2e7d32'
        );
      }

      ctx.restore();
    });
  }

  drawBridgeOverlay(ctx) {
    this.crossingZones.forEach(zone => {
      if (!zone.hasBridge || !zone.bridge) return;
      const bridge = zone.bridge;

      ctx.save();

      // 1. Draw Pedestrian Footbridge Sprite (spanning road above the traffic)
      if (this.bridgeSprite && this.bridgeSprite.isLoaded) {
        ctx.drawImage(
          this.bridgeSprite,
          bridge.x - bridge.drawW / 2,
          bridge.y - bridge.drawH / 2,
          bridge.drawW,
          bridge.drawH
        );
      } else {
        // High-quality procedural fallback footbridge
        ctx.fillStyle = '#546e7a';
        ctx.beginPath();
        ctx.roundRect(bridge.x - 36, bridge.y - 70, 72, 140, 8);
        ctx.fill();

        // Handrails
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(bridge.x - 38, bridge.y - 70, 6, 140);
        ctx.fillRect(bridge.x + 32, bridge.y - 70, 6, 140);
      }

      // Elevated Bridge Status Banner if player is on this bridge
      if (this.player.onBridge && Math.abs(this.player.y - bridge.y) < 120 && Math.abs(this.player.x - bridge.x) < 40) {
        const bannerY = bridge.y - bridge.drawH / 2 - 18;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.roundRect(bridge.x - 84, bannerY - 12, 168, 24, 12);
        ctx.fill();

        ctx.fillStyle = '#0288d1';
        ctx.beginPath();
        ctx.roundRect(bridge.x - 86, bannerY - 14, 172, 26, 13);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌉 SAFE ON FOOTBRIDGE!', bridge.x, bannerY - 1);
      }

      ctx.restore();
    });
  }

  drawSpeechBubble(ctx, x, y, text, bgColor) {
    ctx.save();
    ctx.font = 'bold 11px Fredoka, sans-serif';
    const textW = ctx.measureText(text).width;
    const bW = textW + 18;
    const bH = 24;

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.roundRect(x - bW / 2 + 2, y - bH / 2 + 2, bW, bH, 12);
    ctx.fill();

    // Background pill
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - bW / 2, y - bH / 2, bW, bH, 12);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pointer notch
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.moveTo(x - 5, y + bH / 2);
    ctx.lineTo(x + 5, y + bH / 2);
    ctx.lineTo(x, y + bH / 2 + 5);
    ctx.closePath();
    ctx.fill();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawInteractivePrompt(ctx, x, y, text, bgColor) {
    ctx.save();
    ctx.font = 'bold 10px Fredoka, sans-serif';
    const textW = ctx.measureText(text).width;
    const bW = textW + 16;
    const bH = 22;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.roundRect(x - bW / 2 + 2, y - bH / 2 + 2, bW, bH, 11);
    ctx.fill();

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - bW / 2, y - bH / 2, bW, bH, 11);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawCars(ctx) {
    this.cars.forEach(car => {
      ctx.save();
      ctx.translate(car.x, car.y);

      const isLeft = car.dir === -1;
      const spriteObj = this.carSprites[car.type] || this.carSprites.car_1;
      const sprite = spriteObj ? (isLeft ? spriteObj.left : spriteObj.right) : null;

      const drawW = car.drawW || 86;
      const drawH = car.drawH || 86;

      // Realistic Ground Shadow under wheels
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, drawH * 0.22, drawW * 0.42, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      if (sprite && sprite.isLoaded) {
        ctx.drawImage(sprite, -drawW / 2, -drawH / 2 - 2, drawW, drawH);
      } else {
        // Fallback procedural car while loading
        ctx.fillStyle = car.color || '#1e88e5';
        ctx.beginPath();
        ctx.roundRect(-34, -18, 68, 36, 8);
        ctx.fill();
      }

      // If Cybertruck: add subtle front LED headlight beam (unlabeled)
      if (car.isCybertruck) {
        // Front LED headlight beam
        const frontX = isLeft ? (-drawW * 0.44) : (drawW * 0.44);
        const grad = ctx.createRadialGradient(frontX, -2, 2, frontX, -2, 20);
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.65)');
        grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(frontX, -2, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // If car is braking: bright glowing red rear brake light
      if (car.isBraking) {
        const rearX = isLeft ? (drawW * 0.40) : (-drawW * 0.40);
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(rearX, 2, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo
        const halo = ctx.createRadialGradient(rearX, 2, 2, rearX, 2, 14);
        halo.addColorStop(0, 'rgba(255, 23, 68, 0.6)');
        halo.addColorStop(1, 'rgba(255, 23, 68, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(rearX, 2, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  drawPlayer(ctx) {
    ctx.save();
    ctx.translate(this.player.x, this.player.y);

    const charW = 58;
    const charH = 58;

    // 1. IF CHARACTER IS FALLING DOWN (Stumble & Recovery Sequence):
    if (this.player.isFalling) {
      const charObj = this.sprites[this.selectedChar] || this.sprites.boy;
      const fallFrames = charObj.fall || this.sprites.boy.fall;
      const fIdx = Math.max(0, Math.min(7, this.player.fallFrame || 0));
      const fSprite = (fallFrames && fallFrames[fIdx]) ? fallFrames[fIdx] : null;

      // Ground tumble shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.beginPath();
      ctx.ellipse(0, 18, 22, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Falling sprite frame
      if (fSprite && fSprite.isLoaded) {
        ctx.drawImage(fSprite, -charW / 2, -charH / 2 - 4, charW, charH);
      } else {
        ctx.fillStyle = '#ff5722';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbiting dizzy stars while sitting on the ground
      if (fIdx === 3) {
        const starTime = this.player.fallTimer * 4;
        const starRadiusX = 24;
        const starRadiusY = 8;
        const starCenterY = -charH / 2 - 14;

        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 3 Orbiting Stars
        for (let i = 0; i < 3; i++) {
          const angle = starTime + (i * (Math.PI * 2 / 3));
          const sx = Math.cos(angle) * starRadiusX;
          const sy = starCenterY + Math.sin(angle) * starRadiusY;
          ctx.fillText(i === 1 ? '💫' : '⭐', sx, sy);
        }

      } else if (fIdx >= 4) {
        // Getting back up (text box removed per user request)
      } else {
        // Falling down stumble cue
        ctx.fillStyle = '#ffeb3b';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💫', 0, -charH / 2 - 10);
      }

      ctx.restore();
      return;
    }

    // 2. IF CHARACTER IS PETTING DOG (Boy or Girl animation sequence):
    if (this.player.isPettingDog && this.pettingSequence && this.pettingSequence.stage === 'PETTING') {
      const charObj = this.sprites[this.selectedChar] || this.sprites.boy;
      const petFrames = (charObj && charObj.petDog) ? charObj.petDog : this.sprites.boy.petDog;
      const maxIdx = petFrames ? (petFrames.length - 1) : 0;
      const fIdx = Math.max(0, Math.min(maxIdx, this.player.pettingFrame || 0));
      const pSprite = (petFrames && petFrames[fIdx]) ? petFrames[fIdx] : null;

      // Ground shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, 20, 20, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Petting Sprite
      const pW = 64;
      const pH = 64;
      if (pSprite && pSprite.isLoaded) {
        ctx.drawImage(pSprite, -pW / 2, -pH / 2 - 2, pW, pH);
      } else {
        ctx.fillStyle = this.selectedChar === 'girl' ? '#e91e63' : '#1e88e5';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw floating heart / sparkle particles
      if (this.pettingSequence && this.pettingSequence.hearts) {
        this.pettingSequence.hearts.forEach(h => {
          ctx.save();
          ctx.font = 'bold 15px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = h.alpha;
          ctx.fillText(h.icon, h.x - this.player.x, h.y - this.player.y);
          ctx.restore();
        });
      }

      ctx.restore();
      return;
    }

    const charObj = this.sprites[this.selectedChar] || this.sprites.boy;
    let spriteSet = null;
    let flipX = false;

    if (charObj.directions && charObj.directions[this.player.facing]) {
      spriteSet = charObj.directions[this.player.facing];
    } else if (this.player.facing.includes('left') && charObj.directions) {
      // Auto-flip opposite right-side direction if left is missing
      const mirrorKey = this.player.facing.replace('left', 'right');
      if (charObj.directions[mirrorKey]) {
        spriteSet = charObj.directions[mirrorKey];
        flipX = true;
      }
    } else if (this.player.facing.includes('right') && charObj.directions) {
      // Auto-flip opposite left-side direction if right is missing
      const mirrorKey = this.player.facing.replace('right', 'left');
      if (charObj.directions[mirrorKey]) {
        spriteSet = charObj.directions[mirrorKey];
        flipX = true;
      }
    }

    if (!spriteSet) {
      if (this.player.facing.startsWith('down')) {
        spriteSet = charObj.front;
      } else {
        spriteSet = charObj.back;
      }
    }

    let frameIdx = 0;
    if (this.player.isWalking) {
      // 4-frame walk stride cycle: Left stride (1) -> Mid-step (2) -> Right stride (3) -> Mid-step (2)
      const walkSeq = [1, 2, 3, 2];
      frameIdx = walkSeq[Math.floor(this.player.walkAnimFrame) % walkSeq.length];
    } else {
      frameIdx = 0; // Direction-appropriate idle frame
    }

    const currentSprite = (spriteSet && spriteSet[frameIdx]) ? spriteSet[frameIdx] : null;

    // Draw Friends if "Cross with Group" is active
    if (this.player.withGroup) {
      const friendObj = this.selectedChar === 'boy' ? this.sprites.girl : this.sprites.boy;
      let friendSet = null;
      if (friendObj.directions && friendObj.directions[this.player.facing]) {
        friendSet = friendObj.directions[this.player.facing];
      } else if (this.player.facing.startsWith('down')) {
        friendSet = friendObj.front;
      } else {
        friendSet = friendObj.back;
      }
      const fSprite = (friendSet && friendSet[frameIdx]) ? friendSet[frameIdx] : null;

      if (fSprite && fSprite.isLoaded) {
        // Friend on Left
        ctx.save();
        ctx.translate(-24, 0);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 14, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(fSprite, -charW * 0.45, -charH * 0.45, charW * 0.9, charH * 0.9);
        ctx.restore();

        // Friend on Right
        ctx.save();
        ctx.translate(24, 0);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 14, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(fSprite, -charW * 0.45, -charH * 0.45, charW * 0.9, charH * 0.9);
        ctx.restore();
      }
    }

    // Player Soft Drop Shadow on Sidewalk / Crosswalk
    ctx.fillStyle = 'rgba(0, 0, 0, 0.26)';
    ctx.beginPath();
    ctx.ellipse(0, 20, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw Character Sprite (with horizontal flip when applicable)
    if (currentSprite && currentSprite.isLoaded) {
      if (flipX) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(currentSprite, -charW / 2, -charH / 2 - 4, charW, charH);
        ctx.restore();
      } else {
        ctx.drawImage(currentSprite, -charW / 2, -charH / 2 - 4, charW, charH);
      }
    } else {
      // Fallback while loading
      ctx.fillStyle = this.selectedChar === 'boy' ? '#1e88e5' : '#e91e63';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // Elevated badge when walking across the pedestrian footbridge
    if (this.player.onBridge) {
      ctx.save();
      const badgeY = -charH / 2 - 18;
      ctx.fillStyle = 'rgba(2, 119, 189, 0.92)';
      ctx.beginPath();
      ctx.roundRect(-54, badgeY - 10, 108, 20, 10);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌉 ON FOOTBRIDGE', 0, badgeY);
      ctx.restore();
    }

    // Grocery bag in hand / beside player when walking home
    if (this.hasGroceries && this.storeBagImage && this.storeBagImage.isLoaded) {
      ctx.save();
      const bagBob = this.player.isWalking ? Math.sin(this.player.walkAnimFrame * 2) * 2.5 : 0;
      ctx.drawImage(this.storeBagImage, 10, -8 + bagBob, 28, 28);
      ctx.restore();
    }

    ctx.restore();
  }

  drawConfetti(ctx) {
    this.confettiParticles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
  }

  // ==========================================================================
  // LEVEL SELECTION & MODE SWITCHING
  // ==========================================================================
  setLevel(level) {
    this.gameLevel = level;
    if (this.selectLevel1) {
      if (level === 1) this.selectLevel1.classList.add('selected');
      else this.selectLevel1.classList.remove('selected');
    }
    if (this.selectLevel2) {
      if (level === 2) this.selectLevel2.classList.add('selected');
      else this.selectLevel2.classList.remove('selected');
    }

    const menuDestIcon = document.getElementById('menu-dest-icon');
    const menuDestTitle = document.getElementById('menu-dest-title');
    const menuDestDesc = document.getElementById('menu-dest-desc');

    if (level === 2) {
      this.destination = {
        title: 'Fresh Market Grocery Store',
        icon: '🛒',
        desc: 'Walk across town, find items on your shopping list, and checkout at the register!'
      };
      if (menuDestIcon) menuDestIcon.textContent = '🛒';
      if (menuDestTitle) menuDestTitle.textContent = 'Fresh Market Grocery';
      if (menuDestDesc) menuDestDesc.textContent = 'Shop for items on your grocery list and pay at the cashier!';
      if (this.destinationIconEl) this.destinationIconEl.textContent = '🛒';
      if (this.destinationTextEl) this.destinationTextEl.textContent = 'Heading to Fresh Market';
      if (this.endPointLabelEl) this.endPointLabelEl.textContent = '🛒 Fresh Market';
    } else {
      this.destination = {
        title: 'Grandma’s Bakery & Town Park',
        icon: '🧁',
        desc: 'Fresh cupcakes & the playground are at the end of the avenue!'
      };
      if (menuDestIcon) menuDestIcon.textContent = '🧁';
      if (menuDestTitle) menuDestTitle.textContent = 'Sweet Treat Bakery';
      if (menuDestDesc) menuDestDesc.textContent = 'A delicious snack is waiting across town!';
      if (this.destinationIconEl) this.destinationIconEl.textContent = '🧁';
      if (this.destinationTextEl) this.destinationTextEl.textContent = "Heading to Grandma's Bakery";
      if (this.endPointLabelEl) this.endPointLabelEl.textContent = '🧁 Bakery & Park';
    }
  }

  // ==========================================================================
  // LEVEL 2 STORE SHOPPING & CHECKOUT MECHANICS
  // ==========================================================================
  getStoreCatalog() {
    return [
      // Left Wall Produce Shelves (dark grey shelf x: 110)
      { id: 'apple', file: '01_apple.png', name: 'Red Apple', category: 'produce', price: 1.00, shelfX: 110, shelfY: 290 },
      { id: 'bananas', file: '02_bananas.png', name: 'Fresh Bananas', category: 'produce', price: 1.25, shelfX: 110, shelfY: 360 },
      { id: 'orange', file: '03_orange.png', name: 'Juicy Orange', category: 'produce', price: 1.00, shelfX: 110, shelfY: 430 },
      { id: 'grapes', file: '04_grapes.png', name: 'Purple Grapes', category: 'produce', price: 2.50, shelfX: 110, shelfY: 500 },
      { id: 'strawberries', file: '05_strawberries.png', name: 'Sweet Strawberries', category: 'produce', price: 3.00, shelfX: 110, shelfY: 570 },
      { id: 'carrot', file: '09_carrot.png', name: 'Crunchy Carrot', category: 'produce', price: 0.80, shelfX: 110, shelfY: 640 },
      { id: 'broccoli', file: '10_broccoli.png', name: 'Fresh Broccoli', category: 'produce', price: 1.50, shelfX: 110, shelfY: 710 },

      // Top Wall Glass Cooler Display (dark grey cooler y: 155)
      { id: 'milk_carton', file: '23_milk_carton.png', name: 'Fresh Milk', category: 'cooler', price: 2.50, shelfX: 300, shelfY: 155 },
      { id: 'cheese_wedge', file: '24_cheese_wedge.png', name: 'Cheddar Cheese', category: 'cooler', price: 3.25, shelfX: 380, shelfY: 155 },
      { id: 'strawberry_yogurt', file: '25_strawberry_yogurt.png', name: 'Strawberry Yogurt', category: 'cooler', price: 1.50, shelfX: 460, shelfY: 155 },
      { id: 'water_bottle', file: '27_water_bottle.png', name: 'Spring Water', category: 'cooler', price: 1.00, shelfX: 540, shelfY: 155 },
      { id: 'orange_juice', file: '28_orange_juice.png', name: 'Orange Juice', category: 'cooler', price: 2.75, shelfX: 620, shelfY: 155 },
      { id: 'ice_cream_tub', file: '49_ice_cream_tub.png', name: 'Ice Cream Tub', category: 'cooler', price: 4.00, shelfX: 680, shelfY: 155 },

      // Center-Left Island Shelf (dark grey island x: 318)
      { id: 'sliced_bread', file: '18_sliced_bread.png', name: 'Sliced Bread', category: 'pantry', price: 2.00, shelfX: 318, shelfY: 300 },
      { id: 'cereal_box', file: '29_cereal_box.png', name: 'Cereal Box', category: 'pantry', price: 3.50, shelfX: 318, shelfY: 380 },
      { id: 'pasta_box', file: '30_pasta_box.png', name: 'Italian Pasta', category: 'pantry', price: 1.50, shelfX: 318, shelfY: 460 },
      { id: 'peanut_butter', file: '36_peanut_butter.png', name: 'Peanut Butter', category: 'pantry', price: 2.80, shelfX: 318, shelfY: 540 },
      { id: 'strawberry_jam', file: '37_strawberry_jam.png', name: 'Strawberry Jam', category: 'pantry', price: 2.40, shelfX: 318, shelfY: 620 },
      { id: 'honey_jar', file: '38_honey_jar.png', name: 'Pure Clover Honey', category: 'pantry', price: 3.80, shelfX: 318, shelfY: 700 },

      // Center-Right Island Shelf (dark grey island x: 702)
      { id: 'croissant', file: '20_croissant.png', name: 'Golden Croissant', category: 'bakery', price: 1.80, shelfX: 702, shelfY: 300 },
      { id: 'baguette', file: '19_baguette.png', name: 'French Baguette', category: 'bakery', price: 2.20, shelfX: 702, shelfY: 370 },
      { id: 'pasta_sauce', file: '41_pasta_sauce_jar.png', name: 'Pasta Sauce Jar', category: 'canned', price: 2.30, shelfX: 702, shelfY: 440 },
      { id: 'potato_chips', file: '45_potato_chips.png', name: 'Crispy Chips', category: 'snacks', price: 1.95, shelfX: 702, shelfY: 510 },
      { id: 'chocolate_bar', file: '47_chocolate_bar.png', name: 'Chocolate Bar', category: 'snacks', price: 1.25, shelfX: 702, shelfY: 570 },

      // Right Wall Shelves (dark grey shelf x: 920)
      { id: 'donut', file: '21_donut.png', name: 'Glazed Donut', category: 'bakery', price: 1.20, shelfX: 920, shelfY: 240 },
      { id: 'cookies', file: '48_cookies_package.png', name: 'Chocolate Cookies', category: 'snacks', price: 2.60, shelfX: 920, shelfY: 310 },
      { id: 'canned_beans', file: '40_canned_beans.png', name: 'Canned Beans', category: 'canned', price: 1.10, shelfX: 920, shelfY: 380 },
      { id: 'dish_soap', file: '55_dish_soap.png', name: 'Dish Soap', category: 'household', price: 2.20, shelfX: 920, shelfY: 450 },
      { id: 'paper_towels', file: '54_paper_towels.png', name: 'Paper Towels', category: 'household', price: 2.80, shelfX: 920, shelfY: 520 },
      { id: 'pizza_box', file: '50_pizza_box.png', name: 'Frozen Pizza', category: 'cooler', price: 5.50, shelfX: 920, shelfY: 590 }
    ];
  }

  enterStoreScene() {
    this.state = 'STORE_SHOPPING';
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;

    // Reset player position to store entrance
    this.player.x = 512;
    this.player.y = 910;
    this.player.facing = 'up';
    this.player.isWalking = false;
    this.player.isFalling = false;
    this.player.withGroup = false;
    this.player.onBridge = false;
    this.player.isPettingDog = false;

    // Deep clone store catalog items so each session has fresh state
    this.storeItems = this.getStoreCatalog().map(item => ({
      ...item,
      collected: false,
      onList: false
    }));

    // Choose 3 distinct items for the shopping list
    const produceList = this.storeItems.filter(i => i.category === 'produce');
    const coolerList = this.storeItems.filter(i => i.category === 'cooler');
    const dryList = this.storeItems.filter(i => ['pantry', 'bakery', 'snacks', 'household'].includes(i.category));

    const item1 = produceList[Math.floor(Math.random() * produceList.length)];
    const item2 = coolerList[Math.floor(Math.random() * coolerList.length)];
    const item3 = dryList[Math.floor(Math.random() * dryList.length)];

    this.shoppingList = [
      { id: item1.id, name: item1.name, file: item1.file, price: item1.price, collected: false },
      { id: item2.id, name: item2.name, file: item2.file, price: item2.price, collected: false },
      { id: item3.id, name: item3.name, file: item3.file, price: item3.price, collected: false }
    ];

    this.storeItems.forEach(item => {
      item.onList = this.shoppingList.some(target => target.id === item.id);
    });

    if (this.walkingControls) this.walkingControls.classList.remove('hidden');
    if (this.storeHud) this.storeHud.classList.remove('hidden');
    if (this.gameHud) this.gameHud.classList.remove('hidden');
    if (this.progressHud) this.progressHud.classList.add('hidden');

    this.updateShoppingListUI();
    this.showInWorldFeedback('🛒 Arrived at Fresh Market! Find items on your list!', '#15803d');
    sfx.doorChime();
  }

  updateShoppingListUI() {
    const listContainer = document.getElementById('store-checklist');
    const counterEl = document.getElementById('store-items-counter');
    const bannerEl = document.getElementById('store-goal-banner');

    if (!listContainer || !this.shoppingList) return;

    const collectedCount = this.shoppingList.filter(t => t.collected).length;
    if (counterEl) {
      counterEl.textContent = `${collectedCount}/${this.shoppingList.length}`;
      if (collectedCount === this.shoppingList.length) {
        counterEl.classList.add('complete');
      } else {
        counterEl.classList.remove('complete');
      }
    }

    if (bannerEl) {
      if (collectedCount === this.shoppingList.length) {
        bannerEl.textContent = '🎉 All items found! Go to the cash register to pay! 💳';
        bannerEl.classList.add('goal-ready');
      } else {
        bannerEl.textContent = 'Find the items on the shelves!';
        bannerEl.classList.remove('goal-ready');
      }
    }

    listContainer.innerHTML = '';
    this.shoppingList.forEach(target => {
      const itemRow = document.createElement('div');
      itemRow.className = `store-check-item ${target.collected ? 'collected' : ''}`;
      itemRow.innerHTML = `
        <img src="assets/shopping/items/${target.file}" alt="${target.name}" class="check-item-img">
        <span class="check-item-name">${target.name}</span>
        <span class="check-item-status">${target.collected ? '✅' : '⬜'}</span>
      `;
      listContainer.appendChild(itemRow);
    });
  }

  isStorePositionBlocked(x, y) {
    const r = 16;
    // Store outer walls
    if (x - r < 55 || x + r > 965) return true;
    if (y - r < 120) return true;
    if (y + r > 925) {
      // Allow entrance doorway: x in 440..584
      if (x - r < 440 || x + r > 584 || y + r > 970) return true;
    }

    // Interior shelf obstacles & counter with open walkable aisles
    // 1. Left Wall Shelf: x: 75..145, y: 260..740
    // 2. Center-Left Island: x: 285..350, y: 275..730
    // 3. Center-Right Island: x: 670..735, y: 275..625
    // 4. Right Wall Shelf: x: 885..955, y: 210..620
    // 5. Top Wall Cooler: x: 260..720, y: 120..175
    // 6. Cashier Counter: x: 735..965, y: 735..890
    const obstacles = [
      { x1: 75, x2: 145, y1: 260, y2: 740 },
      { x1: 285, x2: 350, y1: 275, y2: 730 },
      { x1: 670, x2: 735, y1: 275, y2: 625 },
      { x1: 885, x2: 955, y1: 210, y2: 620 },
      { x1: 260, x2: 720, y1: 120, y2: 175 },
      { x1: 735, x2: 965, y1: 735, y2: 890 }
    ];

    for (let obs of obstacles) {
      if (x + r > obs.x1 && x - r < obs.x2 && y + r > obs.y1 && y - r < obs.y2) {
        return true;
      }
    }
    return false;
  }

  getNearbyStoreItem() {
    if (!this.storeItems) return null;
    let closest = null;
    let closestDist = 78;
    for (const item of this.storeItems) {
      if (item.collected) continue;
      const dist = Math.hypot(this.player.x - item.shelfX, this.player.y - item.shelfY);
      if (dist < closestDist) {
        closestDist = dist;
        closest = item;
      }
    }
    return closest;
  }

  isNearCashier() {
    return Math.hypot(this.player.x - 660, this.player.y - 800) < 95;
  }

  collectStoreItem(item) {
    if (item.collected) return;
    if (item.onList) {
      item.collected = true;
      const target = this.shoppingList.find(t => t.id === item.id);
      if (target) target.collected = true;

      sfx.itemPickup();
      const collectedCount = this.shoppingList.filter(t => t.collected).length;
      this.updateShoppingListUI();

      if (collectedCount >= this.shoppingList.length) {
        sfx.fanfare();
        this.showInWorldFeedback('🎉 Shopping list complete! Go pay at the Cashier!', '#ca8a04');
      } else {
        this.showInWorldFeedback(`✨ Found: ${item.name}! (${collectedCount}/${this.shoppingList.length})`, '#16a34a');
      }
    } else {
      sfx.buzz();
      const needed = this.shoppingList.filter(t => !t.collected).map(t => t.name).join(', ');
      this.showInWorldFeedback(`Not on your list! Look for: ${needed} 📝`, '#d97706');
    }
  }

  interactWithCashier() {
    const remaining = this.shoppingList.filter(t => !t.collected);
    if (remaining.length > 0) {
      sfx.buzz();
      const names = remaining.map(t => t.name).join(', ');
      this.showInWorldFeedback(`Cashier: "You still need: ${names}! Check the shelves!" 🛒`, '#dc2626');
      return;
    }
    this.openCheckoutMinigame();
  }

  openCheckoutMinigame() {
    this.state = 'STORE_CHECKOUT';
    this.player.isWalking = false;
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.resetButtonStyles();

    if (this.walkingControls) this.walkingControls.classList.add('hidden');
    if (this.storeHud) this.storeHud.classList.add('hidden');

    const modal = document.getElementById('checkout-minigame-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    // Stage 1 Setup: Barcode Scanner Conveyor Belt
    const stageScan = document.getElementById('checkout-stage-scan');
    const stagePay = document.getElementById('checkout-stage-pay');
    const stageBag = document.getElementById('checkout-stage-bag');
    const stepBadge = document.getElementById('terminal-step-badge');
    const itemsRow = document.getElementById('conveyor-items-row');
    const scanCountEl = document.getElementById('scan-progress-count');
    const scanTotalEl = document.getElementById('scan-running-total');

    if (stageScan) stageScan.classList.remove('hidden');
    if (stagePay) stagePay.classList.add('hidden');
    if (stageBag) stageBag.classList.add('hidden');
    if (stepBadge) stepBadge.textContent = 'STEP 1: SCAN ITEMS 🏷️';

    let scannedCount = 0;
    let runningTotal = 0;
    const totalItems = this.shoppingList.length;

    if (scanCountEl) scanCountEl.textContent = `0 / ${totalItems}`;
    if (scanTotalEl) scanTotalEl.textContent = '$0.00';

    if (itemsRow) {
      itemsRow.innerHTML = '';
      this.shoppingList.forEach(item => {
        const itemBtn = document.createElement('button');
        itemBtn.className = 'conveyor-item-btn';
        itemBtn.innerHTML = `
          <img src="assets/shopping/items/${item.file}" alt="${item.name}" class="conveyor-item-img">
          <span class="conveyor-item-name">${item.name}</span>
          <span class="conveyor-item-price">$${item.price.toFixed(2)}</span>
          <span class="conveyor-item-status">TAP SCAN</span>
        `;

        itemBtn.addEventListener('click', () => {
          if (itemBtn.classList.contains('scanned')) return;
          itemBtn.classList.add('scanned');
          const statusEl = itemBtn.querySelector('.conveyor-item-status');
          if (statusEl) statusEl.textContent = 'SCANNED ✅';

          sfx.barcodeScan();
          scannedCount++;
          runningTotal += item.price;

          if (scanCountEl) scanCountEl.textContent = `${scannedCount} / ${totalItems}`;
          if (scanTotalEl) scanTotalEl.textContent = `$${runningTotal.toFixed(2)}`;

          if (scannedCount >= totalItems) {
            setTimeout(() => {
              sfx.cashRegister();
              this.showCheckoutPaymentStage(runningTotal);
            }, 650);
          }
        });

        itemsRow.appendChild(itemBtn);
      });
    }

    sfx.doorChime();
  }

  showCheckoutPaymentStage(totalDue) {
    const stageScan = document.getElementById('checkout-stage-scan');
    const stagePay = document.getElementById('checkout-stage-pay');
    const stepBadge = document.getElementById('terminal-step-badge');
    const dueEl = document.getElementById('register-due-val');
    const paidEl = document.getElementById('register-paid-val');
    const statusEl = document.getElementById('register-status-msg');

    if (stageScan) stageScan.classList.add('hidden');
    if (stagePay) stagePay.classList.remove('hidden');
    if (stepBadge) stepBadge.textContent = 'STEP 2: PAYMENT 💳';

    this.checkoutTotalDue = totalDue;
    this.checkoutPaidSoFar = 0;

    if (dueEl) dueEl.textContent = `$${totalDue.toFixed(2)}`;
    if (paidEl) paidEl.textContent = '$0.00';
    if (statusEl) statusEl.textContent = 'Tap money or card below to pay!';
  }

  handleCheckoutMoneyInput(amount) {
    if (this.checkoutPaidSoFar >= this.checkoutTotalDue) return;

    this.checkoutPaidSoFar += amount;
    const paidEl = document.getElementById('register-paid-val');
    const statusEl = document.getElementById('register-status-msg');

    if (paidEl) paidEl.textContent = `$${this.checkoutPaidSoFar.toFixed(2)}`;

    if (amount >= 1.00) {
      sfx.playTone(392, 'sine', 0.12, 0.15);
      setTimeout(() => sfx.coinClink(), 100);
    } else {
      sfx.coinClink();
    }

    if (this.checkoutPaidSoFar >= this.checkoutTotalDue - 0.001) {
      const change = Math.max(0, this.checkoutPaidSoFar - this.checkoutTotalDue);
      if (statusEl) {
        if (change > 0.01) {
          statusEl.textContent = `PAID! 🪙 Change: $${change.toFixed(2)}! Packaging groceries...`;
        } else {
          statusEl.textContent = 'PAID IN FULL! Exact change! ✨ Packaging groceries...';
        }
      }
      sfx.cashRegister();
      setTimeout(() => {
        sfx.fanfare();
        this.showCheckoutBagStage();
      }, 750);
    } else {
      const remaining = this.checkoutTotalDue - this.checkoutPaidSoFar;
      if (statusEl) {
        statusEl.textContent = `Remaining due: $${remaining.toFixed(2)} 💵`;
      }
    }
  }

  handleCheckoutCardTap() {
    if (this.checkoutPaidSoFar >= this.checkoutTotalDue) return;
    this.checkoutPaidSoFar = this.checkoutTotalDue;
    const paidEl = document.getElementById('register-paid-val');
    const statusEl = document.getElementById('register-status-msg');

    if (paidEl) paidEl.textContent = `$${this.checkoutPaidSoFar.toFixed(2)}`;
    if (statusEl) statusEl.textContent = '💳 CARD APPROVED! Exact payment! Packaging groceries...';

    sfx.walkSignalChirp();
    setTimeout(() => {
      sfx.cashRegister();
      sfx.fanfare();
      this.showCheckoutBagStage();
    }, 700);
  }

  showCheckoutBagStage() {
    const stagePay = document.getElementById('checkout-stage-pay');
    const stageBag = document.getElementById('checkout-stage-bag');
    const stepBadge = document.getElementById('terminal-step-badge');

    if (stagePay) stagePay.classList.add('hidden');
    if (stageBag) stageBag.classList.remove('hidden');
    if (stepBadge) stepBadge.textContent = 'STEP 3: READY TO WALK HOME! 🛍️';
  }

  startWalkHome() {
    const minigameModal = document.getElementById('checkout-minigame-modal');
    if (minigameModal) minigameModal.classList.add('hidden');
    if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
    if (this.storeHud) this.storeHud.classList.add('hidden');

    this.isWalkingHome = true;
    this.hasGroceries = true;
    this.state = 'WALKING_HOME_SIDEWALK';

    // Position player just outside store entrance at the north sidewalk
    this.player.x = this.pathCenterX;
    this.player.y = this.destinationY + 36;
    this.player.facing = 'down';
    this.player.isWalking = false;
    this.player.isFalling = false;
    this.player.withGroup = false;
    this.player.onBridge = false;
    this.player.walkAnimFrame = 0;

    // Reset keyboard and pointer
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.mouseControl.targetWorldX = null;
    this.mouseControl.targetWorldY = null;
    this.resetButtonStyles();

    // Start return crossings from top-most road down to 0
    this.returnCrossingIndex = this.numTrials - 1;

    // Reset traffic and crossing signal states for return trip
    this.crossingZones.forEach(zone => {
      zone.walkGranted = false;
      zone.waitTime = 0;
      zone.pedestrianButtonPressed = false;
      zone.carsHalted = false;
      if (zone.hasBridge) {
        zone.signalState = 'NO_CROSSWALK';
      } else {
        zone.signalState = 'STOP';
      }
      if (zone.hasCrossingGuard) {
        const guard = zone.crossingGuard || this.crossingGuard;
        if (guard) {
          guard.state = 'WAIT_ON_CURB';
          guard.x = this.pathCenterX + 44;
          guard.y = zone.northCurbY - 14;
          guard.targetX = this.pathCenterX + 44;
          guard.targetY = zone.northCurbY - 14;
          guard.whistlePlayed = false;
        }
      }
    });

    if (this.walkingControls) this.walkingControls.classList.remove('hidden');
    if (this.gameHud) this.gameHud.classList.remove('hidden');
    if (this.progressHud) this.progressHud.classList.remove('hidden');

    if (this.destinationIconEl) this.destinationIconEl.textContent = '🏡';
    if (this.destinationTextEl) this.destinationTextEl.textContent = 'Heading Back Home with Groceries 🏡🛍️';
    if (this.endPointLabelEl) this.endPointLabelEl.textContent = '🏡 Home';

    this.cameraY = this.player.y - (this.canvas.height / this.scale) * 0.55;
    this.updateProgressBar();

    sfx.fanfare();
    this.showInWorldFeedback('🛍️ Groceries secured! Now walk safely back HOME! 🏡', '#15803d');
  }

  updateWalkHome(dt) {
    // Cannot walk north past the store
    if (this.player.y < this.destinationY) {
      this.player.y = this.destinationY;
    }

    // Return Crossing check
    const currentZone = this.crossingZones[this.returnCrossingIndex];
    if (this.returnCrossingIndex >= 0 && currentZone) {
      // 1. Footbridge Road Crossing (if applicable)
      if (currentZone.hasBridge) {
        const bridge = currentZone.bridge || this.pedestrianBridge;
        const isAtBridgeStairs = (
          this.player.y >= currentZone.northCurbY - 46 &&
          this.player.y <= currentZone.southCurbY + 46 &&
          Math.abs(this.player.x - bridge.x) <= 38
        );
        if (isAtBridgeStairs) {
          this.player.onBridge = true;
          this.player.x = Math.max(bridge.x - 26, Math.min(bridge.x + 26, this.player.x));
          if (this.player.y > currentZone.northCurbY) {
            this.state = 'CROSSING_ROAD_HOME';
          }
        } else {
          // If player steps directly onto road without using bridge:
          if (this.player.y > currentZone.northCurbY && this.player.y < currentZone.southCurbY && !this.player.onBridge) {
            this.triggerPlayerFallFromDangerousRoad(currentZone);
            return;
          }
        }

        // Reached south curb over bridge!
        if (this.player.y >= currentZone.southCurbY + 25) {
          this.player.onBridge = false;
          this.returnCrossingIndex--;
          this.state = 'WALKING_HOME_SIDEWALK';
          sfx.correct();
          this.showInWorldFeedback('🌉 Crossed footbridge safely south! 🛍️', '#15803d');
        }
      } else {
        // Standard Signal or Crossing Guard
        const isNearNorthCurb = (this.player.y >= currentZone.northCurbY - 80 && this.player.y <= currentZone.northCurbY + 4);

        if (currentZone.signalState !== 'WALK') {
          // SAFE WAITING ON SIDEWALK:
          const isWalkingIntoRoad = (this.keys.down || (this.mouseControl.isDown && this.mouseControl.targetWorldY > currentZone.northCurbY));
          if (isNearNorthCurb && !isWalkingIntoRoad) {
            if (currentZone.hasCrossingGuard) {
              const guard = currentZone.crossingGuard || this.crossingGuard;
              if (guard && (guard.state === 'IN_STREET' || guard.state === 'STOPPING_TRAFFIC')) {
                currentZone.signalState = 'WALK';
                currentZone.walkGranted = true;
                currentZone.carsHalted = true;
              }
            } else {
              // Push button wait
              if (currentZone.pedestrianButtonPressed) {
                currentZone.waitTime = (currentZone.waitTime || 0) + dt;
                if (currentZone.waitTime >= 2.0 && !currentZone.walkGranted) {
                  currentZone.signalState = 'WALK';
                  currentZone.walkGranted = true;
                  currentZone.carsHalted = true;
                  sfx.walkSignalChirp();
                  sfx.correct();
                  this.safetyStars++;
                  if (this.starCountEl) this.starCountEl.textContent = this.safetyStars;
                  this.showInWorldFeedback('🟢 Walk sign is on! Safe to cross south! 🚶', '#2e7d32');
                }
              }
            }
          }

          // WRONG TIME CHECK: Player walks south into road when signal is NOT WALK!
          if (this.player.y > currentZone.northCurbY && this.player.y < currentZone.southCurbY) {
            this.triggerPlayerFall(currentZone);
            return;
          }
        } else {
          // Signal is WALK!
          if (this.player.y > currentZone.northCurbY && this.player.y < currentZone.southCurbY) {
            this.state = 'CROSSING_ROAD_HOME';
          }
        }

        // Crossing reached south curb:
        if (this.state === 'CROSSING_ROAD_HOME' && this.player.y >= currentZone.southCurbY) {
          this.player.y = currentZone.southCurbY;
          this.returnCrossingIndex--;
          this.state = 'WALKING_HOME_SIDEWALK';
          sfx.correct();
          this.showInWorldFeedback('✅ Safely across south! Heading home! 🏡', '#16a34a');
        }
      }
    }

    // Check Home arrival
    if (this.returnCrossingIndex < 0 && this.player.y >= this.startY) {
      this.player.y = this.startY;
      this.player.isWalking = false;
      this.mouseControl.isDown = false;
      this.state = 'WALKING_HOME_TO_DOOR';
      this.triggerHomeVictory();
      return;
    }

    this.updateProgressBar();
  }

  triggerHomeVictory() {
    this.state = 'VICTORY';
    this.player.isWalking = false;
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.mouseControl.isDown = false;
    this.resetButtonStyles();

    if (this.walkingControls) this.walkingControls.classList.add('hidden');
    if (this.gameHud) this.gameHud.classList.add('hidden');
    if (this.progressHud) this.progressHud.classList.add('hidden');

    const homeModal = document.getElementById('home-victory-modal');
    if (homeModal) homeModal.classList.remove('hidden');

    const deliveredItemsContainer = document.getElementById('home-delivered-items');
    if (deliveredItemsContainer && this.shoppingList) {
      deliveredItemsContainer.innerHTML = '';
      this.shoppingList.forEach(item => {
        const pill = document.createElement('div');
        pill.className = 'delivered-item-pill animate-pop';
        pill.innerHTML = `
          <img src="assets/shopping/items/${item.file}" alt="${item.name}" class="delivered-item-thumb">
          <span class="delivered-item-name">${item.name}</span>
        `;
        deliveredItemsContainer.appendChild(pill);
      });
    }

    const starsEl = document.getElementById('home-stat-stars');
    if (starsEl) starsEl.textContent = `${this.safetyStars} / 5`;

    this.confettiParticles = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
    for (let i = 0; i < 110; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 5,
        vy: 2 + Math.random() * 5,
        vRot: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 9 + Math.random() * 9
      });
    }

    sfx.fanfare();
  }

  startLevel2StoreGame() {
    if (this.homeVictoryModal) this.homeVictoryModal.classList.add('hidden');
    if (this.checkoutMinigameModal) this.checkoutMinigameModal.classList.add('hidden');
    if (this.checkoutModal) this.checkoutModal.classList.add('hidden');
    this.setLevel(2);
    this.startGame();
  }

  handleStoreAction() {
    if (this.state !== 'STORE_SHOPPING') return;
    const nearItem = this.getNearbyStoreItem();
    if (nearItem) {
      this.collectStoreItem(nearItem);
      return;
    }
    const nearCashier = this.isNearCashier();
    if (nearCashier) {
      this.interactWithCashier();
      return;
    }
  }

  checkStoreItemClick(worldX, worldY) {
    if (!this.storeItems) return false;
    for (const item of this.storeItems) {
      if (item.collected) continue;
      const dist = Math.hypot(worldX - item.shelfX, worldY - item.shelfY);
      if (dist < 40) {
        const playerDist = Math.hypot(this.player.x - item.shelfX, this.player.y - item.shelfY);
        if (playerDist < 95) {
          this.collectStoreItem(item);
          return true;
        }
      }
    }
    return false;
  }

  checkStoreCashierClick(worldX, worldY) {
    const distToCounter = Math.hypot(worldX - 660, worldY - 800);
    if (distToCounter < 90) {
      if (this.isNearCashier()) {
        this.interactWithCashier();
        return true;
      }
    }
    return false;
  }

  updateStore(dt) {
    this.updateTouchActionButton();

    if (this.confettiParticles.length > 0) {
      this.confettiParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.vRot;
      });
      this.confettiParticles = this.confettiParticles.filter(p => p.y < this.canvas.height + 50);
    }

    if (this.activeInWorldAlert) {
      this.activeInWorldAlert.timer -= dt;
      if (this.activeInWorldAlert.timer <= 0) {
        this.activeInWorldAlert = null;
      }
    }

    let dx = 0;
    let dy = 0;
    const speed = 2.8;

    if (this.mouseControl.isDown && this.mouseControl.targetWorldX !== null && this.mouseControl.targetWorldY !== null) {
      const toX = this.mouseControl.targetWorldX - this.player.x;
      const toY = this.mouseControl.targetWorldY - this.player.y;
      const dist = Math.hypot(toX, toY);
      if (dist > 8) {
        dx = (toX / dist) * speed;
        dy = (toY / dist) * speed;
        this.player.isWalking = true;
      } else {
        this.player.isWalking = false;
      }
    } else {
      if (this.keys.up) dy -= speed;
      if (this.keys.down) dy += speed;
      if (this.keys.left) dx -= speed;
      if (this.keys.right) dx += speed;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }
      this.player.isWalking = (dx !== 0 || dy !== 0);
    }

    if (this.player.isWalking) {
      this.player.facing = this.getDirection8(dx, dy);
      this.player.walkAnimFrame += 0.22;
      this.stepSoundCheck();

      // Horizontal sliding collision
      if (dx !== 0 && !this.isStorePositionBlocked(this.player.x + dx, this.player.y)) {
        this.player.x += dx;
      }
      // Vertical sliding collision
      if (dy !== 0 && !this.isStorePositionBlocked(this.player.x, this.player.y + dy)) {
        this.player.y += dy;
      }
    } else {
      this.player.walkAnimFrame = 0;
    }
  }

  renderStore(ctx) {
    const storeScale = this.canvas.width / 1024;

    ctx.save();
    ctx.scale(storeScale, storeScale);

    // 1. Draw minimal store interior background
    if (this.storeImage && this.storeImage.isLoaded) {
      ctx.drawImage(this.storeImage, 0, 0, 1024, 1024);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, 0, 1024, 1024);
    }

    // 2. Draw shelf items (Enlarged 48x48 with shelf shadows & golden auras)
    if (this.storeItems) {
      const now = Date.now();
      for (const item of this.storeItems) {
        if (item.collected) {
          // Subtle collected mark on shelf
          ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
          ctx.beginPath();
          ctx.arc(item.shelfX, item.shelfY, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#16a34a';
          ctx.font = 'bold 20px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', item.shelfX, item.shelfY);
          continue;
        }

        // Soft shelf drop shadow directly underneath item
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.ellipse(item.shelfX, item.shelfY + 18, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing golden aura if on player's shopping list
        if (item.onList) {
          const auraRadius = 28 + Math.sin(now * 0.007) * 4;
          ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
          ctx.beginPath();
          ctx.arc(item.shelfX, item.shelfY, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(item.shelfX, item.shelfY, auraRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Sparkle icon floating above item
          const sparkY = item.shelfY - 30 + Math.sin(now * 0.008) * 3;
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('✨', item.shelfX, sparkY);
        }

        // Draw enlarged item thumbnail (48x48 pixels)
        const img = this.shoppingItemImages[item.file];
        if (img && img.isLoaded) {
          ctx.drawImage(img, item.shelfX - 24, item.shelfY - 24, 48, 48);
        } else {
          ctx.fillStyle = '#3b82f6';
          ctx.beginPath();
          ctx.arc(item.shelfX, item.shelfY, 16, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 3. Draw Cashier Indicator if all items collected
    const remainingCount = this.shoppingList ? this.shoppingList.filter(t => !t.collected).length : 1;
    if (remainingCount === 0) {
      const bounceOffset = Math.sin(Date.now() * 0.008) * 8;
      const beaconX = 660;
      const beaconY = 740 + bounceOffset;

      ctx.save();
      // Pulsing beacon ring around register counter
      ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
      ctx.beginPath();
      ctx.arc(660, 800, 42 + Math.sin(Date.now() * 0.006) * 6, 0, Math.PI * 2);
      ctx.fill();

      // Floating beacon tag
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.roundRect(beaconX - 56, beaconY - 26, 112, 28, 8);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💳 PAY HERE', beaconX, beaconY - 12);
      ctx.restore();
    }

    // 4. Draw Player Character
    this.drawPlayer(ctx);

    // 5. Draw Nearby Item / Cashier Prompts
    const nearbyItem = this.getNearbyStoreItem();
    if (nearbyItem) {
      const promptX = nearbyItem.shelfX;
      const promptY = nearbyItem.shelfY - 32;
      const promptText = nearbyItem.onList ? `🧺 [SPACE] Take ${nearbyItem.name}` : `${nearbyItem.name} (Not on list)`;
      const bgColor = nearbyItem.onList ? '#15803d' : '#475569';
      this.drawSpeechBubble(ctx, promptX, promptY, promptText, bgColor);
    } else if (this.isNearCashier()) {
      const cashierX = 660;
      const cashierY = 770;
      if (remainingCount === 0) {
        this.drawSpeechBubble(ctx, cashierX, cashierY, '💳 [SPACE] Checkout & Pay!', '#15803d');
      } else {
        this.drawSpeechBubble(ctx, cashierX, cashierY, `🛒 Still need ${remainingCount} items!`, '#e11d48');
      }
    }

    // 6. Draw floating feedback alert
    this.drawInWorldAlert(ctx);

    ctx.restore();

    // 7. Draw Confetti on full canvas
    this.drawConfetti(ctx);
  }
}

// Start Game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.game = new PedestrianGame();
});
