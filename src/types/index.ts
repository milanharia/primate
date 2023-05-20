export type Site = {
  id: string;
  img: string;
  title: string;
  country: {
    name: string;
    flag: string;
  };
  isFavourite: boolean;
  // Using percentages for locations
  location: {
    top: number;
    left: number;
  };
};
