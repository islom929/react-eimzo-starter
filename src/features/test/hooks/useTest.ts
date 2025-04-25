import { useState } from 'react';

export const useTest = () => {
  const [test, setTest] = useState(false);

  return { test, setTest };
};
