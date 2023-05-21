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
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import {
  add,
  checkmarkCircleOutline,
  earthOutline,
  searchSharp,
  starOutline,
} from "ionicons/icons";
import { IconCta } from "../../components";
import { Map, List, Chip, Details } from "./components";
import { useEffect, useMemo, useState } from "react";
import { Page } from "./types";
import { useGetSites } from "../../hooks";
import { Filter, Site } from "../../types";
import { SplashScreen } from "@capacitor/splash-screen";

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.ALL);
  const [activePage, setActivePage] = useState<Page>(Page.MAP);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [backgroundImgLoaded, setBackgroundImgLoaded] = useState(false);

  // Hide splash screen once background image has loaded so you
  // do not see a white flash on launch
  useEffect(() => {
    if (backgroundImgLoaded) {
      SplashScreen.hide();
    }
  }, [backgroundImgLoaded]);

  const { data, refetch } = useGetSites();

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

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refetch().then(() => {
      event.detail.complete();
    });
  };

  const searchResults = useMemo(() => {
    if (!data) return [];
    const res = data?.filter((site) => {
      if (site.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return site;
      }
    });
    return res;
  }, [searchTerm, data]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="transparent">
          <div className="relative flex items-center px-4 py-1 mx-4 mt-4 bg-white border border-black rounded-l-full rounded-r-full">
            <IonSearchbar
              data-cy="home-search-bar"
              mode="ios"
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
          <div className="flex items-center justify-center w-full pt-2 overflow-x-scroll">
            <Chip
              active={activeFilter === Filter.ALL}
              onClick={() => setActiveFilter(Filter.ALL)}
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
      {searchResults.length > 0 && searchTerm.length > 0 ? (
        <div className="absolute z-50 mt-2 overflow-hidden bg-white shadow-md top-36 rounded-2xl left-2 right-2">
          <IonList>
            {searchResults?.map((site) => {
              if (!site) return null;
              if (site.title.toLowerCase().includes(searchTerm.toLowerCase()))
                return (
                  <IonItem
                    data-cy={`site-${site.id}-auto-suggest`}
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                  >
                    <IonLabel>{site.title}</IonLabel>
                    <IonImg
                      slot="end"
                      className="w-3 h-3"
                      src={site.country.flag}
                      alt={`flag of ${site.country.name}`}
                    />
                  </IonItem>
                );
            })}
          </IonList>
        </div>
      ) : null}
      <IonContent fullscreen forceOverscroll={activePage !== Page.MAP}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {activePage === Page.MAP && (
          <Map
            activeFilter={activeFilter}
            setActivePage={setActivePage}
            setBackgroundImgLoaded={setBackgroundImgLoaded}
          />
        )}
        {activePage === Page.LIST && (
          <List
            activeFilter={activeFilter}
            setActivePage={setActivePage}
            setSelectedSite={setSelectedSite}
          />
        )}
        <IonModal isOpen={!!selectedSite}>
          {selectedSite && (
            <Details
              onDismiss={() => {
                setSearchTerm("");
                setSelectedSite(null);
              }}
              {...selectedSite}
            />
          )}
        </IonModal>
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
