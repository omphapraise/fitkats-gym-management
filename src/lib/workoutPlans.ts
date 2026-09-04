export interface PlanExercise {
  name: string;
  sets: string;
  cue: string;
  muscle: string;
}

export interface PlanDay {
  day: string;
  focus: string;
  exercises: PlanExercise[];
}

export interface WorkoutPlanTemplate {
  id: string;
  name: string;
  goal: string;
  daysPerWeek: 3 | 5;
  description: string;
  schedule: PlanDay[];
}

export const GOALS = [
  { value: 'lean_toned', label: 'Lean & Toned' },
  { value: 'muscle_gain', label: 'Muscle Gain' },
  { value: 'fat_loss', label: 'Fat Loss' },
  { value: 'general_fitness', label: 'General Fitness' },
] as const;

export type Goal = typeof GOALS[number]['value'];

function ex(name: string, sets: string, cue: string, muscle: string): PlanExercise {
  return { name, sets, cue, muscle };
}

const BASE_PLANS: Record<string, WorkoutPlanTemplate> = {
  'lean_toned-3': {
    id: 'lean_toned-3',
    name: 'Lean & Toned — 3 Day Split',
    goal: 'lean_toned',
    daysPerWeek: 3,
    description: 'Full-body toning combining light resistance work with steady cardio to build a lean, defined look.',
    schedule: [
      {
        day: 'Day 1', focus: 'Full Body + Core',
        exercises: [
          ex('Bodyweight squats', '3 × 15', 'Knees track toes, control the descent', 'Legs + glutes'),
          ex('Push-ups', '3 × 12', 'Elbows at 45°, full range of motion', 'Chest + triceps'),
          ex('Plank hold', '3 × 40s', 'Hips level, brace core throughout', 'Core'),
          ex('Incline treadmill walk', '15 min', 'Brisk pace, moderate incline', 'Cardio'),
        ],
      },
      {
        day: 'Day 2', focus: 'Cardio + Mobility',
        exercises: [
          ex('Cycling', '25 min', 'Steady state, conversational pace', 'Cardio'),
          ex('Dynamic stretching flow', '10 min', 'Full range, controlled movement', 'Mobility'),
          ex('Foam rolling', '10 min', 'Slow passes over major muscle groups', 'Recovery'),
        ],
      },
      {
        day: 'Day 3', focus: 'Full Body + Glutes',
        exercises: [
          ex('Glute bridges', '3 × 15', 'Squeeze glutes hard at the top', 'Glutes'),
          ex('Dumbbell rows', '3 × 12', 'Pull with elbow, squeeze shoulder blade', 'Back'),
          ex('Walking lunges', '3 × 12/side', 'Upright torso, controlled step', 'Legs'),
          ex('Yoga flow', '15 min', 'Focus on breath and control', 'Mobility'),
        ],
      },
    ],
  },
  'lean_toned-5': {
    id: 'lean_toned-5',
    name: 'Lean & Toned — 5 Day Split',
    goal: 'lean_toned',
    daysPerWeek: 5,
    description: 'A five-day rotation balancing toning, cardio, and mobility for consistent definition.',
    schedule: [
      {
        day: 'Day 1', focus: 'Upper Body Tone',
        exercises: [
          ex('Push-ups', '3 × 12', 'Full range, controlled tempo', 'Chest + triceps'),
          ex('Dumbbell rows', '3 × 12', 'Squeeze at the top of each rep', 'Back'),
          ex('Lateral raises', '3 × 15', 'Light weight, controlled, no swinging', 'Shoulders'),
        ],
      },
      {
        day: 'Day 2', focus: 'Cardio',
        exercises: [
          ex('Spin session', '30 min', 'Vary resistance, steady cadence', 'Cardio'),
          ex('Core finisher circuit', '10 min', 'Plank, bicycle crunch, leg raises', 'Core'),
        ],
      },
      {
        day: 'Day 3', focus: 'Lower Body Tone',
        exercises: [
          ex('Squats', '3 × 15', 'Full depth, controlled descent', 'Legs'),
          ex('Glute bridges', '3 × 15', 'Pause and squeeze at the top', 'Glutes'),
          ex('Calf raises', '3 × 20', 'Full stretch and contraction', 'Calves'),
        ],
      },
      {
        day: 'Day 4', focus: 'Mobility & Recovery',
        exercises: [
          ex('Yoga flow', '30 min', 'Slow, breath-led movement', 'Mobility'),
          ex('Foam rolling', '10 min', 'Focus on tight areas', 'Recovery'),
        ],
      },
      {
        day: 'Day 5', focus: 'Full Body Circuit',
        exercises: [
          ex('Circuit: squats, push-ups, rows, plank', '4 rounds', 'Minimal rest between exercises', 'Full body'),
        ],
      },
    ],
  },
  'muscle_gain-3': {
    id: 'muscle_gain-3',
    name: 'Muscle Gain — 3 Day Split',
    goal: 'muscle_gain',
    daysPerWeek: 3,
    description: 'Compound-lift focused full-body sessions for efficient strength and size building.',
    schedule: [
      {
        day: 'Day 1', focus: 'Push (Chest / Shoulders / Triceps)',
        exercises: [
          ex('Bench press', '4 × 8', '3 sec descent, drive through mid-foot', 'Chest'),
          ex('Overhead press', '3 × 10', 'Strict form, full lockout overhead', 'Shoulders'),
          ex('Tricep dips', '3 × 12', 'Elbows tucked, controlled descent', 'Triceps'),
        ],
      },
      {
        day: 'Day 2', focus: 'Pull (Back / Biceps)',
        exercises: [
          ex('Deadlifts', '4 × 6', 'Neutral spine, drive hips forward', 'Back + hamstrings'),
          ex('Lat pulldowns', '3 × 10', 'Pull elbows down and back', 'Lats'),
          ex('Barbell curls', '3 × 12', 'Elbows pinned, no swinging', 'Biceps'),
        ],
      },
      {
        day: 'Day 3', focus: 'Legs',
        exercises: [
          ex('Squats', '4 × 8', 'Full depth, brace core before descent', 'Quads + glutes'),
          ex('Romanian deadlifts', '3 × 10', 'Feel the hamstring stretch', 'Hamstrings'),
          ex('Leg press', '3 × 12', 'Controlled tempo, full range', 'Quads'),
        ],
      },
    ],
  },
  'muscle_gain-5': {
    id: 'muscle_gain-5',
    name: 'Muscle Gain — 5 Day Split',
    goal: 'muscle_gain',
    daysPerWeek: 5,
    description: 'Classic body-part split maximising focused volume per muscle group across the week.',
    schedule: [
      {
        day: 'Day 1', focus: 'Chest & Triceps',
        exercises: [
          ex('Bench press', '4 × 8', 'Controlled descent, explosive press', 'Chest'),
          ex('Incline dumbbell press', '3 × 10', 'Full stretch at the bottom', 'Upper chest'),
          ex('Tricep pushdowns', '3 × 12', 'Elbows pinned to sides', 'Triceps'),
        ],
      },
      {
        day: 'Day 2', focus: 'Back & Biceps',
        exercises: [
          ex('Deadlifts', '4 × 6', 'Bar close to shins throughout', 'Back'),
          ex('Pull-ups', '3 × 10', 'Full hang, chin over bar', 'Lats'),
          ex('Barbell curls', '3 × 12', 'Strict form, no momentum', 'Biceps'),
        ],
      },
      {
        day: 'Day 3', focus: 'Legs',
        exercises: [
          ex('Squats', '4 × 8', 'Brace hard, full depth', 'Quads + glutes'),
          ex('Leg press', '3 × 12', 'Feet mid-platform', 'Quads'),
          ex('Hamstring curls', '3 × 12', 'Slow negative, full squeeze', 'Hamstrings'),
        ],
      },
      {
        day: 'Day 4', focus: 'Shoulders & Core',
        exercises: [
          ex('Overhead press', '4 × 8', 'Full lockout, no arch', 'Shoulders'),
          ex('Lateral raises', '3 × 15', 'Controlled, no swinging', 'Side delts'),
          ex('Hanging leg raises', '3 × 12', 'Controlled, no swinging', 'Core'),
        ],
      },
      {
        day: 'Day 5', focus: 'Arms & Conditioning',
        exercises: [
          ex('Superset: curls / pushdowns', '4 × 12 each', 'Minimal rest between supersets', 'Arms'),
          ex('Conditioning finisher', '15 min', 'Moderate intensity, steady breathing', 'Cardio'),
        ],
      },
    ],
  },
  'fat_loss-3': {
    id: 'fat_loss-3',
    name: 'Fat Loss — 3 Day Split',
    goal: 'fat_loss',
    daysPerWeek: 3,
    description: 'High-intensity full-body circuits designed to maximise calorie burn each session.',
    schedule: [
      {
        day: 'Day 1', focus: 'HIIT Circuit',
        exercises: [
          ex('Burpees', '4 × 15', 'Explosive up, controlled down', 'Full body'),
          ex('Mountain climbers', '4 × 30s', 'Fast pace, core braced', 'Core + cardio'),
          ex('Jump squats', '4 × 15', 'Soft landing, full depth', 'Legs'),
        ],
      },
      {
        day: 'Day 2', focus: 'Steady Cardio + Core',
        exercises: [
          ex('Cycling', '30 min', 'Steady pace throughout', 'Cardio'),
          ex('Plank series', '4 × 40s', 'Front, side, side rotation', 'Core'),
        ],
      },
      {
        day: 'Day 3', focus: 'Full Body Strength',
        exercises: [
          ex('Kettlebell swings', '4 × 15', 'Hip hinge drives the movement', 'Posterior chain'),
          ex('Goblet squats', '4 × 12', 'Chest up, full depth', 'Legs'),
          ex('Rows', '4 × 12', 'Squeeze shoulder blades together', 'Back'),
        ],
      },
    ],
  },
  'fat_loss-5': {
    id: 'fat_loss-5',
    name: 'Fat Loss — 5 Day Split',
    goal: 'fat_loss',
    daysPerWeek: 5,
    description: 'Daily mix of HIIT, steady cardio, and strength to sustain a calorie deficit sustainably.',
    schedule: [
      {
        day: 'Day 1', focus: 'HIIT',
        exercises: [
          ex('Boxing rounds', '5 × 3 min', 'High intensity, controlled breathing', 'Full body'),
          ex('Core finisher', '10 min', 'Plank, bicycle crunch, leg raises', 'Core'),
        ],
      },
      {
        day: 'Day 2', focus: 'Strength Circuit',
        exercises: [
          ex('Kettlebell swings', '4 × 15', 'Hip hinge, not a squat', 'Posterior chain'),
          ex('Goblet squats', '4 × 12', 'Full depth, chest up', 'Legs'),
        ],
      },
      {
        day: 'Day 3', focus: 'Steady Cardio',
        exercises: [
          ex('Spin session', '35 min', 'Vary resistance across the session', 'Cardio'),
        ],
      },
      {
        day: 'Day 4', focus: 'Full Body HIIT',
        exercises: [
          ex('Circuit: burpees, jump squats, mountain climbers', '4 rounds', 'Minimal rest between rounds', 'Full body'),
        ],
      },
      {
        day: 'Day 5', focus: 'Active Recovery',
        exercises: [
          ex('Mobility flow', '20 min', 'Slow, controlled movement', 'Mobility'),
          ex('Light walk', '20 min', 'Easy pace, recovery focus', 'Recovery'),
        ],
      },
    ],
  },
  'general_fitness-3': {
    id: 'general_fitness-3',
    name: 'General Fitness — 3 Day Split',
    goal: 'general_fitness',
    daysPerWeek: 3,
    description: 'A balanced starting point covering strength, cardio, and mobility.',
    schedule: [
      {
        day: 'Day 1', focus: 'Full Body Strength',
        exercises: [
          ex('Squats', '3 × 12', 'Full depth, controlled tempo', 'Legs'),
          ex('Push-ups', '3 × 10', 'Full range of motion', 'Chest'),
          ex('Rows', '3 × 12', 'Squeeze shoulder blades', 'Back'),
        ],
      },
      {
        day: 'Day 2', focus: 'Cardio',
        exercises: [
          ex('Cycling or treadmill', '25 min', 'Moderate, steady effort', 'Cardio'),
        ],
      },
      {
        day: 'Day 3', focus: 'Mobility & Core',
        exercises: [
          ex('Yoga flow', '20 min', 'Slow, breath-led movement', 'Mobility'),
          ex('Plank series', '3 × 30s', 'Brace core, hips level', 'Core'),
        ],
      },
    ],
  },
  'general_fitness-5': {
    id: 'general_fitness-5',
    name: 'General Fitness — 5 Day Split',
    goal: 'general_fitness',
    daysPerWeek: 5,
    description: 'Well-rounded five-day rotation for overall health and long-term consistency.',
    schedule: [
      {
        day: 'Day 1', focus: 'Upper Body',
        exercises: [
          ex('Push-ups', '3 × 12', 'Full range of motion', 'Chest'),
          ex('Rows', '3 × 12', 'Squeeze at the top', 'Back'),
          ex('Shoulder press', '3 × 10', 'Controlled, full lockout', 'Shoulders'),
        ],
      },
      {
        day: 'Day 2', focus: 'Cardio',
        exercises: [
          ex('Spin session', '25 min', 'Steady, moderate effort', 'Cardio'),
        ],
      },
      {
        day: 'Day 3', focus: 'Lower Body',
        exercises: [
          ex('Squats', '3 × 12', 'Full depth, controlled', 'Legs'),
          ex('Lunges', '3 × 12/side', 'Upright torso, controlled step', 'Legs'),
        ],
      },
      {
        day: 'Day 4', focus: 'Mobility',
        exercises: [
          ex('Yoga flow', '25 min', 'Slow, controlled movement', 'Mobility'),
        ],
      },
      {
        day: 'Day 5', focus: 'Full Body Circuit',
        exercises: [
          ex('Circuit: squats, push-ups, rows', '3 rounds', 'Minimal rest between exercises', 'Full body'),
        ],
      },
    ],
  },
};

// ── Premium "Phase 3" enhancement ──────────────────────────────────
// Premium members get the same base structure plus refined coaching
// cues and a science-style rationale note per session, matching a
// more advanced, coached programming feel.

const PHASE3_NOTES: Record<string, string> = {
  lean_toned: 'Phase 3 refinement: prioritising muscle definition through controlled tempo and higher time-under-tension on every set.',
  muscle_gain: 'Phase 3 refinement: compound lifts stay heavy and first in the session, with accessory volume added for lagging muscle groups.',
  fat_loss: 'Phase 3 refinement: conditioning work is layered around strength days to maximise calorie expenditure without sacrificing muscle.',
  general_fitness: 'Phase 3 refinement: added mobility and core work between primary lifts to support long-term joint health and consistency.',
};

function applyPhase3(template: WorkoutPlanTemplate): WorkoutPlanTemplate {
  return {
    ...template,
    id: template.id + '-phase3',
    name: template.name.replace('Split', 'Split — Phase 3 (Premium)'),
    description: `${template.description} ${PHASE3_NOTES[template.goal] ?? ''}`,
    schedule: template.schedule.map((day) => ({
      ...day,
      exercises: day.exercises.map((exItem) => ({
        ...exItem,
        cue: `${exItem.cue}. Stay 1–2 reps in reserve — controlled tempo over speed.`,
      })),
    })),
  };
}

export function getPlan(goalValue: string, daysPerWeek: 3 | 5, isPremium = false): WorkoutPlanTemplate {
  const key = `${goalValue}-${daysPerWeek}`;
  const base = BASE_PLANS[key] ?? BASE_PLANS['general_fitness-3'];
  return isPremium ? applyPhase3(base) : base;
}