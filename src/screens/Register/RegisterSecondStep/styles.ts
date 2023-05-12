import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({theme}) => theme.colors.background[1]};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  color: ${({theme}) => theme.colors.title};
  margin: 60px 0 16px;
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.inter_regular};
  color: ${({theme}) => theme.colors.caption};
  line-height: ${RFValue(25)}px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0 16px;
  gap: 8px;
`;

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  color: ${({theme}) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-bottom: 16px;
`;
