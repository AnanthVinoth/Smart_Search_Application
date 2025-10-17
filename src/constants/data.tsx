import type { SearchResult } from "../type/types";

const mockData: SearchResult[] = [
  // Accounts
  { id: "1", label: "HDFC Savings Account - 1234", description: "$85,000 balance • Active", type: "account" },
  { id: "2", label: "ICICI Current Account - 5678", description: "$2,45,000 balance • Business", type: "account" },
  { id: "3", label: "SBI Fixed Deposit - 9012", description: "$5,00,000 • Matures 2025-12-15", type: "account" },
  { id: "4", label: "Axis Bank Credit Card - 3456", description: "$50,000 limit • ₹12,000 outstanding", type: "account" },
  { id: "5", label: "Kotak Salary Account - 7890", description: "$65,000 balance • Premium", type: "account" },
  
  // Customers
  { id: "6", label: "Priya Sharma", description: "Customer ID: CU001 • Gold Member", type: "customer" },
  { id: "7", label: "Rajesh Kumar", description: "Customer ID: CU002 • Business Banking", type: "customer" },
  { id: "8", label: "Anita Patel", description: "Customer ID: CU003 • NRI Account Holder", type: "customer" },
  { id: "9", label: "Mohammed Ali", description: "Customer ID: CU004 • Priority Banking", type: "customer" },
  { id: "10", label: "Deepika Singh", description: "Customer ID: CU005 • Student Account", type: "customer" },
  
  // Transactions
  { id: "11", label: "UPI Transfer #TXN001", description: "$2,500 to phonepe@ybl • Today 2:30 PM", type: "transaction" },
  { id: "12", label: "ATM Withdrawal #TXN002", description: "$5,000 from HDFC ATM • Yesterday", type: "transaction" },
  { id: "13", label: "Online Payment #TXN003", description: "$12,450 to Amazon • Card ending 1234", type: "transaction" },
  { id: "14", label: "Salary Credit #TXN004", description: "$75,000 from TechCorp Ltd • 1st Oct", type: "transaction" },
  { id: "15", label: "EMI Debit #TXN005", description: "$15,000 Home Loan EMI • Auto-debit", type: "transaction" },
  
  // Other Banking Entities
  { id: "16", label: "Home Loan - HL2024001", description: "$25,00,000 principal • 15 years remaining", type: "loan" },
  { id: "17", label: "Car Insurance Policy", description: "Policy #IN789 • Expires 2025-03-15", type: "insurance" },
  { id: "18", label: "Mutual Fund SIP - MF001", description: "$5,000/month • Equity Diversified", type: "investment" },
  { id: "19", label: "Branch: Connaught Place", description: "IFSC: HDFC0000123 • Delhi • Open till 6 PM", type: "branch" },
  { id: "20", label: "Debit Card - 4532****1234", description: "Platinum • Expires 12/26 • Active", type: "card" },
];

export default mockData;