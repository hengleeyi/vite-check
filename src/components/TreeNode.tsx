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
  } = useTree();
  const hasChildren = node.children.length > 0;
  const id = node.id;
  const currentState = categoriesState.find((category) => {
    return category.id === node.id;
  });

  if (!currentState) return null;

  const isChecked = currentState.checked;
  const showChildren = currentState.showChildren;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;
    const checkChildren = (targetId: string) => {
      // node has children
      if (categoryMap[targetId]) {
        for (const child of categoryMap[targetId]) {
          // sync each child check state in categoryState
          const categoryState = categoriesState.find((categoryState) => {
            return categoryState.id === child.id;
          });

          if (categoryState) {
            categoryState.checked = check;
          }
          // check children of this child recursively
          checkChildren(child.id);
        }
      }
    };

    currentState.checked = check;

    checkChildren(id);

    setCategoriesState([...categoriesState]);
  };

  const handleClickTitle = () => {
    if (hasChildren) {
      currentState.showChildren = !currentState.showChildren;
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
