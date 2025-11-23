export interface Debt {
  id: number;

  // These fields were missing and MUST exist for your app to compile
  name: string;
  type: string;
  notes?: string;

  total: number;
  rate: number;
  payment: number;

  payoffDate: string;
  interestPaid: number;
}
