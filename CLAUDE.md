# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` or `npm run dev` - starts Next.js development server
- **Build**: `pnpm build` or `npm run build` - creates production build
- **Production server**: `pnpm start` or `npm run start` - serves production build
- **Linting**: `pnpm lint` or `npm run lint` - runs ESLint
- **Database operations**: Use `drizzle-kit` commands for database migrations and schema management
  - `npx drizzle-kit generate` - generate migrations from schema changes
  - `npx drizzle-kit migrate` - run pending migrations
  - `npx drizzle-kit studio` - open Drizzle Studio for database inspection

Note: Database schema is defined in `src/db/schema.tsx` (not `.ts` as referenced in drizzle.config.ts)

## Architecture Overview

This is a Next.js 15 application focused on Dutch flora data with NFT minting capabilities on the Cardano blockchain.

### Core Structure
- **Next.js App Router**: Uses `src/app/` directory structure with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for flora data storage
- **State Management**: Redux Toolkit with Redux Persist for shopping cart functionality
- **Blockchain**: Cardano integration using Lucid Evolution library for NFT minting
- **Styling**: Tailwind CSS with DaisyUI components

### Key Components
- **Flora Database**: Central flora table with Dutch plant data including latin names, edibility, flowering times, and conservation status
- **NFT System**: Cardano-based NFT minting for plant collections through `/api/requestmint` endpoint
- **Shopping Cart**: Redux-based cart system for flora items with persistence
- **Charts**: Data visualization components using Recharts for plant statistics
- **Wallet Integration**: Cardano wallet connectivity for blockchain interactions

### Database Schema
The main `floraTable` contains Dutch flora data with fields:
- Plant identification (latin/english/dutch names)
- Characteristics (plant type, edibility, flowering time, flower color)
- Conservation data (endemic status, endangered status, evergreen classification)

### API Endpoints
- **Flora operations**: `/api/loadflora`, `/api/searchflora` for plant data
- **NFT operations**: `/api/requestmint`, `/api/requestburn` for blockchain transactions
- **Payment system**: `/api/create-payment-intent`, `/api/stripe-webhook`, `/api/payment-status` for Stripe integration
- **Metadata**: `/api/getmetadata`, `/api/gettxhash` for transaction data

Note: NFT minting is handled server-side through the Stripe webhook system rather than direct API endpoints.

### Type Definitions
Two main flora interfaces (`Flora` and `Flora2`) handle different data formats throughout the application, defined in `type.ts`.

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string
- `API_URL_MAINNET`, `BLOCKFROST_KEY_MAINNET`: Cardano blockchain API credentials
- `CARDANO_WALLET_SEED`: Server wallet seed phrase for automated minting
- `STRIPE_SECRET_KEY`: Stripe secret key for payment processing
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook endpoint secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for frontend
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`: Email configuration for sending transaction details

### Payment Flow
The application uses Stripe iDEAL payments with email delivery of NFT proof:
1. Users select flora items and configure environmental factors (no wallet connection needed)
2. Payment is processed through Stripe iDEAL
3. Server-side webhook handles payment confirmation
4. NFT is automatically minted using server wallet (kept in server wallet)
5. Transaction hash is emailed to customer as proof of ownership
6. Payment and minting status tracked in database

The application combines ecological data management with blockchain technology, creating a unique platform for Dutch flora information and NFT collectibles.

## Critical Implementation Details

### In-Memory Payment Cache
The Stripe webhook system uses an in-memory cache (`paymentDataCache`) to store flora and environmental factor data between payment intent creation and webhook processing. In serverless environments, this cache may be cleared between requests, so ensure proper error handling for missing cache data.

### NFT Metadata Structure
NFT metadata follows Cardano CIP-25 standard with custom fields:
- `planten`: Array of flora data (plant IDs and details)
- `factoren`: Object containing environmental factors

Note: Customer email is not included in NFT metadata for privacy reasons - it's only used for transaction confirmation emails.

### Serverless Architecture Notes

- Uses Next.js API routes in serverless environment (Vercel)
- Server wallet handles automated minting without user wallet connection
- Email delivery system for transaction proof instead of direct wallet transfers