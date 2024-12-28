import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useMediaSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 1000);

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
