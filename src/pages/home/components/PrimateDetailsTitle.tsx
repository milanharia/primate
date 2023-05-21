import { IonImg, IonIcon, useIonToast } from "@ionic/react";
import { checkmarkCircle, checkmarkCircleOutline } from "ionicons/icons";
import { Site } from "../../../types";
import { useBeenSite, useFavouriteSite } from "../../../hooks";

import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";

export const PrimateDetailsTitle: React.FC<Site> = ({
  id,
  title,
  country,
  isFavourite,
  hasBeen,
}) => {
  const { mutate: setFavouriteSite } = useFavouriteSite();
  const { mutate: setBeenSite } = useBeenSite();
  const [presentToast] = useIonToast();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{title}</h1>
          <span className="flex items-center gap-2 mt-2">
            <IonImg
              src={country.flag}
              alt={`flag of ${country.name}`}
              className="w-3 h-3"
            />
            <span className="text-sm font-[500] text-tertiary">
              {country.name}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              setFavouriteSite(id);
              presentToast({
                message: !isFavourite
                  ? "Site added to favourites!"
                  : "Site removed from favourites",
                icon: checkmarkCircle,
                color: "dark",
                duration: 1000,
                cssClass: "success-toast",
              });
              e.stopPropagation();
            }}
          >
            <IonIcon
              icon={isFavourite ? favouriteStar : outlineStar}
              size="large"
              color={isFavourite ? "primary" : "secondary"}
            />
          </button>
          <button
            onClick={(e) => {
              setBeenSite(id);
              presentToast({
                message: !hasBeen
                  ? "I've Been Here!"
                  : "Site removed from I've Been",
                icon: checkmarkCircle,
                color: "dark",
                duration: 1000,
                cssClass: "success-toast",
              });
              e.stopPropagation();
            }}
          >
            <IonIcon
              icon={hasBeen ? checkmarkCircle : checkmarkCircleOutline}
              size="large"
            />
          </button>
        </div>
      </div>
    </>
  );
};
