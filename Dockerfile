FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/apps/client/node_modules /app/apps/client/node_modules
COPY --from=prod-deps /app/apps/server/node_modules /app/apps/server/node_modules

COPY --from=build /app/apps/client/dist /app/apps/client/dist
COPY --from=build /app/apps/server/dist /app/apps/server/dist

CMD [ "pnpm", "start" ]
