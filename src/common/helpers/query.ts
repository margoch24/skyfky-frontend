import { PreparedQueryType, QueryType } from "common/types";
import queryString from "query-string";

export const convertObjToQuery = (
  params: QueryType | PreparedQueryType | null
) => {
  if (!params) {
    return;
  }
  const searchParams = new URLSearchParams();

  const validParams = Object.entries(params)
    .filter(([key, value]) => key && value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  Object.entries(validParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  return searchParams.toString();
};

export const useCustomUrlQuery = (search: string) => {
  return queryString.parse(search);
};

export const prepareQuery = (query?: QueryType | null) => {
  if (!query) {
    return {};
  }
  const {
    from_latitude,
    from_longitude,
    to_latitude,
    to_longitude,
    departure,
    arrival,
    cabin_class,
    price,
    page,
    limit,
  } = query;

  const definedQuery: QueryType = Object.entries({
    from_latitude,
    from_longitude,
    to_latitude,
    to_longitude,
    departure,
    arrival,
    cabin_class,
    price,
    page,
    limit,
  })
    .filter(
      ([key, value]) =>
        key && value && (!Array.isArray(value) || value.length > 0)
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const { min, max } = definedQuery.price || {};

  return {
    ...definedQuery,
    ...(min && max && { price: `${min},${max}` }),
  };
};
