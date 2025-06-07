FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS runner

# Ustawiamy zmienne środowiskowe
ENV NODE_ENV production

# Tworzymy katalog roboczy
WORKDIR /app

# Instalujemy tylko produkcyjne zależności
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm install --only=production

# Kopiujemy zbudowaną aplikację
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules

# Jeżeli masz `app` folder (Next.js 13+), musisz też dodać:
COPY --from=builder /app/app ./app

# Startujemy aplikację
CMD ["npm", "start"]