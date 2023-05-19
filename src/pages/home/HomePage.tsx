import {
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import { searchSharp } from "ionicons/icons";
import map from "./assets/map.png";

export const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="transparent">
          <div className="flex items-center px-4 bg-white border-black border p-2 mt-4 rounded-l-full rounded-r-full">
            <IonSearchbar
              searchIcon={searchSharp}
              placeholder="Explore primate sites"
              color="light"
              style={{ padding: 0 }}
            ></IonSearchbar>
            <IonMenuButton color="dark"></IonMenuButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={map} className="absolute inset-0 object-cover" />
      </IonContent>
    </IonPage>
  );
};
