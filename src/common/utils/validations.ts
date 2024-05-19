export enum ValidationErrorMessages {
  FieldRequired = "Field is required",
  ValidEmailRequired = "Please enter valid email address",
  ValidPasswordRequired = "Your password is not strong enough",
  PasswordsNotMatch = "Passwords do not match",
  ChildDateOfBirth = "Child age should be under 18",
  AdultDateOfBirth = "Adult age should be over 18",
  SameDestination = "You have already specified this airport. Please specify another one",
}

export const validateIsEmpty = (value: string): boolean => {
  return value?.length > 0;
};

export const isEmailValid = (email: string) => {
  const emailPattern = /[a-zA-Z0-9.+-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;

  return emailPattern.test(email);
};

export const isPaswordValid = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  return true;
};

export const checkPasswordsMatch = (
  password: string,
  repeatPassword: string
) => {
  if (repeatPassword !== password) {
    return false;
  }

  return true;
};
