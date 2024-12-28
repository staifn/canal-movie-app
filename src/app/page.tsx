import React, { ReactElement, Suspense } from 'react';
import styles from './page.module.css';
import { MediaSearchSSR } from '@/features/media/MediaSearch/MediaSearchSSR/MediaSearchSSR';

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<ReactElement> {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Canal +</h1>
      </header>
      <Suspense fallback='Loading...'>
        <MediaSearchSSR searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
