
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useMediaSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    if (queryParam === debouncedValue) return;
  
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('query', debouncedValue);
    router.push(`?${newParams.toString()}`);
  }, [debouncedValue, router, searchParams]);

  return useMemo(() => ({
    setInputValue,
    inputValue,
  }), [inputValue])
}
