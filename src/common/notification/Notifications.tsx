import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { notificationSlice, NotificationType } from './slices';
import { useAppDispatch, useAppSelector } from '@/store';
import { toast } from 'sonner';

export const Notifications: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    is_open,
    message,
    type = 'warning',
  } = useAppSelector((state) => state.notification);
  useEffect(() => {
    if (is_open) {
      openNotificationWithIcon('warning');
    }
    setTimeout(() => dispatch(notificationSlice.actions.close()), 1000);
  }, [is_open]);

  const openNotificationWithIcon = (type: NotificationType) => {
    if (type === 'warning') {
      toast.warning(message);
    } else {
      toast('', {
        description: message,
      });
    }
  };
  return <span></span>;
};
