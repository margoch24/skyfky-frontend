import { Box, Typography } from "@mui/material";
import { FC, memo, useCallback, useEffect } from "react";
import { Layout } from "components/layout/Layout";
import { DarkColor } from "shared/constants/colors";
import { useCustomUrlQuery } from "common/helpers/query";
import { getCheckTicket } from "api/requests/tickets/getCheckTicket";
import { useUserContext } from "common/hooks/userContext";
import { useQuery } from "@tanstack/react-query";
import { TicketType } from "./types";
import { debounce } from "common/helpers/debounce";
import { ResponseData } from "common/types";
import { AxiosResponse } from "axios";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import ValidIcon from "/assets/valid.png";
import InvalidIcon from "/assets/invalid.png";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { PagePath } from "shared/constants";

export const CheckTicketPage: FC = memo(() => {
  const { ticket_id }: { ticket_id?: string } = useCustomUrlQuery(
    window.location.search
  );
  const { accessToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ticket_id) {
      return navigate(PagePath.Page404);
    }
  }, [ticket_id, navigate]);

  const fetchFunc = useCallback(async () => {
    return await getCheckTicket({ accessToken, ticketId: ticket_id });
  }, [accessToken, ticket_id]);

  const { data: axiosResponse } = useQuery<
    AxiosResponse<ResponseData<TicketType>>
  >({
    queryKey: [ticket_id],
    queryFn: () => debounce(fetchFunc(), 500),
    enabled: !!ticket_id && !!accessToken,
    refetchOnWindowFocus: false,
  });

  const ticket = axiosResponse?.data?.data;
  const isTicketValid = (ticket?.flight?.arrival || 0) > +new Date();

  return (
    <>
      {ticket_id && (
        <Layout>
          <Box
            sx={{
              height: "700px",
              backgroundColor: DarkColor,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            {!ticket ? (
              <Box
                sx={{
                  textAlign: "center",
                  marginTop: "5rem",
                }}
              >
                <ClipLoader size={40} color="white" />
              </Box>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontFamily: SubtitleFont,
                    color: "white",
                  }}
                >
                  {ticket?.name} {ticket?.surname}
                </Typography>

                <Box
                  sx={{
                    margin: "2rem auto",
                  }}
                >
                  {isTicketValid ? (
                    <Typography
                      sx={{
                        fontFamily: TitleFont,
                        fontSize: "22px",
                        color: "green",
                        display: "flex",
                        height: "fit-content",
                        alignItems: "end",
                      }}
                    >
                      Valid{" "}
                      <img
                        style={{ marginLeft: "10px" }}
                        height="40px"
                        width="40px"
                        src={ValidIcon}
                      />
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: TitleFont,
                        fontSize: "22px",
                        color: "red",
                        display: "flex",
                        height: "fit-content",
                        alignItems: "end",
                      }}
                    >
                      Expired{" "}
                      <img
                        style={{ marginLeft: "10px" }}
                        height="40px"
                        width="40px"
                        src={InvalidIcon}
                      />
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Layout>
      )}
    </>
  );
});
