# Form Speedrunner 🏃‍➡️

Form Speedrunner is an interactive web game that challenges players to complete form submissions as quickly as possible while maintaining accuracy. Race against time, compete with players worldwide, and climb the global leaderboard! You can check the live demo [here](https://form-speedrunner).

## Features

- 🎮 Dynamic form challenges with various input types
- ⏱️ Real-time split timing system
- 📊 Detailed performance analytics and charts
- 🏆 Global leaderboard
- 👤 User profiles with statistics
- 📱 Responsive design for all devices

## Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Query](https://tanstack.com/query/latest) - Server state management
- [Zustand](https://zustand-demo.pmnd.rs/) - Client state management
- [Recharts](https://recharts.org/) - Data visualization
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Backend

- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [MongoDB](https://www.mongodb.com/) - Database

### UI Components

- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide Icons](https://lucide.dev/) - Icons
- [Shadcn/ui](https://ui.shadcn.com/) - UI component system

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/form-speedrunner.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up your environment variables:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Your application URL

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with ❤️ using Next.js 14 and TypeScript
- UI components powered by Radix UI and Shadcn
- Animations courtesy of Framer Motion
