import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background[1]};
`;

export const Header = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 325}px;
  background-color: ${({theme}) => theme.colors.header};
  padding: ${getStatusBarHeight() + 25}px 25px;
  justify-content: center;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape.main};
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const Subtitle = styled.Text`
  color: ${({theme}) => theme.colors.shape.main};
  font-family: ${({theme}) => theme.fonts.archivo_regular};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.inter_regular};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsAmount = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.inter_medium};
  font-size: ${RFValue(15)}px;
`;

export const CarWraper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background[2]};
`;

export const CarFooterTitle = styled.Text`
  color: ${({theme}) => theme.colors.caption};
  font-family: ${({theme}) => theme.fonts.archivo_medium};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.inter_regular};
  font-size: ${RFValue(13)}px;
`;
