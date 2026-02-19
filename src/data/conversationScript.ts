import { ChoiceOption } from '../types';

export interface Reference {
  title: string;
  url: string;
}

export interface ScriptStep {
  id: string;
  title: string;
  preMessages: string[];
  choices: ChoiceOption[];
  confirmationMessages: Record<string, string[]>;
  defaultConfirmation: string[];
  references: Reference[];
}

export const introMessages: string[] = [
  'Welcome to the GenAI Video Prompt Engineering Course. I am your assistant.',
  'Please briefly describe the video you want to create. Try to include the subject (who), actions (doing what), scene (where), and the camera angles and visual style you want to present.',
];

export const overviewMessages: string[] = [
  'Great, this is a very cinematic concept.',
  'To create such a video, you need to understand these 5 key points and how they affect generation results:\n\n1️⃣ Subject & action details (car type, drifting technique, physics)\n2️⃣ Camera language (camera movements, shot transitions)\n3️⃣ Time control (slow motion, speed ramp)\n4️⃣ Lighting & environment atmosphere (weather, time of day, material reflections)\n5️⃣ Visual quality & realism parameters (resolution, frame rate, physics simulation accuracy)',
  "Let's build your professional-level prompt step by step.",
];

export const scriptSteps: ScriptStep[] = [
  {
    id: 'subject_detail',
    title: 'Step 1: Subject & Drift Details',
    preMessages: [
      'Step 1: Subject & Drift Details',
      'To make the video more realistic, we can refine the following parameters:\n\n• Car type (e.g., Nissan GT-R / Subaru WRX / Rally Car)\n• Drive type (Rear-wheel drive / AWD)\n• Drifting technique (oversteer, counter-steering, trail braking)\n• Tire effects (heavy tire smoke / mud splash / dirt spray)',
      'Which style do you prefer?',
    ],
    choices: [
      { id: 'street_car', letter: 'A', label: 'Modified street racing car (cinematic style)' },
      { id: 'rally_car', letter: 'B', label: 'Rally car (strong off-road/mud effects)' },
      { id: 'supercar', letter: 'C', label: 'Supercar (high-end photorealistic style)' },
      { id: 'custom', letter: 'D', label: 'Custom description' },
    ],
    confirmationMessages: {
      street_car: ['Noted your preference: modified street racing car + cinematic drifting + realistic physics.'],
      rally_car: ['Noted your preference: rally car + strong mud effect + realistic physics.'],
      supercar: ['Noted your preference: supercar + high-end photorealistic style + refined physics effects.'],
      custom: ['Your custom preference has been recorded.'],
    },
    defaultConfirmation: ['Your preference has been recorded.'],
    references: [
      { title: 'The Definitive Guide to Drifting & Controlled Oversteer', url: 'https://slrspeed.com/blogs/news/the-definitive-guide-to-drifting-the-breakdown-of-controlled-oversteer' },
      { title: 'How to Trail Brake — Driver61', url: 'https://driver61.com/uni/trail-braking/' },
      { title: 'Counter-Steering (Opposite Lock) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Opposite_lock' },
    ],
  },
  {
    id: 'camera_language',
    title: 'Step 2: Camera Language Design',
    preMessages: [
      'Step 2: Camera Language Design',
      'You mentioned moving from an interior camera to an exterior view, which involves camera language. We can use:\n\n• Interior POV shot\n• Close-up of hands gripping steering wheel\n• Dolly out transition\n• Low-angle tracking shot\n• Dynamic camera shake (to enhance realism)',
      'What camera movement style do you prefer?',
    ],
    choices: [
      { id: 'smooth', letter: 'A', label: 'Gimbal smooth (cinematic smooth)' },
      { id: 'handheld', letter: 'B', label: 'Slight handheld (handheld realism)' },
      { id: 'aggressive', letter: 'C', label: 'Aggressive dynamic movement' },
    ],
    confirmationMessages: {
      smooth: ['Recorded: gimbal smooth style + cinematic tracking.'],
      handheld: ['Recorded: slight handheld style + cinematic tracking.'],
      aggressive: ['Recorded: aggressive dynamic camera movement.'],
    },
    defaultConfirmation: ['Your camera style preference has been recorded.'],
    references: [
      { title: 'Every Type of Camera Movement in Film — StudioBinder', url: 'https://www.studiobinder.com/blog/different-types-of-camera-movements-in-film' },
      { title: 'The Dolly Shot Explained — StudioBinder', url: 'https://studiobinder.com/blog/dolly-shot-camera-movements' },
      { title: 'What is a Tracking Shot — StudioBinder', url: 'https://studiobinder.com/blog/tracking-shot-camera-movement-definition' },
    ],
  },
  {
    id: 'time_control',
    title: 'Step 3: Time Control (Slow Motion Design)',
    preMessages: [
      'Step 3: Time Control (Slow Motion Design)',
      'You mentioned slow motion, which usually uses:\n\n• Slow motion 120fps\n• Speed ramp transition\n• Return to real-time speed',
      'For slow motion, you want:',
    ],
    choices: [
      { id: 'full_slow', letter: 'A', label: 'Slow motion for the entire drifting process' },
      { id: 'splash_slow', letter: 'B', label: 'Slow motion only at the moment of mud splash' },
      { id: 'speed_ramp', letter: 'C', label: 'Gradually slow down → slowest → restore normal speed' },
    ],
    confirmationMessages: {
      full_slow: ['Recorded: full scene slow motion at 120fps.'],
      splash_slow: ['Recorded: slow motion at 120fps only for the mud splash moment.'],
      speed_ramp: ['Great choice! This is a cinematic approach: Speed ramp + slow motion 120fps.'],
    },
    defaultConfirmation: ['Your time control preference has been recorded.'],
    references: [
      { title: "A Beginner's Guide to Speed Ramping — Fstoppers", url: 'https://fstoppers.com/education/beginners-guide-speed-ramping-74536' },
      { title: 'Speed Ramp & Smooth Slow Motion Tutorial — Surfaced Studio', url: 'https://www.surfacedstudio.com/tutorials/premiere-pro/premiere-pro-speed-ramp-smooth-slow-motion/' },
      { title: 'How to Slow Down Footage — Adobe', url: 'https://helpx.adobe.com/premiere-pro/how-to/slow-down-video.html' },
    ],
  },
  {
    id: 'lighting_env',
    title: 'Step 4: Lighting & Environment',
    preMessages: [
      'Step 4: Lighting & Environment',
      'You can set different environments for a mountain race track:',
    ],
    choices: [
      { id: 'overcast', letter: 'A', label: 'Overcast with wet dirt (realistic documentary feel)' },
      { id: 'sunset', letter: 'B', label: 'Sunset golden hour (highly dramatic)' },
      { id: 'rain', letter: 'C', label: 'Rainy + low visibility (strong atmosphere)' },
    ],
    confirmationMessages: {
      overcast: ['Recorded: overcast lighting + wet dirt track + realistic reflections.'],
      sunset: ['Recorded: sunset golden hour + dramatic shadows + warm tones.'],
      rain: ['Recorded: rainy conditions + low visibility + atmospheric fog.'],
    },
    defaultConfirmation: ['Your lighting & environment preference has been recorded.'],
    references: [
      { title: 'Master Natural Light in Film — FilmLocal', url: 'https://filmlocal.com/filmmaking/how-to-master-natural-light/' },
      { title: "A Filmmaker's Guide to Shooting in Rain — StudioBinder", url: 'https://studiobinder.com/blog/filmmakers-guide-shooting-in-the-rain' },
      { title: 'How to Work with Natural Light — Neil Oseman', url: 'https://neiloseman.com/how-to-work-with-natural-light/' },
    ],
  },
  {
    id: 'quality_realism',
    title: 'Step 5: Visual Quality & Realism Parameters',
    preMessages: [
      'Step 5: Visual Quality & Realism Parameters',
      'To enhance realism, we can add:\n\n• 4K resolution\n• 60fps base frame rate\n• Realistic physics simulation\n• Motion blur\n• Dirt particles simulation\n• Mud splashing on lens effect',
      'What visual quality do you prefer?',
    ],
    choices: [
      { id: 'cinematic', letter: 'A', label: 'Cinematic photorealistic' },
      { id: 'documentary', letter: 'B', label: 'Documentary style' },
      { id: 'game_cg', letter: 'C', label: 'Game CG look' },
    ],
    confirmationMessages: {
      cinematic: ['Recorded: cinematic photorealistic style.'],
      documentary: ['Recorded: documentary realistic style.'],
      game_cg: ['Recorded: game CG rendering style.'],
    },
    defaultConfirmation: ['Your visual quality preference has been recorded.'],
    references: [
      { title: 'Motion Blur — Unity HDRP Documentation', url: 'https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@14.0/manual/Post-Processing-Motion-Blur.html' },
      { title: 'Motion Blur — Blender Manual', url: 'https://docs.blender.org/manual/en/latest/render/eevee/render_settings/motion_blur.html' },
      { title: 'Generative Photographic Control for Cinematic Editing — arXiv', url: 'https://arxiv.org/abs/2511.12921' },
    ],
  },
];

export const finalMessages: string[] = [
  "Okay, I've noted all your preferences.",
  'Below is a complete prompt you can use directly with video generation platforms:',
];

export const finalPrompt =
  'A rally car aggressively drifting through a wet mountain dirt racetrack hairpin turn under overcast skies, intense oversteer and precise counter-steering, interior close-up shot of the driver gripping and turning the steering wheel, smooth dolly out through the car window in one seamless continuous shot, subtle handheld realism, transitioning naturally into an exterior low-angle tracking shot of the car drifting sideways, speed ramp gradually slowing into dramatic 120fps slow motion as thick mud and water splash toward the camera lens, realistic dirt particles and mud-on-lens effect, realistic physics simulation, then gradually returning to real-time speed as the car exits the corner and accelerates into the distance, cinematic photorealistic style, motion blur, ultra detailed, 4K resolution.';

export interface KnowledgePoint {
  step: string;
  points: string[];
}

export const knowledgePoints: KnowledgePoint[] = [
  {
    step: 'Subject & Drift Details',
    points: [
      'Oversteer: the rear of the car slides outward, controlled via throttle and steering input.',
      'Counter-steering (opposite lock): steering in the opposite direction of the turn to maintain drift angle.',
      'Trail braking: gradually releasing the brake while turning in, shifting weight forward for grip control.',
      'Drive type matters: RWD uses power oversteer, AWD uses weight transfer and momentum for drifting.',
    ],
  },
  {
    step: 'Camera Language',
    points: [
      'Dolly shot: camera moves on a wheeled platform for smooth forward/backward/lateral motion.',
      'Tracking shot: camera physically follows or moves alongside the subject.',
      'POV (point-of-view) shot: camera takes the perspective of a character to create immersion.',
      'Handheld vs. gimbal: handheld adds raw realism and energy; gimbal provides smooth, cinematic glide.',
    ],
  },
  {
    step: 'Time Control',
    points: [
      'Speed ramp: smoothly transitioning between normal speed and slow motion within a single shot.',
      '120fps capture allows 5x slow motion when played back at 24fps without quality loss.',
      'Optical flow interpolation generates in-between frames for smoother slow-motion from lower frame rates.',
      'Structure for impact: real-time → slow → slowest at climax → return to real-time.',
    ],
  },
  {
    step: 'Lighting & Environment',
    points: [
      'Overcast light provides soft, even illumination — ideal for realistic documentary-style footage.',
      'Golden hour (sunrise/sunset) creates warm tones and long shadows for dramatic, cinematic feel.',
      'Rain requires backlighting or sidelighting to make droplets visible on camera.',
      'Wet surfaces enhance reflections and add visual depth and texture to the scene.',
    ],
  },
  {
    step: 'Visual Quality & Realism',
    points: [
      'Motion blur simulates real camera exposure — longer shutter = more blur, adding a sense of speed.',
      '4K resolution (3840×2160) provides ultra-detailed imagery with room for post-crop and stabilization.',
      'Physics simulation ensures realistic particle behavior (mud, water, smoke) in generated video.',
      'Cinematic photorealism combines accurate lighting, material rendering, and depth-of-field for film-like quality.',
    ],
  },
];
