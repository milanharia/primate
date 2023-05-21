import { IonButton, IonIcon } from "@ionic/react";
import { ComponentProps } from "react";
import monkey from "../assets/monkey.svg";

type BaseIonButtonProps = ComponentProps<typeof IonButton>;

export const IconCta: React.FC<BaseIonButtonProps> = ({
  children,
  ...rest
}) => (
  <IonButton shape="round" color="secondary" {...rest}>
    <span>{children}</span>
    <IonIcon slot="end" size="large" icon={monkey} />
  </IonButton>
);
