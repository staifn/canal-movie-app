'use client';

import { MediaResult } from "@/types/media.type";
import { useSerieSearchResults } from "./useSerieSearchResults";
import { CardList } from "@/components/CardList";

interface SerieSearchResultsProps {
  series: MediaResult;
  inputValue: string;
}

export const SerieSearchResults = ({ series: initialSeries, searchValue }: SerieSearchResultsProps) => {
  const {
    series,
    seriesPage,
    handleReachEndOfSerieList,
  } = useSerieSearchResults({ initialSeries, searchValue })

  return (
      <CardList mediaList={series} title='Series' onReachEndOfList={handleReachEndOfSerieList} page={seriesPage} />
  );
}
