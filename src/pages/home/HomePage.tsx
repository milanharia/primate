import {
  IonChip,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addSharp,
  checkmarkCircleOutline,
  earthOutline,
  layers,
  list,
  navigate,
  searchSharp,
  starOutline,
} from "ionicons/icons";
import map from "./assets/map.png";
import { IconCta } from "../../components";
import { PropsWithChildren, useState } from "react";

enum Filter {
  "HOME",
  "FAVOURITES",
  "BEEN",
}

interface ChipProps {
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

const Chip: React.FC<PropsWithChildren<ChipProps>> = ({
  icon,
  active,
  onClick,
  children,
}) => {
  return (
    <IonChip
      className="border border-[#BFBFBF]"
      onClick={onClick}
      style={{
        "--background": active
          ? "var(--ion-color-primary)"
          : "var(--ion-color-light)",
      }}
    >
      <IonIcon icon={icon} color="secondary" />
      <IonLabel className="truncate font-bold">{children}</IonLabel>
    </IonChip>
  );
};

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.HOME);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="transparent">
          <div className="flex items-center px-4 bg-white border-black border py-1 mt-4 rounded-l-full rounded-r-full">
            <IonSearchbar
              searchIcon={searchSharp}
              placeholder="Explore primate sites"
              color="light"
              style={{ padding: 0 }}
            ></IonSearchbar>
            <IonMenuButton color="dark" />
          </div>
        </IonToolbar>
        <IonToolbar color="transparent">
          <div className="flex items-center pt-2 justify-center w-full overflow-x-scroll">
            <Chip
              active={activeFilter === Filter.HOME}
              onClick={() => setActiveFilter(Filter.HOME)}
              icon={earthOutline}
            >
              All Sites
            </Chip>
            <Chip
              active={activeFilter === Filter.FAVOURITES}
              onClick={() => setActiveFilter(Filter.FAVOURITES)}
              icon={starOutline}
            >
              Favourites
            </Chip>
            <Chip
              active={activeFilter === Filter.BEEN}
              onClick={() => setActiveFilter(Filter.BEEN)}
              icon={checkmarkCircleOutline}
            >
              I've Been
            </Chip>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="absolute top-36 right-2 z-10 flex flex-col">
          <IonFabButton size="small" color="light">
            <IonIcon icon={list}></IonIcon>
          </IonFabButton>
          <IonFabButton size="small" color="light">
            <IonIcon icon={layers}></IonIcon>
          </IonFabButton>
          <IonFabButton size="small" color="light">
            <IonIcon icon={navigate}></IonIcon>
          </IonFabButton>
        </div>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={addSharp}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonImg src={map} className="absolute inset-0 object-cover" />
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar color="transparent" className="text-center">
          <IconCta>Guidelines</IconCta>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
