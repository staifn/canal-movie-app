# Next.js Movies App

This is a [Next.js](https://nextjs.org) project designed to fetch, search, and display movies and TV series using a RESTful API. The project uses TypeScript, React, Axios, and React Query for data management and includes Jest for testing.

🚀 **Lighthouse Scores** 🚀

Our app has scored a perfect 100 in all categories on Lighthouse:

- **Performance**: 🟢 **100** - Fast and smooth, even with lots of data!
- **Accessibility**: 🟢 **100** - Accessible to everyone, no matter their needs.
- **Best Practices**: 🟢 **100** - Everything's in order with best development practices.
- **SEO**: 🟢 **100** - Optimized for search engines, making it easy to find!

## Features

- **Movies and TV Series Display:** Browse movies and TV series with detailed information.
- **Search Functionality:** Search movies and series by title.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Modal Popups:** View detailed information in a modal.
- **Environment-Specific Configuration:** Use `.env` files for API keys and other secrets.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/staifn/canal-movie-app.git
   cd canal-movie-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment files:
   - Copy `.env.example` to `.env.local` for development and `.env.test` for testing.
   - Add your `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY`:
     ```bash
     NEXT_PUBLIC_API_URL=https://example.org
     NEXT_PUBLIC_API_KEY=12345
     ```

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Testing

### Running Tests

Run the unit and integration tests with Jest:

```bash
npm run test
```

## Bundle Analysis

To generate and view the bundle analysis (including dynamic chunk sizes), use the following script:

```bash
npm run bundle:analyze
```

This will build the project and generate an interactive visualization of your bundles, helping you identify large dependencies and potential optimizations.

### Running the Analysis

You can view the bundle analysis in your browser by opening the following files:

```bash
.next/analyze/client.html
.next/analyze/nodejs.html
```

This will open a visualization of the sizes of your JavaScript chunks, allowing you to see how your code is split and which chunks may need optimization.

## Project Structure

```plaintext
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── page.module.css
│   ├── components/
│   │   ├── CardList/
│   │   │   ├── CardList.tsx
│   │   │   ├── CardList.module.css
│   │   │   ├── useCardList.ts
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
├── config/
│   └── config.ts
├── features/
│   ├── media/MediaSearch/
│   │   ├── components/
│   │   │   ├── MovieSearchResults.tsx
│   │   │   ├── useMovieSearchResults.ts
│   │   │   ├── SerieSearchResults.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useMediaSearchResults.ts
│   │   └── MediaSearch.tsx
├── lib/
│   ├── api/
│   │   ├── movie/
│   │   │   ├── movie.api.ts
│   │   │   ├── movie.api.test.ts
│   │   │   ├── movie.mapper.ts
│   │   │   ├── movie.type.ts
│   │   │   └── axiosInstance.ts
│   │   ├── serie/
│   │   │   └── ...
│   ├── useCases/
│   │   ├── getMovies.ts
│   │   ├── getMovies.test.ts
│   │   ├── searchMovies.ts
│   │   ├── getSeries.ts
│   │   └── searchSeries.ts
├── types/
│   └── media.type.ts
├── utils/
│   ├── mergeUniqueItems.ts
│   ├── mergeUniqueItems.test.ts
│   ├── logError.ts
│   ├── setImage.ts
│   └── index.ts
├── public/
│   ├── images/
│   │   └── ...
├── __mocks__/
│   ├── react-modal.tsx
│   └── data.ts
.env.example
.env.local
.env.test
README.md
```

## Deployment

This app can be deployed to any platform that supports Next.js, such as Vercel or Netlify.

```bash
npm run build
npm start
```
