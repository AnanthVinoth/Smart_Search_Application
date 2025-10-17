import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SmartSearch from "../../components/SmartSearch/SmartSearch";
import type { SearchResult } from "../../type/types";
import "@testing-library/jest-dom";

// If using Jest, jest should be available globally. If not, import or define a mock function:
declare const jest: any;

const mockData: SearchResult[] = [
    { id: "1", label: "Account 1234", description: "₹10,000", type: "account" },
    { id: "2", label: "Customer John", description: "Customer ID 5567", type: "customer" },
];

describe("SmartSearch Component", () => {
    test("renders with placeholder", () => {
        render(
            <SmartSearch
                placeholder="Search accounts..."
                onSearch={jest.fn()}
                onSelect={jest.fn()}
            />
        );
        const input = screen.getByPlaceholderText("Search accounts...");
        expect(input).toBeInTheDocument();
    });

    test("calls onSearch and shows results", async () => {
        const mockSearch = jest.fn(async (query: string) => {
            return mockData.filter((item) =>
                item.label.toLowerCase().includes(query.toLowerCase())
            );
        });

        render(<SmartSearch onSearch={mockSearch} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "john" } });

        await waitFor(() => {
            expect(mockSearch).toHaveBeenCalledWith("john");
        });
    });

    test("shows dropdown and selects result", async () => {
        const mockSearch = jest.fn(async () => mockData);
        const mockSelect = jest.fn();

        render(<SmartSearch onSearch={mockSearch} onSelect={mockSelect} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "acc" } });

        // wait for results
        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Account 1234"));
        expect(mockSelect).toHaveBeenCalledWith(mockData[0]);
    });

    test("closes dropdown when clicking outside", async () => {
        const mockSearch = jest.fn(async () => mockData);
        render(<SmartSearch onSearch={mockSearch} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Account" } });

        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        // Simulate clicking outside
        fireEvent.mouseDown(document.body);

        await waitFor(() => {
            expect(screen.queryByText("Account 1234")).not.toBeInTheDocument();
        });
    });

    test("keeps dropdown open when clicking inside container", async () => {
        const mockSearch = jest.fn(async () => mockData);
        render(<SmartSearch onSearch={mockSearch} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Account" } });

        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        // Simulate clicking inside the container (on the input)
        fireEvent.mouseDown(input);

        // Dropdown should remain open
        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });
    });

    test("clears input when clear button clicked", async () => {
        render(<SmartSearch />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test" } });

        await waitFor(() => {
            expect(input).toHaveValue("Test");
        });

        const clearBtn = screen.getByRole("button", { name: /clear/i });
        fireEvent.click(clearBtn);

        expect(input).toHaveValue("");
    });

    test("supports keyboard navigation and selection", async () => {
        const mockSearch = jest.fn(async () => mockData);
        const mockSelect = jest.fn();

        render(<SmartSearch onSearch={mockSearch} onSelect={mockSelect} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "account" } });

        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        fireEvent.keyDown(document, { key: "ArrowDown" });
        fireEvent.keyDown(document, { key: "Enter" });

        expect(mockSelect).toHaveBeenCalledWith(mockData[0]);
    });

    test("supports keyboard navigation and selection1", async () => {
        const mockSearch = jest.fn(async () => mockData);
        const mockSelect = jest.fn();

        render(<SmartSearch onSearch={mockSearch} onSelect={mockSelect} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "account" } });

        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        fireEvent.keyDown(input, { key: "ArrowUp" });
        fireEvent.keyDown(input, { key: "Escape" });

        expect(mockSelect).not.toHaveBeenCalled();

        // await waitFor(() => {
        //     expect(screen.queryByText("Account 1234")).not.toBeInTheDocument();
        // });
    });

    test("shows 'No results found' when empty", async () => {
        const mockSearch = jest.fn(async () => []);
        render(<SmartSearch onSearch={mockSearch} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "zzz" } });

        await waitFor(() => {
            expect(screen.getByText("No results found")).toBeInTheDocument();
        });
    });

    test("has accessible ARIA attributes", () => {
        render(<SmartSearch placeholder="Search..." />);
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-label", "Search");
    });

    test("highlights dropdown item on mouse enter", async () => {
        const mockSearch = jest.fn(async () => mockData);
        const mockSelect = jest.fn();

        render(<SmartSearch onSearch={mockSearch} onSelect={mockSelect} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "account" } });

        // Wait for dropdown to appear
        await waitFor(() => {
            expect(screen.getByText("Account 1234")).toBeInTheDocument();
        });

        // Get the dropdown items
        const firstItem = screen.getByText("Account 1234").closest("li");
        const secondItem = screen.getByText("Customer John").closest("li");

        // Ensure items exist
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();

        // Initially no item should be highlighted
        expect(firstItem).not.toHaveClass("highlighted");
        expect(secondItem).not.toHaveClass("highlighted");

        // Mouse enter on second item should highlight it
        if (secondItem) {
            fireEvent.mouseEnter(secondItem);
            expect(secondItem).toHaveClass("highlighted");
            expect(firstItem).not.toHaveClass("highlighted");
        }

        // Mouse enter on first item should highlight it
        if (firstItem) {
            fireEvent.mouseEnter(firstItem);
            expect(firstItem).toHaveClass("highlighted");
            expect(secondItem).not.toHaveClass("highlighted");
        }
    });

    test("keyboard navigation does nothing when no results found", async () => {
        const mockSearch = jest.fn(async () => []); // Return empty array
        render(<SmartSearch onSearch={mockSearch} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "nonexistent" } });

        // Wait for "No results found" to appear
        await waitFor(() => {
            expect(screen.getByText("No results found")).toBeInTheDocument();
        });

        // Try keyboard navigation - should do nothing since results.length === 0
        fireEvent.keyDown(document, { key: "ArrowDown" });
        fireEvent.keyDown(document, { key: "ArrowUp" });
        fireEvent.keyDown(document, { key: "Enter" });

        // Verify no errors occur and "No results found" is still displayed
        expect(screen.getByText("No results found")).toBeInTheDocument();
        
        // Verify no items are highlighted (there are none to highlight)
        const highlightedItems = document.querySelectorAll(".highlighted");
        expect(highlightedItems).toHaveLength(0);
    });
});