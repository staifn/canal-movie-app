'use client';

import { MediaResult } from "@/types/media.type";
import { useSerieSearchResults } from "./useSerieSearchResults";
import { CardList } from "@/components/CardList";

interface SerieSearchResultsProps {
  series: MediaResult;
  searchValue: string;
}

export const SerieSearchResults = ({ series: initialSeries, searchValue }: SerieSearchResultsProps) => {
  const {
    items,
    page,
    handleReachEndOfList,
  } = useSerieSearchResults({ initialSeries, searchValue })

  return (
      <CardList mediaList={items} title='Series' onReachEndOfList={handleReachEndOfList} page={page} />
  );
}
