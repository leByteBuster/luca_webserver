import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';
import {
  PrimaryButton,
  SecondaryButton,
} from 'components/general/Buttons.styled';

import {
  CardTitle,
  CardSubTitle,
  ButtonWrapper,
  Step,
} from 'components/Authentication/Authentication.styled';
import { useEmailValidator } from 'components/hooks/useValidators';

export const ConfirmRegistrationStep = ({
  email,
  setEmail,
  next,
  back,
  navigation,
}) => {
  const intl = useIntl();
  const emailValidator = useEmailValidator();

  const onFinish = values => {
    setEmail(values.email);
    next();
  };

  return (
    <>
      <Step>{navigation}</Step>
      <CardTitle data-cy="confirmRegister">
        {intl.formatMessage({
          id: 'authentication.confirmRegister.title',
        })}
      </CardTitle>
      <CardSubTitle>
        {intl.formatMessage({
          id: 'authentication.confirmRegister.subTitle',
        })}
      </CardSubTitle>
      <Form onFinish={onFinish} initialValues={{ email }}>
        <Form.Item
          colon={false}
          label={intl.formatMessage({
            id: 'registration.form.email',
          })}
          name="email"
          rules={emailValidator}
        >
          <Input
            id="emailDisabled"
            disabled
            style={{
              border: '1px solid #696969',
              backgroundColor: 'transparent',
            }}
          />
        </Form.Item>

        <ButtonWrapper multipleButtons>
          <SecondaryButton onClick={back}>
            {intl.formatMessage({
              id: 'authentication.form.button.back',
            })}
          </SecondaryButton>
          <PrimaryButton
            $isButtonWhite
            htmlType="submit"
            data-cy="confirmRegisterButton"
          >
            {intl.formatMessage({
              id: 'authentication.form.button.next',
            })}
          </PrimaryButton>
        </ButtonWrapper>
      </Form>
    </>
  );
};