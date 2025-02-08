<div align="center">
    <img src="https://i.imgur.com/KVVR2dM.png">
</div>

## About ZyroHub

<p>ZyroHub is a toolkit designed for developers, offering solutions for media conversion and manipulation. It includes a variety of essential tools, eliminating the need to install or rely on multiple software and services to accomplish common tasks.</p>

## Running the project

#### Requirements:

- [Bun](https://bun.sh/)
- [RabbitMQ Server](https://www.rabbitmq.com/)
- [Redis Server](https://redis.io/)

#### 1. Configure the environment variables:

Copy the `.env.example` file to `.env` for production or `.env.development` for development and fill the necessary variables with the appropriate values.

`production`:

```bash
cp .env.example .env
```

`development`:

```bash
cp .env.example .env.development
```

#### 2. Install the dependencies:

```bash
bun install
```

#### 3. Run the project in development mode:

```bash
bun run dev
```

#### 4. Build the project:

```bash
bun build
```

#### 5. Run the project in production mode:

```bash
bun start
```
