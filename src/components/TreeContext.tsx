import { createContext, useContext, useState } from "react";
import {
  Category,
  CategoryRaw,
  CategoryState,
  createNestedCategories,
} from "../lib/utils";

type TreeContextType = {
  categoriesState: CategoryState[];
  setCategoriesState: (newVal: CategoryState[]) => void;
  defaultNestedCategories: Category[];
  categoryMap: Record<string, Category[]>;
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

const TreeProvider = ({
  children,
  defaultVal,
}: {
  children: React.ReactNode;
  defaultVal: CategoryRaw[];
}) => {
  const initialCategoriesState = defaultVal.map((category) => ({
    ...category,
    checked: false,
  }));

  const [categoriesState, setCategoriesState] = useState<CategoryState[]>(
    initialCategoriesState
  );

  const { result: defaultNestedCategories, categoryMap } =
    createNestedCategories(defaultVal);

  return (
    <TreeContext.Provider
      value={{
        categoriesState,
        setCategoriesState,
        defaultNestedCategories,
        categoryMap,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

const useTree = () => {
  const context = useContext(TreeContext);

  if (context === undefined) {
    throw new Error("Please use <TreeProvider /> to wrap <Tree /> ");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTree, TreeProvider };
