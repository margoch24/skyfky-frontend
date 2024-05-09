import {
  createContext,
  useState,
  FC,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";

import { StorageType, useStorageItem } from "./useStorage";
import { QueryKeys, ResponseData, UserType } from "common/types";
import { getUser } from "api/requests/user/getUser";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";

export const UserContext = createContext<{
  user?: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null | undefined>>;

  accessToken?: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null | undefined>>;

  isAdmin?: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean | undefined>>;
}>({
  setUser: () => {},
  setAccessToken: () => {},
  setIsAdmin: () => {},
});

type UserContextProviderProps = Partial<{
  storageType: StorageType;
  storageKey: string;
  children: ReactNode;
}>;

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
  storageKey = "user",
  storageType = StorageType.SessionStorage,
}) => {
  const [storedUser, storeUser] = useStorageItem<UserType | undefined | null>(
    storageType,
    storageKey
  );

  const [storedAccessToken, storeAccessToken] = useStorageItem<
    string | undefined | null
  >(storageType, "access_token");

  const [storedIsAdmin, storeIsAdmin] = useStorageItem<boolean | undefined>(
    storageType,
    "is_admin",
    false
  );

  const [user, setUser] = useState<UserType | undefined | null>(storedUser);
  const [accessToken, setAccessToken] = useState<string | undefined | null>(
    storedAccessToken
  );
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(storedIsAdmin);

  const value = useMemo(
    () => ({
      user,
      setUser,

      accessToken,
      setAccessToken,

      isAdmin,
      setIsAdmin,
    }),
    [user, accessToken, isAdmin]
  );

  useEffect(() => {
    storeUser(user);
  }, [user, storeUser]);

  useEffect(() => {
    storeAccessToken(accessToken);
  }, [accessToken, storeAccessToken]);

  useEffect(() => {
    storeIsAdmin(isAdmin);
  }, [isAdmin, storeIsAdmin]);

  const fetchFunc = useCallback(async () => {
    return await getUser({ accessToken }, isAdmin);
  }, [accessToken, isAdmin]);

  const { data: axiosResponse } = useQuery<
    AxiosResponse<ResponseData<UserType>>
  >({
    queryKey: [QueryKeys.GetUser, user, accessToken],
    queryFn: () => debounce(fetchFunc(), 500),
    enabled: !!accessToken && !user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!accessToken && !user) {
      if (!axiosResponse) {
        return;
      }

      const { error, data } = axiosResponse?.data ?? {};
      if (error) {
        return;
      }
      setUser(data);
    }
  }, [accessToken, axiosResponse, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
