**Um site para visualizar, reservar e gerenciar eventos com sistema de autenticação e controle de ingressos.**

**🔧 Tecnologias Usadas**

✅ **Front-end:** React, Axios, React Router, Tailwind CSS (ou CSS puro).

✅ **Back-end:** Node.js, Express, MongoDB/PostgreSQL, JWT para autenticação.

✅ **Extras:** QR Code para validar ingressos, envio de e-mails de confirmação.

**🛠️ Funcionalidades Principais**

✔️ **Cadastro e login de usuários** → Protegido por senha segura (bcrypt).

✔️ **Listagem de eventos** → Com filtros por **data, local e categoria**.

✔️ **Sistema de reservas** → Com **limite de vagas** por evento.

✔️ **Geração de QR Code** → Para validar entrada no evento.

✔️ **Painel administrativo** → Criar, editar e excluir eventos.

✔️ **Autenticação JWT** → Diferenciar **administradores** de **usuários comuns**.

✔️ **Proteção de dados** → Senhas criptografadas + segurança contra ataques.

**🔒 Segurança**

🔹 **Criptografia de senha** com bcrypt.

🔹 **Proteção contra ataques** SQL Injection e XSS.

🔹 **Armazenamento seguro de tokens** em HTTP-Only cookies.

🔹 **HTTPS** para comunicação segura entre usuário e servidor.

**📡 Implementação**

🔹 **Front-end:** Consome API via Axios, usa Context API para estado global.

🔹 **Back-end:** API REST com Express, banco de dados MongoDB/PostgreSQL.

🔹 **Middleware de autenticação** para proteger rotas de administrador.

🔹 **Armazenamento de usuário e tokens** no localStorage/cookies.

**🔜 Próximos Passos**

1️⃣ **Criar estrutura inicial** do projeto (pasta backend e frontend).

2️⃣ **Montar a API REST** em Node.js com rotas básicas.

3️⃣ **Configurar banco de dados** para eventos e usuários.

4️⃣ **Criar página de login e sistema de autenticação** JWT.

5️⃣ **Construir a UI com React + Tailwind CSS**.

6️⃣ **Testar e ajustar funcionalidades** antes da implantação.
