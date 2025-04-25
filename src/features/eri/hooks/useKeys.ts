import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import EIMZO from '@/features/eri/utils/Eimzo.ts';
import { ICertificate } from '../models';
import { notificationSlice } from '@/common/notification';
import { store } from '@/store';

export const useKeys = (close?: () => void) => {
  const EIMZOClient = new EIMZO();
  const [keyList, setKeyList] = useState<ICertificate[]>([]);
  const [keyLoading, setLoading] = useState(true);

  // GET E-IMZO CLIENT LIST

  const getCertificate = async () => {
    try {
      await EIMZOClient.install();
      const data: any = await EIMZOClient.listAllUserKeys();
      setKeyList(data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      store.dispatch(
        notificationSlice.actions.open({ message: 'EImzo не запустился' }),
      );
      if (close) close();
    }
  };

  useEffect(() => {
    void getCertificate();
  }, []);

  const deadline = (from: string, to: string) => {
    const fromTime = from ? format(from, 'dd.MM.yyyy') : '-';
    const toTime = to ? format(to, 'dd.MM.yyyy') : '-';
    return fromTime + ' - ' + toTime;
  };

  return { deadline, keyList, keyLoading };
};
