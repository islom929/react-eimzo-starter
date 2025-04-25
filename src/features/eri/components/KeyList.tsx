import { FC, useState } from 'react';
// import Key from '@/features/eri/components/Key';
import { Loading } from '@/components/ui/loading.tsx';
import Key from '@/features/eri/components/Key.tsx';
import { useKeys } from '@/features/eri/hooks/useKeys.ts';
import { toast } from 'sonner';

interface IKeysProps {
  selectKey: (key: any) => void;
  close?: () => void;
}

export const KeyList: FC<IKeysProps> = ({ selectKey, close }) => {
  const { keyList, keyLoading, deadline } = useKeys(close);

  const [loading, setLoading] = useState(false);

  const clicked = async (el: any) => {
    try {
      setLoading(true);
      await selectKey(el);
    } catch (err) {
      toast.warning('hatolik bor');
    } finally {
      setLoading(false);
    }
  };

  if (loading || keyLoading) {
    return (
      <div
        className={
          'min-w-[600px] min-h-[600px] flex justify-center items-center'
        }
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={'flex flex-col items-center gap-y-4  px-3 p-2 min-w-[600px]'}
    >
      {keyList.map((el) => (
        <Key key={el.PINFL} el={el} selectKey={clicked} deadline={deadline} />
      ))}
    </div>
  );
};
