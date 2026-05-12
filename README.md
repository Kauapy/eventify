# Eventify

Plataforma fullstack para descobrir, criar e gerenciar eventos. Usuários comuns podem navegar pelo catálogo de eventos com filtros por data e categoria, enquanto administradores têm um painel dedicado para cadastrar e remover eventos.

---

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** com cadastro, login e proteção de rotas
- 👥 **Dois papéis**: `user` (consulta) e `admin` (gerencia)
- 📅 **Listagem de eventos** com filtros por **data** (futuros, hoje, passados) e **categoria**
- ➕ **Criação de eventos** via modal acessível somente para administradores
- 🗑️ **Exclusão de eventos** pelo painel admin
- 📱 **Layout responsivo** (mobile, tablet e desktop)
- 🎨 **Visual moderno em dark mode** com gradientes e microinterações

---

## 🛠️ Tecnologias

**Frontend**

- React 19 + React Router DOM 7
- Axios (com interceptor de token JWT)
- CSS puro com variáveis e media queries

**Backend**

- Node.js + Express 5
- MongoDB Atlas + Mongoose
- bcrypt + jsonwebtoken (JWT)
- dotenv, cors

**Tooling**

- Create React App
- concurrently + cross-env
- nodemon

---

## 📁 Estrutura

```
eventify/
├── backend/
│   ├── middlewares/        # authMiddleware, verificarAdmin
│   ├── models/             # User, Event
│   ├── routes/             # authRoutes, eventRoutes, adminRoutes
│   ├── createAdmin.js      # script para criar o usuário admin inicial
│   └── server.js
├── public/                 # index.html, manifest, favicon
├── src/
│   ├── componentes/
│   │   ├── Home/           # Home, AdminDashboard, EventModal
│   │   ├── LoginPage/      # Login
│   │   └── Register/       # Register
│   ├── services/api.js     # instância Axios com baseURL e token
│   ├── App.js              # rotas + ProtectedRoute/AdminRoute
│   └── index.js
└── package.json
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+ e npm
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (ou um MongoDB local)

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/eventify.git
cd eventify
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env`:

```env
MONGO_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/eventify
JWT_SECRET=uma-chave-forte-e-aleatoria
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SuaSenhaForte123@
```

> ⚠️ **Importante:** o `.env` está no `.gitignore`. **Nunca** versione credenciais reais.

### 3. Instalar dependências

```bash
# Frontend (raiz)
npm install

# Backend
cd backend && npm install && cd ..
```

### 4. Criar o usuário administrador (uma vez)

```bash
node backend/createAdmin.js
```

### 5. Subir frontend + backend juntos

```bash
npm run dev
```

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- O CRA já está configurado com `proxy` para `http://localhost:3000`, então o frontend chama `/auth/login`, `/events`, etc., sem se preocupar com CORS em dev.

### Scripts úteis

| Comando             | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm start`         | Sobe apenas o frontend (porta 3001)        |
| `npm run backend`   | Sobe apenas o backend com nodemon          |
| `npm run dev`       | Sobe frontend e backend simultaneamente    |
| `npm run build`     | Gera o bundle de produção em `build/`      |
| `npm test`          | Roda os testes (Jest + Testing Library)    |

---

## 🔌 Endpoints da API

### Auth
| Método | Rota              | Descrição                  |
| ------ | ----------------- | -------------------------- |
| POST   | `/auth/register`  | Cadastrar novo usuário     |
| POST   | `/auth/login`     | Login (retorna JWT + role) |

### Eventos
| Método | Rota             | Auth         | Descrição               |
| ------ | ---------------- | ------------ | ----------------------- |
| GET    | `/events`        | público      | Listar eventos          |
| POST   | `/events`        | admin        | Criar evento            |
| DELETE | `/events/:id`    | admin        | Excluir evento          |

### Admin
| Método | Rota                | Auth   | Descrição              |
| ------ | ------------------- | ------ | ---------------------- |
| GET    | `/admin/users`      | admin  | Listar usuários        |
| POST   | `/admin/user`       | admin  | Criar usuário          |
| DELETE | `/admin/user/:id`   | admin  | Excluir usuário        |

---

## 🖼️ Prints

> Adicione aqui screenshots das telas após rodar o projeto:
>
> - `docs/login.png` — Tela de Login
> - `docs/register.png` — Tela de Cadastro
> - `docs/home.png` — Listagem de eventos
> - `docs/admin.png` — Painel do administrador
> - `docs/modal.png` — Modal de criação de evento

---

## 🔒 Segurança

- Senhas são armazenadas com `bcrypt` (salt rounds = 10).
- Tokens JWT expiram em 1h.
- O `.env` é ignorado pelo Git por padrão (`.gitignore`).
- O painel admin tem proteção dupla: rota privada no frontend e middleware `verificarAdmin` no backend.

---

## 📜 Licença

MIT. Sinta-se à vontade para usar e adaptar.
