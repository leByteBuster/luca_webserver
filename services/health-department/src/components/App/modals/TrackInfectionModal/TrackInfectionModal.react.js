import React, { useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';
import { Form, Input, Button, notification, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import {
  initiateUserTracingProcess,
  initiateStaticUserTracingProcess,
  EMPTY_HISTORY,
  INVALID_VERSION,
  DECRYPTION_FAILED,
} from 'utils/cryptoOperations';

// Hooks
import { useModal } from 'components/hooks/useModal';

import {
  NewTrackingWrapper,
  Info,
  Divider,
  SubmitWrapper,
  ItemWrapper,
} from './TrackInfectionModal.styled';

import { getTanRules, TAN_SECTION_LENGTH } from './InfectionModal.helper';

export const TrackInfectionModal = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const formReference = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, closeModal] = useModal();

  const refetchProcesses = () => {
    queryClient.invalidateQueries('processes');
    setIsLoading(false);
    closeModal();
  };

  const onSubmit = () => {
    formReference.current
      .validateFields()
      .then(() => {
        formReference.current.submit();
      })
      .catch(() => {
        notification.error({
          message: intl.formatMessage({
            id: 'modal.trackInfection.error.invalidTanFormat',
          }),
        });
      });
  };

  const onFinish = values => {
    const { tanChunk0, tanChunk1, tanChunk2 } = values;
    const tan = tanChunk0 + tanChunk1 + tanChunk2;
    const lang = intl.locale;
    setIsLoading(true);
    if (tan.endsWith('1')) {
      initiateUserTracingProcess(tan, lang)
        .then(response => {
          if (response === EMPTY_HISTORY) {
            notification.info({
              message: intl.formatMessage({
                id: 'modal.trackInfection.error.emptyUserTracing',
              }),
            });
          }
          if (response === INVALID_VERSION) {
            notification.error({
              message: intl.formatMessage({
                id: 'modal.trackInfection.error.invalidVersion',
              }),
            });
          }
          if (response === DECRYPTION_FAILED) {
            notification.error({
              message: intl.formatMessage({
                id: 'modal.trackInfection.error.decryptionFailed',
              }),
            });
          }

          refetchProcesses();
        })
        .catch(() => {
          setIsLoading(false);
          notification.error({
            message: intl.formatMessage({
              id: 'modal.trackInfection.error.userTracing',
            }),
          });
        });
    } else {
      initiateStaticUserTracingProcess(tan, lang)
        .then(refetchProcesses)
        .catch(error => {
          console.error(error);
          setIsLoading(false);
          notification.error({
            message: intl.formatMessage({
              id: 'modal.trackInfection.error.staticTracing',
            }),
          });
        });
    }
  };

  return (
    <NewTrackingWrapper>
      <Info>{intl.formatMessage({ id: 'modal.trackInfection.info' })}</Info>
      <Form
        onFinish={onFinish}
        ref={formReference}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        validateMessages={null}
      >
        <ItemWrapper>
          <Form.Item
            name="tanChunk0"
            style={{ width: '30%', margin: 0 }}
            rules={getTanRules(intl)}
            normalize={value => value.toUpperCase()}
          >
            <Input maxLength={TAN_SECTION_LENGTH} autoFocus />
          </Form.Item>
          <Divider> - </Divider>
          <Form.Item
            name="tanChunk1"
            style={{ width: '30%', margin: 0 }}
            rules={getTanRules(intl)}
            normalize={value => value.toUpperCase()}
          >
            <Input maxLength={TAN_SECTION_LENGTH} />
          </Form.Item>
          <Divider> - </Divider>
          <Form.Item
            name="tanChunk2"
            style={{ width: '30%', margin: 0 }}
            rules={getTanRules(intl)}
            normalize={value => value.toUpperCase()}
          >
            <Input maxLength={TAN_SECTION_LENGTH} />
          </Form.Item>
        </ItemWrapper>

        <SubmitWrapper>
          <Form.Item style={{ margin: '0 0 0 12px' }}>
            <Popconfirm
              placement="top"
              onConfirm={onSubmit}
              title={intl.formatMessage({
                id: 'modal.trackInfection.confirmation',
              })}
              okText={intl.formatMessage({
                id: 'modal.trackInfection.confirmButton',
              })}
              cancelText={intl.formatMessage({
                id: 'modal.trackInfection.declineButton',
              })}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button style={{ padding: '0 40px' }} loading={isLoading}>
                {intl.formatMessage({ id: 'modal.trackInfection.button' })}
              </Button>
            </Popconfirm>
          </Form.Item>
        </SubmitWrapper>
      </Form>
    </NewTrackingWrapper>
  );
};
