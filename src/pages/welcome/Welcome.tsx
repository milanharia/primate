import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as TSwiper } from "swiper/types";

import monkey from "./assets/monkey.svg";
import background from "./assets/background.png";

import "swiper/css";
import "swiper/css/pagination";
import { PropsWithChildren, useRef, useState } from "react";

interface WelcomeScreenProps {
  title: string;
}

export const WelcomeScreen = ({
  title,
  children,
}: PropsWithChildren<WelcomeScreenProps>) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-white font-bold text-4xl px-12 text-center">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
};

const SeeIllustratedGuidelinesButton = () => (
  <button className="bg-black text-white font-bold py-2 px-6 rounded-l-full rounded-r-full mt-8 flex gap-2 items-center">
    <span>See illustrated guidelines</span>
    <IonIcon size="large" icon={monkey} />
  </button>
);

const PaginationBullet = ({ active }: { active: boolean }) => {
  return (
    <span
      className={`${
        active ? "bg-primary" : "bg-white"
      } rounded-full h-[14px] w-[14px]`}
    ></span>
  );
};

export const WelcomePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<TSwiper>();

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (activeIndex === 3) {
      // TODO: Navigate to map page
    }

    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen className="flex flex-col">
        <IonImg src={background} className="absolute inset-0 object-cover z0" />
        <Swiper
          className="h-full"
          slidesPerView={1}
          onInit={(swiper: TSwiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper: TSwiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          <SwiperSlide className="h-full">
            <WelcomeScreen title="Welcome to Primate" />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <WelcomeScreen title=" Promoting ethical primate tourism" />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <WelcomeScreen title="Helping you and primates stay safe">
              <SeeIllustratedGuidelinesButton />
            </WelcomeScreen>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <WelcomeScreen title="Let’s get exploring!" />
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter className="transparent ">
        <IonToolbar color="transparent">
          <IonGrid>
            <IonRow>
              <IonCol>
                {activeIndex !== 0 && (
                  <IonButton
                    expand="block"
                    // Using color to set a transparent background instead of fill="clear"
                    // to enure buttons are always the same size to prevent layout shift
                    // when the button enters/leaves the DOM
                    color="transparent"
                    className="font-[500]"
                    onClick={handlePrevSlide}
                  >
                    <IonText color="primary">
                      <span className="font-[500]">Back</span>
                    </IonText>
                  </IonButton>
                )}
              </IonCol>
              <IonCol className="flex items-center">
                <div className="flex gap-2 items-center justify-center">
                  <PaginationBullet active={activeIndex === 0} />
                  <PaginationBullet active={activeIndex === 1} />
                  <PaginationBullet active={activeIndex === 2} />
                  <PaginationBullet active={activeIndex === 3} />
                </div>
              </IonCol>
              <IonCol>
                <IonButton
                  expand="block"
                  color="primary"
                  className="font-[500]"
                  onClick={handleNextSlide}
                >
                  {activeIndex === 3 ? "Explore" : "Next"}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
