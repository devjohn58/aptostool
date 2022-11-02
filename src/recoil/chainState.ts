import { selector, atom } from 'recoil';

type Data = "aptos" | "sui" | "ethw"

const defaultData: Data = "aptos"

const chain = atom ({
    key: "chain",
    default: defaultData
})

export const chainState = selector({
    key: "chainState",
    get: ({get}) => get(chain),
    set: ({set}, payload) => set(chain, payload)
})
