import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { ICar } from "../../interfaces/cars";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape.main};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inter_medium};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.inter_regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList<ICar>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const UserCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  background-color: ${({theme}) => theme.colors.main.main};
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  position: absolute;
  bottom: 13px;
  right: 22px;
`;
