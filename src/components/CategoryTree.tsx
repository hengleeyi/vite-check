import { CategoryRaw } from "../lib/utils";
import Tree from "./Tree";
import { TreeProvider } from "./TreeContext";

const CategoryTree = ({ defaultVal }: { defaultVal: CategoryRaw[] }) => {
  return (
    <TreeProvider defaultVal={defaultVal}>
      <Tree isRoot />
    </TreeProvider>
  );
};

export default CategoryTree;
