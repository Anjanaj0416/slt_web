/**
 * Check object is empty or not
 * @param obj
 * @returns
 */
export const isEmpty = (obj: Record<string, any>): boolean => {
  if (obj) return Object.keys(obj).length === 0;
  return true;
};
