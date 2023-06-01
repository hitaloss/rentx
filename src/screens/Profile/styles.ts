import React from 'react';
import styled, { css } from 'styled-components/native';
import { BorderlessButton, BorderlessButtonProps, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface GestureButtonProps extends BorderlessButtonProps {
  children: React.ReactNode;
}

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background[1]};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  background-color: ${({theme}) => theme.colors.header};
  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({theme}) => theme.fonts.archivo_semibold};
  color: ${({theme}) => theme.colors.background[2]};
`;

export const LogoutButton = styled(BorderlessButton)<GestureButtonProps>``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${({theme}) => theme.colors.shape.main};
  margin-top: 48px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)<GestureButtonProps>`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: ${({theme}) => theme.colors.main.main};
  border-radius: 5px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.line};
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  ${({active}) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${({theme}) => theme.colors.main.main};
  `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  color: ${({theme, active}) => 
    active ? theme.colors.header : theme.colors.caption};
  font-family: ${({theme, active}) =>
    active ? theme.fonts.archivo_semibold : theme.fonts.archivo_medium
  };
`;

export const Section = styled.View`
  
`;
