# Top Blockchain Companies - Frontend Directory UI Example

`Top Blockchain Companies` is a production-style frontend example of a **blockchain company directory interface**.  
This project demonstrates how to build a modern **Web3 services marketplace UI** where users can browse, filter, and compare blockchain development partners.

It is designed as a practical reference for teams building:

- blockchain company listing websites
- vendor comparison platforms
- shortlist and lead-intent landing pages
- Web3-focused directory and discovery interfaces

Official Peiko website: [https://peiko.space/](https://peiko.space/)

## Why This Project

This repository showcases a polished UI pattern for:

- comparing blockchain development companies by rating, budget, region, and service focus
- highlighting a featured partner
- handling API-driven filtering and loading states
- guiding users from discovery to shortlist intent

## Tech Context

- Next.js app structure
- API-style data layer integration
- reusable UI components and filters
- responsive layout for desktop and mobile

## Requirements

- Node.js 20+
- pnpm 10.4.1+

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create environment file:

- `apps/web/.env`

## Run Web (dev)

```bash
pnpm dev:web
```

Default URL: [http://localhost:3000](http://localhost:3000)

## Run Web (production)

```bash
pnpm build:web
pnpm start:web
```
