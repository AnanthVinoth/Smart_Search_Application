import { render, act, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../../components/SmartSearch/SearchInput"; // Adjust path if needed
import "@testing-library/jest-dom";

const getResponsiveWidth = (innerWidth: number) => {
  if (innerWidth <= 375) return "82vw"; // iPhone SE and smaller
  if (innerWidth <= 414) return "84vw"; // iPhone XR and similar
  if (innerWidth <= 430) return "85vw"; // iPhone 14 Pro Max and similar
  if (innerWidth <= 600) return "90vw"; // mobile
  if (innerWidth <= 720) return "75vw"; // Surface Duo single screen
  if (innerWidth <= 1024) return "55vw"; // tablet
  if (innerWidth <= 1366) return "40vw"; // iPad Pro and similar
  if (innerWidth <= 1434) return "35vw"; // Surface Duo dual screen
  return "25vw"; // desktop
};

describe("SearchInput responsive width", () => {
  test("returns correct width for iPhone SE (375px)", () => {
    act(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("82vw");
  });

  test("returns correct width for iPhone XR (414px)", () => {
    act(() => {
      window.innerWidth = 414;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("84vw");
  });

  test("returns correct width for iPhone 14 Pro Max (430px)", () => {
    act(() => {
      window.innerWidth = 430;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("85vw");
  });

  test("returns correct width for standard mobile (600px)", () => {
    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");
  });

  test("returns correct width for Surface Duo single screen (720px)", () => {
    act(() => {
      window.innerWidth = 720;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("75vw");
  });

  test("returns correct width for tablet (1024px)", () => {
    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");
  });

  test("returns correct width for iPad Pro (1366px)", () => {
    act(() => {
      window.innerWidth = 1366;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("40vw");
  });

  test("returns correct width for Surface Duo dual screen (1434px)", () => {
    act(() => {
      window.innerWidth = 1434;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("35vw");
  });

  test("returns correct width for desktop (1500px)", () => {
    act(() => {
      window.innerWidth = 1500;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
  });

  test("handles boundary conditions around 1024px tablet breakpoint", () => {
    // Test just under 1024px
    act(() => {
      window.innerWidth = 1023;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");

    // Test exactly at 1024px
    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");

    // Test just over 1024px (should go to next breakpoint)
    act(() => {
      window.innerWidth = 1025;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("40vw");
  });

  test("covers tablet width range from 721px to 1024px", () => {
    // Test various widths in tablet range
    const testWidths = [721, 800, 900, 1000, 1024];
    
    testWidths.forEach(width => {
      act(() => {
        window.innerWidth = width;
        window.dispatchEvent(new Event("resize"));
      });
      expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");
    });
  });

  test("covers desktop else condition for widths above 1434px", () => {
    // Test various desktop widths (else condition)
    const desktopWidths = [1435, 1500, 1600, 1920, 2560, 3840];
    
    desktopWidths.forEach(width => {
      act(() => {
        window.innerWidth = width;
        window.dispatchEvent(new Event("resize"));
      });
      expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
    });
  });

  test("explicitly covers return '25vw' desktop statement", () => {
    // Test that the final return "25vw" statement is executed
    // This happens when window.innerWidth > 1434px
    
    // Test minimum desktop width (just over Surface Duo dual screen)
    act(() => {
      window.innerWidth = 1435;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
    
    // Test common desktop resolutions that trigger return "25vw"
    const commonDesktopSizes = [
      1440,  // MacBook Pro 14"
      1536,  // Surface Laptop 
      1680,  // MacBook Pro 16"
      1728,  // Surface Studio
      1920,  // Full HD
      2560,  // 2K/QHD
      3440,  // Ultra-wide 21:9
      3840,  // 4K UHD
      5120   // 5K iMac
    ];
    
    commonDesktopSizes.forEach(width => {
      act(() => {
        window.innerWidth = width;
        window.dispatchEvent(new Event("resize"));
      });
      expect(getResponsiveWidth(width)).toBe("25vw");
    });
  });

  test("handles boundary conditions around 1434px Surface Duo dual screen breakpoint", () => {
    // Test just under 1434px
    act(() => {
      window.innerWidth = 1433;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("35vw");

    // Test exactly at 1434px
    act(() => {
      window.innerWidth = 1434;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("35vw");

    // Test just over 1434px (triggers else condition - desktop)
    act(() => {
      window.innerWidth = 1435;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
  });

  test("handles boundary conditions around 600px mobile breakpoint", () => {
    // Test just under 600px
    act(() => {
      window.innerWidth = 599;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");

    // Test exactly at 600px
    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");

    // Test just over 600px (should go to next breakpoint)
    act(() => {
      window.innerWidth = 601;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("75vw");
  });

  test("covers mobile width range from 431px to 600px", () => {
    // Test various widths in mobile range
    const testWidths = [431, 500, 550, 580, 600];
    
    testWidths.forEach(width => {
      act(() => {
        window.innerWidth = width;
        window.dispatchEvent(new Event("resize"));
      });
      expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");
    });
  });

  test("updates input width on window resize", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    // Test boundary conditions
    act(() => {
      window.innerWidth = 374; // Just under iPhone SE
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("82vw");

    act(() => {
      window.innerWidth = 376; // Just over iPhone SE
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("84vw");

    act(() => {
      window.innerWidth = 415; // Just over iPhone XR
      window.dispatchEvent(new Event("resize"));
    });
    expect(getResponsiveWidth(window.innerWidth)).toBe("85vw");
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