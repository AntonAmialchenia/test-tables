import { create } from 'zustand';
import { AlertNotificationTypes } from '../../../shared';
import { FeedbackState } from './types';

export const useFeedbackStore = create<FeedbackState>((set) => ({
  // Alert initial state and actions
  alertNotificationBody: {
    show: false,
    alertType: AlertNotificationTypes.SUCCESS,
    message: '',
    description: '',
    width: undefined,
    duration: 4,
  },
  showAlert: (alert) =>
    set((state) => ({
      alertNotificationBody: {
        ...state.alertNotificationBody,
        ...alert,
        show: true,
      },
    })),

  // Modal initial state and actions
  modalNotificationBody: {
    title: '',
    content: null,
    show: false,
    closable: true,
    className: '',
    footer: null,
    width: 520,
  },
  modalViewsTypes: null,
  setModalNotification: (modalNotification) =>
    set((state) => ({
      modalNotificationBody: {
        ...state.modalNotificationBody,
        ...modalNotification,
      },
    })),
  setModalViewsTypes: (type) => set({ modalViewsTypes: type }),
  closeModal: () =>
    set((state) => ({
      modalNotificationBody: { ...state.modalNotificationBody, show: false },
      modalViewsTypes: null,
    })),
}));
