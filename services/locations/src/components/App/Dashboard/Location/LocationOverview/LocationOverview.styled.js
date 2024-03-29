import { Media } from 'utils/media';
import styled from 'styled-components';

export const GuestWrapper = styled.div`
  margin-top: 24px;
  padding: 0 32px 0;
`;

export const GuestHeader = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-family: Montserrat-Medium, sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
export const Info = styled.div`
  display: flex;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;

  ${Media.tablet`
    flex-direction: column;
    
    button {
      width: 100%;
      margin-top: 16px;
    }
  `}
`;

export const buttonStyles = {
  backgroundColor: 'rgb(195, 206, 217)',
  color: 'rgba(0, 0, 0, 0.87)',
  fontFamily: 'Montserrat-Bold, sans-serif',
  fontSize: 14,
  fontWeight: 'bold',
  padding: '0 40px',
};
