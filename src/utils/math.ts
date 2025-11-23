export function calculateMonthsToPayoff(total: number, monthlyRate: number, payment: number): number {
return Math.log(payment / (payment - monthlyRate * total)) / Math.log(1 + monthlyRate);
}


export function calculateInterestPaid(total: number, payment: number, months: number): number {
return payment * months - total;
}