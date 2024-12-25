import React, { ReactElement } from 'react';
import styles from './page.module.css';
import { CardList } from '@/components/CardList/CardList';
import { API_KEY } from '@/config/config';
import { getMovies } from '@/lib/useCases/getMovies';
import { getSeries } from '@/lib/useCases/getSeries';

export default async function Home(): Promise<ReactElement> {
  const movieConfig = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
    api_key: API_KEY
  };

  const serieConfig = {
    include_adult: false,
    include_null_first_air_dates: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
    api_key: API_KEY
  };

  const [movies, series] = await Promise.all([
    getMovies(movieConfig),
    getSeries(serieConfig),
  ])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Netflix</h1>
      </header>
      <CardList mediaList={movies} title='Movies' />
      <CardList mediaList={series} title='Series' />
    </main>
  );
}
