import React, { useState } from 'react'
import styled from 'styled-components'
import { addStyles as addStylesMathQuill, EditableMathField } from 'react-mathquill'
import { compileToGlsl } from './compiler/compiler'
import mathFieldConfig from './mathFieldConfig'
import Canvas from './Canvas'

addStylesMathQuill()

const latexInit = '\\frac{\\left(x^2+y^2\\right)}{x}-0.7t'
const expInit = compileToGlsl(latexInit)

const MathField = ({setLatex, setExpression, latex, expression}) => {
    const [hasError, setHasError] = useState(false)
    const onChange = async mathField => {
        setLatex(mathField.latex())
        const expressionGlsl = compileToGlsl(mathField.latex())
        if(expressionGlsl)
            setExpression(expressionGlsl)
        setHasError(!expressionGlsl)
    }
    return <>
        <MathFieldDiv>
            <EditableMathField
                latex={latexInit}
                config={mathFieldConfig}
                onChange={onChange}
                style={{
                    fontSize: '20px',
                    minWidth: '200px',
                    maxWidth: '85%',
                    margin: '30px 6px 6px 6px',
                    textAlign: 'center',
                    backgroundColor: hasError ? 'rgba(255, 204, 204, 1)' : 'rgba(255, 255, 255, 0.9)',
                }}
            />
            {/* <p>{latex}</p>
            <p>{expression}</p> */}
        </MathFieldDiv>
    </>
}

const MathFieldDiv = styled.div`
    position: relative;
    z-index: 1;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default function App() {
    const [latex, setLatex] = useState(latexInit)
    const [expression, setExpression] = useState(expInit)
    return <>
        <Canvas expression={expression} />
        <MathField latex={latex} setLatex={setLatex} expression={expression} setExpression={setExpression} />
    </>
}
