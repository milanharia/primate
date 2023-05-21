import {
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonCardSubtitle,
  IonSkeletonText,
  IonFab,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { checkmarkCircle, map } from "ionicons/icons";
import { Page } from "../types";
import { Filter, Site } from "../../../types";
import { useFavouriteSite, useGetSites } from "../../../hooks";
import { ErrorState } from "../../../components";
import { getFilteredSites } from "../../../utils/sites";
import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";

type CardProps = Site & { onClick: () => void };

const Card: React.FC<CardProps> = ({
  id,
  img,
  title,
  country,
  isFavourite,
  onClick,
}) => {
  const { mutate, isLoading } = useFavouriteSite();
  const [presentToast] = useIonToast();
  return (
    <IonCard data-cy="site-card" onClick={onClick}>
      <div className="relative w-full m-2 overflow-hidden rounded-lg aspect-img">
        <IonImg src={img} className="absolute inset-0 object-cover" />
      </div>
      <IonCardHeader className="flex flex-row items-center justify-between">
        <div className="flex-col flex-1">
          <IonCardTitle className="text-sm">{title}</IonCardTitle>
          <IonCardSubtitle className="mt-2">
            <span className="flex items-center gap-2">
              <IonImg
                src={country.flag}
                alt={`flag of ${country.name}`}
                className="w-3 h-3"
              />
              <span className="text-xs ">{country.name}</span>
            </span>
          </IonCardSubtitle>
        </div>
        <div>
          <button
            data-cy={`site-${id}-card-fav-btn`}
            onClick={(e) => {
              mutate(id);
              presentToast({
                message: !isFavourite
                  ? "Site added to favourites!"
                  : "Site removed from favourites",
                icon: checkmarkCircle,
                color: "dark",
                duration: 1000,
                cssClass: "success-toast",
              });
              e.stopPropagation();
            }}
          >
            {isLoading ? (
              <IonSpinner />
            ) : (
              <IonIcon
                icon={isFavourite ? favouriteStar : outlineStar}
                size="large"
                color={isFavourite ? "primary" : "secondary"}
              />
            )}
          </button>
        </div>
      </IonCardHeader>
    </IonCard>
  );
};

const LoadingState: React.FC = () => {
  return (
    <div className="p-4">
      <IonSkeletonText className="w-full mb-4 h-52 rounded-2xl" />
      <IonSkeletonText className="w-full mb-4 h-52 rounded-2xl" />
      <IonSkeletonText className="w-full mb-4 h-52 rounded-2xl" />
    </div>
  );
};

interface ListProps {
  activeFilter: Filter;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  setSelectedSite: React.Dispatch<React.SetStateAction<Site | null>>;
}

export const List: React.FC<ListProps> = ({
  activeFilter,
  setActivePage,
  setSelectedSite,
}) => {
  const { data, isLoading, isSuccess, isError, refetch } = useGetSites();

  const filteredSites = getFilteredSites(data ?? [], activeFilter);

  return (
    <>
      <IonFab slot="fixed" horizontal="end" vertical="top">
        <IonFabButton
          onClick={() => setActivePage(Page.MAP)}
          size="small"
          color="light"
        >
          <IonIcon icon={map}></IonIcon>
        </IonFabButton>
      </IonFab>

      {isLoading && <LoadingState />}
      {isSuccess &&
        filteredSites.map((site) => (
          <Card key={site.id} onClick={() => setSelectedSite(site)} {...site} />
        ))}
      {isError && <ErrorState retry={refetch} />}
    </>
  );
};
