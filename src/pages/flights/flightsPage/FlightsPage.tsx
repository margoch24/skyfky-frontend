import { FC, memo, useCallback, useEffect } from "react";
import { Layout } from "components/layout/Layout";
import { Box, Grid, Typography } from "@mui/material";
import AirplineWingBg from "/assets/airplane_wing_bg.png";
import { TopFilters } from "./TopFilters";
import { SideFilters } from "./SideFilters";
import { useInView } from "react-intersection-observer";
import { getFlights } from "api/requests/flights/getFlights";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlightType } from "../types";
import { PreparedQueryType, QueryKeys, ResponseData } from "common/types";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { ButtonTheme, DEFAULT_LIMIT, PagePath } from "shared/constants";
import { ClipLoader } from "react-spinners";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { FlightCard } from "../FlightCard";
import { CustomButton } from "components/wrappers/CustomButton";
import { useUserContext } from "common/hooks/userContext";
import { useNavigate } from "react-router-dom";
import { useQueryContext } from "common/hooks/queryContext";
import { DEFAULT_QUERY_FILTERS } from "../constants";
import { prepareQuery } from "common/helpers/query";

export const FlightsPage: FC = memo(() => {
  const { ref, inView } = useInView();
  const { isAdmin } = useUserContext();
  const { setQuery, query } = useQueryContext();
  const navigate = useNavigate();

  const fetchFunc = useCallback(
    async (pageParam: unknown) => {
      if (pageParam === 0) {
        window.scrollTo(0, 0);
      }
      const preparedQuery = prepareQuery(query);
      const params = {
        ...preparedQuery,
        page: String(pageParam),
        limit: DEFAULT_LIMIT,
      };
      return await getFlights(params as PreparedQueryType);
    },
    [query]
  );

  const {
    data: axiosResponse,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery<AxiosResponse<ResponseData<FlightType[]>>>({
    queryKey: [QueryKeys.GetPaginatedFlights, query],
    queryFn: ({ pageParam }) => debounce(fetchFunc(pageParam), 500),
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getPreviousPageParam: (_, allPages) => {
      return allPages?.length - 1 - 1;
    },
    getNextPageParam: (_, allPages) => {
      return allPages?.length - 1 + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const pages = axiosResponse?.pages;

  const handleResetAll = () => {
    setQuery(DEFAULT_QUERY_FILTERS);
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundImage: `url(${AirplineWingBg})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "350px",
          position: "relative",
        }}
      >
        <TopFilters />
      </Box>

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "1576px",
          maxWidth: "1576px",
          margin: "5rem auto",
        }}
      >
        <Box
          sx={{
            width: "25%",
            textAlign: "center",
          }}
        >
          <SideFilters />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              margin: "auto",
            }}
          >
            <CustomButton
              onClick={handleResetAll}
              sx={{
                marginTop: "3rem",
              }}
              title="Reset all"
              theme={ButtonTheme.Transparent}
            />

            {isAdmin && (
              <CustomButton
                sx={{
                  marginTop: "3rem",
                }}
                onClick={() => navigate(PagePath.CreateFlight)}
                title="Add new flight"
                theme={ButtonTheme.Transparent}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "75%",
            overflow: "auto",
            padding: "0 10px 10px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid
            sx={{
              justifyContent: isLoading ? "center" : "left",
              marginLeft: "auto",
              width: "100%",
            }}
            container
            spacing={4}
          >
            {isLoading ? (
              <Box
                sx={{
                  marginTop: "2rem",
                }}
              >
                <ClipLoader size={40} />
              </Box>
            ) : (
              (pages ?? [])?.map((flightsPage, pageIndex) => {
                const pageRecordsAmount = flightsPage?.data?.data?.length;

                if (pageRecordsAmount <= 0 && pageIndex === 0) {
                  return (
                    <Typography
                      key={pageIndex}
                      sx={{
                        fontFamily: TitleFont,
                        color: DarkColor,
                        marginTop: "2rem",
                        fontSize: "25px",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      No flights were found
                    </Typography>
                  );
                }

                return (flightsPage?.data?.data ?? [])?.map((flight, index) => {
                  if (
                    pageIndex === (pages?.length || 0) - 1 &&
                    index === pageRecordsAmount - 1
                  ) {
                    return (
                      <Grid key={flight?.id} item xs={4}>
                        <FlightCard lastCardRef={ref} flight={flight} />
                      </Grid>
                    );
                  }
                  return (
                    <Grid key={flight?.id} item xs={4}>
                      <FlightCard flight={flight} />
                    </Grid>
                  );
                });
              })
            )}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
});
