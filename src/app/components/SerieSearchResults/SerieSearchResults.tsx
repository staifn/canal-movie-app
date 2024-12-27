'use client';

import { MediaResult } from "@/types/media.type";
import { CardList } from "../CardList/CardList";
import { useSerieSearchResults } from "./useSerieSearchResults";

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
