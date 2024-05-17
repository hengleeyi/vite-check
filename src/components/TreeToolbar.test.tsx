import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TreeToolbar from "./TreeToolbar";
import { TreeProvider } from "./TreeContext";
import TreeNode from "./TreeNode";

describe("TreeToolbar", () => {
  const defaultData = [
    { id: "1", parent: "0", name: "Men" },
    { id: "2", parent: "0", name: "Women" },
    { id: "3", parent: "1", name: "Shirt" },
  ];
  const node = {
    id: "1",
    parent: "0",
    name: "Men",
    children: [{ id: "3", parent: "1", name: "Shirt", children: [] }],
  };

  const renderComponent = () => {
    render(
      <TreeProvider defaultVal={defaultData}>
        <TreeToolbar />
        <TreeNode node={node} />
      </TreeProvider>
    );
  };
  test("should select all checkboxs when clicking select all button", () => {
    renderComponent();

    // show checkboxs
    const title = screen.getByText("Men");
    fireEvent.click(title);

    const checkboxs = screen.getAllByRole("checkbox");

    checkboxs.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
    // click select all button
    const selectAllButton = screen.getByText(/select all/i);
    fireEvent.click(selectAllButton);

    expect(checkboxs.length).toBe(2);

    checkboxs.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test("should show all subcategories when clicking show all subcategories", () => {
    renderComponent();

    const checkboxs = screen.getAllByRole("checkbox");
    expect(checkboxs.length).toBe(1);

    const showCategoriesButton = screen.getByText(/show all subcategories/i);
    fireEvent.click(showCategoriesButton);

    const checkboxs2 = screen.getAllByRole("checkbox");
    expect(checkboxs2.length).toBe(2);
  });
});
