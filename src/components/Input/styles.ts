import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  inactive?: boolean;
}

interface InactiveProps {
  inactive?: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main.main};
  `};
  ${({inactive, theme}) => inactive && css`
    background-color: ${theme.colors.shape.main};
  `};
`;

export const IconContainer = styled.View<InactiveProps>`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  background-color: ${({theme}) => theme.colors.background[2]};
  ${({inactive, theme}) => inactive && css`
    background-color: ${theme.colors.shape.main};
  `};
`;

export const InputText = styled(TextInput)<InactiveProps>`
  flex: 1;
  padding: 0 23px;
  font-family: ${({theme}) => theme.fonts.inter_regular};
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.background[2]};
  ${({inactive, theme}) => inactive && css`
    background-color: ${theme.colors.shape.main};
  `};
`;
