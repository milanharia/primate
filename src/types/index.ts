export type Site = {
  id: string;
  img: string;
  title: string;
  country: {
    name: string;
    flag: string;
  };
  isFavourite: boolean;
  hasBeen: boolean;
  // Using percentages for locations
  location: {
    top: number;
    left: number;
  };
};

export enum Filter {
  "ALL",
  "FAVOURITES",
  "BEEN",
}
