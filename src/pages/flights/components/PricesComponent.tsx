import { FC, memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { FlightType } from "../types";
import { useQueryContext } from "common/hooks/queryContext";
import { getDiscounts } from "api/requests/settings/getDiscounts";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DiscountType, QueryKeys, ResponseData } from "common/types";
import { debounce } from "common/helpers/debounce";
import { CurrencyEnum, CurrencyToSign } from "shared/constants";

interface PricesComponentProps {
  flight?: FlightType;
}

export const PricesComponent: FC<PricesComponentProps> = memo(({ flight }) => {
  const { adultAmount, childAmount } = useQueryContext();
  const fetchDiscountsFunc = useCallback(async () => {
    return await getDiscounts();
  }, []);

  const { data: discountsAxiosData } = useQuery<
    AxiosResponse<ResponseData<DiscountType[]>>
  >({
    queryKey: [QueryKeys.GetDiscounts],
    queryFn: () => debounce(fetchDiscountsFunc(), 500),
    refetchOnWindowFocus: false,
  });

  const discounts = discountsAxiosData?.data?.data ?? [];
  const childDiscount = discounts?.find(
    (discount) => discount.key === "ticket_child_discount"
  );

  const adultsPrice = (flight?.price || 0) * (adultAmount || 1);
  const childrenPrice =
    (flight?.price || 0) * (childAmount || 0) * Number(childDiscount?.value);

  const currency = CurrencyToSign[flight?.currency || CurrencyEnum.EUR];

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: SubtitleFont,
          opacity: "60%",
          color: DarkColor,
          marginTop: "40px",
        }}
      >
        Price per passenger
      </Typography>
      <Typography
        sx={{
          fontFamily: TitleFont,
          color: DarkColor,
          fontSize: "28px",
        }}
      >
        {flight?.price} {currency}
      </Typography>

      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: SubtitleFont,
          opacity: "60%",
          color: DarkColor,
          marginTop: "40px",
        }}
      >
        Price for all passengers
      </Typography>
      <Typography
        sx={{
          fontFamily: TitleFont,
          color: DarkColor,
          fontSize: "28px",
        }}
      >
        {adultsPrice + childrenPrice || adultsPrice} {currency}
      </Typography>
    </Box>
  );
});
