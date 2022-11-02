import { selector, atom } from 'recoil';

type Data = ({
    account: number,
    status: boolean,
    data: any
})

const defaultData: Data[] = []

const result = atom({
    key: "result",
    default: defaultData
})

export const resultState = selector({
    key: "resultState",
    get: ({get}) => get(result),
    set: ({get, set}, payload) => {
        const data = get(result)
        if(!payload){
            set(result, [])
            return
        }
        //@ts-ignore
        set(result, [...data, payload[0]])
    }
})