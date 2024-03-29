import { notification } from 'antd';

export const DECODE_FAILED = 'DECODE_FAILED';
export const TIMESTAMP_OUTDATED = 'TIMESTAMP_OUTDATED';
export const VERSION_NOT_SUPPORTED = 'VERSION_NOT_SUPPORTED';
export const DOUPLICATE_CHECKIN = 'DOUPLICATE_CHECKIN';
export const WRONG_LOCAL_TIME = 'WRONG_LOCAL_TIME';

export const notifyScanError = (error, intl, onClose = () => {}) => {
  switch (error) {
    case DECODE_FAILED:
      notification.error({
        message: intl.formatMessage({
          id: 'error.decodeFailed',
        }),
        onClose: () => onClose(),
      });
      break;
    case TIMESTAMP_OUTDATED:
      notification.error({
        message: intl.formatMessage({
          id: 'error.timestampOutdated',
        }),
        onClose: () => onClose(),
      });
      break;
    case VERSION_NOT_SUPPORTED:
      notification.error({
        message: intl.formatMessage({
          id: 'error.versionNotSupported',
        }),
        onClose: () => onClose(),
      });
      break;
    case DOUPLICATE_CHECKIN:
      notification.error({
        message: intl.formatMessage({
          id: 'error.duplicateCheckin',
        }),
        onClose: () => onClose(),
      });
      break;
    case WRONG_LOCAL_TIME:
      notification.error({
        message: intl.formatMessage({ id: 'error.wrongLocalTime' }),
        onClose: () => onClose(),
      });
      break;
    default:
      notification.error({
        message: intl.formatMessage({
          id: 'error.genericScanner',
        }),
        onClose: () => onClose(),
      });
  }
};
