import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSites, setBeenSite, setFavouriteSite } from "../utils/sites";

export const useGetSites = () => {
  return useQuery(["getSites"], async () => {
    await new Promise((res) => setTimeout(res, 2000));
    return getSites();
  });
};

export const useFavouriteSite = () => {
  const queryClient = useQueryClient();
  return useMutation((siteId: string) => setFavouriteSite(siteId), {
    onSuccess: (data) => {
      queryClient.setQueryData(["getSites"], data);
      queryClient.invalidateQueries(["getSites"]);
    },
  });
};

export const useBeenSite = () => {
  const queryClient = useQueryClient();
  return useMutation((siteId: string) => setBeenSite(siteId), {
    onSuccess: (data) => {
      queryClient.setQueryData(["getSites"], data);
      queryClient.invalidateQueries(["getSites"]);
    },
  });
};
