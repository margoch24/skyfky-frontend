import { Env } from "common/types";

const { NODE_ENV, PROD_BASE_URL, DEV_BASE_URL } = process.env;

export const getImageHelper = (imageURL: string) => {
  const baseURL = NODE_ENV === Env.Production ? PROD_BASE_URL : DEV_BASE_URL;
  return `${baseURL}/image?filename=${imageURL}`;
};
