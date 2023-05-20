import { IonButton, IonIcon } from "@ionic/react";
import { refresh } from "ionicons/icons";

export const ErrorState: React.FC<{ retry: () => void }> = ({ retry }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
      <h2>Oops something went wrong!</h2>
      <IonButton onClick={retry} color="secondary">
        <IonIcon slot="start" icon={refresh} />
        Try again
      </IonButton>
    </div>
  );
};
