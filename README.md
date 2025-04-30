# 🚗 Car Dealer Backend

Repositório responsável pela API do sistema **CMS Car Dealer**.

- 🔗 **Diagram ER**: [DrawSQL](https://drawsql.app/teams/leo-57/diagrams/car-dealer)
- 🔗 **Imagem Oficial Dockerhub**: [leopassos/car-dealer-backend](https://hub.docker.com/r/leopassos/car-dealer-backend)
- 🔗 **Frontend**: [passosleo/car-dealer-frontend](https://github.com/passosleo/car-dealer-frontend)
- 🔗 **Infraestrutura (Docker Compose e DB)**: [passosleo/car-dealer-infra](https://github.com/passosleo/car-dealer-infra)

---

## 📥 Clonando o Repositório

```bash
git clone https://github.com/passosleo/car-dealer-backend.git
cd car-dealer-backend
```

---

## 🐳 Executando com Docker

### ✅ Pré-requisitos

- Docker instalado
- Arquivo `.env` configurado na raiz do projeto

---

### 🚀 Opção 1: Usar Imagem Oficial do Docker Hub

```bash
docker run -d -p 4000:4000 --env-file .env --name car-dealer-backend leopassos/car-dealer-backend:latest
```

> 💡 A porta da aplicação pode ser alterada se necessário no trecho: `-p <porta_externa>:4000`.

---

### 🛠️ Opção 2: Buildar a Imagem Localmente

```bash
docker build -t car-dealer-backend .
```

Depois de buildar, execute:

```bash
docker run -d -p 4000:4000 --env-file .env --name car-dealer-backend car-dealer-backend
```

---

## ⚙️ Variáveis de Ambiente

A aplicação exige algumas variáveis de ambiente para funcionar corretamente. Você pode criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

| Variável                                | Descrição                                             | Obrigatório? |
| --------------------------------------- | ----------------------------------------------------- | ------------ |
| `NODE_ENV`                              | Ambiente da aplicação (`development` ou `production`) | ❌ Não       |
| `PORT`                                  | Porta em que a aplicação será exposta                 | ❌ Não       |
| `DATABASE_URL`                          | URL de conexão com o banco PostgreSQL                 | ✅ Sim       |
| `FRONTEND_BASE_URL`                     | URL do frontend para redirecionamentos                | ❌ Não       |
| `AUTH_ACCESS_TOKEN_SECRET`              | Segredo usado para assinar o token JWT de acesso      | ❌ Não       |
| `AUTH_ACCESS_TOKEN_EXPIRES_IN_SECONDS`  | Tempo de expiração do token de acesso (em segundos)   | ❌ Não       |
| `AUTH_REFRESH_TOKEN_SECRET`             | Segredo do refresh token                              | ❌ Não       |
| `AUTH_REFRESH_TOKEN_EXPIRES_IN_SECONDS` | Tempo de expiração do refresh token (em segundos)     | ❌ Não       |
| `MAIL_HOST`                             | Host SMTP para envio de emails                        | ✅ Sim       |
| `MAIL_PORT`                             | Porta do serviço SMTP                                 | ✅ Sim       |
| `MAIL_USER`                             | Usuário do SMTP                                       | ✅ Sim       |
| `MAIL_PASSWORD`                         | Senha do SMTP                                         | ✅ Sim       |
| `ENCRYPTION_SECRET`                     | Chave para criptografia de dados internos             | ❌ Não       |
| `CLOUDINARY_URL`                        | URL de conexão com o Cloudinary                       | ✅ Sim       |
| `REDIRECT_URL_RECOVER_PASSWORD`         | URL de redirecionamento para recuperação de senha     | ❌ Não       |

---

## 📄 Exemplo de `.env`

```dotenv
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/database
FRONTEND_BASE_URL=http://localhost:3000

AUTH_ACCESS_TOKEN_SECRET=fake_access_secret
AUTH_ACCESS_TOKEN_EXPIRES_IN_SECONDS=900
AUTH_REFRESH_TOKEN_SECRET=fake_refresh_secret
AUTH_REFRESH_TOKEN_EXPIRES_IN_SECONDS=604800

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=mailtrap_user
MAIL_PASSWORD=mailtrap_password

ENCRYPTION_SECRET=fake_encryption_key

CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name

REDIRECT_URL_RECOVER_PASSWORD=http://localhost:3000/recover-password
```

---

## 🧰 Configurando Ambiente de Desenvolvimento

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18.x ou superior
- [Yarn](https://yarnpkg.com/) 1.x
- Banco de dados PostgreSQL rodando
- Arquivo `.env` configurado na raiz do projeto

### ⚙️ Instalação e Setup

1. Instale as dependências:

   ```bash
   yarn install
   ```

2. Gere o client do Prisma:

   ```bash
   npx prisma generate
   ```

3. Execute as migrações e (opcionalmente) o seed:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Inicie o ambiente de desenvolvimento:

   ```bash
   yarn dev
   ```

> 💡 Certifique-se de que o banco de dados esteja acessível e as variáveis no `.env` estejam corretas antes de iniciar a aplicação.
