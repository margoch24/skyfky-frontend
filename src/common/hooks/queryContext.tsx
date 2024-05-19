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
} from "react";

import { StorageType, useStorageItem } from "./useStorage";
import { QueryType } from "common/types";
import { DEFAULT_QUERY_FILTERS } from "pages/flights/constants";

export const QueryContext = createContext<{
  query?: QueryType;
  setQuery: Dispatch<SetStateAction<QueryType | undefined>>;

  adultAmount?: number;
  setAdultAmount: Dispatch<SetStateAction<number | undefined>>;

  childAmount?: number;
  setChildAmount: Dispatch<SetStateAction<number | undefined>>;
}>({
  setQuery: () => {},
  setAdultAmount: () => {},
  setChildAmount: () => {},
});

type QueryContextProviderProps = Partial<{
  storageType: StorageType;
  storageKey: string;
  children: ReactNode;
}>;

export const QueryContextProvider: FC<QueryContextProviderProps> = ({
  children,
  storageKey = "query",
  storageType = StorageType.SessionStorage,
}) => {
  const [storedQuery, storeQuery] = useStorageItem<QueryType | undefined>(
    storageType,
    storageKey,
    DEFAULT_QUERY_FILTERS
  );

  const [query, setQuery] = useState<QueryType | undefined>(storedQuery);

  const [storedAdultAmount, storeAdultAmount] = useStorageItem<
    number | undefined
  >(storageType, "AdultAmount", 1);

  const [adultAmount, setAdultAmount] = useState<number | undefined>(
    storedAdultAmount
  );

  const [storedChildAmount, storeChildAmount] = useStorageItem<
    number | undefined
  >(storageType, "childAmount");

  const [childAmount, setChildAmount] = useState<number | undefined>(
    storedChildAmount
  );

  const value = useMemo(
    () => ({
      query,
      setQuery,

      adultAmount,
      setAdultAmount,

      childAmount,
      setChildAmount,
    }),
    [query, adultAmount, childAmount]
  );

  useEffect(() => {
    storeQuery(query);
  }, [query, storeQuery]);

  useEffect(() => {
    storeAdultAmount(adultAmount);
  }, [adultAmount, storeAdultAmount]);

  useEffect(() => {
    storeChildAmount(childAmount);
  }, [childAmount, storeChildAmount]);

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryContext);
