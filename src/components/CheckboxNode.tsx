import { Category } from "../lib/utils";
import Tree from "./Tree";

type CheckboxNodeProps = {
  node: Category;
  isRoot?: boolean;
};

const CheckboxNode = ({ node, isRoot }: CheckboxNodeProps) => {
  if (node.children.length === 0) {
    return (
      <div className="ml-6">
        <div className="ml-6 my-2 flex items-center">
          <input type="checkbox" className="w-4 h-4" />
          <div className="ml-2">{node.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isRoot ? "" : "ml-6"}`}>
      <div className="ml-6 my-2 flex items-center">
        <input type="checkbox" className="w-4 h-4" />
        <div className="ml-2 font-bold">{node.name}</div>
      </div>
      <Tree data={node.children} />
    </div>
  );
};

export default CheckboxNode;
