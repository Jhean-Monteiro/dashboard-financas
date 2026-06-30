import { gerarEstilosGlobais } from "./estilos.js"

const tagEstilos = document.querySelector<HTMLStyleElement>("#estilos-dinamicos")

if (tagEstilos) {
    tagEstilos.textContent = gerarEstilosGlobais()
}