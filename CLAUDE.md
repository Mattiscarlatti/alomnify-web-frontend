# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` or `npm run dev` - starts Next.js development server
- **Build**: `pnpm build` or `npm run build` - creates production build
- **Production server**: `pnpm start` or `npm run start` - serves production build
- **Linting**: `pnpm lint` or `npm run lint` - runs ESLint

Note: Database operations are handled by the Cloudflare Workers backend at `alomnify-api.alomnify.workers.dev`

## Architecture Overview

This is a Next.js 15 application focused on Dutch flora data with NFT minting capabilities on the Cardano blockchain.

### Core Structure
- **Next.js App Router**: Uses `src/app/` directory structure with TypeScript
- **Backend**: Cloudflare Workers backend at `alomnify-api.alomnify.workers.dev`
- **Database**: PostgreSQL with Cloudflare D1 for flora data storage (handled by backend)
- **State Management**: Redux Toolkit with Redux Persist for shopping cart functionality
- **Blockchain**: Cardano integration using Lucid Evolution library for NFT minting (handled by backend)
- **Styling**: Tailwind CSS with DaisyUI components

### Key Components
- **Flora Database**: Central flora table with Dutch plant data including latin names, edibility, flowering times, and conservation status (backend)
- **NFT System**: Cardano-based NFT minting for plant collections through Cloudflare Workers (backend)
- **Shopping Cart**: Redux-based cart system for flora items with persistence (frontend)
- **Charts**: Data visualization components using Recharts for plant statistics (frontend)
- **Wallet Integration**: Cardano wallet connectivity for blockchain interactions (frontend)

### API Endpoints (Cloudflare Workers Backend)
- **Flora operations**: `/api/plants` for plant data search and retrieval
- **Collections**: `/api/collections` for user plant collections
- **Payment system**: `/api/payments/create-payment-intent`, `/api/webhooks/stripe` for Stripe integration
- **Analytics**: `/api/analytics` for biodiversity statistics
- **Health check**: `/api/health` for service status

All API endpoints are handled by the Cloudflare Workers backend, not local Next.js API routes.

### Type Definitions
Two main flora interfaces (`Flora` and `Flora2`) handle different data formats throughout the application, defined in `type.ts`.

### Environment Requirements (Frontend Only)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for frontend payment processing
- `NEXT_PUBLIC_BACKEND_URL`: Cloudflare Workers backend URL (https://alomnify-api.alomnify.workers.dev)

All other environment variables (database, blockchain, SMTP, etc.) are handled by the Cloudflare Workers backend.

### Payment Flow
The application uses Stripe iDEAL payments with email delivery of NFT proof:
1. Users select flora items and configure environmental factors (no wallet connection needed)
2. Payment is processed through Stripe iDEAL via Cloudflare Workers backend
3. Cloudflare Workers webhook handles payment confirmation
4. NFT is automatically minted using server wallet (kept in server wallet)
5. Transaction hash is emailed to customer as proof of ownership
6. Payment and minting status tracked in Cloudflare D1 database

The application combines ecological data management with blockchain technology, creating a unique platform for Dutch flora information and NFT collectibles.

## Critical Implementation Details

### Collections System

The Cloudflare backend manages plant collections using:

- Collection ID-based retrieval system
- Email-based authentication for collection access
- Environmental factors stored with each collection

### NFT Metadata Structure

NFT metadata follows Cardano CIP-25 standard with custom fields:

- `planten`: Array of flora data (plant IDs and details)
- `factoren`: Object containing environmental factors

Note: Customer email is not included in NFT metadata for privacy reasons - it's only used for transaction confirmation emails.

### Serverless Architecture Notes

- Frontend is a pure Next.js application without API routes
- All backend operations handled by Cloudflare Workers
- Database operations use Cloudflare D1 (SQLite-compatible)
- Email delivery system for transaction proof instead of direct wallet transfers