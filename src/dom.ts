// MANIPULAÇÃO DA PÁGINA (HTML)
// esse arquivo é responsável por desenhar os dados na tela.
// ele pega os dados já prontos e transforma em elementos HTML.

import type { Transacao, FiltroTipo, Categoria, TipoTransacao } from "./types";
import { CORES } from "./estilos";


// mapa de categorias para exibir nome bonito
const NOMES_CATEGORIA: Record<Categoria, string> = {
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    moradia: "Moradia",
    saude: "Saúde",
    salario: "Salário",
    investimento: "Investimento",
    outros: "Outros",
}


// formatarMoeda transforma um number em string no formato R$ 1.234,56
// usa o Int1.NumberFormat, uma API nativa do navegador para formatação de numerros/moedas conforme o idioma
export function formatarMoeda(valor:number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor)
}

// formatarData transforma "2026-06-30" em "30/06/2026"
function formatarData(dataIso:string):string {
    const [ano,mes,dia] = dataIso.split("-")
    return `${dia}/${mes}/${ano}`
}


// renderizarResumo atualiza os 3 cards do topo (entradas, saidas, saldo)
export function renderizarResumo(totalEntradas: number, totalSaidas:number, saldo:number): void {
    const elEntradas = document.querySelector<HTMLElement>("#valor-entradas")
    const elSaidas = document.querySelector<HTMLElement>("#valor-saidas")
    const elSaldo = document.querySelector<HTMLElement>("#valor-saldo")

    if (elEntradas) elEntradas.textContent = formatarMoeda(totalEntradas)
    if (elSaidas) elSaidas.textContent = formatarMoeda(totalSaidas)
    if (elSaldo) elSaldo.textContent = formatarMoeda(saldo)
}


// criarElementoTransacao cria o HTML de um item da lista de transações.
// monta uma "string" de HTML com os dados encaixados via template literal

function criarElementoTransacao(transacao: Transacao, aoRemover: (id:string) => void): HTMLElement {
    const item = document.createElement("div")
    item.className = "item-transacao"

    //Discriminated union na prática: o "tipo" decide a cor e o sinal
    const ehEntrada = transacao.tipo === "entrada"
    const corClasse = ehEntrada ? "valor-entrada" : "valor-saida"
    const sinal = ehEntrada ? "+" : '-'

    item.innerHTML = `
        <div class="item-info">
            <span class="item-descricao">${transacao.descricao}</span>
            <span class="item-meta">${NOMES_CATEGORIA[transacao.categoria]} • ${formatarData(transacao.data)}</span>
        </div>
        <div class="item-direita">
            <span class="item-valor ${corClasse}">${sinal} ${formatarMoeda(transacao.valor)}</span>
            <button class="botao-remover" title="Remover">✕</button>
        </div>
    `

    // conecta o clique do botão remover com a função recebida por parametro.
    // isso é um "callback" - passa uma função para ser chamada depois
    const botaoRemover = item.querySelector<HTMLButtonElement>(".botao-remover")
    botaoRemover?.addEventListener("click", () => aoRemover(transacao.id))

    return item
}

// renderizarLista recebe o array de transações já filtrado/ordnado e desenha cada item na tela
// essa lógica vem de transacoes.ts
export function renderizarLista(transacoes: Transacao[], aoRemover: (id:string) => void) {
    const lista = document.querySelector<HTMLElement>("#lista-transacoes")
    if (!lista) return

    lista.innerHTML = "" // limppa a lista antes de redesenhar

    if (transacoes.length === 0) {
        lista.innerHTML = `
            <p class="lista-vazia">Nenhuma transação ainda. Adicione a primeira acima.</p>
        `
    }

    for (const transacao of transacoes) {
        const elemento = criarElementoTransacao(transacao, aoRemover)
        lista.appendChild(elemento)
    }
}
