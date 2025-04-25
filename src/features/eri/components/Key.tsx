import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IKeyProps } from '@/features/eri/models';
import { cn } from '@/lib/utils.ts';

const Key: React.FC<IKeyProps> = ({ el, selectKey, deadline }) => {
  const { t } = useTranslation();

  const today = new Date();

  const validKey = useMemo(() => {
    const expire_date = new Date(el?.validTo);
    return expire_date > today;
  }, [el]);

  return (
    <div
      className={cn(
        'border border-transparent outline outline-2 outline-gray-200 rounded-10 px-4 py-3 space-y-3 hover:outline-green hover:border-green duration-300 cursor-pointer w-full',
        validKey ? '' : 'opacity-50 pointer-events-none',
      )}
      onClick={() => selectKey(el)}
    >
      <p className="w-full font-bold">{el.CN}</p>

      <div className="flex items-center w-full">
        <div className="flex flex-col items-start space-y-1 w-1/3">
          <p className="text-black text-sm">{t('pinfl')}:</p>
          <p className="font-semibold">{el.PINFL || '-'}</p>
        </div>
        <div className="flex flex-col items-start space-y-1 w-1/3">
          <p className="text-black text-sm">{t('stir')}:</p>
          <p className="font-semibold">{el.TIN || t('not.available')}</p>
        </div>
        <div className="flex flex-col items-start space-y-1 w-1/3">
          <p className="text-black text-sm">{t('personal.type')}:</p>
          <p className="font-semibold">
            {el.TIN ? t('legal.entity') : t('physical.entity')}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start space-y-1">
        <p className="text-black text-sm">{t('organization')} :</p>
        <p className={'font-semibold'}>{el.O || t('not.available')}</p>
      </div>

      <div className="flex items-center w-full">
        <div className="flex flex-col items-start space-y-1 w-1/2">
          <p className="text-black text-sm">{t('certificate.number')}:</p>
          <p className="font-semibold">{el.serialNumber}</p>
        </div>
        <div className="flex flex-col items-start space-y-1 w-1/2">
          <p className="text-black text-sm">{t('certificate.deadline')}:</p>
          <p className="font-semibold">
            {deadline(el?.validFrom, el?.validTo)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Key;
