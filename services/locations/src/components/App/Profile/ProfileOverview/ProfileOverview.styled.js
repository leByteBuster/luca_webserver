import styled from 'styled-components';
import { Form } from 'antd';

export const ProfileContent = styled.div`
  padding: 24px 32px;
  background-color: white;
`;

export const Heading = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

export const Overview = styled.div`
  border-bottom: 1px solid rgb(151, 151, 151);
`;

export const contentStyles = {
  backgroundColor: '#f3f5f7',
};

export const sliderStyles = {
  ...contentStyles,
  borderRight: '1px solid rgb(151, 151, 151)',
};

export const StyledForm = styled(Form)`
  max-width: 350px;
`;
