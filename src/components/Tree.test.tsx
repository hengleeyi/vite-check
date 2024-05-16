import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TreeProvider } from "./TreeContext";
import Tree from "./Tree";

describe("Tree", () => {
  test("should render default tree nodes when data is not provided", () => {
    const defaultData = [
      { id: "1", parent: "0", name: "Men" },
      { id: "2", parent: "0", name: "Women" },
    ];

    render(
      <TreeProvider defaultVal={defaultData}>
        <Tree isRoot />
      </TreeProvider>
    );

    const defaultNode1 = screen.getByText("Men");
    const defaultNode2 = screen.getByText("Women");

    expect(defaultNode1).toBeInTheDocument();
    expect(defaultNode2).toBeInTheDocument();
  });
});
