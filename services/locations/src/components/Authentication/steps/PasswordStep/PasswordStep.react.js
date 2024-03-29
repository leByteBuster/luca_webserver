import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, notification, Button } from 'antd';
import { useHistory } from 'react-router';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

// Api
import { login } from 'network/api';

// Constants
import { BASE_GROUP_ROUTE } from 'constants/routes';

// Components
import {
  backButtonStyles,
  nextButtonStyles,
  ButtonWrapper,
  CardTitle,
} from 'components/Authentication/Authentication.styled';
import { ForgotPasswordLink } from './ForgotPasswordLink';
import { ErrorMessage } from './PasswordStep.styled';

export const PasswordStep = ({ email, back }) => {
  const intl = useIntl();
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLoginErrors = response => {
    if (response.status === 429) {
      setError({
        message: 'registration.server.error.tooManyRequests.title',
      });
      // Too many requests
      notification.error({
        message: intl.formatMessage({
          id: 'registration.server.error.tooManyRequests.title',
        }),
        description: intl.formatMessage({
          id: 'registration.server.error.tooManyRequests.desc',
        }),
      });
      return;
    }
    if (response.status === 423) {
      setError({
        message: 'registration.server.error.notActivated.title',
      });
      // Not activated
      notification.error({
        message: intl.formatMessage({
          id: 'registration.server.error.notActivated.title',
        }),
        description: intl.formatMessage({
          id: 'registration.server.error.notActivated.desc',
        }),
      });
      return;
    }
    setError({
      message: 'login.error',
    });
    notification.error({
      message: intl.formatMessage({
        id: 'notification.login.error',
      }),
    });
  };

  const onFinish = values => {
    const { password } = values;
    login({ username: email, password })
      .then(response => {
        if (response.status !== 200) {
          handleLoginErrors(response);
          return;
        }
        setError(null);
        history.push(BASE_GROUP_ROUTE);
      })
      .catch(() => {
        notification.error({
          message: intl.formatMessage({
            id: 'registration.server.error.msg',
          }),
          description: intl.formatMessage({
            id: 'registration.server.error.desc',
          }),
        });
      });
  };

  return (
    <>
      <CardTitle>
        {intl.formatMessage({
          id: 'authentication.login.title',
        })}
      </CardTitle>
      <Form onFinish={onFinish}>
        <Form.Item
          colon={false}
          label={intl.formatMessage({
            id: 'registration.form.password',
          })}
          name="password"
        >
          <Input.Password
            autoFocus
            autoComplete="current-password"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              border: '1px solid #696969',
              backgroundColor: 'transparent',
            }}
          />
        </Form.Item>

        {error && (
          <ErrorMessage data-cy="loginError">
            {intl.formatMessage({
              id: error.message,
            })}
          </ErrorMessage>
        )}
        <ForgotPasswordLink email={email} />
        <ButtonWrapper multipleButtons>
          <Button style={backButtonStyles} onClick={back}>
            {intl.formatMessage({
              id: 'authentication.form.button.back',
            })}
          </Button>
          <Button style={nextButtonStyles} htmlType="submit">
            {intl.formatMessage({
              id: 'authentication.form.button.login',
            })}
          </Button>
        </ButtonWrapper>
      </Form>
    </>
  );
};
