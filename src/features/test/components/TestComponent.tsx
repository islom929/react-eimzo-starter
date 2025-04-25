import { FC } from 'react';
import { useTest } from '@/features/biolab-list/hooks';

interface Props {}

const TestComponent: FC<Props> = () => {
  const { test } = useTest();

  console.log(test);
  return <div className="flex">test component</div>;
};
