# Dashboard de Finanças

Projeto de estudo: TypeScript puro + HTML + CSS-in-JS manual (sem React, sem bibliotecas externas de estilo).

## Como rodar

1. Compile o TypeScript:
   ```
   npm install --no-save typescript
   npx tsc -p tsconfig.json
   ```
2. Abra `index.html` no navegador (ou use a extensão "Live Server" do VS Code).

Sempre que editar um arquivo `.ts`, rode `npx tsc -p tsconfig.json` de novo (ou use `npx tsc -w` para recompilar automaticamente a cada mudança).

## Estrutura do projeto

```
dashboard-financas/
├── index.html              → estrutura da página (formulário, lista, cards)
├── tsconfig.json            → configuração do compilador TypeScript
├── src/                     → código-fonte TypeScript
│   ├── types.ts              → todos os tipos (Transacao, Categoria, etc)
│   ├── transacoes.ts          → lógica de dados (adicionar, filtrar, somar)
│   ├── estilos.ts              → CSS-in-JS manual (cores e estilos em TS)
│   ├── dom.ts                   → desenha os dados na tela (HTML)
│   ├── aplicar-estilos.ts        → injeta o CSS gerado na página
│   └── main.ts                    → conecta tudo (eventos, fluxo principal)
└── dist/                    → JavaScript compilado (gerado automaticamente)
```

## Por que essa separação?

Cada arquivo tem uma responsabilidade só:

- **types.ts** não faz nada, só define formatos de dados
- **transacoes.ts** não toca na tela, só calcula e filtra dados
- **dom.ts** não decide regras, só desenha o que recebe
- **main.ts** é o único que conhece todos os outros e os conecta

Isso significa que, por exemplo, você poderia trocar completamente a lógica
de cálculo (transacoes.ts) sem precisar mexer em como a tela é desenhada (dom.ts).

## Deploy no GitHub Pages

Esse projeto usa GitHub Actions para compilar o TypeScript automaticamente
e publicar no GitHub Pages a cada `push` na branch `main`.

Passos para ativar (só precisa fazer uma vez):

1. Suba o projeto para um repositório no GitHub (a pasta `dist/` NÃO vai junto — está no `.gitignore`, o Actions gera ela sozinho).
2. No GitHub, vá em **Settings → Pages**.
3. Em "Build and deployment", escolha **Source: GitHub Actions**.
4. Pronto. A cada push na `main`, o workflow em `.github/workflows/deploy.yml` roda:
   instala o TypeScript, compila (`npx tsc`), e publica o `index.html` + `dist/` gerado.
5. A URL final aparece em **Settings → Pages** depois do primeiro deploy bem-sucedido
   (algo como `https://seu-usuario.github.io/nome-do-repositorio/`).

Você pode acompanhar o progresso do deploy na aba **Actions** do repositório.

## Conceitos de TypeScript usados (dos seus 4 dias de estudo)

- **Union types**: `TipoTransacao`, `Categoria`, `FiltroTipo`
- **Omit**: `NovaTransacao = Omit<Transacao, "id">`
- **Record**: agrupamento de gastos por categoria
- **filter/map/reduce/sort**: toda a lógica de transacoes.ts
- **Discriminated union na prática**: o campo `tipo` decidindo cor/sinal
- **Narrowing com null**: verificações de elementos do DOM antes de usar
- **as const**: paleta de cores em estilos.ts