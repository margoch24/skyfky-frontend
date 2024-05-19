import { Box, Typography } from "@mui/material";
import { FiltersBlockProps, OptionType, QueryType } from "common/types";
import { FC, memo, useEffect, useState } from "react";
import { CustomSwitch } from "./CustomSwitch";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkBlue, DarkColor } from "shared/constants/colors";
import { useQueryContext } from "common/hooks/queryContext";
import { DEFAULT_QUERY_FILTERS } from "pages/flights/constants";

interface OptionProps {
  defaultOptions?: OptionType[];
  title: string;
  index: number;
  value: string | number;
  queryKey: string;
}

export const FilterToggleOptionsList: FC<FiltersBlockProps> = memo(
  ({ values, queryKey }) => {
    const { options, defaultOptions } = values;

    return (
      <Box>
        {options?.map(({ title, value }, index) => (
          <Option
            defaultOptions={defaultOptions}
            index={index}
            value={value}
            title={title}
            key={index}
            queryKey={queryKey}
          />
        ))}
      </Box>
    );
  }
);

const Option: FC<OptionProps> = memo(
  ({ defaultOptions, index, value, title, queryKey }) => {
    const { setQuery, query = DEFAULT_QUERY_FILTERS } = useQueryContext();
    const queryOptions = query[queryKey as keyof QueryType];

    const isChecked = queryOptions
      ? !!(queryOptions as (string | number)[]).find(
          (queryOption) => queryOption === value
        )
      : !!defaultOptions?.find(
          (defaultOption) => defaultOption.value === value
        );
    const [checked, setChecked] = useState(isChecked || false);

    useEffect(() => {
      const newQueryOptions = query[queryKey as keyof QueryType];
      const newIsChecked = !!(newQueryOptions as (string | number)[]).find(
        (queryOption) => queryOption === value
      );

      setChecked(newIsChecked);
    }, [query, queryKey, value]);

    const handleChange = (newValue: boolean) => {
      setChecked(newValue);

      if (!query) {
        return;
      }

      const prevOptions =
        (query[queryKey as keyof QueryType] as (string | number)[]) ?? [];
      const optionExistsInQuery = prevOptions.find(
        (prevOption) => prevOption === value
      );

      if (!newValue && optionExistsInQuery) {
        const newOptions = prevOptions.filter(
          (prevOption) => prevOption !== value
        );
        setQuery((prevQuery) => ({ ...prevQuery, [queryKey]: newOptions }));
        return;
      }

      if (newValue && !optionExistsInQuery) {
        setQuery((prevQuery) => ({
          ...prevQuery,
          [queryKey]: [...prevOptions, value],
        }));
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ...(index !== 0 && { marginTop: "10px" }),
        }}
      >
        <CustomSwitch
          checked={checked}
          onChange={(value) => handleChange(value)}
        />
        <Typography
          sx={{
            marginLeft: "1rem",
            fontFamily: SubtitleFont,
            fontSize: "22px",
            color: checked ? DarkBlue : DarkColor,
          }}
        >
          {title}
        </Typography>
      </Box>
    );
  }
);
