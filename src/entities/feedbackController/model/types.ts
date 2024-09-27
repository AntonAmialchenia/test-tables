import { ReactNode } from 'react';
import { AlertNotificationTypes, ModalViewsTypes } from '../../../shared';

export interface FeedbackState {
  // Alert state
  alertNotificationBody: {
    show: boolean;
    alertType: AlertNotificationTypes;
    message?: string;
    description?: string;
    width?: number;
    duration?: number;
  };
  showAlert: (alert: Partial<FeedbackState['alertNotificationBody']>) => void;

  // Modal state
  modalNotificationBody: {
    title: ReactNode;
    content: ReactNode;
    show: boolean;
    closable?: boolean;
    className?: string;
    footer?: ReactNode;
    width?: number | string;
  };
  modalViewsTypes: ModalViewsTypes | null;
  setModalNotification: (
    modalNotification: Partial<FeedbackState['modalNotificationBody']>,
  ) => void;
  setModalViewsTypes: (type: ModalViewsTypes | null) => void;
  closeModal: () => void;
}
