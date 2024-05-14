import { Category } from "../lib/utils";
import TreeNode from "./TreeNode";
import { useTree } from "./TreeContext";

type TreeProps = {
  data?: Category[];
  isRoot?: boolean;
};

const Tree = ({ isRoot, data }: TreeProps) => {
  const { defaultNestedCategories } = useTree();
  const nestedCategories = data || defaultNestedCategories;
  return (
    <>
      {nestedCategories.map((node) => {
        return <TreeNode key={node.id} node={node} isRoot={isRoot} />;
      })}
    </>
  );
};

export default Tree;
