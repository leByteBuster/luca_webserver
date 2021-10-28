import styled from 'styled-components';
import { Media } from 'utils/media';
import { TimePicker } from 'antd';

const font = 'Montserrat-Bold, sans-serif';

export const Wrapper = styled.div`
  width: 750px;

  ${Media.tablet`
    width: 80vw;
  `}
`;

export const ManualInputInfo = styled.div`
  font-size: 14px;
  font-weight: ${({ highlight }) => (highlight ? 600 : 500)};
  letter-spacing: 0;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.87);
  font-family: ${({ highlight }) =>
      highlight ? 'Montserrat-Bold' : 'Montserrat-Medium'},
    sans-serif;
  margin-bottom: ${({ isLast }) => (isLast ? 8 : 0)}px;
  margin-top: ${({ isLast }) => (isLast ? 24 : 0)}px;
`;
export const ManualInputButton = styled.div`
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  user-select: none;
  letter-spacing: 0;
  color: rgb(0, 0, 0);
  margin-bottom: 16px;
  text-decoration: underline;
  font-family: Montserrat-SemiBold, sans-serif;
`;

export const Header = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-family: ${font};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const Description = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: ${({ multipleButtons }) =>
    multipleButtons ? 'space-between' : 'flex-end'};
  margin-top: 24px;

  ${Media.mobile`
    margin-top: 40px;
    flex-direction: column;  
  `}
`;

export const StyledTimePicker = styled(TimePicker)`
  width: 200px;
`;
