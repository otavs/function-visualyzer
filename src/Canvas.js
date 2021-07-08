import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import getVertexShader from './shader/vertexShader'
import getFragmentShader from './shader/fragmentShader'

export default function Canvas({expression}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext("webgl2")

        if (!gl)
            alert('No WebGL :(')
    
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    
        window.vertexShader = createShader(gl, gl.VERTEX_SHADER, getVertexShader())
        window.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, getFragmentShader(expression))
        window.program = createProgram(gl, window.vertexShader, window.fragmentShader)
    
        gl.useProgram(window.program)
    
        window.resolutionUniformLocation = gl.getUniformLocation(window.program, 'u_resolution')
        gl.uniform2f(window.resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    
        window.mouseUniformLocation = gl.getUniformLocation(window.program, 'u_mouse')
        gl.uniform2f(window.mouseUniformLocation, 0, 0)
    
        window.timeUniformLocation = gl.getUniformLocation(window.program, 'u_time')
        gl.uniform1f(window.timeUniformLocation, 0)
    
        const startTime = Date.now()
    
        render()
    
        function render() {
            gl.uniform1f(window.timeUniformLocation, (Date.now() - startTime) / 1000)
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 3)
            requestAnimationFrame(render)
        }
    
        window.addEventListener('resize', () => {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.uniform2f(window.resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
        })
    
        window.addEventListener('mousemove', e => { // or touchstart
            gl.uniform2f(window.mouseUniformLocation, e.x, canvas.height - e.y, 1)
        })
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext("webgl2")
        gl.detachShader(window.program, window.fragmentShader)
        gl.deleteShader(window.fragmentShader)
        window.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, getFragmentShader(expression))
        gl.attachShader(window.program, window.fragmentShader)
        gl.linkProgram(window.program)
        window.resolutionUniformLocation = gl.getUniformLocation(window.program, 'u_resolution')
        gl.uniform2f(window.resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

        window.mouseUniformLocation = gl.getUniformLocation(window.program, 'u_mouse')
        gl.uniform2f(window.mouseUniformLocation, 0, 0)

        window.timeUniformLocation = gl.getUniformLocation(window.program, 'u_time')
        gl.uniform1f(window.timeUniformLocation, 0)
    }, [expression])

    return <StyledCanvas ref={canvasRef}/>
}

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
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
