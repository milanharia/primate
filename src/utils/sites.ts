import { Filter, Site } from "../types";
import site1 from "../assets/images/site1.png";
import site2 from "../assets/images/site2.png";
import site3 from "../assets/images/site3.png";
import site4 from "../assets/images/site4.png";
import indonseia from "../assets/images/indonesia.svg";
import philippines from "../assets/images/philippines.svg";
import papuaNewGuinea from "../assets/images/papua-new-guinea.svg";

let SITES: Site[] = [
  {
    id: "1",
    img: site1,
    title: "Primate Project #1",
    country: { name: "Indonesia", flag: indonseia },
    isFavourite: true,
    hasBeen: false,
    location: {
      top: 54,
      left: 42,
    },
  },
  {
    id: "2",
    img: site2,
    title: "Primate Project #2",
    country: { name: "Philippines", flag: philippines },
    isFavourite: false,
    hasBeen: false,
    location: {
      top: 40,
      left: 40,
    },
  },
  {
    id: "3",
    img: site3,
    title: "Primate Project #3",
    country: { name: "Papua New Guinea", flag: papuaNewGuinea },
    isFavourite: false,
    hasBeen: false,
    location: {
      top: 55,
      left: 80,
    },
  },
  {
    id: "4",
    img: site4,
    title: "Primate Project #4",
    country: { name: "Indonesia", flag: indonseia },
    isFavourite: false,
    hasBeen: false,
    location: {
      top: 51,
      left: 32,
    },
  },
];

export const getSites = async (): Promise<Site[]> => {
  return [...SITES];
};

export const setFavouriteSite = async (siteId: string): Promise<Site[]> => {
  const index = SITES.findIndex((el) => el.id === siteId);
  if (index < 0) {
    throw new Error("Could not find site for provided id");
  }
  SITES[index] = { ...SITES[index], isFavourite: !SITES[index].isFavourite };
  return [...SITES];
};

export const setBeenSite = async (siteId: string): Promise<Site[]> => {
  const index = SITES.findIndex((el) => el.id === siteId);
  if (index < 0) {
    throw new Error("Could not find site for provided id");
  }
  SITES[index] = { ...SITES[index], hasBeen: !SITES[index].hasBeen };
  return [...SITES];
};

export const getFilteredSites = (sites: Site[], filter: Filter) => {
  if (filter === Filter.FAVOURITES) {
    return sites.filter((site) => site.isFavourite === true);
  }

  if (filter === Filter.BEEN) {
    return sites.filter((site) => site.hasBeen === true);
  }
  return sites;
};
