FROM imbios/bun-node AS base
WORKDIR /usr/src/app

COPY . .
RUN bun install
RUN bun run build

USER bun
ENTRYPOINT [ "bun", "run", "start" ]
