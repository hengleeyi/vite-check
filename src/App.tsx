import res from "./mock/res.js";
import { createNestedCategories } from "./lib/utils.js";

function App() {
  console.log(res);
  const mockCategories = res.data.categories;
  const nestedCategories = createNestedCategories(mockCategories);
  console.log("🚀 ~ App ~ nestedCategories:", nestedCategories);

  return (
    <>
      <div className="text-3xl m-auto w-10/12">App</div>
    </>
  );
}

export default App;
