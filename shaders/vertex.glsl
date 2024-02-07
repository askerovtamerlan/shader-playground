void main() {
    gl_Position = prohectionMatrix * modelViewMatrix * vec4(position, 1.0)
}