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
import { PrimateDetailsTitle } from "./PrimateDetailsTitle";

const SiteModal: React.FC<Site> = (site) => {
  return (
    <>
      <IonContent className="ion-padding">
        <IonImg src={site.img} className="w-full mb-4 rounded-2xl" />
        <PrimateDetailsTitle {...site} />
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
            key={site.id}
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
