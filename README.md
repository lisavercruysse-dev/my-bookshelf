# Examenopdracht Front-end Web Development & Web Services

- Student: Lisa Vercruysse
- Studentennummer: 202294679
- E-mailadres: <lisa.vercruysse@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [Docker](https://docs.docker.com/get-docker/)

## Front-end

## Opstarten
### .env
```
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_BOOKS_API_KEY=jouwGoogleBooksKey
VITE_GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
```
#### Google books API key
Volg deze stappen om een API key te verkrijgen:
- Ga naar [google cloud console](https://console.cloud.google.com/welcome)
- ga naar API & Services -> Library
- zoek naar Books API en enable
- ga naar API & Services -> Credentials
- Create Credentials -> API key

### commando's

```
pnpm install
pnpm dev
```

## Testen

```
pnpm db:seed
pnpm start
pnpm dev
pnpm test
```

## Back-end

## Opstarten

### .env
```
# General config
NODE_ENV=development
PORT=3000
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

# Log config
LOG_LEVELS=["log","error","warn","debug"]

# Auth config
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment

GOOGLE_CLIENT_ID=12345678-jouwID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=jouwGoogleClientSecret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/sessions/google/callback
FRONTEND_URL= 'http://localhost'

# DATABASE_URL=mysql://devusr:devpwd@host.docker.internal:3306/mybookshelf
DATABASE_URL=mysql://devuser:devpwd@vichogent.be:41260/dbName
```
Voor google authenticatie heb je 2 variabelen nodig. Om deze credentials te verkrijgen volg je deze stappen:
- Ga naar [google cloud console](https://console.cloud.google.com/welcome)
- Ga naar API & Services -> OAuth consent screen -> Clients
  - application type: web application
  - Geef een naam
  - Authorised JavaScript origins: http://localhost:3000
  - Authorised redirect URIs: 
    - http://localhost:3000/api/sessions/google/callback
    - https://frontendweb-2526-vercruysselisa.onrender.com/api/sessions/google/callback
- Kopieer de credentials naar jouw .env

### Commando's
```
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm start
```

## Testen

### .env
```
# .env.test
# General configuration
NODE_ENV=testing
PORT=3000

# CORS configuration
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

# Database configuration

# Auth configuration
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
AUTH_JWT_AUDIENCE=mybookshelf.be
AUTH_JWT_ISSUER=mybookshelf.be
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

# Logging configuration
LOG_DISABLED=true 
```

### commando's

```
pnpm install
pnpm start
pnpm test:e2e
```