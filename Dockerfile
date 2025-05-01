FROM node:lts-alpine3.19 AS build
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn build

FROM node:lts-alpine3.19 AS production-deps
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production --ignore-scripts

FROM node:lts-alpine3.19 AS production
WORKDIR /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate

EXPOSE 4000
CMD ["yarn", "start:prod"]
