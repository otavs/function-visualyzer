import { createGlobalState } from 'react-hooks-global-state'
import { compileToGlsl } from 'compiler/compiler'
import ColorMode from 'ColorMode'

const latexInit = '\\frac{\\left(x^2+y^2\\right)}{x}-0.7t'

export const { useGlobalState } = createGlobalState({
    latex: latexInit,
    expression: compileToGlsl(latexInit),
    colorMode: ColorMode.custom,
    primaryColor: {
        r: 25,
        g: 0,
        b: 255,
        a: 1,
    },
    secondaryColor: {
        r: 0,
        g: 255,
        b: 241,
        a: 1,
    },
})