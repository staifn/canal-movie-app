'use client'

import React, { useRef, useCallback, useEffect } from 'react';
import styles from './CardList.module.css';
import Image from 'next/image';
import { Media } from '@/types/media.type';

const SCROLL_DISTANCE = 300;

interface CardListProps {
  mediaList: Media[];
  title: string;
  onReachEndOfList: () => void;
  page: number;
}

export const CardList = ({ mediaList, title, onReachEndOfList, page }: CardListProps) => {
  const mediaRef = useRef<HTMLUListElement | null>(null);

  const scrollList = useCallback(
    (ref: React.RefObject<HTMLUListElement | null>, direction: 'left' | 'right') => {
      if (ref.current) {
        const scrollAmount = direction === 'left' ? -SCROLL_DISTANCE : SCROLL_DISTANCE;
        ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        if (direction === 'right') {
          const { scrollLeft, scrollWidth, clientWidth } = ref.current;
          if (scrollLeft + clientWidth >= scrollWidth - SCROLL_DISTANCE) {
            onReachEndOfList();
          }
        }
      }
    },
    [onReachEndOfList]
  );

  const handleScrollLeft = useCallback(() => {
    scrollList(mediaRef, 'left');
  }, [scrollList]);

  const handleScrollRight = useCallback(() => {
    scrollList(mediaRef, 'right');
  }, [scrollList]);

  useEffect(() => {
    if (page === 1 && mediaRef.current) {
      mediaRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [page, mediaList]);

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
          <button onClick={handleScrollLeft} className={styles.scrollButton}>
            &lt;
          </button>
          <button onClick={handleScrollRight} className={styles.scrollButton}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};
