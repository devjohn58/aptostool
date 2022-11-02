import { selector, atom } from 'recoil';

type Data = {
    gasPrice?: number,
    gasMax?: number,
}

const defaultData: Data = {
    gasPrice: 100,
    gasMax: 20000
}

const gasFee = atom({
    key: "gasFee",
    default: defaultData
})

export const gasFeeState = selector({
    key: "gasFeeState",
    get: ({get}) => get(gasFee),
    set: ({set,get}, payload) => {
        const data = get(gasFee)
        set(gasFee, {...data, ...payload}) 
    }
})