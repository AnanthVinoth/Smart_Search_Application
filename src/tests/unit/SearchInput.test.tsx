// // Add this test to SmartSearch.test.tsx or SearchInput.test.tsx

// import { render, screen } from "@testing-library/react";
// import SearchInput from "./SearchInput"; // Adjust path if needed
//  // Adjust path if needed

// const getResponsiveWidth = (innerWidth: number) => {
//   if (innerWidth <= 600) return "90vw"; // mobile
//   if (innerWidth <= 1024) return "55vw"; // tablet
//   return "25vw"; // desktop
// };

// describe("SearchInput responsive width", () => {
//   test("updates input width on window resize", () => {
//     render(
//       <SearchInput
//         value=""
//         onChange={() => {}}
//         onClear={() => {}}
//       />
//     );

//     // Simulate mobile
//     window.innerWidth = 500;
//     window.dispatchEvent(new Event("resize"));
//     expect(getResponsiveWidth(window.innerWidth)).toBe("90vw");

//     // Simulate tablet
//     window.innerWidth = 800;
//     window.dispatchEvent(new Event("resize"));
//     expect(getResponsiveWidth(window.innerWidth)).toBe("55vw");

//     // Simulate desktop
//     window.innerWidth = 1200;
//     window.dispatchEvent(new Event("resize"));
//     expect(getResponsiveWidth(window.innerWidth)).toBe("25vw");
//   });
// });

import { render, screen, act } from "@testing-library/react";
import SearchInput from "../../components/SmartSearch/SearchInput"; // Adjust path if needed

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
