import { PassengerInfoType } from "pages/tickets/types";

export const sortAscPassengers = (
  firstPassenger: PassengerInfoType,
  secondPassenger: PassengerInfoType
) => {
  const firstPassengerIndex = parseInt(firstPassenger.cardId.split("_")[1]);
  const secondPassengerIndex = parseInt(secondPassenger.cardId.split("_")[1]);
  return firstPassengerIndex - secondPassengerIndex;
};
