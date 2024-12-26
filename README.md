# Next.js Movies App

This is a [Next.js](https://nextjs.org) project designed to fetch, search, and display movies and TV series using a RESTful API. The project uses TypeScript, React, and Axios to handle API requests, and Jest for testing.

## Features

- **Movies and TV Series Display:** Browse movies and TV series with detailed information.
- **Search Functionality:** Search movies and series by title.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Modal Popups:** View detailed information in a modal.
- **Environment-Specific Configuration:** Use `.env` files for API keys and other secrets.
- **Unit Testing:** Includes Jest tests for API calls and logic validation.

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
   - Add your `NEXT_PUBLIC_API_KEY` for the movie database in these files:
     ```bash
     NEXT_PUBLIC_API_KEY=your_api_key
     ```

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Tests

Run the unit tests with Jest:

```bash
npm run test
```

Tests are configured to use the `.env.test` environment for mocking API keys and other variables.

## Project Structure

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── CardList.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   └── ...
├── lib/
│   ├── api/
│   │   ├── movie/
│   │   ├── serie/
│   │   └── ...
│   ├── useCases/
│   │   ├── getMovies.ts
│   │   ├── getSeries.ts
│   │   └── ...
│   └── ...
├── utils/
│   ├── logError.ts
│   ├── setImage.ts
│   └── ...
└── ...
```
