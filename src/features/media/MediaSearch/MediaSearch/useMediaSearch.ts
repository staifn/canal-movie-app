import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DEBOUNCE_DELAY = 300;

export const useMediaSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    if (queryParam === debouncedValue) return;
  
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('query', debouncedValue);
    router.push(`?${newParams.toString()}`);
  }, [debouncedValue, router, searchParams]);

  return useMemo(() => ({
    setSearchValue,
    searchValue,
  }), [searchValue]);
};
