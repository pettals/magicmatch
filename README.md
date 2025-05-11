# MagicMatch - AI-Powered Fashion Stylist

MagicMatch is a modern SAAS application that provides personalized outfit suggestions using AI technology. Get style recommendations based on your body metrics, preferences, and occasions.

## Features

- 🤖 AI-powered outfit generation
- 👕 Personalized style recommendations
- 🛍️ Direct links to retailer products
- 📱 Responsive design
- 💳 Freemium model with premium features

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Backend & Auth)
- OpenAI (Image Generation)
- Stripe (Payments)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenAI Configuration
   VITE_OPENAI_API_KEY=your_openai_api_key

   # Stripe Configuration
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API and external service integrations
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
└── styles/        # Global styles and Tailwind config
```

## Database Schema

### Users Table
```sql
create table users (
  id uuid references auth.users primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Profiles Table
```sql
create table profiles (
  id uuid references users primary key,
  height integer not null,
  weight integer not null,
  style_preferences text[] not null,
  occasions text[] not null,
  generations_left integer not null default 1,
  is_premium boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Outfits Table
```sql
create table outfits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users not null,
  image text not null,
  description text not null,
  occasion text not null,
  retailers jsonb not null,
  is_favorite boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## API Integration

### OpenAI
- Uses GPT-4 for outfit descriptions
- Uses DALL-E 3 for outfit image generation
- Requires OpenAI API key

### Stripe
- Handles premium subscription payments
- Monthly subscription at $3.99
- 20 generations per month for premium users

### Supabase
- Handles user authentication
- Stores user profiles and preferences
- Manages outfit history and favorites

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes. 
# Test push access
