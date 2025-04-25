import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { KeyList } from '@/features/eri/components/KeyList.tsx';

interface IKeysProps {
  children: React.ReactNode;
  selectKey: (key: any) => void;
  close: () => void;
  open?: boolean;
}

export const KeysDialog: FC<IKeysProps> = ({
  children,
  selectKey,
  open,
  close,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>{t('eri')}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[800px] min-w-[600px] -mr-1 pr-1">
          <KeyList selectKey={selectKey} close={close} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
