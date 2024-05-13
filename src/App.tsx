import res from "./mock/res.js";
import { createNestedCategories } from "./lib/utils.js";
import Tree from "./components/Tree.js";

function App() {
  console.log(res);
  const mockCategories = res.data.categories;
  const nestedCategories = createNestedCategories(mockCategories);
  console.log("🚀 ~ App ~ nestedCategories:", nestedCategories);

  return (
    <>
      <div className="m-auto w-10/12">
        <div>App</div>
        <div className="h-80 overflow-y-auto">
          <Tree data={nestedCategories} isRoot />
        </div>
      </div>
    </>
  );
}

export default App;
