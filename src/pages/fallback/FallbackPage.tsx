import { IonButton, IonContent, IonPage } from "@ionic/react";

export const FallbackPage = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
          <h2>Sorry, this page doesn't exist yet!</h2>
          <IonButton
            routerLink="/home"
            routerDirection="root"
            color="secondary"
          >
            Back to home
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
