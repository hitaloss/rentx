import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface DateValueProps {
    selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background[2]};
`;

export const Header = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 325}px;
  background-color: ${({theme}) => theme.colors.header};
  padding: ${getStatusBarHeight() + 25}px 25px;
  justify-content: center;
  padding-top: ${getStatusBarHeight() + 50}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape.main};
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.archivo_medium};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
  color: ${({theme}) => theme.colors.shape.main};
  font-family: ${({theme}) => theme.fonts.inter_medium};
  font-size: ${RFValue(15)}px;

  ${({selected, theme}) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: 5px;
  `};
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 24
    },
    showsVerticalIndicator: false,
})`
  
`;

export const Footer = styled.View`
  padding: 24px;
`;
