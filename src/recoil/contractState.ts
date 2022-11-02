import { atom, selector } from "recoil";

const defaultData: string = "" 

const contract = atom({
    key: "contract",
    default: defaultData
})

export const contractState = selector({
    key: "contractState",
    get: ({get}) => get(contract),
    set: ({set}, payload) => set(contract,payload)
})