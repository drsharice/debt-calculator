import type { Debt } from "../types";
import type { User } from "../types";


export function loadDebts(username: string): Debt[] {
const key = `debts_${username}`;
return JSON.parse(localStorage.getItem(key) || "[]");
}


export function saveDebts(username: string, debts: Debt[]): void {
const key = `debts_${username}`;
localStorage.setItem(key, JSON.stringify(debts));
}