import { Box, Typography } from "@mui/material";
import { FiltersBlockProps } from "common/types";
import { FC, memo } from "react";
import { FilterBlockTypeToComponentMap } from "shared/constants";
import { TitleFont } from "shared/constants/fonts";

export const FilterBlock: FC<FiltersBlockProps> = memo(
  ({ title, type, values, sx, queryKey }) => {
    const Element = FilterBlockTypeToComponentMap[type];
    return (
      <Box
        sx={{
          border: "1px solid rgba(115, 145, 150, 0.5)",
          ...sx,
        }}
      >
        <Box
          sx={{
            padding: "10px 20px 5px",
            background: "rgba(115, 145, 150, 0.5)",
          }}
        >
          <Typography
            sx={{
              fontFamily: TitleFont,
              color: "white",
              fontSize: "24px",
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "2rem",
          }}
        >
          <Element
            queryKey={queryKey}
            title={title}
            type={type}
            values={values}
          />
        </Box>
      </Box>
    );
  }
);
