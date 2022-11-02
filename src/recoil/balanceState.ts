import { selector, atom } from "recoil";

const defaultData: (number | undefined)[] = [];

const balance = atom({
  key: "balance",
  default: defaultData,
});

export const balanceState = selector({
  key: "balanceState",
  get: ({ get }) => get(balance),
  set: ({ set }, payload) => set(balance, payload),
});
