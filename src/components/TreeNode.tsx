import clsx from "clsx";
import { Category } from "../lib/utils";
import Tree from "./Tree";
import { useTree } from "./TreeContext";
import { useState } from "react";

type TreeNodeProps = {
  node: Category;
  isRoot?: boolean;
};

const TreeNode = ({ node, isRoot }: TreeNodeProps) => {
  const { categoriesState, categoryMap, setCategoriesState } = useTree();
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = node.children.length > 0;

  const currentState = categoriesState.find((category) => {
    return category.id === node.id;
  });

  const isChecked = currentState?.checked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = node.id;
    const check = e.target.checked;
    const checkChildren = (targetId: string) => {
      // has children
      if (categoryMap[targetId]) {
        for (const child of categoryMap[targetId]) {
          // connectedChildren.push(child);

          const stateIndex = categoriesState.findIndex((categoryState) => {
            return categoryState.id === child.id;
          });

          categoriesState[stateIndex].checked = check;
          checkChildren(child.id);
        }
      }
    };

    const clickStateIndex = categoriesState.findIndex((categoryState) => {
      return categoryState.id === id;
    });

    categoriesState[clickStateIndex].checked = check;

    checkChildren(id);

    setCategoriesState([...categoriesState]);
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
          onClick={() => setShowChildren(!showChildren)}
        >
          {node.name}
        </div>
      </div>
      {hasChildren && showChildren && <Tree data={node.children} />}
    </div>
  );
};

export default TreeNode;
