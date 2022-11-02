import { selector, atom } from 'recoil';

type DataType = {
    date?: string,
    time?: string,
    isUsed?: boolean,
}

const defaultData: DataType = {
    date: "",
    time: "",
    isUsed: false
}

const timeLauch = atom({
    key: "timeLaunch",
    default: defaultData
})

export const timeLauchState = selector({
    key: "timeLaunchState",
    get: ({get}) => get(timeLauch),
    set: ({get,set}, payload) => {
        const data = get(timeLauch)
        set(timeLauch, {...data, ...payload})
    }
})