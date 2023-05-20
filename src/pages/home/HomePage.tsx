import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  checkmarkCircleOutline,
  earthOutline,
  searchSharp,
  starOutline,
} from "ionicons/icons";
import { IconCta } from "../../components";
import { Map, List, Chip } from "./components";
import { useState } from "react";
import { Filter, Page } from "./types";

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.HOME);
  const [activePage, setActivePage] = useState<Page>(Page.MAP);

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
        {activePage === Page.MAP && <Map setActivePage={setActivePage} />}
        {activePage === Page.LIST && <List setActivePage={setActivePage} />}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar color="transparent" className="text-center">
          <IconCta>Guidelines</IconCta>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
