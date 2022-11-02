import { atom, selector } from 'recoil';

const defaultData:boolean = false

const active = atom({
    key: "active",
    default: defaultData
})

export const activeState = selector({
    key: "activeState",
    get: ({get}) => get(active),
    set: ({set}, payload) => set(active, payload)
})