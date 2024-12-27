import { Media } from "@/types/media.type";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const SCROLL_DISTANCE = 300;

interface UseCardList {
  mediaList: Media[];
  onReachEndOfList: () => void;
  page: number;
}

export const useCardList = ({ mediaList, onReachEndOfList, page }: UseCardList) => {
  const mediaRef = useRef<HTMLUListElement | null>(null);
  const isResettingScroll = useRef(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);

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
    if (!mediaRef.current || isScrolling || isResettingScroll.current === true) return;

    const { scrollLeft, scrollWidth, clientWidth } = mediaRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - SCROLL_DISTANCE) {
      setIsScrolling(true);
      onReachEndOfList();
      setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    }
  }, [isScrolling, isResettingScroll, onReachEndOfList]);

  const resetScroll = useCallback(() => {
    isResettingScroll.current = true;
    if(mediaRef.current) {
      mediaRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
    setTimeout(() => isResettingScroll.current = false, 200);
  }, []);

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

  useLayoutEffect(() => {
    if (page === 1) {
      resetScroll()
    }
  }, [page, mediaList, resetScroll]);

  return useMemo(() => ({
    scrollList,
    mediaRef,
    setIsOpen,
    modalIsOpen,
    activeMediaIndex,
    setActiveMediaIndex,
  }), [activeMediaIndex, modalIsOpen, scrollList]);
};
