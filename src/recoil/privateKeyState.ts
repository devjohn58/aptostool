import { selector, atom } from 'recoil';

const defaultData:string = ""

const privateKey = atom({
    key: "privateKey",
    default: defaultData
})

export const privateKeyState = selector({
    key: "privateKeyState",
    get: ({get}) => get(privateKey),
    set: ({set}, payload) => set(privateKey, payload)
})