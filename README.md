# Eventify

Plataforma fullstack para descobrir, criar e gerenciar eventos. Usuários navegam por um catálogo visual de eventos com imagens, valores, datas e detalhes completos, podendo demonstrar interesse. Administradores contam com um painel dedicado para CRUD completo de eventos.

---

## ✨ Funcionalidades

### Usuário
- 🔐 Cadastro e login com **JWT**
- 🗂️ **Lista de eventos em cards** com imagem, título, descrição curta, data, horário, local, categoria e valor
- 🔎 **Busca** por título / local + filtros por **data** (futuros, hoje, passados) e **categoria**
- 📄 **Modal de detalhes** com descrição completa, valor, vagas e imagem em destaque
- ❤️ Botão **"Tenho interesse"** (persistente via `localStorage`)
- 💀 **Estados de carregamento** (skeletons), erro e lista vazia
- 📱 **Responsivo** em mobile, tablet e desktop

### Admin
- 🛠️ Painel com **lista visual de todos os eventos** cadastrados
- ➕ **Criar** eventos com formulário completo:
  - título, descrição curta (até 200 chars), descrição completa
  - URL da imagem, valor (R$), data, horário, local
  - categoria e vagas (opcional)
- ✏️ **Editar** eventos existentes em modal pré-preenchido
- 🗑️ **Excluir** eventos com confirmação
- ✅ **Feedback visual** ao salvar, atualizar ou excluir
- 🔒 Rotas protegidas: middleware backend + `AdminRoute` no frontend

---

## 🛠️ Tecnologias

**Frontend**
- React 19 + React Router DOM 7
- Axios com interceptor de token JWT
- CSS puro com variáveis (`--accent`, `--bg-secondary`, etc.) e media queries

**Backend**
- Node.js + Express 5
- MongoDB Atlas + Mongoose 8
- bcrypt + jsonwebtoken
- dotenv, cors

**Tooling**: Create React App, concurrently, cross-env, nodemon

---

## 📁 Estrutura

```
eventify/
├── backend/
│   ├── middlewares/        # authMiddleware, verificarAdmin
│   ├── models/             # User, Event (com timestamps)
│   ├── routes/             # authRoutes, eventRoutes (CRUD), adminRoutes
│   ├── createAdmin.js      # cria o admin inicial a partir do .env
│   └── server.js
├── public/                 # index.html (PWA), manifest, favicon
├── src/
│   ├── componentes/
│   │   ├── Home/           # Home, AdminDashboard, EventCard, EventDetail, EventModal (form)
│   │   ├── LoginPage/      # Login
│   │   └── Register/       # Register
│   ├── services/api.js     # instância Axios com baseURL e interceptor JWT
│   ├── utils/              # format.js, interesses.js
│   ├── App.js              # rotas + ProtectedRoute/AdminRoute + estado global de eventos
│   └── index.js
└── package.json
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+ e npm
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (ou Mongo local)

### 1. Clonar
```bash
git clone https://github.com/<seu-usuario>/eventify.git
cd eventify
```

### 2. Variáveis de ambiente
Copie o exemplo:
```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env`:
```env
MONGO_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/eventify?retryWrites=true&w=majority
JWT_SECRET=uma-chave-forte-e-aleatoria
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SuaSenhaForte123@
```

> ⚠️ **Importante:** se sua senha tem caracteres especiais (`@`, `:`, `/`, `#`), use **URL-encode**. Ex.: `@` → `%40`.

### 3. Instalar dependências
```bash
npm install
cd backend && npm install && cd ..
```

### 4. Criar o admin inicial (uma vez)
```bash
node backend/createAdmin.js
```

### 5. Subir frontend + backend juntos
```bash
npm run dev
```
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- O CRA proxy redireciona `/auth`, `/events`, `/admin` para o backend automaticamente.

### Scripts úteis
| Comando             | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm start`         | Sobe só o frontend (porta 3001)            |
| `npm run backend`   | Sobe só o backend com nodemon (porta 3000) |
| `npm run dev`       | Sobe ambos simultaneamente                 |
| `npm run build`     | Bundle de produção em `build/`             |
| `npm test`          | Roda os testes                             |

---

## 🔌 Endpoints da API

### Auth
| Método | Rota              | Auth     | Descrição                  |
| ------ | ----------------- | -------- | -------------------------- |
| POST   | `/auth/register`  | público  | Cadastrar usuário          |
| POST   | `/auth/login`     | público  | Login (retorna JWT + role) |

### Eventos
| Método | Rota             | Auth   | Descrição                |
| ------ | ---------------- | ------ | ------------------------ |
| GET    | `/events`        | público| Listar todos             |
| GET    | `/events/:id`    | público| Detalhes de um evento    |
| POST   | `/events`        | admin  | Criar evento (validado)  |
| PUT    | `/events/:id`    | admin  | Atualizar evento         |
| DELETE | `/events/:id`    | admin  | Excluir evento           |

### Admin
| Método | Rota                | Auth   | Descrição              |
| ------ | ------------------- | ------ | ---------------------- |
| GET    | `/admin/users`      | admin  | Listar usuários        |
| POST   | `/admin/user`       | admin  | Criar usuário          |
| DELETE | `/admin/user/:id`   | admin  | Excluir usuário        |

### Schema do evento
```json
{
  "titulo": "string (≤120)",
  "descricaoCurta": "string (≤200)",
  "descricaoCompleta": "string",
  "imagem": "URL string",
  "valor": "number (≥0, 0 = gratuito)",
  "data": "Date",
  "horario": "HH:MM",
  "local": "string",
  "categoria": "Geral|Tecnologia|Esportes|Educação|Arte|Música|Negócios",
  "vagas": "integer ≥0 ou null"
}
```

---

## 🖼️ Prints

> Salve screenshots em `docs/` e referencie aqui:
>
> - `docs/home.png` — listagem com cards e filtros
> - `docs/detail.png` — modal de detalhes
> - `docs/admin.png` — painel administrativo
> - `docs/form.png` — formulário de criação/edição
> - `docs/login.png` / `docs/register.png` — autenticação

---

## 🔒 Segurança

- Senhas com `bcrypt` (10 rounds).
- Tokens JWT expiram em 1h e são injetados automaticamente via interceptor Axios.
- `.env` no `.gitignore` por padrão.
- Painel admin com **dupla proteção**: rota privada no frontend + middleware `verificarAdmin` no backend.
- Validação de payload no backend (campos obrigatórios, tipos, ranges).
- Senha do usuário nunca volta em respostas do `/admin/users` (`select('-senha')`).

---

## 🌱 Melhorias futuras

- Upload de imagem real (Cloudinary, S3 ou multer + disco)
- Reservas/inscrições com decremento de vagas (já temos o campo)
- Página pública de detalhes do evento com URL compartilhável (`/eventos/:slug`)
- Paginação ou scroll infinito na listagem
- Sistema de favoritos persistido por usuário (não só localStorage)
- Notificações por email com eventos próximos da data
- Deploy automatizado (Vercel + Render)

---

## 📜 Licença

MIT. Use, adapte, compartilhe.
