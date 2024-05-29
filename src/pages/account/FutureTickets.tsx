import { Box, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFutureTickets } from "api/requests/tickets/getFutureTickets";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { useUserContext } from "common/hooks/userContext";
import { QueryKeys, ResponseData } from "common/types";
import { TicketCard } from "pages/tickets/ticket/TicketCard";
import { TicketType } from "pages/tickets/types";
import { FC, memo, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { DEFAULT_LIMIT } from "shared/constants";
import { DarkColor } from "shared/constants/colors";
import { TitleFont } from "shared/constants/fonts";

export const FutureTickets: FC = memo(() => {
  const { ref, inView } = useInView();
  const { accessToken, isAdmin, user } = useUserContext();

  const fetchFunc = useCallback(
    async (pageParam: unknown) => {
      const params = {
        page: String(pageParam),
        limit: DEFAULT_LIMIT,
      };
      return await getFutureTickets(params, accessToken, isAdmin);
    },
    [accessToken, isAdmin]
  );

  const {
    data: axiosResponse,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery<AxiosResponse<ResponseData<TicketType[]>>>({
    queryKey: [QueryKeys.GetFutureTickets, user],
    queryFn: ({ pageParam }) => debounce(fetchFunc(pageParam), 500),
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getPreviousPageParam: (_, allPages) => {
      return allPages.length - 1 - 1;
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length - 1 + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const pages = axiosResponse?.pages;

  return (
    <Box>
      <Box
        sx={{
          minHeight: "800px",
          height: "889px",
          overflow: "auto",
          padding: "10px",
          marginTop: "-8rem",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            <ClipLoader size={40} />
          </Box>
        ) : (
          (pages ?? [])?.map((ticketsPage, pageIndex) => {
            const pageRecordsAmount = ticketsPage?.data?.data?.length;

            if (pageRecordsAmount <= 0 && pageIndex === 0) {
              return (
                <Typography
                  key={pageIndex}
                  sx={{
                    fontFamily: TitleFont,
                    color: DarkColor,
                    marginTop: "5rem",
                    fontSize: "25px",
                  }}
                >
                  No future tickets were found
                </Typography>
              );
            }

            return (ticketsPage?.data?.data ?? [])?.map((ticket, index) => {
              if (
                pageIndex === (pages?.length || 0) - 1 &&
                index === pageRecordsAmount - 1
              ) {
                return (
                  <TicketCard
                    lastTicketRef={ref}
                    key={ticket?.id}
                    ticket={ticket}
                  />
                );
              }
              return <TicketCard key={ticket?.id} ticket={ticket} />;
            });
          })
        )}
      </Box>
    </Box>
  );
});
