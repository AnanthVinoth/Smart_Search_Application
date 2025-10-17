# Smart Search Component

A modern, responsive smart search component built with React, TypeScript, and Vite. Features real-time search with debouncing, keyboard navigation, theming support, and comprehensive testing.

## 🚀 Features

- **🔍 Intelligent Search**: Debounced search with async data fetching
- **⌨️ Keyboard Navigation**: Arrow keys, Enter, Escape support, Placeholder, clear button, loading state, dropdown
- **🎨 Theming**: Light and dark mode with smooth transitions
- **🏦 Banking Data**: 20+ mock banking entities (accounts, customers, transactions, loans, etc.)
- **📱 Responsive Design**: Mobile-first approach with adaptive sizing
- **🎯 Type Safety**: Full TypeScript implementation
- **🧪 Comprehensive Testing**: Unit tests with Jest and E2E tests with Playwright
- **♿ Accessibility**: Basic ARIA attributes and keyboard support

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Custom Properties, Modern CSS features
- **Testing**: Jest (Unit), Playwright (E2E)
- **Linting**: ESLint with TypeScript support

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AnanthVinoth/Smart_Search_Application.git
cd smart_search_application

# Install dependencies
npm install

# Start development server
npm run dev
# App will be available at http://localhost:5173

# Build for production
npm run build
```

## 🎮 Usage

### Basic Implementation

```tsx
import SmartSearch from './components/SmartSearch/SmartSearch';

function App() {
  const handleSearch = async (query: string) => {
    // Your search logic here
    return filteredResults;
  };

  const handleSelect = (result) => {
    console.log('Selected:', result);
  };

  return (
    <SmartSearch
      placeholder="Search accounts, customers, transactions..."
      onSearch={handleSearch}
      onSelect={handleSelect}
      theme="light"
    />
  );
}
```

### With Dark Theme

```tsx
<SmartSearch
  placeholder="Type to search..."
  onSearch={handleSearch}
  onSelect={handleSelect}
  theme="dark"
/>
```

## 🗂️ Project Structure

```
src/
├── components/
│   └── SmartSearch/
│       ├── SmartSearch.tsx      # Main component
│       ├── SearchInput.tsx      # Input field component
│       ├── SearchDropdown.tsx   # Results dropdown
│       ├── smartSearch.css      # Styles
│       └── types.ts             # TypeScript definitions
├── constants/
│   └── data.tsx                 # Mock banking data
├── tests/
│   ├── unit/                    # Jest unit tests
│   └── e2e/                     # Playwright E2E tests
└── App.tsx                      # Main application
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test          # Run Jest tests
npm run test:unit     # Alternative command
```

### Run E2E Tests
```bash
npm run test:e2e      # Run Playwright tests
npm run test:e2e:ui   # Run with UI mode
```

### Test Coverage
```bash
npm run test -- --coverage
```

## 🎨 Component Props

### SmartSearch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search..."` | Input placeholder text |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme |
| `onSearch` | `(query: string) => Promise<SearchResult[]>` | - | Search function |
| `onSelect` | `(result: SearchResult) => void` | - | Selection handler |

### SearchResult Interface

```typescript
interface SearchResult {
  id: string;
  label: string;
  description?: string;
  type?: 'account' | 'transaction' | 'customer' | 'loan' | 'insurance' | 'investment' | 'branch' | 'card';
}
```

## 🏦 Mock Data Categories

The component includes 20 banking entities across 8 categories:

- **🟢 Accounts**: HDFC Savings, ICICI Current, SBI FD, Axis Credit Card, Kotak Salary
- **👥 Customers**: Priya Sharma, Rajesh Kumar, Anita Patel, Mohammed Ali, Deepika Singh
- **💸 Transactions**: UPI Transfer, ATM Withdrawal, Online Payment, Salary Credit, EMI Debit
- **🏠 Loans**: Home Loan with principal and tenure details
- **🛡️ Insurance**: Car Insurance Policy with expiry information
- **📈 Investments**: Mutual Fund SIP with monthly details
- **🏛️ Branches**: Bank branch with IFSC and timing
- **💳 Cards**: Debit card with masked number and expiry

## ⌨️ Keyboard Shortcuts

- **↑/↓ Arrow Keys**: Navigate through search results
- **Enter**: Select highlighted result
- **Escape**: Clear highlight (stays in dropdown)
- **Tab**: Move between focusable elements
- **Mouse Hover**: Update highlight

## 🎨 Theming

The component supports light and dark themes with CSS custom properties:

```css
/* Light Theme */
.smart-search.light {
  --search-bg: #ffffff;
  --search-text: #222;
  --search-border: #ccc;
  --search-hover-bg: #f3f3f3;
}

/* Dark Theme */
.smart-search.dark {
  --search-bg: #1f2937;
  --search-text: #f9fafb;
  --search-border: #374151;
  --search-hover-bg: #374151;
}
```

## 📱 Responsive Behavior

- **Mobile (≤600px)**: 90vw width with touch-optimized interactions
- **Tablet (≤1024px)**: 55vw width with medium sizing
- **Desktop (>1024px)**: 25vw width with full features

## 🧩 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

## 🤝 Contributing

1. Fork the repository
2. branch name: `git checkout main`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin main`

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development Notes

- Uses React 19 with modern hooks
- Implements debounced search (300ms delay)
- Responsive design with CSS custom properties
- Type-safe with comprehensive TypeScript definitions
- Tested with Jest (unit) and Playwright (E2E)
- ESLint configured for TypeScript and React best practices
