import {
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonModal,
  IonSpinner,
  useIonModal,
} from "@ionic/react";
import { list, layers, navigate, location } from "ionicons/icons";
import { Page } from "../types";
import { useState } from "react";
import { Site } from "../../../types";
import { useGetSites } from "../../../hooks";

import map from "../assets/map.png";
import { PrimateDetailsTitle } from "./PrimateDetailsTitle";

const SiteModal: React.FC<Site> = (site) => {
  return (
    <>
      <IonContent className="ion-padding">
        <div className="relative aspect-img w-full rounded-2xl overflow-hidden my-4">
          <IonImg src={site.img} className="absolute inset-0 object-cover" />
        </div>
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
      <div className="absolute top-42 right-2 z-10 flex flex-col">
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
            className="absolute"
            style={{
              top: site.location.top + "%",
              left: site.location.left + "%",
            }}
          >
            <IonIcon color="tertiary" icon={location} size="large" />
          </div>
        ))}

      <IonModal
        isOpen={!!selectedSite}
        handle
        onDidDismiss={() => setSelectedSite(null)}
        initialBreakpoint={0.45}
        breakpoints={[0, 0.45]}
      >
        {selectedSite && <SiteModal {...selectedSite} />}
      </IonModal>
    </>
  );
};
