import res from "./mock/res.js";
import CategoryTree from "./components/CategoryTree.js";

function App() {
  const mockCategories = res.data.categories;

  return (
    <>
      <div className="m-auto w-10/12">
        <div>App</div>
        <div className="overflow-y-auto">
          <CategoryTree defaultVal={mockCategories} />
        </div>
      </div>
    </>
  );
}

export default App;
