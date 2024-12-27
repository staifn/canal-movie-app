/**
 * Merges two arrays and ensures each element is unique by `id`.
 *
 * @param existingItems - The array of existing items.
 * @param newItems - The array of items to add.
 * @returns A merged array containing unique elements.
 */
export const mergeUniqueItems = <T extends { id: number | string }>(
  existingItems: T[],
  newItems: T[]
): T[] => {
  return [
    ...new Map(
      [...existingItems, ...newItems].map((item) => [item.id, item])
    ).values(),
  ];
}