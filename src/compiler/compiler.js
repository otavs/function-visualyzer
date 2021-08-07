import { parse } from '@cortex-js/compute-engine'
import dictionary from './dictionary'

const constants = {
    x: 'x',
	y: 'y',
	t: 't',
	Pi: 'PI',
	ExponentialE: 'E'
}

const preprocess = (latex) => latex
    .replace(/\\operatorname{abs}/g, '\\abs ')
    .replace(/\\operatorname{fract}/g, '\\fract ')
    .replace(/\\operatorname{sign}/g, '\\sign ')

const compileToGlsl = (latex) => {
    try {
        const tokens = parse(preprocess(latex), {dictionary})
        console.log(tokens)
        const res = compile(tokens)
        console.log(res)
        return res
    }
    catch(error) {
        console.log(error)
    }
}

const compile = (token) => {
    if (token === '' || token === null || token === undefined)
        throw new Error('Invalid empty token')
    if (Array.isArray(token)) {
        const op = token[0]
        switch (op) {
            case 'Parentheses':
                return `(${compile(token[1])})`
            case 'Add':
                return `(${token.slice(1).map((t) => compile(t)).join(' + ')})`
            case 'Subtract':
                return `(${compile(token[1])} - ${compile(token[2])})`
            case 'Multiply':
                return `(${token.slice(1).map((t) => compile(t)).join(' * ')})`
            case 'Divide':
                return `(${compile(token[1])} / ${compile(token[2])})`
            case 'Sqrt':
                return `sqrt(${compile(token[1])})`
            case 'Power':
                return `pow(${compile(token[1])}, ${compile(token[2])})`
            case 'Sin':
                return `sin(${compile(token[1])})`
            case 'Cos':
                return `cos(${compile(token[1])})`
            case 'Tan':
                return `tan(${compile(token[1])})`
            case 'Arcsin':
                return `asin(${compile(token[1])})`
            case 'Arccos':
                return `acos(${compile(token[1])})`
            case 'Arctan':
                return `atan(${compile(token[1])})`
            case 'Abs':
                return `abs(${compile(token[1])})`
            case 'Negate':
                return `-(${compile(token[1])})`
            case '\\ln':
                return `log(${compile(token[1])})`
            case '\\exp':
                return `exp(${compile(token[1])})`
            case '\\abs':
                return `abs(${compile(token[1])})`
            case '\\sign':
                return `sign(${compile(token[1])})`
            case '\\fract':
                return `fract(${compile(token[1])})`
            default:
                throw new Error(`Invalid operation token '${op}'`)
        }
    }
    if (typeof token == 'number')
        return float(token)
    if (typeof token == 'object') 
		return float(token.num)
    if (token in constants)
        return constants[token]
    throw new Error(`Invalid token '${token}'`)
}

function float(num) {
    num = num.toString()
    const i = num.indexOf('.')
    switch(i) {
        case -1:
            return `${num}.0`
        case num.length - 1:
            return `${num}0`
        default:
            return num
    }
}

export { compileToGlsl }
