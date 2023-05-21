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
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import {
  chevronForward,
  logoFacebook,
  logoInstagram,
  logoTwitter,
} from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";

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
      <span className="flex items-center justify-center w-8 h-8 p-2 rounded-full shadow-sm bg-tertiary">
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

  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const handleResetOnboarding = () => {
    presentAlert(
      `Tap "Confirm" to see the onboarding screens on the next app launch.`,
      [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          handler: () => {
            Preferences.remove({ key: "hasUserOnboarded" })
              .then(() => {
                presentToast(
                  "You will see the onboarding flow when you next open the app",
                  2500
                );
              })
              .catch((e) => {
                presentToast("Something went wrong", 2500);
              });
          },
          text: "Confirm",
        },
      ]
    );
  };

  return (
    <IonMenu swipeGesture={false} contentId="main" type="overlay">
      <IonHeader className="pt-12 ion-no-border">
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
      <IonFooter className="ion-no-border">
        <IonToolbar color="white">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  onClick={handleResetOnboarding}
                  expand="block"
                  color="secondary"
                >
                  Reset onboarding flow
                </IonButton>
              </IonCol>
            </IonRow>
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
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
