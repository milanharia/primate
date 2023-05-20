import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
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
import { useGetSites } from "../../hooks";

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.HOME);
  const [activePage, setActivePage] = useState<Page>(Page.MAP);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetSites();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="transparent overflow-visible">
          <div className="relative flex items-center px-4 bg-white border-black border py-1 mt-4 rounded-l-full rounded-r-full">
            <IonSearchbar
              inputMode="text"
              value={searchTerm}
              onIonInput={(e) => setSearchTerm(e?.detail?.value ?? "")}
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
      {searchTerm.length ? (
        <div className="absolute top-20 shadow-md mt-2 rounded-2xl overflow-hidden left-2 right-2 z-50 bg-white">
          <IonList>
            {data?.map((site) => {
              if (site.title.toLowerCase().includes(searchTerm.toLowerCase()))
                return (
                  <IonItem key={site.id}>
                    <IonLabel>{site.title}</IonLabel>
                    <IonImg
                      slot="end"
                      className="h-3 w-3"
                      src={site.country.flag}
                      alt={`flag of ${site.country.name}`}
                    />
                  </IonItem>
                );
            })}
          </IonList>
        </div>
      ) : null}
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
