import { FC, memo } from "react";
import { Box } from "@mui/material";
import { FILTERS } from "../constants";
import { FilterBlock } from "components/wrappers/FilterBlock";

export const SideFilters: FC = memo(() => {
  return (
    <Box>
      {FILTERS.map(({ title, type, values, queryKey }, index) => (
        <FilterBlock
          sx={{
            ...(index !== 0 && { marginTop: "3rem" }),
          }}
          key={index}
          title={title}
          type={type}
          values={values}
          queryKey={queryKey}
        />
      ))}
    </Box>
  );
});
