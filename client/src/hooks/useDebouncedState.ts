import React, { SetStateAction, useEffect, useState } from 'react';

const useDebouncedState = <T>(initialValue: T, delay = 300): [T, React.Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
    setDebouncedValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [delay, value])

  return [debouncedValue, setValue]
}

export default useDebouncedState;
