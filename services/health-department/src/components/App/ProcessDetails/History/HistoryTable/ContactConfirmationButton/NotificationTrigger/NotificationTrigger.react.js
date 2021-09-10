import React from 'react';
import { useIntl } from 'react-intl';
import { Tooltip } from 'antd';
import { useQuery } from 'react-query';

import { RISK_LEVEL_2 } from 'constants/riskLevels';

import {
  getWarningLevelsForLocationTransfer,
  getContactPersons,
  getMe,
} from 'network/api';

import { useModal } from 'components/hooks/useModal';
import { NotificationModal } from 'components/App/modals/NotificationModal';

import { BellIcon, ButtonWrapper } from './NotificationTrigger.styled';

export const NotificationTrigger = ({ location }) => {
  const intl = useIntl();
  const [openModal] = useModal();
  const {
    uuid: locationId,
    name: locationName,
    transferId: locationTransferId,
    time,
  } = location;

  const {
    data: riskLevels,
  } = useQuery(
    `getWarningLevelsForLocationTransfer${locationTransferId}`,
    () => getWarningLevelsForLocationTransfer(locationTransferId),
    { refetchOnWindowFocus: false }
  );

  const {
    data: contactPersons,
  } = useQuery(
    `contactPersons${locationTransferId}`,
    () => getContactPersons(locationTransferId),
    { refetchOnWindowFocus: false }
  );

  const { data: healthDepartmentEmployee } = useQuery('me', getMe, {
    refetchOnWindowFocus: false,
  });

  const openNotificationModal = () =>
    openModal({
      title: intl.formatMessage({
        id: 'modal.notification.title',
      }),
      content: (
        <NotificationModal
          locationId={locationId}
          locationName={locationName}
          locationTransferId={locationTransferId}
          time={time}
          departmentId={healthDepartmentEmployee.departmentId}
        />
      ),
      wide: true,
    });

  if (
    !riskLevels ||
    !contactPersons ||
    !healthDepartmentEmployee ||
    !healthDepartmentEmployee.notificationsEnabled
  )
    return null;

  const isNotificationDisabled =
    contactPersons.traces.length === 0 ||
    riskLevels.some(traceRisk => traceRisk.riskLevels.includes(RISK_LEVEL_2));

  return (
    <ButtonWrapper
      onClick={isNotificationDisabled ? () => {} : openNotificationModal}
    >
      <Tooltip title={intl.formatMessage({ id: 'modal.notification.button' })}>
        <BellIcon disabled={isNotificationDisabled} />
      </Tooltip>
    </ButtonWrapper>
  );
};