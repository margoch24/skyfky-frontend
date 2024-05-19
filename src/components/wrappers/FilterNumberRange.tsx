import { Box, Typography } from "@mui/material";
import { FiltersBlockProps, QueryType } from "common/types";
import { FC, memo, useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { DarkColor, MainColor } from "shared/constants/colors";
import { CURRENCIES, CurrencyToSign } from "shared/constants";
import { TitleFont } from "shared/constants/fonts";
import { useQueryContext } from "common/hooks/queryContext";
import { DEFAULT_QUERY_FILTERS } from "pages/flights/constants";

export const FilterNumberRange: FC<FiltersBlockProps> = memo(
  ({ values, queryKey }) => {
    const { max, min, defaultMaxValue = 1, defaultMinValue = 0, step } = values;
    const { setQuery, query = DEFAULT_QUERY_FILTERS } = useQueryContext();
    const defaultCurrency =
      CurrencyToSign[
        CURRENCIES.find((currency) => currency?.default)?.value || ""
      ];

    const { min: queryMin, max: queryMax } = query[
      queryKey as keyof QueryType
    ] as { min?: number; max?: number };

    const [minValue, setMinValue] = useState<number>(
      queryMin || defaultMinValue
    );
    const [maxValue, setMaxValue] = useState<number>(
      queryMax || defaultMaxValue
    );

    const handleSliderChange = ({
      minValue: newMinValue,
      maxValue: newMaxValue,
    }: {
      minValue: number;
      maxValue: number;
    }) => {
      setMinValue(newMinValue);
      setMaxValue(newMaxValue);
    };

    useEffect(() => {
      setQuery((prevQuery) => ({
        ...prevQuery,
        [queryKey]: { min: minValue, max: maxValue },
      }));
    }, [minValue, maxValue, queryKey, setQuery]);

    useEffect(() => {
      const { min: newQueryMin = 0, max: newQueryMax = 1 } = query[
        queryKey as keyof QueryType
      ] as { min?: number; max?: number };
      setMinValue(newQueryMin);
      setMaxValue(newQueryMax);
    }, [query, queryKey]);

    return (
      <Box
        sx={{
          marginTop: "2rem",
          "& .multi-range-slider .thumb .caption span": {
            display: "none",
          },

          "& .multi-range-slider .thumb::before": {
            width: "10px",
            height: "10px",
            boxShadow: "none",
            marginTop: "-5px",
            border: `solid 4px ${MainColor}`,
            background: MainColor,
          },

          "& .multi-range-slider .bar .bar-left": {
            padding: "2px 0",
            boxShadow: "none",
          },

          "& .multi-range-slider .bar .bar-inner": {
            boxShadow: "none",
            border: `solid 4px ${MainColor}`,
          },
          "& .multi-range-slider .bar .bar-right": {
            boxShadow: "none",
          },

          "& .caption": {
            display: "flex",
          },

          "& .caption span": {
            display: "block !important",
          },

          "& .multi-range-slider .thumb .caption *": {
            backgroundColor: "transparent",
            boxShadow: "none",
            color: MainColor,
            fontSize: "20px",
            fontFamily: TitleFont,
            fontWeight: 200,
          },
        }}
      >
        <MultiRangeSlider
          className="mb-8"
          style={{
            border: "none",
            boxShadow: "none",
            padding: 0,
          }}
          label={false}
          ruler={false}
          barInnerColor={MainColor}
          barLeftColor="rgba(111, 130, 170, 0.2)"
          barRightColor="rgba(111, 130, 170, 0.2)"
          min={min}
          max={max}
          minValue={minValue}
          maxValue={maxValue}
          onChange={handleSliderChange}
          // onChange={handleSliderChange}
          step={step}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: TitleFont,
              color: DarkColor,
              fontWeight: 200,
            }}
          >
            {min} {defaultCurrency}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: TitleFont,
              color: DarkColor,
              fontWeight: 200,
            }}
          >
            {max} {defaultCurrency}
          </Typography>
        </Box>
      </Box>
    );
  }
);
