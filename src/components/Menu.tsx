import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import {
  chevronForward,
  logoFacebook,
  logoInstagram,
  logoTwitter,
} from "ionicons/icons";

interface AppPage {
  url: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Primate Info",
    url: "/primate-info",
  },
  {
    title: "Primates Guide",
    url: "/primates-guide",
  },
  {
    title: "My Sightings",
    url: "/my-sightings",
  },
  {
    title: "My Account",
    url: "/my-account",
  },
  {
    title: "Feedback",
    url: "/feedback",
  },
  {
    title: "Language",
    url: "/language",
  },
];

const CloseButton: React.FC = () => {
  return (
    <IonMenuToggle className="flex items-center justify-end gap-2 my-12 mr-4">
      <span className="bg-tertiary shadow-sm rounded-full p-2 w-8 h-8 flex items-center justify-center">
        <IonIcon icon={chevronForward} color="light" size="large" />
      </span>
      <span className="text-xl text-tertiary">Close</span>
    </IonMenuToggle>
  );
};

interface MenuButtonProps {
  appPage: AppPage;
  selected: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ selected, appPage }) => {
  const history = useHistory();

  return (
    <IonMenuToggle>
      <button
        className={`${
          selected ? "bg-primary" : ""
        } font-semibold text-xl p-4 rounded-2xl`}
        onClick={() => history.push(appPage.url, { direction: "none" })}
      >
        {appPage.title}
      </button>
    </IonMenuToggle>
  );
};

const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu swipeGesture={false} contentId="main" type="overlay">
      <IonHeader className="pt-12">
        <CloseButton />
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col gap-4 ml-4">
          {appPages.map((appPage) => {
            const selected = location.pathname === appPage.url;
            return (
              <MenuButton
                key={appPage.url}
                selected={selected}
                appPage={appPage}
              />
            );
          })}
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol size="1.5"></IonCol>
            <IonCol size="3" className="flex justify-center">
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  icon={logoFacebook}
                  color="medium"
                  size="large"
                />
              </IonButton>
            </IonCol>
            <IonCol size="3" className="flex justify-center">
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  icon={logoTwitter}
                  color="medium"
                  size="large"
                />
              </IonButton>
            </IonCol>
            <IonCol size="3" className="flex justify-center">
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  icon={logoInstagram}
                  color="medium"
                  size="large"
                />
              </IonButton>
            </IonCol>
            <IonCol size="1.5"></IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
