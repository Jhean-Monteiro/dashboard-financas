// LÓGICA DE MANIPULAÇÃO DE DADOS

// esse arquivo não mexe na tela (DOM). ele só recebe arrays de transações e devolve dados calculados ou filtrados. separar "lógica de dados" de "manipulação de tela" é uma das formas de modularizar um projeto


import type { Transacao, NovaTransacao, ResumoFinanceio, FiltroTipo, Categoria } from "./types";


// array que guarda todas as transações em memória.
// os dados existem só enquanto a página estiver aberta, ao recarregar, some
let transacoes:Transacao[] = []


// gerarID - cria um identificador único simples. 
// Date.now retorna sempre um timestamp diferente a cada milissegundo.
// conecta com u, número aleatório pra reduzir ainda mais a chance de colisão
function gerarId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}


// adicionarTransacao recebe os dados do formulário (sem id) e adiciona uma nova Transacao completa (com id) ao array.
// o tipo no parâmetro: NovaTransacao é o Omit<Transacao, "id">
// o id é geradoo aqui dentro. não vem de fora
export function adicionarTransacao(dados: NovaTransacao): Transacao {
    const novaTransacao: Transacao = {
        id: gerarId(),
        ...dados, // espalha descricao, valor, tipo, categoria e data
    }
    transacoes.push(novaTransacao)
    return novaTransacao
}


// removerTransacao remove uma transação pelo id.
// usa filter para criar um novo array SEM o item removido.
export function removerTransacao(id: string): void {
    transacoes = transacoes.filter((t) => t.id !== id)
}


// listarTransacoes retorna todas as transações, opcionalmente filtradas por tipo (entrada/saida) e ordenadas da mais recente para mais antiga.
export function listarTransacoes(filtro: FiltroTipo = "todos"): Transacao[] {
    const filtradas =
        filtro === "todos"
            ? transacoes
            : transacoes.filter((t) => t.tipo === filtro)
    
    // sort com cópia: croa [...filtradas] pra não alterar o array original
    return [...filtradas].sort((a,b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime()
    })
}

// calcularResumo usa reduce para somar entradas e saídas de uma vez.
// ele calcula dois totais diferentes no mesmo reduce
export function calcularResumo(): ResumoFinanceio {
    const resumo = transacoes.reduce(
        (acc, t) => {
            if (t.tipo === "entrada") {
                acc.totalEntradas += t.valor
            } else {
                acc.totalSaidas += t.valor
            }
            return acc
        }, {totalEntradas:0, totalSaidas:0}
    )
    return {
        totalEntradas: resumo.totalEntradas,
        totalSaidas: resumo.totalSaidas,
        saldo: resumo.totalEntradas - resumo.totalSaidas
    }
}


// agruparPorCategoria usa reduce para criar um Record<Categoria, number>
// soma o total gasto em cada categorua, considerando só transações do tipo saída
export function agruparPorCategoria(): Record<string, number> {
    const saidas = transacoes.filter((t) => t.tipo === "saida")

    return saidas.reduce((acc, t) => {
        acc[t.categoria] = (acc[t.categoria] ?? 0) + t.valor
        return acc
    }, {} as Record<string, number>)
}