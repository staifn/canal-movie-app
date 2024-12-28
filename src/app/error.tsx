'use client';
 
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void,
}

export default function Error({
  reset,
}: ErrorProps) {
  return (
    <div className='error'>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}