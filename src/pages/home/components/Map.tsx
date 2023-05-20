import {
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonModal,
  IonSpinner,
  useIonModal,
} from "@ionic/react";
import {
  list,
  layers,
  navigate,
  location,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { Page } from "../types";
import { useState } from "react";
import { Site } from "../../../types";
import { useGetSites } from "../../../hooks";

import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";
import map from "../assets/map.png";

const SiteModal: React.FC<Site> = ({ img, title, isFavourite, country }) => {
  return (
    <>
      <IonContent className="ion-padding">
        <IonImg src={img} className="w-full mb-4 rounded-2xl" />
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="font-semibold text-xl">{title}</h1>
            <span className="flex items-center gap-2 mt-2">
              <IonImg
                src={country.flag}
                alt={`flag of ${country.name}`}
                className="h-3 w-3"
              />
              <span className="text-sm font-[500] text-tertiary">
                {country.name}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button>
              <IonIcon
                icon={isFavourite ? favouriteStar : outlineStar}
                size="large"
                color={isFavourite ? "primary" : "secondary"}
              />
            </button>
            <button>
              <IonIcon icon={checkmarkCircleOutline} size="large" />
            </button>
          </div>
        </div>
      </IonContent>
    </>
  );
};

const Loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <IonSpinner />
    </div>
  );
};

interface MapProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

export const Map: React.FC<MapProps> = ({ setActivePage }) => {
  const { data, isLoading, isError, isSuccess } = useGetSites();
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  return (
    <>
      <div className="absolute top-36 right-2 z-10 flex flex-col">
        <IonFabButton
          onClick={() => setActivePage(Page.LIST)}
          size="small"
          color="light"
        >
          <IonIcon icon={list}></IonIcon>
        </IonFabButton>
        <IonFabButton size="small" color="light">
          <IonIcon icon={layers}></IonIcon>
        </IonFabButton>
        <IonFabButton size="small" color="light">
          <IonIcon icon={navigate}></IonIcon>
        </IonFabButton>
      </div>
      <IonImg src={map} className="absolute inset-0 object-cover" />
      {isLoading && <Loading />}
      {isSuccess &&
        data?.map((site) => (
          <div
            onClick={() => setSelectedSite(site)}
            className={`absolute top-[${site.location.top}%] left-[${site.location.left}%]`}
          >
            <IonIcon color="tertiary" icon={location} size="large" />
          </div>
        ))}

      <IonModal
        isOpen={!!selectedSite}
        handle
        onDidDismiss={() => setSelectedSite(null)}
        initialBreakpoint={0.4}
        breakpoints={[0, 0.4]}
      >
        {selectedSite && <SiteModal {...selectedSite} />}
      </IonModal>
    </>
  );
};
