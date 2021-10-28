import { generateQRPayload } from '@lucaapp/cwa-event';
import { RESTAURANT_TYPE } from 'components/App/modals/CreateLocationModal/CreateLocationModalContent/CreateLocationModalContent.helper';

export const getLocationName = location =>
  location.name === null || location.name === undefined
    ? `${location.groupName}`
    : `${location.groupName} ${location.name}`;

const generateLocationCWAContentPart = location => {
  const address = `${location.streetName} ${location.streetNr}, ${location.zipCode} ${location.city}`;
  const description = getLocationName(location);
  const qrCodeContent = {
    description,
    address,
    defaultcheckinlengthMinutes: 120,
    locationType: location.type === RESTAURANT_TYPE ? 1 : 4,
  };
  return generateQRPayload(qrCodeContent);
};

export const getCWAFragment = (location, isCWAEventEnabled) =>
  isCWAEventEnabled ? `/CWA1/${generateLocationCWAContentPart(location)}` : '';
