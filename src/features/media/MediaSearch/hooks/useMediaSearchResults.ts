import { useCallback, useEffect, useMemo, useState } from 'react';
import { Media, MediaResult } from "@/types/media.type";
import { mergeUniqueItems } from '@/utils/mergeUniqueItems';

const language = 'en-US';
const commonQueryParams = {
  include_adult: false,
  language,
};

interface UseMediaSearch<QueryParams> {
  initialData: Omit<MediaResult, 'totalResults'>;
  searchValue: string;
  searchUseCase: (params: QueryParams) => Promise<MediaResult>;
  getUseCase: (params: QueryParams) => Promise<MediaResult>;
  additionalQueryParams?: Partial<QueryParams>;
}

export const useMediaSearchResults = <QueryParams extends Record<string, unknown>>({
  initialData,
  searchValue,
  searchUseCase,
  getUseCase,
  additionalQueryParams = {},
}: UseMediaSearch<QueryParams>) => {
  const [items, setItems] = useState<Media[]>(initialData.data);
  const [page, setPage] = useState(initialData.page);

  const fetchItems = useCallback(
    async (query: string | null, page: number) => {
      try {
        const params: QueryParams = query
          ? ({ ...commonQueryParams, page, query } as unknown as QueryParams)
          : ({ ...commonQueryParams, ...additionalQueryParams, page } as unknown as QueryParams);

        const fetchFunction = query ? searchUseCase : getUseCase;
        const newItems = await fetchFunction(params);

        setItems((prevItems) => mergeUniqueItems(prevItems, newItems.data));
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    },
    [additionalQueryParams, searchUseCase, getUseCase]
  );

  const handleReachEndOfList = useCallback(() => {
    if (initialData.totalPages === page) return;

    const newPage = page + 1;
    fetchItems(searchValue || null, newPage);
    setPage(newPage);
  }, [fetchItems, initialData.totalPages, searchValue, page]);

  useEffect(() => {
    setItems(initialData.data);
    setPage(initialData.page);
  }, [initialData]);

  return useMemo(
    () => ({
      handleReachEndOfList,
      items,
      page,
    }),
    [handleReachEndOfList, items, page]
  );
};
