import { useEffect, useState } from "react";
import type { Debt } from "../types";
import { loadDebts, saveDebts } from "../utils/storage";
import { calculateMonthsToPayoff, calculateInterestPaid } from "../utils/math";

export function useDebts(username: string | undefined) {
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    if (username) {
      setDebts(loadDebts(username));
    }
  }, [username]);

  const addDebt = (
    total: number,
    rate: number,
    payment: number,
    name: string,
    type: string,
    notes?: string
  ) => {

    const monthlyRate = rate / 100 / 12;
    const months = calculateMonthsToPayoff(total, monthlyRate, payment);

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + Math.round(months));

    const interestPaid = calculateInterestPaid(total, payment, Math.round(months));

    const newDebt: Debt = {
      id: Date.now(),
      name,
      type,
      total,
      rate,
      payment,
      payoffDate: payoffDate.toLocaleDateString(),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      notes,
    };

    const updated = [...debts, newDebt];
    setDebts(updated);

    if (username) {
      saveDebts(username, updated);
    }
  };

  return { debts, setDebts, addDebt };
}
