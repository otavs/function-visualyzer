import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGlobalState } from 'state'

import getVertexShader from '../shader/vertexShader'
import getFragmentShader from '../shader/fragmentShader'

export default function Canvas() {
    const [primaryColor] = useGlobalState('primaryColor')
    const [secondaryColor] = useGlobalState('secondaryColor')
    const [colorMode] = useGlobalState('colorMode')
    const [expression] = useGlobalState('expression')

    const canvasRef = useRef()
    const programRef = useRef()
    const vertexShaderRef = useRef()
    const fragmentShaderRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2')

        if(!gl)
            alert('No WebGL :(')
    
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    
        vertexShaderRef.current = createShader(gl, gl.VERTEX_SHADER, getVertexShader())
        fragmentShaderRef.current = createShader(gl, gl.FRAGMENT_SHADER, getFragmentShader(expression))
        programRef.current = createProgram(gl, vertexShaderRef.current, fragmentShaderRef.current)
    
        gl.useProgram(programRef.current)

        updateUniform(gl, 'uniform1f', 'u_time', 0)
        updateUniform(gl, 'uniform2f', 'u_resolution', gl.canvas.width, gl.canvas.height)
        updateUniform(gl, 'uniform2f', 'u_mouse', 0, 0)
        updateUniform(gl, 'uniform4f', 'primaryColor', primaryColor.r / 255, primaryColor.g / 255, primaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform4f', 'secondaryColor', secondaryColor.r / 255, secondaryColor.g / 255, secondaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform1i', 'u_colorMode', colorMode)

        const startTime = Date.now()

        function render() {
            updateUniform(gl, 'uniform1f', 'u_time', (Date.now() - startTime) / 1000)
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 3)
            requestAnimationFrame(render)
        }

        render()
    
        window.addEventListener('resize', () => {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            updateUniform(gl, 'uniform2f', 'u_resolution', gl.canvas.width, gl.canvas.height)
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        })
    
        window.addEventListener('mousemove', e => { // or touchstart
            updateUniform(gl, 'uniform2f', 'u_mouse', e.x, canvasRef.current.height - e.y)
        })
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2')

        gl.detachShader(programRef.current, fragmentShaderRef.current)
        gl.deleteShader(fragmentShaderRef.current)
        fragmentShaderRef.current = createShader(gl, gl.FRAGMENT_SHADER, getFragmentShader(expression))
        gl.attachShader(programRef.current, fragmentShaderRef.current)
        gl.linkProgram(programRef.current)

        updateUniform(gl, 'uniform1f', 'u_time', 0)
        updateUniform(gl, 'uniform2f', 'u_resolution', gl.canvas.width, gl.canvas.height)
        updateUniform(gl, 'uniform2f', 'u_mouse', 0, 0)
        updateUniform(gl, 'uniform4f', 'primaryColor', primaryColor.r / 255, primaryColor.g / 255, primaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform4f', 'secondaryColor', secondaryColor.r / 255, secondaryColor.g / 255, secondaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform1i', 'u_colorMode', colorMode)
    }, [expression])

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2')
        updateUniform(gl, 'uniform4f', 'primaryColor', primaryColor.r / 255, primaryColor.g / 255, primaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform4f', 'secondaryColor', secondaryColor.r / 255, secondaryColor.g / 255, secondaryColor.b / 255, secondaryColor.a)
        updateUniform(gl, 'uniform1i', 'u_colorMode', colorMode)
    }, [primaryColor, secondaryColor, colorMode])

    return <StyledCanvas ref={canvasRef}/>
}

function updateUniform(gl, uniformFunction, uniformName, ...args) {
    const program = gl.getParameter(gl.CURRENT_PROGRAM)
    const uniformLocation = gl.getUniformLocation(program, uniformName)
    gl[uniformFunction](uniformLocation, ...args)
} 

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    background-color: aqua;
`

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success)
        return shader
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success)
        return program
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}
