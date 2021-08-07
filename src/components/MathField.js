import React, { useState } from 'react'
import styled from 'styled-components'
import { EditableMathField } from 'react-mathquill'
import { compileToGlsl } from '../compiler/compiler'
import mathFieldConfig from '../mathFieldConfig'
import UndoRedoManager from '../UndoRedoManager'
import { useGlobalState } from 'state'

export default function MathField() {
    const [latex, setLatex] = useGlobalState('latex')
    const [expression, setExpression] = useGlobalState('expression')
    
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
                latex={latex}
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
                mathquillDidMount={mathField => new UndoRedoManager(mathField, mathField.el())}
            />
            {/* <p>{latex}</p>
            <p>{expression}</p> */}
        </MathFieldDiv>
    </>
}

const MathFieldDiv = styled.div`
    position: absolute;
    overflow: auto;
    width: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`