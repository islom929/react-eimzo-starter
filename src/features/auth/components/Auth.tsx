import { FC, useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { ERIIcon } from '@/common/icons/ERIIcon.tsx';
import { useTranslation } from 'react-i18next';
import { KeysDialog } from '@/features/eri/components';
import { useAuth } from '@/features/auth/useAuth.ts';

export const Auth: FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const { selectKey } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen space-x-5 overflow-hidden p-[60px] w-full">
      <div className="flex flex-col">
        <KeysDialog selectKey={selectKey} open={open} close={close}>
          <Button
            className={
              'bg-[#6CCB5F] h-12 hover:bg-[#6CCB5F]/80 hover:shadow-lg duration-300 w-full '
            }
            onClick={() => setOpen(true)}
          >
            <ERIIcon />
            {t('login.with.eri')}
          </Button>
        </KeysDialog>
      </div>
    </div>
  );
};
