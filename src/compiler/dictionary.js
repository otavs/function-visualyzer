import { LatexSyntax } from "@cortex-js/compute-engine"

const dict = LatexSyntax.getDictionary()
const sin = LatexSyntax.getDictionary().find(({name}) => name == 'Sin')

function createEntry(symbol) {
    return {
        ...sin,
        name: symbol,
        serialize: symbol,
        trigger: {
            ...sin.trigger,
            symbol
        }
    }
}

export default [
    ...dict,
    createEntry('\\ln'),
    createEntry('\\exp'),
    createEntry('\\abs'),
    createEntry('\\sign'),
    createEntry('\\fract'),
]
