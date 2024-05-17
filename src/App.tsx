import res from "./mock/res.js";
import CheckboxTree from "./components/CheckboxTree";

function App() {
  const mockCategories = res.data.categories;

  return (
    <>
      <div className="m-auto w-10/12 flex flex-col items-center">
        <h1 className="text-3xl p-6">Vite Checkbox Tree 🌳</h1>
        <div className="overflow-y-auto w-full">
          <CheckboxTree defaultVal={mockCategories} />
        </div>
      </div>
    </>
  );
}

export default App;
