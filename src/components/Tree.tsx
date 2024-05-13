import { Category } from "../lib/utils";
import CheckboxNode from "./CheckboxNode";

type TreeProps = {
  data: Category[];
  isRoot?: boolean;
};

const Tree = ({ data, isRoot }: TreeProps) => {
  return (
    <>
      {data.map((node) => {
        return <CheckboxNode key={node.id} node={node} isRoot={isRoot}/>;
      })}
    </>
  );
};

export default Tree;
