import React, { useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form } from 'antd';
import { LoadScript } from '@react-google-maps/api';

import { GOOGLE_LIBRARIES, GOOGLE_MAPS_API_KEY } from 'constants/googleApi';
import { LocationSearch } from './LocationSearch';
import { FormFields } from './FormFields';
import { ManualAddressText } from '../../../generalOnboarding/ManualAddressText';
import {
  ManualInputButton,
  nextButtonStyles,
  disabledStyles,
  backButtonStyles,
  Wrapper,
  Header,
  Description,
  ButtonWrapper,
} from '../../../generalOnboarding/Onboarding.styled';

export const AddressInput = ({
  address: currentAddress,
  setAddress,
  groupType,
  back,
  next,
}) => {
  const intl = useIntl();
  const formReference = useRef(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [temporaryAddress, setTemporaryAddress] = useState(currentAddress);
  const [isError, setIsError] = useState(false);
  const [filled, setFilled] = useState(!!temporaryAddress);
  const [disabled, setDisabled] = useState(true);

  const onFinish = async values => {
    setTemporaryAddress(values);
    setAddress(values);
    next();
  };

  return (
    <Wrapper>
      <Header>
        {intl.formatMessage({
          id: `modal.createGroup.addressInput.${groupType}.title`,
        })}
      </Header>
      <Description>
        {intl.formatMessage({
          id: `modal.createGroup.addressInput.${groupType}.description`,
        })}
      </Description>
      <Description
        style={{ fontWeight: 'bold', fontFamily: 'Montserrat-bold,sans-serif' }}
      >
        {intl.formatMessage({
          id: 'modal.addressInput.help.description',
        })}
      </Description>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={GOOGLE_LIBRARIES}
      >
        <Form
          ref={formReference}
          onFinish={onFinish}
          initialValues={temporaryAddress}
        >
          <LocationSearch
            formReference={formReference}
            setFilled={setFilled}
            setDisabled={setDisabled}
            isError={isError}
            setIsError={setIsError}
          />
          <ManualInputButton
            data-cy="manuellSearch"
            onClick={() => {
              setDisabled(false);
              setShowManualInput(true);
            }}
          >
            {intl.formatMessage({ id: 'addressInput.manualInputTitle' })}
          </ManualInputButton>
          {showManualInput && <ManualAddressText />}
          <FormFields show={filled || showManualInput} disabled={disabled} />
          <ButtonWrapper multipleButtons>
            <Button style={backButtonStyles} onClick={back}>
              {intl.formatMessage({
                id: 'authentication.form.button.back',
              })}
            </Button>
            <Button
              data-cy="proceed"
              disabled={isError || (!filled && !showManualInput)}
              style={
                isError || (!filled && !showManualInput)
                  ? disabledStyles
                  : nextButtonStyles
              }
              onClick={() => formReference.current.submit()}
            >
              {intl.formatMessage({
                id: 'authentication.form.button.next',
              })}
            </Button>
          </ButtonWrapper>
        </Form>
      </LoadScript>
    </Wrapper>
  );
};
