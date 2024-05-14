import { CategoryRaw } from "../lib/utils";
import Tree from "./Tree";
import { TreeProvider } from "./TreeContext";
import TreeToolbar from "./TreeToolbar";

const CategoryTree = ({ defaultVal }: { defaultVal: CategoryRaw[] }) => {
  return (
    <TreeProvider defaultVal={defaultVal}>
      <TreeToolbar/>
      <Tree isRoot />
    </TreeProvider>
  );
};

export default CategoryTree;
