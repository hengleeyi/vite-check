import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TreeProvider, useTree } from "./TreeContext";

describe("TreeProvider", () => {
  test("should render children", () => {
    render(
      <TreeProvider defaultVal={[]}>
        <div data-testid="child">Child Component</div>
      </TreeProvider>
    );

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  test("should create nested categories and category map from defaultVal", () => {
    const defaultVal = [
      { id: "1", parent: "0", name: "Men" },
      { id: "2", parent: "0", name: "Women" },
    ];

    function TestComponent() {
      const { defaultNestedCategories, categoryMap } = useTree();

      expect(defaultNestedCategories).toEqual([
        { id: "1", parent: "0", name: "Men", children: [] },
        { id: "2", parent: "0", name: "Women", children: [] },
      ]);

      expect(categoryMap).toEqual({
        "0": [
          { id: "1", parent: "0", name: "Men", children: [] },
          { id: "2", parent: "0", name: "Women", children: [] },
        ],
      });

      return null;
    }

    render(
      <TreeProvider defaultVal={defaultVal}>
        <TestComponent />
      </TreeProvider>
    );
  });

  test("should filter out categories that have parent id not in the mock", () => {
    const defaultVal = [
      { id: "1", parent: "2", name: "Shirt" },
      { id: "2", parent: "0", name: "Women" },
      { id: "3", parent: "10", name: "T-shirt" },
    ];

    function TestComponent() {
      const { defaultNestedCategories, categoryMap } = useTree();

      expect(defaultNestedCategories).toEqual([
        {
          id: "2",
          parent: "0",
          name: "Women",
          children: [{ id: "1", parent: "2", name: "Shirt", children: [] }],
        },
      ]);

      expect(categoryMap).toEqual({
        "0": [
          {
            id: "2",
            parent: "0",
            name: "Women",
            children: [{ id: "1", parent: "2", name: "Shirt", children: [] }],
          },
        ],
        "2": [{ id: "1", parent: "2", name: "Shirt", children: [] }],
      });

      return null;
    }

    render(
      <TreeProvider defaultVal={defaultVal}>
        <TestComponent />
      </TreeProvider>
    );
  });

  test("should get error when useTree is not wrapped with TreeProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function TestComponent() {
      useTree();
      return null;
    }

    expect(() => render(<TestComponent />)).toThrowError(
      "Please use <TreeProvider /> to wrap <Tree />"
    );
  });
});
