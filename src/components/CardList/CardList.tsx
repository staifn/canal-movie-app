'use client'

import React from 'react';
import styles from './CardList.module.css';
import Image from 'next/image';
import { Media } from '@/types/media.type';
import { useCardList } from './useCardList';

interface CardListProps {
  mediaList: Media[];
  title: string;
  onReachEndOfList: () => void;
  page: number;
}

export const CardList = ({ mediaList, title, onReachEndOfList, page }: CardListProps) => {
  const {
    mediaRef,
    scrollList
  } = useCardList({
    mediaList,
    page,
    onReachEndOfList,
  });

  return (
    <section className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2>{title}</h2>
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
          <button onClick={() => scrollList(mediaRef, 'left')} className={styles.scrollButton}>
            &lt;
          </button>
          <button onClick={() => scrollList(mediaRef, 'right')} className={styles.scrollButton}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};
