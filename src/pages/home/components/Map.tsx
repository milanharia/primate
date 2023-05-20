import { IonFabButton, IonIcon, IonImg } from "@ionic/react";
import { list, layers, navigate } from "ionicons/icons";
import { Page } from "../types";

import map from "../assets/map.png";

interface MapProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

export const Map: React.FC<MapProps> = ({ setActivePage }) => {
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
    </>
  );
};
