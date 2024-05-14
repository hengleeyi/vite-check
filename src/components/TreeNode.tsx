import clsx from "clsx";
import { Category } from "../lib/utils";
import Tree from "./Tree";
import { useTree } from "./TreeContext";

type TreeNodeProps = {
  node: Category;
  isRoot?: boolean;
};

const TreeNode = ({ node, isRoot }: TreeNodeProps) => {
  const {
    categoriesState,
    categoryMap,
    setCategoriesState,
    selectedCategories,
    setSelectedCategories,
  } = useTree();
  const hasChildren = node.children.length > 0;
  const id = node.id;
  const currentState = categoriesState.find((category) => {
    return category.id === node.id;
  });
  const stateIndex = categoriesState.findIndex((categoryState) => {
    return categoryState.id === id;
  });

  const isChecked = currentState?.checked;
  const showChildren = currentState?.showChildren;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;

    const willUpdateSelectedCategories = [...selectedCategories];
    const checkChildren = (targetId: string) => {
      // has children
      if (categoryMap[targetId]) {
        for (const child of categoryMap[targetId]) {
          const stateIndex = categoriesState.findIndex((categoryState) => {
            return categoryState.id === child.id;
          });

          categoriesState[stateIndex].checked = check;

          // sync with display tags
          const foundCategoryIndex = willUpdateSelectedCategories.findIndex(
            (category) => category.id === child.id
          );
          if (check && foundCategoryIndex < 0) {
            willUpdateSelectedCategories.push(child);
          }

          if (!check) {
            const cIndex = willUpdateSelectedCategories.findIndex(
              (category) => category.id === child.id
            );
            willUpdateSelectedCategories.splice(cIndex, 1);
          }

          checkChildren(child.id);
        }
      }
    };

    categoriesState[stateIndex].checked = check;

    checkChildren(id);

    setCategoriesState([...categoriesState]);

    const selectIndex = willUpdateSelectedCategories.findIndex(
      (category) => category.id === id
    );
    if (check && selectIndex < 0) {
      const newSelect = {
        id: node.id,
        name: node.name,
        parent: node.parent,
        children: [],
      };

      willUpdateSelectedCategories.push(newSelect);
    }

    if (!check) {
      const sIndex = willUpdateSelectedCategories.findIndex(
        (category) => category.id === id
      );
      willUpdateSelectedCategories.splice(sIndex, 1);
    }

    setSelectedCategories(willUpdateSelectedCategories);
  };

  const handleClickTitle = () => {
    if (hasChildren) {
      categoriesState[stateIndex].showChildren =
        !categoriesState[stateIndex].showChildren;
      setCategoriesState([...categoriesState]);
    }
  };

  return (
    <div className={clsx(!isRoot && "ml-6")}>
      <div className="ml-6 my-2 flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={isChecked}
          onChange={handleChange}
        />
        <div
          className={clsx("ml-2", hasChildren && "font-bold cursor-pointer")}
          onClick={handleClickTitle}
        >
          {node.name}
        </div>
      </div>
      {hasChildren && showChildren && <Tree data={node.children} />}
    </div>
  );
};

export default TreeNode;
