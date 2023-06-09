import React from "react"
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

interface ContainerProps {
  isFocused: boolean;
}

interface VisibleButtonProps extends BorderlessButtonProps {
  children: React.ReactNode
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  ${({isFocused, theme}) => isFocused && css`
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.main.main};
  `};
`;

export const IconContainer = styled.View`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  background-color: ${({theme}) => theme.colors.background[2]};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  padding: 0 23px;
  font-family: ${({theme}) => theme.fonts.inter_regular};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.background[2]};
`;

export const VisibleButton = styled(BorderlessButton).attrs({
  rippleRadius: 0
})<VisibleButtonProps>``;

export const PasswordIconContainer = styled.View`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background[2]};
`;
