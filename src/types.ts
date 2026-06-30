// uma transação só pode ser entrada (dinheiro que chega) ou saída (dinheiro que sai)

export type TipoTransacao = "entrada" | "saida"


export type Categoria = 
    | "alimentacao"
    | "transporte"
    | "lazer"
    | "moradia"
    | "saude"
    | "salario"
    | "investimento"
    | "outros"



// Transacao: o tipo central do projeto. Representa UM registro financeiro (uma compra, um salário recebido, etc)
export type Transacao = {
    id: string // identificador unico que será gerado com Date.now()
    descricao: string
    valor:number // sempre positivo. quem decide se soma ou subtrai é o "tipo"
    tipo: TipoTransacao
    categoria: Categoria
    data: string
}


// quando o usuário preenche o formulário, quem insere o id é o código, automaticamente
// por isso, usa Omit para criar uma versão de Transacao sem o campo "id".
export type NovaTransacao = Omit<Transacao, "id">

// ResumoFinanceio: o resultado dos cálculos do dashboard.
// esse type representa os números que aparecem nos cards do topo da página
export type ResumoFinanceio = {
    totalEntradas:number
    totalSaidas:number
    saldo:number
}

// filtro usado para filtrar a lista exibida na tela. "todos" é um valor especial que significa "não filtrar por tipo"
export type FiltroTipo = "todos" | TipoTransacao