import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { PropsWithChildren } from "react";

interface ChipProps {
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<PropsWithChildren<ChipProps>> = ({
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
