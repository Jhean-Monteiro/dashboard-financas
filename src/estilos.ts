export const CORES = {
    fundo: "#0A0E14",
    painel: "#11161F",
    painelClaro: "#1A212E",
    borda: "#232B3A",
    textoPrimario: "#E6E9EF",
    textoSecundario: "#6B7280",
    entrada: "#3DD68C",
    saida: "#FF5C5C",
    destaque: "#5B8DEF",
} as const

/**
 * gerarEstilosGlobais — retorna o CSS base aplicado na página inteira.
 * Essa string vai ser injetada dentro de uma tag <style> no HTML.
 */
export function gerarEstilosGlobais(): string {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: ${CORES.fundo};
            color: ${CORES.textoPrimario};
            font-family: 'Inter', system-ui, sans-serif;
            min-height: 100vh;
            padding: 32px 24px;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
        }

        .titulo-principal {
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 4px;
        }

        .subtitulo {
            color: ${CORES.textoSecundario};
            font-size: 0.9rem;
            margin-bottom: 32px;
        }

        /* ---------- Cards de resumo (entrada/saída/saldo) ---------- */
        .resumo-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 32px;
        }

        .card-resumo {
            background-color: ${CORES.painel};
            border: 1px solid ${CORES.borda};
            border-radius: 10px;
            padding: 20px;
        }

        .card-resumo-label {
            font-size: 0.78rem;
            color: ${CORES.textoSecundario};
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
        }

        .card-resumo-valor {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: -0.01em;
        }

        .valor-entrada { color: ${CORES.entrada}; }
        .valor-saida { color: ${CORES.saida}; }
        .valor-saldo { color: ${CORES.destaque}; }

        /* ---------- Formulário ---------- */
        .painel-formulario {
            background-color: ${CORES.painel};
            border: 1px solid ${CORES.borda};
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 24px;
        }

        .painel-titulo {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 12px;
        }

        .campo-label {
            display: block;
            font-size: 0.75rem;
            color: ${CORES.textoSecundario};
            margin-bottom: 4px;
        }

        input, select {
            width: 100%;
            background-color: ${CORES.painelClaro};
            border: 1px solid ${CORES.borda};
            border-radius: 6px;
            padding: 9px 10px;
            color: ${CORES.textoPrimario};
            font-size: 0.85rem;
            font-family: inherit;
        }

        input:focus, select:focus {
            outline: 2px solid ${CORES.destaque};
            outline-offset: 1px;
        }

        .grupo-tipo {
            display: flex;
            gap: 8px;
            margin-bottom: 14px;
        }

        .botao-tipo {
            flex: 1;
            padding: 9px;
            border-radius: 6px;
            border: 1px solid ${CORES.borda};
            background-color: ${CORES.painelClaro};
            color: ${CORES.textoSecundario};
            font-size: 0.85rem;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .botao-tipo.ativo-entrada {
            background-color: rgba(61, 214, 140, 0.12);
            border-color: ${CORES.entrada};
            color: ${CORES.entrada};
        }

        .botao-tipo.ativo-saida {
            background-color: rgba(255, 92, 92, 0.12);
            border-color: ${CORES.saida};
            color: ${CORES.saida};
        }

        .botao-adicionar {
            width: 100%;
            padding: 11px;
            border-radius: 6px;
            border: none;
            background-color: ${CORES.destaque};
            color: white;
            font-size: 0.88rem;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: opacity 0.15s ease;
        }

        .botao-adicionar:hover {
            opacity: 0.88;
        }

        /* ---------- Lista de transações ---------- */
        .lista-cabecalho {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
        }

        .filtros {
            display: flex;
            gap: 6px;
        }

        .botao-filtro {
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid ${CORES.borda};
            background-color: transparent;
            color: ${CORES.textoSecundario};
            font-size: 0.78rem;
            font-family: inherit;
            cursor: pointer;
        }

        .botao-filtro.ativo {
            background-color: ${CORES.painelClaro};
            color: ${CORES.textoPrimario};
            border-color: ${CORES.destaque};
        }

        .item-transacao {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: ${CORES.painel};
            border: 1px solid ${CORES.borda};
            border-radius: 8px;
            padding: 14px 16px;
            margin-bottom: 8px;
        }

        .item-info {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .item-descricao {
            font-size: 0.9rem;
            font-weight: 500;
        }

        .item-meta {
            font-size: 0.75rem;
            color: ${CORES.textoSecundario};
        }

        .item-direita {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .item-valor {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.95rem;
            font-weight: 600;
        }

        .botao-remover {
            background: none;
            border: none;
            color: ${CORES.textoSecundario};
            cursor: pointer;
            font-size: 1rem;
            padding: 4px 8px;
            border-radius: 4px;
            transition: all 0.15s ease;
        }

        .botao-remover:hover {
            background-color: rgba(255, 92, 92, 0.12);
            color: ${CORES.saida};
        }

        .lista-vazia {
            text-align: center;
            color: ${CORES.textoSecundario};
            font-size: 0.85rem;
            padding: 40px 0;
        }

        @media (max-width: 640px) {
            .resumo-grid { grid-template-columns: 1fr; }
            .form-grid { grid-template-columns: 1fr 1fr; }
        }
    `
}