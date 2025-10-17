import { render, act, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../../components/SmartSearch/SearchInput"; // Adjust path if needed
import "@testing-library/jest-dom";

const getResponsiveWidth = (innerWidth: number) => {
  if (innerWidth <= 600) return "90vw"; // mobile
  if (innerWidth <= 1024) return "55vw"; // tablet
  return "25vw"; // desktop
};

describe("SearchInput responsive width", () => {
  test("updates input width on window resize", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    // Simulate mobile
    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");

    // Simulate tablet
    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");

    // Simulate desktop
    act(() => {
      window.innerWidth = 1200;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
  });
});

describe("SearchInput loading state", () => {
  test("displays loader when loading is true", () => {
    render(
      <SearchInput
        value="search text"
        loading={true}
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    // Check if loader element is present
    const loader = document.querySelector(".loader");
    expect(loader).toBeInTheDocument();
  });

  test("displays clear button when loading is false and value exists", () => {
    render(
      <SearchInput
        value="search text"
        loading={false}
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    // Check if clear button is present
    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
    
    // Check if loader is not present
    const loader = document.querySelector(".loader");
    expect(loader).not.toBeInTheDocument();
  });

  test("displays neither loader nor clear button when loading is false and value is empty", () => {
    render(
      <SearchInput
        value=""
        loading={false}
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    // Check if neither loader nor clear button is present
    const loader = document.querySelector(".loader");
    const clearButton = document.querySelector(".clear-btn");
    expect(loader).not.toBeInTheDocument();
    expect(clearButton).not.toBeInTheDocument();
  });

  test("calls onClear when clear button is clicked", () => {
    const mockOnClear = jest.fn();
    render(
      <SearchInput
        value="search text"
        loading={false}
        onChange={() => {}}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);
    
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
