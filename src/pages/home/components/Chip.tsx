import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { PropsWithChildren } from "react";

interface ChipProps {
  testId?: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<PropsWithChildren<ChipProps>> = ({
  testId,
  icon,
  active,
  onClick,
  children,
}) => {
  return (
    <IonChip
      data-cy={testId}
      className="border border-[#BFBFBF]"
      onClick={onClick}
      style={{
        "--background": active
          ? "var(--ion-color-primary)"
          : "var(--ion-color-light)",
      }}
    >
      {icon && <IonIcon icon={icon} color="secondary" />}
      <IonLabel className="font-bold truncate">{children}</IonLabel>
    </IonChip>
  );
};
