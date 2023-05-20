import { IonImg, IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import { Site } from "../../../types";

import favouriteStar from "../assets/favourites.svg";
import outlineStar from "../assets/outlineStar.svg";

export const PrimateDetailsTitle: React.FC<Site> = ({
  title,
  country,
  isFavourite,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="font-semibold text-xl">{title}</h1>
          <span className="flex items-center gap-2 mt-2">
            <IonImg
              src={country.flag}
              alt={`flag of ${country.name}`}
              className="h-3 w-3"
            />
            <span className="text-sm font-[500] text-tertiary">
              {country.name}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button>
            <IonIcon
              icon={isFavourite ? favouriteStar : outlineStar}
              size="large"
              color={isFavourite ? "primary" : "secondary"}
            />
          </button>
          <button>
            <IonIcon icon={checkmarkCircleOutline} size="large" />
          </button>
        </div>
      </div>
    </>
  );
};
