import res from "../mock/res";

export type CategoryRaw = (typeof res.data.categories)[number];
export type Category = CategoryRaw & { children: Category[] };
export type CategoryState = CategoryRaw & { checked: boolean, showChildren: boolean};

export const createNestedCategories = (arr: CategoryRaw[]) => {
  // create a map of parent to children, parent key can find children
  const categoryMap = arr.reduce<Record<string, Category[]>>((acc, obj) => {
    if (!acc[obj.parent]) {
      acc[obj.parent] = [];
    }
    acc[obj.parent].push({ ...obj, children: [] });
    return acc;
  }, {});

  /* categoryMap example:
      const mapObj = {
        "0": [
          {
            id: "14100",
            parent: "0",
            name: "Dames",
            children: [],
          },
          {
            id: "14126",
            parent: "0",
            name: "Kids",
            children: [],
          },
        ],
        "14100": [
          {
            id: "14096",
            parent: "14100",
            name: "Kleding",
            children: [],
          },
          {
            id: "14114",
            parent: "14100",
            name: "Accessoires",
            children: [],
          },
        ],
      };
    */

  function buildNode(node: Category) {
    // check if node has children
    if (categoryMap[node.id]) {
      // if node has children, recursively to check each child if it has children
      node.children = categoryMap[node.id].map(buildNode);
    }
    return node;
  }

  const result = categoryMap["0"].map((rootCategory) => {
    return buildNode(rootCategory);
  });

  return { result, categoryMap };
};
