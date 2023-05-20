import { useQuery } from "@tanstack/react-query";
import { getSites } from "../utils/getSites";

export const useGetSites = () => {
  return useQuery(["getSites"], async () => {
    await new Promise((res) => setTimeout(res, 2000));
    return getSites();
  });
};
