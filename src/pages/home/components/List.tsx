import {
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonCardSubtitle,
  IonSkeletonText,
} from "@ionic/react";
import { map } from "ionicons/icons";
import { Page } from "../types";
import { Site } from "../../../types";

import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";
import { useGetSites } from "../../../hooks";
import { ErrorState } from "../../../components";

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

const LoadingState: React.FC = () => {
  return (
    <div className="p-4">
      <IonSkeletonText className="h-52 w-full rounded-2xl mb-4" />
      <IonSkeletonText className="h-52 w-full rounded-2xl mb-4" />
      <IonSkeletonText className="h-52 w-full rounded-2xl mb-4" />
    </div>
  );
};

interface ListProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

export const List: React.FC<ListProps> = ({ setActivePage }) => {
  const { data, isLoading, isSuccess, isError, refetch } = useGetSites();

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

      {isLoading && <LoadingState />}
      {isSuccess && data.map((site) => <Card key={site.id} {...site}></Card>)}
      {isError && <ErrorState retry={refetch} />}
    </>
  );
};
