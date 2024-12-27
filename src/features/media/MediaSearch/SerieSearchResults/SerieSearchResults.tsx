'use client';

import { MediaResult } from "@/types/media.type";
import { useSerieSearchResults } from "./useSerieSearchResults";
import { CardList } from "@/components/CardList";

interface SerieSearchResultsProps {
  series: MediaResult;
  inputValue: string;
}

export const SerieSearchResults = ({ series: initialSeries, inputValue }: SerieSearchResultsProps) => {
  const {
    series,
    seriesPage,
    handleReachEndOfSerieList,
  } = useSerieSearchResults({ initialSeries, inputValue })

  return (
      <CardList mediaList={series} title='Series' onReachEndOfList={handleReachEndOfSerieList} page={seriesPage} />
  );
}
