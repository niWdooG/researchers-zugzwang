export type Position = 'TL' | 'TR' | 'BL' | 'BR' | 'CENTER';
export type ItemType = 'grant' | 'manuscript' | 'teaching' | 'job_offer';

export interface PathPoint {
  x: number; // percentage
  y: number; // percentage
}

// TL & TR have 6 steps. BL & BR have 5 steps.
export const TRACK_PATHS: Record<Exclude<Position, 'CENTER'>, PathPoint[]> = {
  TL: [
    { x: 5, y: 15 }, // Step 0: Spawns here
    { x: 17, y: 23 }, // Step 1: Falls here
    { x: 29, y: 35 }, // Step 2: Falls here
    { x: 29, y: 50 }, // Step 3: Falls here
    { x: 29, y: 63 }, // Step 4: (CATCH)
    { x: 29, y: 88 }, // Step 5: (FLOOR - missed)
  ],
  BL: [
    { x: 5, y: 50 }, // Step 0: Spawns here
    { x: 13, y: 54 }, // Step 1: Falls here
    { x: 21, y: 59 }, // Step 2: Falls here
    { x: 30, y: 75 }, // Step 3: (CATCH)
    { x: 30, y: 88 }, // Step 4: (FLOOR - missed)
  ],
  TR: [
    { x: 95, y: 15 }, // Step 0: Spawns here
    { x: 83, y: 23 }, // Step 1: Falls here
    { x: 71, y: 35 }, // Step 2: Falls here
    { x: 71, y: 50 }, // Step 3: Falls here
    { x: 71, y: 63 }, // Step 4: (CATCH)
    { x: 71, y: 88 }, // Step 5: (FLOOR - missed)
  ],
  BR: [
    { x: 95, y: 50 }, // Step 0: Spawns here
    { x: 87, y: 54 }, // Step 1: Falls here
    { x: 79, y: 59 }, // Step 2: Falls here
    { x: 70, y: 75 }, // Step 3 (CATCH)
    { x: 70, y: 88 }, // Step 4 (FLOOR - missed)
  ],
};

export const SCIENTIST_POS = { x: 50, y: 55 };

export const INITIAL_TICK_RATE = 50;

// Base move intervals for each step in milliseconds
export const BASE_SPEEDS: Record<ItemType, number> = {
  job_offer: 900,   // Fastest (Tenure)
  grant: 1400,      // Second Fastest
  manuscript: 2200, // Slowest (Publish)
  teaching: 2200,   // Slowest (Teach)
};

export const ITEM_TYPES: ItemType[] = ['grant', 'manuscript', 'teaching', 'job_offer'];