import { Modal, notification } from 'antd';
import { useFeedbackStore } from '../entities';
import { useEffect } from 'react';
import { AlertNotificationTypes } from '../shared';

export function FeedbackAppController(): JSX.Element {
  const {
    modalNotificationBody,
    closeModal,
    alertNotificationBody,
    showAlert,
  } = useFeedbackStore();

  useEffect(() => {
    const description = alertNotificationBody.description ?? '';
    const width = alertNotificationBody.width?.toString() ?? '';
    const duration = alertNotificationBody.duration ?? 4;

    if (alertNotificationBody.show) {
      if (alertNotificationBody.alertType === AlertNotificationTypes.SUCCESS) {
        notification.success({
          message: alertNotificationBody.message || 'Успешно',
          description,
          duration,
          style: { width },
        });
      } else if (
        alertNotificationBody.alertType === AlertNotificationTypes.ERROR
      ) {
        notification.error({
          message: alertNotificationBody.message || 'Ошибка',
          description,
          duration,
          style: { width },
        });
      }
    }
  }, [alertNotificationBody, showAlert]);

  return (
    <Modal
      title={modalNotificationBody.title}
      open={modalNotificationBody.show}
      closable={modalNotificationBody.closable}
      onCancel={closeModal}
      className={modalNotificationBody.className}
	  footer=""
      width={modalNotificationBody.width}>
      {modalNotificationBody.content}
    </Modal>
  );
}
