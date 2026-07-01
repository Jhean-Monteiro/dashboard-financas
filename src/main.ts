// PONTO DE ENTRADA DO PROGRAMA
// é aqui que é importado todas as peças dos outros arquivos e tudo é conectado. (o main faz a ponte)

import type { NovaTransacao, TipoTransacao, FiltroTipo, Categoria } from "./types";

import {
    adicionarTransacao,
    removerTransacao,
    listarTransacoes,
    calcularResumo
} from "./transacoes.js"

import { renderizarResumo, renderizarLista, atualizarBotoesFiltro, atualizarBotoesTipo, limparFormulario } from "./dom.js";


// ESTADO DA INTERFACE (DA TELA)
// "estado" aqui significa o que está selecionado agora na tela
let tipoSelecionado: TipoTransacao = "saida"
let filtroAtivo: FiltroTipo = "todos"


// atualizarTela é a função central que redesenha TUDO.
// toda vez que os dados mudam (adicionar/remover), chamados essa função
// em vez de atualizar cada parte manualmente. mais simples de manter
function atualizarTela(): void {
    const resumo = calcularResumo()
    renderizarResumo(resumo.totalEntradas, resumo.totalSaidas, resumo.saldo)

    const transacoesFiltradas = listarTransacoes(filtroAtivo)
    renderizarLista(transacoesFiltradas, lidarComRemocao)

    atualizarBotoesFiltro(filtroAtivo)
}

// callback passado par cada item da lista.
// quando o botão x é clicado, essa função roda
function lidarComRemocao(id: string): void {
    removerTransacao(id)
    atualizarTela()
}


// lidarComEnvioFormulario roda quando o formulario é submetido. lé os campos, valida, monta um NovaTransacao e chama adicionarTransacao
function lidarComEnvioFormulario(evento: SubmitEvent): void {
    evento.preventDefault()

    const campoDescricao = document.querySelector<HTMLInputElement>("#campo-descricao")
    const campoValor = document.querySelector<HTMLInputElement>("#campo-valor")
    const campoCategoria = document.querySelector<HTMLInputElement>("#campo-categoria")
    const campoData = document.querySelector<HTMLInputElement>("#campo-data")

    // verificação de null.
    // se algum campo não existir no HTML, para aqui em vez de quebrar
    if (!campoDescricao || !campoValor || !campoCategoria || !campoData) return

    const descricao = campoDescricao.value.trim()
    const valor = parseFloat(campoValor.value)

    // validação simples: descrição não pode ser vazia. valor tem que ser número positivo
    if (descricao === ""  || isNaN(valor) || valor <= 0) {
        alert("Preencha a descrição com um valor válido maior que zero")
        return;
    }

    const novaTransacao: NovaTransacao = {
        descricao,
        valor,
        tipo: tipoSelecionado,
        categoria: campoCategoria.value as Categoria,
        data: campoData.value,
    }

    adicionarTransacao(novaTransacao)
    limparFormulario()
    atualizarTela()

}


// configurarBotoesTipo conecta os botões "Entrada"/"Saída" do formulário
function configurarBotoesTipo(): void {
    const botaoEntrada = document.querySelector<HTMLButtonElement>("#botao-tipo-entrada")
    const botaoSaida = document.querySelector<HTMLButtonElement>("#botao-tipo-saida")

    botaoEntrada?.addEventListener("click", () => {
        tipoSelecionado = "entrada"
        atualizarBotoesTipo(tipoSelecionado)
    })

    botaoSaida?.addEventListener("click", () => {
        tipoSelecionado = "saida"
        atualizarBotoesTipo(tipoSelecionado)
    })
}


// configurarFiltros conecta os botões "todos"/"entradas"/"saidas" da lista
function configurarFiltros(): void {
    const botoesFiltro = document.querySelectorAll<HTMLButtonElement>(".botao-filtro")

    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtroAtivo = botao.dataset.filtro as FiltroTipo
            atualizarTela()
        })
    })
}


// inicializar é a função que roda assim que a página carrega. conecta os eventos e desenha o estado inicial (vazio)
function inicializar(): void {
    const formulario = document.querySelector<HTMLFormElement>("#formulario-transacao")
    formulario?.addEventListener("submit", lidarComEnvioFormulario)

    configurarBotoesTipo()
    configurarFiltros()
    atualizarBotoesTipo(tipoSelecionado)

    // define a data de hooje como o padrão no campo de tela
    const campoData = document.querySelector<HTMLInputElement>("#campo-data")
    if (campoData) {
        campoData.value = new Date().toISOString().split("T")[0]
    }

    atualizarTela()
}


// espera o HTML carregar completamente antes de rodar nosso código. 
// sem isso, o document.querySelector estava rodando antes dos elementos existirem
document.addEventListener("DOMContentLoaded", inicializar)