import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckboxTree from "./CheckboxTree";

describe("CheckboxTree", () => {
  const defaultData = [
    { id: "1", parent: "0", name: "Men" },
    { id: "2", parent: "0", name: "Women" },
    { id: "3", parent: "1", name: "Shirt" },
  ];

  test("renders TreeToolbar and Tree components", () => {
    render(<CheckboxTree defaultVal={defaultData} />);

    const treeToolbar = screen.getByTestId("tree-toolbar");
    const tree = screen.getByTestId("tree");

    expect(treeToolbar).toBeInTheDocument();
    expect(tree).toBeInTheDocument();
  });
});
