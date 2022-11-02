import { selector, atom } from 'recoil';

const defaultData = true

const header = atom({
    key: "header",
    default: defaultData
})

export const headerState = selector({
    key: "headerState",
    get: ({get}) => get(header),
    set: ({get, set}) => {
        const data = get(header)
        set(header, !data)
    }
})