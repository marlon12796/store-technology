
ARG NODE_VERSION=23.8.0
ARG PNPM_VERSION=10.4.1

FROM node:${NODE_VERSION}-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

FROM base as deps
ARG IS_PRODUCTION=false
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN if [ "${IS_PRODUCTION}" = "true" ]; then \
      pnpm run build; \
    fi

# Production Dependencies
FROM deps AS prod-deps

COPY  --from=deps . ./
RUN pnpm prune --prod

# Development Image
FROM base AS final-dev
WORKDIR /usr/src/app
ENV NODE_ENV=development

COPY --from=deps /usr/src/app ./

EXPOSE ${PORT}
CMD [ "pnpm","start:dev" ]

