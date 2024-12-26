'use client';

import React from 'react';
import styles from './CardList.module.css';
import Image from 'next/image';
import { Media } from '@/types/media.type';
import { useCardList } from './useCardList';
import { Modal } from '../Modal/Modal';

interface CardListProps {
  mediaList: Media[];
  title: string;
  onReachEndOfList: () => void;
  page: number;
}

export const CardList = ({ mediaList, title, onReachEndOfList, page }: CardListProps) => {
  const {
    mediaRef,
    scrollList, 
    modalIsOpen,
    activeMediaIndex,
    setIsOpen,
    setActiveMediaIndex,
  } = useCardList({
    mediaList,
    page,
    onReachEndOfList,
  });
  

  const renderMediaItems = () => {
    return mediaList.map((media, index) => {
      const handleClick = () => {
        setActiveMediaIndex(index);
        setIsOpen(true);
      };

      return (
        <li key={media.id} className={styles.item}>
          <button onClick={handleClick} className={styles.cardButton}>
            <Image src={media.image} alt={`Movie ${media.id}`} width={120} height={180} className={styles.image} priority={true} />
          </button>
        </li>
      );
    });
  };

  const renderScrollButtons = () => (
    <div className={styles.scrollButtons}>
      <button onClick={() => scrollList(mediaRef, 'left')} className={styles.scrollButton}>
        &lt;
      </button>
      <button onClick={() => scrollList(mediaRef, 'right')} className={styles.scrollButton}>
        &gt;
      </button>
    </div>
  );

  return (
    <section className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2>{title}</h2>
        {renderScrollButtons()}
      </div>
      <div className={styles.listWrapper}>
        <ul className={styles.itemList} ref={mediaRef}>
          {renderMediaItems()}
        </ul>
      </div>
      <Modal isOpen={modalIsOpen} onClose={() => setIsOpen(false)} data={mediaList[activeMediaIndex]} />
    </section>
  );
};
