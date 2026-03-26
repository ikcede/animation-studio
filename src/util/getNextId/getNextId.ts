import { UserAnimationLibrary } from '@/model/UserAnimationLibrary/UserAnimationLibrary';

/**
 * Returns the smallest available positive integer ID as a string.
 *
 * Existing non-numeric IDs are ignored.
 */
export const getNextId = (userAnimationLibrary: UserAnimationLibrary): string => {
  const usedIds = new Set<number>();

  userAnimationLibrary.library.forEach((animation) => {
    const parsed = Number.parseInt(animation.id, 10);

    if (Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    usedIds.add(parsed);
  });

  let nextId = 1;
  while (usedIds.has(nextId)) {
    nextId += 1;
  }

  return String(nextId);
};
