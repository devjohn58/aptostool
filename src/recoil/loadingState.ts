import { selector, atom } from 'recoil';

const defaultData:boolean = false

const loading = atom ({
    key: "loading",
    default: defaultData
})

export const loadingState = selector({
    key: "loadingState",
    get: ({get}) => get(loading),
    set: ({set}, payload) => set(loading, payload)
})