const fragmentShader = exp => 
`#version 300 es

#define PI 3.1415926535897932384626433832795
#define E 2.718281828459045235360287471352662

precision highp float;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

in vec2 texCoord;

out vec4 fragmentColor;

#define zoom 10.0
#define isMouseEnabled false

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float f(vec2 p, float t) {
    float x = p.x;
    float y = p.y;
    return ${exp};
}

void main(void) {
    vec2 p = (gl_FragCoord.xy / u_resolution.xy - .5) * zoom;
    vec2 mouse = (u_mouse.xy / u_resolution.xy - .5) * zoom;
    if(!isMouseEnabled)
        mouse = vec2(0.0, 0.0);
    p.x *= 1.0 * u_resolution.x / u_resolution.y;
    mouse.x *= 1.0 * u_resolution.x / u_resolution.y;
    
    vec3 color = vec3(f(p - mouse, u_time), 1.0, 1.0);
    fragmentColor = vec4(hsv2rgb(color), 1.0);
}
`

export default fragmentShader