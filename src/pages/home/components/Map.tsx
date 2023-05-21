import {
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonModal,
  IonSpinner,
  useIonModal,
} from "@ionic/react";
import { list, layers, navigate } from "ionicons/icons";
import { Page } from "../types";
import { useState } from "react";
import { Site } from "../../../types";
import { useGetSites } from "../../../hooks";
import { PrimateDetailsTitle } from "./PrimateDetailsTitle";

import map from "../assets/map.png";
import location from "../assets/location.svg";
import locationSelected from "../assets/location-seleted.svg";

const SiteModal: React.FC<Site> = (site) => {
  return (
    <>
      <IonContent className="ion-padding">
        <div className="relative w-full my-4 overflow-hidden aspect-img rounded-2xl">
          <IonImg src={site.img} className="absolute inset-0 object-cover" />
        </div>
        <PrimateDetailsTitle {...site} />
      </IonContent>
    </>
  );
};

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <IonSpinner />
    </div>
  );
};

interface MapProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  setBackgroundImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Map: React.FC<MapProps> = ({
  setActivePage,
  setBackgroundImgLoaded,
}) => {
  const { data, isLoading, isError, isSuccess } = useGetSites();
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  return (
    <>
      <div className="absolute z-10 flex flex-col top-42 right-2">
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
      <IonImg
        onIonImgDidLoad={() => setBackgroundImgLoaded(true)}
        onIonError={() => setBackgroundImgLoaded(true)}
        src={map}
        className="absolute inset-0 object-cover"
      />
      {isLoading && <Loading />}
      {isSuccess &&
        data?.map((site) => {
          const isSelectedSite = selectedSite?.id === site?.id;
          return (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="absolute"
              style={{
                top: site.location.top + "%",
                left: site.location.left + "%",
              }}
            >
              <IonIcon
                icon={isSelectedSite ? locationSelected : location}
                size="large"
                className={isSelectedSite ? "h-[52px] w-[52px]" : "h-12 w-12"}
              />
            </div>
          );
        })}

      <IonModal
        isOpen={!!selectedSite}
        handle
        onWillDismiss={() => setSelectedSite(null)}
        initialBreakpoint={0.45}
        breakpoints={[0, 0.45]}
      >
        {selectedSite && <SiteModal {...selectedSite} />}
      </IonModal>
    </>
  );
};
