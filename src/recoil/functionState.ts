import { selector } from 'recoil';
import { atom } from 'recoil';
type Data = {
    func?: string,
    quatity?: number | undefined,
    isUsed?: boolean,
}
const defaultData:Data = {
    func: "",
    quatity: undefined,
    isUsed: false,
}

const func = atom({
    key: "func",
    default: defaultData
})


export const functionState = selector({
    key: "functionState",
    get: ({get}) => get(func),
    set: ({get,set}, payload) => {
        const data = get(func)
        set(func, {...data, ...payload})
    }
})