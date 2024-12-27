import { useCallback, useEffect, useMemo, useState } from 'react';
import { Media, MediaResult } from "@/types/media.type";
import { searchSeries as searchSeriesUseCase } from '@/lib/useCases/searchSeries';
import { getSeries as getSeriesUseCase } from '@/lib/useCases/getSeries';
import { mergeUniqueItems } from '@/utils/mergeUniqueItems';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
  page: 1,
};
interface UseMediaSearch {
  initialSeries: MediaResult;
  inputValue: string;
}

export const useSerieSearchResults = ({ initialSeries, inputValue }: UseMediaSearch) => {
  const [series, setSeries] = useState<Media[]>(initialSeries.data);
  const [seriesPage, setSeriesPage] = useState(initialSeries.page);

  const searchSeries = useCallback(async (series: Media[], query: string, page: number) => {
    const seriesQueryParams = {
      include_adult: false,
      language,
      page,
      query,
    };

    const newSeries = await searchSeriesUseCase(seriesQueryParams);
    setSeries(mergeUniqueItems(series, newSeries.data));
  }, []);

  const getSeries = useCallback(async (series: Media[], page: number) => {
    const seriesQueryParams = {
      ...commonQueryParams,
      include_null_first_air_dates: false,
      sort_by: 'popularity.desc',
      page,
    };

    const newSeries = await getSeriesUseCase(seriesQueryParams);
    setSeries(mergeUniqueItems(series, newSeries.data));
  }, []);  


  const handleReachEndOfSerieList = useCallback(() => {
    if (initialSeries.totalPages === seriesPage) return;
    const newPage = seriesPage + 1;

    if (inputValue) {
      searchSeries(series, inputValue, newPage)
    }  else {
      getSeries(series, newPage);
    }
    
    setSeriesPage(newPage);
  }, [inputValue, getSeries, searchSeries, initialSeries.totalPages, series, seriesPage]);

  useEffect(() => {
    setSeries(initialSeries.data);
    setSeriesPage(initialSeries.page);
  }, [initialSeries]);
  
  return useMemo(() => ({
    handleReachEndOfSerieList,
    inputValue,
    seriesPage,
    series,
  }), [handleReachEndOfSerieList, inputValue, series, seriesPage]);
};
