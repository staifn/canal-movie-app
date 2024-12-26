import { Media } from "@/types/media.type";
import { useCallback, useEffect, useMemo, useRef } from "react";

const SCROLL_DISTANCE = 300;

interface UseCardList {
  mediaList: Media[];
  onReachEndOfList: () => void;
  page: number;
}

export const useCardList = ({ mediaList, onReachEndOfList, page }: UseCardList) => {
  const mediaRef = useRef<HTMLUListElement | null>(null);

  const scrollList = useCallback(
    (ref: React.RefObject<HTMLUListElement | null>, direction: 'left' | 'right') => {
      if (ref.current) {
        const scrollAmount = direction === 'left' ? -SCROLL_DISTANCE : SCROLL_DISTANCE;
        ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    },
    []
  );

  const handleScroll = useCallback(() => {
    if (mediaRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mediaRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - SCROLL_DISTANCE) {
        onReachEndOfList();
      }
    }
  }, [onReachEndOfList]);

  useEffect(() => {
    const listElement = mediaRef.current;

    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (page === 1 && mediaRef.current) {
      mediaRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [page, mediaList]);

  return useMemo(() => ({
    scrollList,
    mediaRef,
  }), [scrollList]);
}
