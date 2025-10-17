export interface SearchResult {
  id: string;
  label: string;
  description?: string;
  type?: 'account' | 'transaction' | 'customer' | 'loan' | 'insurance' | 'investment' | 'branch' | 'card';
}