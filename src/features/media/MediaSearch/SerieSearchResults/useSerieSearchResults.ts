import { useCallback, useEffect, useMemo, useState } from 'react';
import { Media, MediaResult } from "@/types/media.type";
import { searchSeries as searchSeriesUseCase } from '@/lib/useCases/searchSeries';
import { getSeries as getSeriesUseCase } from '@/lib/useCases/getSeries';
import { mergeUniqueItems } from '@/utils/mergeUniqueItems';
import { logError } from '@/utils/logError';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
};

interface UseMediaSearch {
  initialSeries: Omit<MediaResult, 'totalResults'>;
  searchValue: string;
}

export const useSerieSearchResults = ({ initialSeries, searchValue }: UseMediaSearch) => {
  const [series, setSeries] = useState<Media[]>(initialSeries.data);
  const [seriesPage, setSeriesPage] = useState(initialSeries.page);

  const fetchSeries = useCallback(async (query: string | null, page: number) => {
    try {
      const params = query
        ? { ...commonQueryParams, page, query }
        : { ...commonQueryParams, page, include_null_first_air_dates: false, sort_by: 'popularity.desc' };

      const fetchFunction = query ? searchSeriesUseCase : getSeriesUseCase;
      const newSeries = await fetchFunction(params);
      
      setSeries((prevSeries) => mergeUniqueItems(prevSeries, newSeries.data));
    } catch (error) {
      logError(`"Failed to fetch series: "${error}`);
    }
  }, []);

  const handleReachEndOfSerieList = useCallback(() => {
    if (initialSeries.totalPages === seriesPage) return;

    const newPage = seriesPage + 1;
    fetchSeries(searchValue || null, newPage);
    setSeriesPage(newPage);
  }, [fetchSeries, initialSeries.totalPages, searchValue, seriesPage]);

  useEffect(() => {
    setSeries(initialSeries.data);
    setSeriesPage(initialSeries.page);
  }, [initialSeries]);

  return useMemo(() => ({
    handleReachEndOfSerieList,
    series,
    seriesPage,
  }), [handleReachEndOfSerieList, series, seriesPage]);
};
