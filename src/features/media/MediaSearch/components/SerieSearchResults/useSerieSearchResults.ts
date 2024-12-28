import { getSeries as getSeriesUseCase } from '@/lib/useCases/getSeries';
import { searchSeries as searchSeriesUseCase } from '@/lib/useCases/searchSeries';
import { MediaResult } from '@/types/media.type';
import { useMediaSearchResults } from '../../hooks/useMediaSearchResults';

interface SeriesQueryParams extends Record<string, unknown> {
  include_adult: boolean;
  language: string;
  page: number;
  query?: string;
  include_null_first_air_dates?: boolean;
  sort_by?: string;
}

export const useSerieSearchResults = ({
  initialSeries,
  searchValue,
}: {
  initialSeries: Omit<MediaResult, 'totalResults'>;
  searchValue: string;
}) => {
  return useMediaSearchResults<SeriesQueryParams>({
    initialData: initialSeries,
    searchValue,
    searchUseCase: searchSeriesUseCase,
    getUseCase: getSeriesUseCase,
    additionalQueryParams: {
      include_null_first_air_dates: false,
      sort_by: 'popularity.desc',
    },
  });
};
