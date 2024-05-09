import { Dialog, SxProps } from "@mui/material";
import { FC, ReactNode, memo } from "react";

interface CustomPopupProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  children?: ReactNode;
}

export const CustomPopup: FC<CustomPopupProps> = memo(
  ({ open, onClose, children, sx = {} }) => {
    return (
      <Dialog
        sx={{
          ...sx,
        }}
        onClose={onClose}
        open={open}
      >
        {children}
      </Dialog>
    );
  }
);
