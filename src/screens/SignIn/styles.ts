import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({theme}) => theme.colors.background[1]};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 115}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  color: ${({theme}) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.inter_regular};
  color: ${({theme}) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
  gap: 8px;
`;

export const Footer = styled.View`
  gap: 8px;
`;
