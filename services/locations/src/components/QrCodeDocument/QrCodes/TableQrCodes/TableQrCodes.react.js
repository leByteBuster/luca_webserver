import React from 'react';
import { useIntl } from 'react-intl';

import { QrCodeComponent } from '../QrCodeComponent';
import { Row, Item, Text } from '../../QrCodeDocument.styled';

export const TableQrCodes = ({ location, qrData }) => {
  const intl = useIntl();

  return (
    <>
      {qrData.map(rows => (
        <Row key={rows.rowIndex}>
          {rows.qrCodes.map(({ key, value, title }) => {
            return (
              <Item key={value}>
                <Text style={{ marginBottom: 20 }}>{title}</Text>
                <QrCodeComponent
                  scannerId={location.scannerId}
                  valueKey={key}
                  value={value}
                />

                <Text style={{ marginTop: 15 }}>
                  {intl.formatMessage({
                    id: 'modal.qrCodeDocument.message',
                  })}
                </Text>
              </Item>
            );
          })}
        </Row>
      ))}
    </>
  );
};
