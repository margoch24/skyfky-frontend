import { FC, memo, useCallback, useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomDatePicker } from "components/wrappers/CustomDatePicker";
import {
  ValidationErrorMessages,
  validateIsEmpty,
} from "common/utils/validations";
import { PassengerInfoType, PassengerType } from "../types";
import { DarkColor } from "shared/constants/colors";
import { MAX_CHILD_AGE, MIN_ADULT_AGE } from "shared/constants";

interface PassengerInfoCardProps {
  onFinish?: (value: {
    data: PassengerInfoType | null;
    cardId: string;
  }) => void;
  index: number;
  type?: string;
  allPassengers?: number;
  passengers?: PassengerInfoType[];
  cardId?: string;
}

export const PassengerInfoCard: FC<PassengerInfoCardProps> = memo(
  ({
    index,
    type = PassengerType.Adult,
    onFinish,
    allPassengers = 1,
    cardId = "",
    passengers,
  }) => {
    const foundPassenger = passengers?.find(
      (passenger) => passenger.cardId === cardId
    );

    const [passengerInfo, setPassengerInfo] =
      useState<PassengerInfoType | null>(foundPassenger || null);

    const [name, setName] = useState<string>(foundPassenger?.name || "");
    const [surname, setSurname] = useState<string>(
      foundPassenger?.surname || ""
    );
    const [parent, setParent] = useState<string>(foundPassenger?.parent || "");

    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
      foundPassenger?.dateOfBirth || null
    );

    const [nameError, setNameError] = useState<string>("");
    const [surnameError, setSurnameError] = useState<string>("");
    const [parentError, setParentError] = useState<string>("");
    const [dateOfBirthError, setDateOfBirthError] = useState<string>("");

    const validateName = useCallback(() => {
      const isValid = validateIsEmpty(name);
      if (!isValid) {
        setNameError(ValidationErrorMessages.FieldRequired);
      }
      return isValid;
    }, [name]);

    const validateSurname = useCallback(() => {
      const isValid = validateIsEmpty(surname);
      if (!isValid) {
        setSurnameError(ValidationErrorMessages.FieldRequired);
      }
      return isValid;
    }, [surname]);

    const validateParent = useCallback(() => {
      const isValid = validateIsEmpty(parent);
      if (!isValid) {
        setParentError(ValidationErrorMessages.FieldRequired);
      }
      return isValid;
    }, [parent]);

    const validateDateByPassenger = useCallback(() => {
      const yearOfBirth = dateOfBirth?.getFullYear() ?? 0;
      const currentYear = new Date().getFullYear();
      const age = currentYear - yearOfBirth;

      if (type === PassengerType.Child && age > MAX_CHILD_AGE) {
        setDateOfBirthError(ValidationErrorMessages.ChildDateOfBirth);
        return false;
      }

      if (type === PassengerType.Adult && age < MIN_ADULT_AGE) {
        setDateOfBirthError(ValidationErrorMessages.AdultDateOfBirth);
        return false;
      }
      setDateOfBirthError("");
      return true;
    }, [dateOfBirth, type]);

    const validateDateOfBirth = useCallback(() => {
      if (!dateOfBirth) {
        setDateOfBirthError(ValidationErrorMessages.FieldRequired);
        return !!dateOfBirth;
      }

      return validateDateByPassenger();
    }, [dateOfBirth, validateDateByPassenger]);

    const validateAll = useCallback(() => {
      const validName = validateName();
      const validSurname = validateSurname();
      const validParent =
        type === PassengerType.Child ? validateParent() : true;
      const validDateOfBirth = validateDateOfBirth();

      return validName && validSurname && validParent && validDateOfBirth;
    }, [
      type,
      validateDateOfBirth,
      validateName,
      validateSurname,
      validateParent,
    ]);

    useEffect(() => {
      if (
        !name ||
        !surname ||
        !dateOfBirth ||
        (type === PassengerType.Child ? !parent : false)
      ) {
        setPassengerInfo(null);
        return;
      }

      if (!validateAll()) {
        setPassengerInfo(null);
        return;
      }

      const newPassengerInfo: PassengerInfoType = {
        ...(passengerInfo && { ...passengerInfo }),
        cardId,
        name,
        surname,
        dateOfBirth: dateOfBirth as Date,
        ...(type === PassengerType.Child && { parent }),
      };

      setPassengerInfo(newPassengerInfo);
    }, [
      name,
      surname,
      dateOfBirth,
      parent,
      type,
      cardId,
      passengerInfo,
      validateAll,
    ]);

    useEffect(() => {
      onFinish?.({ data: passengerInfo, cardId });
    }, [passengerInfo, onFinish, cardId]);

    return (
      <>
        <Box
          key={index}
          sx={{
            minWidth: "450px",
            width: "450px",
            margin: "5rem auto",
          }}
        >
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "28px",
            }}
          >
            Passenger {index}{" "}
            <span
              style={{
                fontFamily: TitleFont,
                fontSize: "20px",
                fontWeight: 200,
              }}
            >
              {type === PassengerType.Child ? "(Child)" : "(Adult)"}
            </span>
          </Typography>

          <CustomInput
            sx={{
              marginTop: "2rem",
            }}
            placeholder="Name"
            onFocus={() => {
              setNameError("");
            }}
            onBlur={validateName}
            onChange={(newName) => setName(newName as string)}
            error={nameError}
            value={name}
          />

          <CustomInput
            sx={{
              marginTop: "2rem",
            }}
            placeholder="Surname"
            onFocus={() => {
              setSurnameError("");
            }}
            onBlur={validateSurname}
            onChange={(newSurname) => setSurname(newSurname as string)}
            error={surnameError}
            value={surname}
          />

          {type === PassengerType.Child && (
            <CustomInput
              sx={{
                marginTop: "2rem",
              }}
              placeholder="Parent"
              onFocus={() => {
                setParentError("");
              }}
              onBlur={validateParent}
              onChange={(newParent) => setParent(newParent as string)}
              error={parentError}
              value={parent}
            />
          )}

          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "20px",
              marginTop: "3rem",
              marginBottom: "10px",
            }}
          >
            Date of birth
          </Typography>

          <CustomDatePicker
            label=""
            onBlur={validateDateOfBirth}
            onChange={(newDateOfBirth) => setDateOfBirth(newDateOfBirth)}
            error={dateOfBirthError}
            value={dateOfBirth}
            onAccept={validateDateByPassenger}
          />
        </Box>
        {index < allPassengers && (
          <Divider
            sx={{
              opacity: "50%",
              border: "none",
              height: "1px",
              background: `repeating-linear-gradient(90deg,${DarkColor},${DarkColor} 6px,transparent 6px,transparent 12px)`,
              position: "relative",
            }}
          />
        )}
      </>
    );
  }
);
