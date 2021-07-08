import { parse as parseLatex } from '@cortex-js/compute-engine'

const constants = {
    x: 'x',
	y: 'y',
	t: 't',
	Pi: 'PI',
	ExponentialE: 'E'
}

const compileToGlsl = (latex) => {
    try {
        const tokens = parseLatex(latex)
        console.log(tokens)
        const r = compile(tokens)
        console.log(r)
        return r
    }
    catch(e) {
        console.log(e)
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
                switch(token[1]) {
                    case '\\ln':
                        if(token.length <= 3)
                            return `log(${compile(token[2])})`
                        return `(log(${compile(token[2])}) * ${token.slice(3).map((t) => compile(t)).join(' * ')})`
                    default:
                        return `(${token.slice(1).map((t) => compile(t)).join(' * ')})`
                }
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
