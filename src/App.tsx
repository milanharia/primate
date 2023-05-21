import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";

import { OnboardingPage, HomePage, FallbackPage } from "./pages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./styles/tailwind.css";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

setupIonicReact();

const AppLauncher: React.FC = () => {
  const [hasUserOnboarded, setHasUserOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Preferences.get({ key: "hasUserOnboarded" })
      .then((res) => {
        const { value } = res;
        if (value === "true") {
          setHasUserOnboarded(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading) return null;
  if (hasUserOnboarded) return <Redirect to="/home" />;
  return <Redirect to="/onboarding" />;
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Switch>
            <Route path="/" exact={true}>
              <AppLauncher />
            </Route>
            <Route path="/onboarding" exact={true}>
              <OnboardingPage />
            </Route>
            <Route path="/home" exact={true}>
              <HomePage />
            </Route>
            <Route path="*">
              <FallbackPage />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
