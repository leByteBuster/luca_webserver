// eslint-disable-next-line no-shadow
export enum AuditLogEvents {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',

  CREATE_EMPLOYEE = 'CREATE_EMPLOYEE',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  REACTIVATE_EMPLOYEE = 'REACTIVATE_EMPLOYEE',
  CHANGE_ROLE = 'CHANGE_ROLE',

  CREATE_TRACING_PROCESS = 'CREATE_TRACING_PROCESS',
  REQUEST_DATA = 'REQUEST_DATA',
  RECEIVE_DATA = 'RECEIVE_DATA',
  VIEW_DATA = 'VIEW_DATA',
  DOWNLOAD_AUDITLOG = 'DOWNLOAD_AUDITLOG',

  ISSUE_DAILY_KEYPAIR = 'ISSUE_DAILY_KEYPAIR',
  ISSUE_BADGE_KEYPAIR = 'ISSUE_BADGE_KEYPAIR',
  REKEY_DAILY_KEYPAIR = 'REKEY_DAILY_KEYPAIR',
  REKEY_BADGE_KEYPAIR = 'REKEY_BADGE_KEYPAIR',
}

// eslint-disable-next-line no-shadow
export enum AuditStatusType {
  SUCCESS = 'SUCCESS',
  ERROR_INVALID_USER = 'ERROR_INVALID_USER',
  ERROR_TARGET_NOT_FOUND = 'ERROR_TARGET_NOT_FOUND',
  ERROR_INVALID_PASSWORD = 'ERROR_INVALID_PASSWORD',
  ERROR_INSECURE_PASSWORD = 'ERROR_INSECURE_PASSWORD',
  ERROR_INVALID_EMAIL = 'ERROR_INVALID_EMAIL',
  ERROR_INVALID_SIGNATURE = 'ERROR_INVALID_SIGNATURE',
  ERROR_INVALID_KEYID = 'ERROR_INVALID_KEYID',
  ERROR_INVALID_TAN = 'ERROR_INVALID_TAN',
  ERROR_CONFLICT_KEY = 'ERROR_CONFLICT_KEY',
  ERROR_DUPLICATE_EMAIL = 'ERROR_DUPLICATE_EMAIL',
  ERROR_LIMIT_EXCEEDED = 'ERROR_LIMIT_EXCEEDED',
  ERROR_TIMEFRAME = 'ERROR_TIMEFRAME',
  ERROR_UNKNOWN_SERVER_ERROR = 'ERROR_UNKNOWN_SERVER_ERROR',
}