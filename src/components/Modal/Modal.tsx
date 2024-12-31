'use client';

import React from 'react';
import ReactModal from 'react-modal';
import Image from 'next/image';
import styles from './Modal.module.css';
import { Media } from '@/types/media.type';

ReactModal.setAppElement('#modal-root');

interface ModalProps {
  isOpen: boolean;
  onAfterOpen?: () => void;
  onClose: () => void;
  data: Media;
}

export const Modal = ({ isOpen, onClose, onAfterOpen, data }: ModalProps) => {
  const { image, title, description, releaseDate, rating, voteCount } = data || {};

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
      contentLabel="Movie Details Modal"
    >
      <button onClick={onClose} className={styles.closeButton} aria-label="Close">
        ✕
      </button>
      <div className={styles.modalInner}>
        {image ? <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title || 'image title'}
            className={styles.image}
            width={300}
            height={450}
            priority={true}
          />
        </div> : null}

        <div className={styles.infoContainer}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <p className={styles.summary}>{description}</p>
          <p className={styles.releaseDate}>
            <strong>Date de sortie : </strong>
            {releaseDate}
          </p>
          {rating ? <p className={styles.rating}>
            <strong>Note : </strong>
            {rating.toFixed(1)} / 10 ({voteCount
            } votants)
          </p> : null}
        </div>
      </div>
    </ReactModal>
  );
};
