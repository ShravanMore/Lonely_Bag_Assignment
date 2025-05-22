# 🎬 Movie Explorer App

A fully functional Movie Explorer App built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, allowing users to browse, search, and favorite movies using data from the [TMDB API](https://www.themoviedb.org/).

---

## 🚀 Features

- 🔐 **Authentication**  
  - Register and login functionality using **NextAuth.js** or JWT.  
  - Auth state stored in cookies or localStorage.  
  - Protected routes for authenticated users only.

- 🎞️ **Movie Listing**  
  - Fetches and displays movies from the TMDB API.  
  - Infinite scrolling or pagination support.  
  - Displays movie poster, title, and rating.

- 🔍 **Dynamic Search**  
  - Search bar to find movies by name using TMDB's search API.  
  - Instant results display on input.

- 📄 **Movie Detail Page**  
  - Detailed information on each movie: title, overview, rating, release date, etc.  
  - SEO-friendly dynamic routing via `/movie/[id]`.

- ❤️ **Favorites Feature**  
  - Add/remove movies from favorites.  
  - Favorites persist in localStorage.  
  - View all favorites on the **My Favorites** page.

- 💡 **UI & Performance Optimizations**  
  - Responsive design with Tailwind CSS.  
  - Optimized images using `next/image`.  
  - Smooth UX with skeleton loaders during data fetching.

---

## 🧰 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js or JWT
- **API**: [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)
- **State Persistence**: localStorage / cookies

---

## 📦 Installation

bash
# Clone the repo
git clone https://github.com/your-username/movie-explorer-app.git
cd movie-explorer-app

# Install dependencies
npm install

# Create .env.local file with the following:
# TMDB_API_KEY=your_tmdb_api_key
# NEXTAUTH_SECRET=your_nextauth_secret (if using NextAuth)
# NEXTAUTH_URL=http://localhost:3000

# Run the dev server
npm run dev

