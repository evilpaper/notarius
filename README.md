# Notarius

## Run locally

Run the development server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Local database

When developing local the project use a local database in a Docker Container. If the container is running then all is good.
If not, make sure you have Docker running (preferable Docker Dekstop) and then run:

```bash
./start-local-db.sh
```
