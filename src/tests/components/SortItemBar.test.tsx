import { render, screen } from "@testing-library/react";
import SearchBar from "../../components/SortItemsBar/SortItemsBar";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("SearchBar", () => {
  const mockOnSort = vi.fn();
  const mockOnOrder = vi.fn();

  beforeEach(() => {
    render(<SearchBar onSort={mockOnSort} onOrder={mockOnOrder} sort={"stars"} order={"asc"} />);
  });

  it("should render correctly with default props", () => {
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
  });
});
