import { FC, memo } from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";
import { DarkBlue } from "shared/constants/colors";

interface CustomSwitchProps {
  onChange?: (value: boolean) => void;
  checked?: boolean;
}

export const CustomSwitch: FC<CustomSwitchProps> = memo(
  ({ onChange, checked }) => {
    const handleChange = (value: boolean) => {
      onChange?.(value);
    };

    return (
      <Switch
        variant={checked ? "solid" : "outlined"}
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event.target.checked)
        }
        sx={(theme) => ({
          display: "inherit",
          "--Switch-trackWidth": "40px",
          "--Switch-trackHeight": "20px",
          "--Switch-thumbSize": "15px",
          "--Switch-thumbBackground": DarkBlue,
          "--Switch-trackBorderColor": DarkBlue,
          "--Switch-trackBackground": theme.vars.palette.background.body,
          "&:hover": {
            "--Switch-trackBorderColor": DarkBlue,
            "--Switch-trackBackground": theme.vars.palette.background.body,
          },
          [`&.${switchClasses.checked}`]: {
            "--Switch-trackBackground": DarkBlue,
            "&:hover": {
              "--Switch-trackBackground": DarkBlue,
            },
          },
          [`&.${switchClasses.disabled}`]: {
            "--Switch-thumbColor": "#C8C6C4",
            "--Switch-trackBorderColor": "#C8C6C4",
          },
          [`&.${switchClasses.disabled}.${switchClasses.checked}`]: {
            "--Switch-trackBackground": "#C8C6C4",
            "--Switch-thumbColor": "#F3F2F1",
          },
          [theme.getColorSchemeSelector("dark")]: {
            "--Switch-trackBorderColor": "rgb(161, 159, 157)",
            "--Switch-trackBackground": "rgb(27, 26, 25)",
            "--Switch-thumbBackground": "rgb(161, 159, 157)",
            "&:hover": {
              "--Switch-trackBorderColor": "#fff",
              "--Switch-thumbBackground": "#fff",
            },
            [`&.${switchClasses.checked}`]: {
              "--Switch-trackBackground": "rgb(40, 153, 245)",
              "--Switch-thumbBackground": "rgb(27, 26, 25)",
              "&:hover": {
                "--Switch-trackBackground": "rgb(108, 184, 246)",
              },
            },
          },
        })}
      />
    );
  }
);
