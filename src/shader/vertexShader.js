const vertexShader = () => 
`#version 300 es

precision highp float;

out vec2 texCoord;

void main(void) {
    vec2 u = vec2(float((gl_VertexID & 1) << 2), float((gl_VertexID & 2) << 1));
    texCoord = u * .5;
    gl_Position = vec4(u - 1.0, 0, 1);
}
`
export default vertexShader