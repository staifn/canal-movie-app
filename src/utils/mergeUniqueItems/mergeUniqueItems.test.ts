import { mergeUniqueItems } from "./mergeUniqueItems";

interface TestItem {
  id: number | string;
  name: string;
}

describe("mergeUniqueItems", () => {
  it("merges two arrays and removes duplicates by id", () => {
    const existingItems: TestItem[] = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const newItems: TestItem[] = [
      { id: 2, name: "Updated Item 2" },
      { id: 3, name: "Item 3" },
    ];

    const result = mergeUniqueItems(existingItems, newItems);

    expect(result).toEqual([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Updated Item 2" },
      { id: 3, name: "Item 3" },
    ]);
  });

  it("returns the existing array if the new array is empty", () => {
    const existingItems: TestItem[] = [{ id: 1, name: "Item 1" }];
    const newItems: TestItem[] = [];

    const result = mergeUniqueItems(existingItems, newItems);

    expect(result).toEqual(existingItems);
  });

  it("returns the new array if the existing array is empty", () => {
    const existingItems: TestItem[] = [];
    const newItems: TestItem[] = [{ id: 1, name: "Item 1" }];

    const result = mergeUniqueItems(existingItems, newItems);

    expect(result).toEqual(newItems);
  });

  it("returns an empty array if both arrays are empty", () => {
    const existingItems: TestItem[] = [];
    const newItems: TestItem[] = [];

    const result = mergeUniqueItems(existingItems, newItems);

    expect(result).toEqual([]);
  });

  it("handles arrays with different types of ids", () => {
    const existingItems: TestItem[] = [
      { id: "1", name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const newItems: TestItem[] = [
      { id: "1", name: "Updated Item 1" },
      { id: 3, name: "Item 3" },
    ];

    const result = mergeUniqueItems(existingItems, newItems);

    expect(result).toEqual([
      { id: "1", name: "Updated Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ]);
  });
});
