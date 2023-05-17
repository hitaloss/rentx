import addDays from "date-fns/addDays";
import { Platform } from "react-native"

import SpeedSvg from "./../assets/Speed.svg";
import AccelerationSvg from "./../assets/up.svg";
import HandlingSvg from "./../assets/Steering_wheel.svg";
import GasSvg from "./../assets/Gasoline.svg";
import EnergySvg from "../assets/Energy.svg"
import HybridSvg from "../assets/Hybrid.svg"
import GearSvg from "./../assets/Gear.svg";
import PersonSvg from "./../assets/Account.svg";
import CarSvg from "../assets/Car.svg"

function getAccessoryIcon(type: string) {
  switch (type) {
    case "speed":
      return SpeedSvg;
    case "acceleration":
      return AccelerationSvg;
    case "turning_diameter":
      return HandlingSvg;
    case "gasoline_motor":
      return GasSvg;
    case "electric_motor":
      return EnergySvg;
    case "hybrid_motor":
      return HybridSvg;
    case "exchange":
      return GearSvg;
    case "seats":
      return PersonSvg;
    default:
      return CarSvg;
  }
}

type PlatformConstantsSubset = {
  Manufacturer: string;
};

function getPlatformDate(date: Date) {
  if (Platform.OS === "ios" || (Platform.constants as PlatformConstantsSubset).Manufacturer === "Xiaomi") {
    return addDays(date, 1)
  } else {
    return date
  }
}
export {getPlatformDate, getAccessoryIcon}
