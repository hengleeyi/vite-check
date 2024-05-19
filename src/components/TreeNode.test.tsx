import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TreeProvider } from "./TreeContext";
import TreeNode from "./TreeNode";

describe("TreeNode", () => {
  const defaultData = [
    { id: "1", parent: "0", name: "Men" },
    { id: "2", parent: "0", name: "Women" },
    { id: "3", parent: "1", name: "Shirt" },
  ];
  test("should render a tree node with checkbox and name", () => {
    const node = {
      id: "1",
      parent: "0",
      name: "Men",
      children: [],
    };

    render(
      <TreeProvider defaultVal={defaultData}>
        <TreeNode node={node} />
      </TreeProvider>
    );

    const checkbox = screen.getByRole("checkbox");
    const name = screen.getByText("Men");

    expect(checkbox).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test("should show children when clicking the title ", () => {
    const node = {
      id: "1",
      parent: "0",
      name: "Men",
      children: [{ id: "3", parent: "1", name: "Shirt", children: [] }],
    };

    render(
      <TreeProvider defaultVal={defaultData}>
        <TreeNode node={node} />
      </TreeProvider>
    );

    const title = screen.getByText("Men");
    fireEvent.click(title);
    expect(title).toHaveClass("font-bold cursor-pointer");
    expect(screen.getByTestId("tree")).toBeVisible();
  });

  test("should render null wehn categoriesState cannot find node ", () => {
    const node = {
      id: "10",
      parent: "0",
      name: "Kids",
      children: [{ id: "12", parent: "10", name: "Shirt", children: [] }],
    };

    render(
      <TreeProvider defaultVal={defaultData}>
        <TreeNode node={node} />
      </TreeProvider>
    );

    expect(screen.queryByText("Kids")).toBeFalsy();
  });

  test("should update checked state of children when parent checkbox is clicked", () => {
    const node = {
      id: "1",
      parent: "0",
      name: "Men",
      children: [{ id: "3", parent: "1", name: "Shirt", children: [] }],
    };

    render(
      <TreeProvider defaultVal={defaultData}>
        <TreeNode node={node} />
      </TreeProvider>
    );

    const title = screen.getByText("Men");
    fireEvent.click(title);

    const checkboxs = screen.getAllByRole("checkbox");
    const parentCheckbox = checkboxs[0];
    fireEvent.click(parentCheckbox);

    expect(checkboxs.length).toBe(2);

    checkboxs.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(parentCheckbox);

    checkboxs.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
