import {
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonCardSubtitle,
  IonButton,
} from "@ionic/react";
import { map, star, starOutline } from "ionicons/icons";
import { Page } from "../types";

import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";
import site1 from "../../../assets/images/site1.png";
import site2 from "../../../assets/images/site2.png";
import site3 from "../../../assets/images/site3.png";
import site4 from "../../../assets/images/site4.png";
import indonseia from "../../../assets/images/indonesia.svg";
import philippines from "../../../assets/images/philippines.svg";
import papuaNewGuinea from "../../../assets/images/papua-new-guinea.svg";

type Site = {
  id: string;
  img: string;
  title: string;
  country: {
    name: string;
    flag: string;
  };
  isFavourite: boolean;
};

const SITES: Site[] = [
  {
    id: "1",
    img: site1,
    title: "Primate Project #1",
    country: { name: "Indonesia", flag: indonseia },
    isFavourite: true,
  },
  {
    id: "2",
    img: site2,
    title: "Primate Project #2",
    country: { name: "Philippines", flag: philippines },
    isFavourite: false,
  },
  {
    id: "3",
    img: site3,
    title: "Primate Project #3",
    country: { name: "Papua New Guinea", flag: papuaNewGuinea },
    isFavourite: false,
  },
  {
    id: "4",
    img: site4,
    title: "Primate Project #4",
    country: { name: "Indonesia", flag: indonseia },
    isFavourite: false,
  },
];

type CardProps = Site;

const Card: React.FC<CardProps> = ({
  id,
  img,
  title,
  country,
  isFavourite,
}) => {
  return (
    <IonCard>
      <IonImg src={img} alt={title} className="w-full" />
      <IonCardHeader className="flex flex-row items-center justify-between">
        <div className="flex-col flex-1">
          <IonCardTitle className="text-sm">{title}</IonCardTitle>
          <IonCardSubtitle className="mt-2">
            <span className="flex items-center gap-2">
              <IonImg
                src={country.flag}
                alt={`flag of ${country.name}`}
                className="h-3 w-3"
              />
              <span className="text-xs ">{country.name}</span>
            </span>
          </IonCardSubtitle>
        </div>
        <div>
          <button>
            <IonIcon
              icon={isFavourite ? favouriteStar : outlineStar}
              size="large"
              color={isFavourite ? "primary" : "secondary"}
            />
          </button>
        </div>
      </IonCardHeader>
    </IonCard>
  );
};

interface ListProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

export const List: React.FC<ListProps> = ({ setActivePage }) => {
  return (
    <>
      <div className="fixed top-36 right-2 z-10">
        <IonFabButton
          onClick={() => setActivePage(Page.MAP)}
          size="small"
          color="light"
        >
          <IonIcon icon={map}></IonIcon>
        </IonFabButton>
      </div>
      {SITES.map((site) => (
        <Card key={site.id} {...site}></Card>
      ))}
    </>
  );
};
