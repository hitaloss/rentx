import styled from 'styled-components/native';
import { RFValue } from "react-native-responsive-fontsize"
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(126)}px;
  background-color: ${({theme}) => theme.colors.background[1]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View`
  
`;

export const Brand = styled.Text`
  font-family: ${({theme}) => theme.fonts.archivo_medium};
  color: ${({theme}) => theme.colors.caption};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.archivo_medium};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(15)}px;
  text-transform: capitalize;
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  color: ${({theme}) => theme.colors.caption};
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.archivo_medium};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  color: ${({theme}) => theme.colors.main.main};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.archivo_medium};
`;

export const Type = styled.View`
  color: ${({theme}) => theme.colors.caption};
`;

export const CarImage = styled.Image`
  width: 168px;
  height: 85px;
`;

