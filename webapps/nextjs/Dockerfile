FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

COPY . .
RUN yarn build

EXPOSE 3022

RUN addgroup -g 1001 -S nextjs && adduser -S nextjs -u 1001
USER nextjs

CMD ["yarn", "start"]
