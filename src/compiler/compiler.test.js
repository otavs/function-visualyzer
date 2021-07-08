import { compileToGlsl } from './compiler'

const {sqrt, pow, sin, cos, tan, asin, acos, atan, abs, exp, log} = Math
const x = 3, y = 7, t = 0.5, PI = Math.PI, E = Math.E;

const compileAndEvaluate = latex => eval(compileToGlsl(latex))

test('Test the latex expression compiler', () => {
    expect(compileAndEvaluate('\\sin x')).toBe(sin(x))
    expect(compileAndEvaluate('\\frac{1}{\\sqrt{2}}\\cdot2')).toBe(1 / sqrt(2) * 2)
    expect(compileAndEvaluate('\\sin\\cos\\tan x')).toBe(sin(cos(tan(x))))
    expect(compileAndEvaluate('x^2+\\frac{y^2}{t}-1+1')).toBe(pow(x, 2) + pow(y, 2) / t - 1 + 1)
    expect(compileAndEvaluate('\\sin\\cos\\tan x')).toBe(sin(cos(tan(x))))
    expect(compileAndEvaluate('\\arctan\\frac{\\left(x^2+y^2\\right)}{2t\\cos0}')).toBe(atan((pow(x, 2) + pow(y, 2)) / (2 * t * cos(0))))
    expect(compileAndEvaluate('\\arccos \\arcsin \\left(xyt\\right)')).toBe(acos(asin((x * y * t))))
    expect(compileAndEvaluate('\\left(\\left(\\left(\\left(x^3\\right)\\right)\\right)+\\left(\\left(y^3\\right)\\right)\\right)^2')).toBe(pow(pow(x, 3) + pow(y, 3), 2))
    expect(compileAndEvaluate('x^2')).toBe(pow(x, 2))
    expect(compileAndEvaluate('2^x')).toBe(pow(2, x))
    expect(compileAndEvaluate('\\ln x')).toBe(log(x))
    expect(compileAndEvaluate('\\ln x^2')).toBe(log(pow(x, 2)))
    expect(compileAndEvaluate('\\ln x^2y+t')).toBe(log(pow(x, 2)) * y + t)
    expect(compileAndEvaluate('1')).toBe(1)
    expect(compileAndEvaluate('1.23456')).toBe(1.23456)
    expect(compileAndEvaluate('-x')).toBe(-x)
    expect(compileAndEvaluate('-\\sin x')).toBe(-sin(x))
    expect(compileAndEvaluate('\\left|-x\\right|')).toBe(abs(-x))
    expect(compileAndEvaluate('\\pi')).toBe(PI)
    expect(compileAndEvaluate('\\sin\\pi')).toBe(sin(PI))
    expect(compileAndEvaluate('e')).toBe(E)
    expect(compileAndEvaluate('\\ln e')).toBe(log(E))
    expect(compileAndEvaluate('\\left|-x\\right|')).toBe(abs(-x))
    //expect(compileAndEvaluate('\\left|\\sin x\\ln y\\right|')).toBe(abs(sin(x)*log(x)))
})
