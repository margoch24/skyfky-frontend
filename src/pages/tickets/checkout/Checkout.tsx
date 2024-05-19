import { FC, memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "components/wrappers/CustomButton";
import {
  ButtonTheme,
  CurrencyEnum,
  CurrencyToSign,
  PagePath,
} from "shared/constants";
import { ElementProps } from "../TicketCreationPanel";
import { PassengerFinalCard } from "./PassengerFinalCard";
import { useQueryContext } from "common/hooks/queryContext";
import { getDiscounts } from "api/requests/settings/getDiscounts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DiscountType, QueryKeys, ResponseData } from "common/types";
import { debounce } from "common/helpers/debounce";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { showToastError, showToastSuccess } from "common/utils/toast";
import { TicketType } from "../types";
import { useUserContext } from "common/hooks/userContext";
import { postTicket } from "api/requests/tickets/postTicket";
import { useNavigate } from "react-router-dom";
import { AccountPanelPagesKeys } from "pages/account/constants";

export const Checkout: FC<ElementProps> = memo(
  ({ onPrevious, passengers, flight, setPassengers }) => {
    const navigate = useNavigate();
    const handlePrevious = () => {
      onPrevious?.();
    };

    const {
      adultAmount = 1,
      childAmount = 0,
      setAdultAmount,
      setChildAmount,
    } = useQueryContext();
    const { accessToken } = useUserContext();

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

    const fetchFunc = useCallback(async () => {
      return await Promise.all(
        passengers.map(async (passenger) => {
          return await postTicket(
            {
              name: passenger.name,
              surname: passenger.surname,
              date_of_birth: passenger.dateOfBirth.getTime(),
              flight_id: flight.id,
              seat_id: passenger?.seat?.id,
            },
            accessToken
          );
        })
      );
    }, [accessToken, passengers, flight]);

    const { mutate: mutatePostTickets } = useMutation<
      AxiosResponse<ResponseData<TicketType>>[]
    >({
      mutationFn: () => debounce(fetchFunc(), 500),
      onSuccess: (axiosResponse) => {
        if (!axiosResponse) {
          showToastError("Internal server error");
        }

        axiosResponse?.forEach((response, index) => {
          if (index > 0) {
            return;
          }

          const { error, data } = response?.data ?? {};

          if (error) {
            showToastError(data?.message || "Internal server error");
          }

          if (!data.id) {
            return;
          }

          showToastSuccess("Tickets booked successfully");
          navigate(
            `${PagePath.Account}?pageKey=${AccountPanelPagesKeys.FutureTickets}`
          );
          setPassengers([]);
          setAdultAmount(1);
          setChildAmount(0);
        });
      },
      onError: (err: Error) => {
        console.log(err);
        showToastError("Internal server error");
      },
    });

    const handleSubmit = () => {
      mutatePostTickets();
    };

    return (
      <Box
        sx={{
          marginTop: "5rem",
        }}
      >
        <Box>
          {passengers.map((passenger, index) => (
            <PassengerFinalCard
              key={index}
              passenger={passenger}
              flight={flight}
              index={index}
              adultsPrice={flight?.price || 0}
              childrenPrice={
                (flight?.price || 0) * Number(childDiscount?.value)
              }
              currency={currency}
              childDiscount={childDiscount}
            />
          ))}
        </Box>

        <Box
          sx={{
            marginTop: "3rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontFamily: SubtitleFont,
              color: DarkColor,
            }}
          >
            <span
              style={{
                fontSize: "22px",
                opacity: "60%",
              }}
            >
              Total amount of tickets:
            </span>{" "}
            {adultAmount + childAmount}
          </Typography>

          <Typography
            sx={{
              fontSize: "25px",
              fontFamily: SubtitleFont,
              color: DarkColor,
            }}
          >
            <span
              style={{
                fontSize: "22px",
                opacity: "60%",
              }}
            >
              Total price:
            </span>{" "}
            {adultsPrice + childrenPrice || adultsPrice} {currency}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
            margin: "5rem auto 0",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <CustomButton
              onClick={handlePrevious}
              title="Previous"
              theme={ButtonTheme.Dark}
            />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <CustomButton
              onClick={handleSubmit}
              title="Book tickets"
              theme={ButtonTheme.Dark}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);
