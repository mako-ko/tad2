# Tarefas Web

Aplicação didática em **Vue 3 + Vite + Vue Router + Vuex + Axios**, criada para aulas do curso **Programador Web**.

O projeto demonstra:

- HTML5 semântico;
- acessibilidade básica em formulários e navegação;
- CSS3 com Flexbox, Grid e Media Queries;
- Vue.js com componentes, rotas, estado global e formulários;
- Vuex para armazenamento centralizado;
- camada de serviços preparada para backend/API;
- Docker para padronizar o ambiente;
- estrutura pronta para versionamento no GitHub.

## Telas

- `/sobre` — informações sobre o aplicativo web;
- `/login` — autenticação simulada;
- `/cadastro` — cadastro de usuário;
- `/dashboard` — resumo e lista de tarefas;
- `/tarefas/nova` — criação de tarefa;
- `/tarefas/:id/editar` — edição de tarefa;
- `/perfil` — alteração de nome, senha e tema claro/escuro.


## Estrutura principal

```text
src/
├── assets/styles/       # CSS global, layout, componentes e temas
├── components/          # Componentes reutilizáveis
│   ├── common/
│   ├── layout/
│   └── tasks/
├── router/              # Configuração de rotas
├── services/            # Camada de API/backend
├── store/               # Vuex e módulos
├── utils/               # Funções auxiliares
└── views/               # Telas da aplicação
```

## GitHub

Para criar um repositório novo:

```bash
git init
git add .
git commit -m "Cria aplicação didática Tarefas Web"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/tarefas-web.git
git push -u origin main
```

O projeto inclui um workflow simples em `.github/workflows/ci.yml` para executar o build no GitHub Actions.

## Observações didáticas

A aplicação usa `localStorage` para persistência local, porque o objetivo inicial é ensinar frontend antes de integrar banco de dados. A pasta `services/` já mostra onde ficam as chamadas para backend com Axios.

Para transformar em uma aplicação com backend real, substitua as actions do Vuex por chamadas aos métodos de `authService` e `taskService`.
