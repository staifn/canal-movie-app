'use client'

import React, { useRef } from 'react';
import styles from './CardList.module.css';
import Image from 'next/image';
import { Media } from '@/types/media.type';

interface CardListProps {
  mediaList: Media[];
  title: string;
}

export const CardList = ({ mediaList, title }: CardListProps) => {
  const mediaRef = useRef<HTMLUListElement | null>(null);

  const scrollList = (ref: React.RefObject<HTMLUListElement | null >, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2>{ title }</h2>
        <button className={styles.seeAll}>Voir tout</button>
      </div>
      <div className={styles.listWrapper}>
        <ul className={styles.itemList} ref={mediaRef}>
          {mediaList.map((media) => (
            <li key={media.id} className={styles.item}>
              <Image src={media.image} alt={`Movie ${media.id}`} width={120} height={180} className={styles.image} />
            </li>
          ))}
        </ul>
        <div className={styles.scrollButtons}>
          <button onClick={() => scrollList(mediaRef, 'left')} className={styles.scrollButton}>&lt;</button>
          <button onClick={() => scrollList(mediaRef, 'right')} className={styles.scrollButton}>&gt;</button>
        </div>
      </div>
    </section>
  );
}
