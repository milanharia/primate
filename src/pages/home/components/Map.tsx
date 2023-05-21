import {
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonModal,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { list, layers, navigate, warning } from "ionicons/icons";
import { Page } from "../types";
import { useEffect, useState } from "react";
import { Filter, Site } from "../../../types";
import { useGetSites } from "../../../hooks";
import { PrimateDetailsTitle } from "./PrimateDetailsTitle";

import map from "../assets/map.png";
import location from "../assets/location.svg";
import locationSelected from "../assets/location-seleted.svg";
import { getFilteredSites } from "../../../utils/sites";

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
  activeFilter: Filter;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  setBackgroundImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Map: React.FC<MapProps> = ({
  activeFilter,
  setActivePage,
  setBackgroundImgLoaded,
}) => {
  const { data, isLoading, isSuccess, isError, refetch } = useGetSites();
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const filteredSites = getFilteredSites(data ?? [], activeFilter);

  // If data is mutated we need to ensure the selected site is also updated
  useEffect(() => {
    if (selectedSite) {
      const updatedSiteData = (data ?? []).find(
        (site) => site.id === selectedSite.id
      );
      if (!updatedSiteData) return;
      setSelectedSite(updatedSiteData);
    }
  }, [data]);

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
        filteredSites?.map((site) => {
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
      <IonToast
        className="error-toast"
        message="Something went wrong loading sites. Please try again later"
        icon={warning}
        isOpen={!isError}
        buttons={[
          {
            text: "retry",
            handler: () => {
              refetch();
            },
          },
        ]}
      />

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
