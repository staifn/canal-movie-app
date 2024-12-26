import React, { ReactElement } from 'react';
import styles from './page.module.css';
import { getMovies } from '@/lib/useCases/getMovies';
import { getSeries } from '@/lib/useCases/getSeries';
import { MediaSearch } from '@/components/MediaSearch/MediaSearch';
import { searchMovies } from '@/lib/useCases/searchMovies';
import { searchSeries } from '@/lib/useCases/searchSeries';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
  page: 1,
};

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<ReactElement> {
  const query = (await searchParams).query || '';

  const movieQueryParams = {
    ...commonQueryParams,
    include_video: false,
    sort_by: 'popularity.desc',
    query,
  };
  
  const serieQueryParams = {
    ...commonQueryParams,
    include_null_first_air_dates: false,
    sort_by: 'popularity.desc',
    query,
  };

  const searchQueryParams = {
    ...commonQueryParams,
    query,
  }

  const [movies, series] = await Promise.all([
    query ? searchMovies(searchQueryParams) : getMovies(movieQueryParams),
    query ? searchSeries(searchQueryParams) : getSeries(serieQueryParams),
  ]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Canal +</h1>
      </header>
      
      <MediaSearch movies={movies} series={series} />
    </main>
  );
}
