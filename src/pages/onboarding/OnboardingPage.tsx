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
import { PropsWithChildren, useRef, useState } from "react";
import { useHistory } from "react-router";
import { IconCta } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as TSwiper } from "swiper/types";

import background from "./assets/background.png";

import "swiper/css";
import "swiper/css/pagination";

interface OnboardingScreenProps {
  title: string;
}

export const OnboardingScreen = ({
  title,
  children,
}: PropsWithChildren<OnboardingScreenProps>) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-white font-bold text-4xl px-12 text-center">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
};

const PaginationBullet = ({
  active,
  testId,
}: {
  active: boolean;
  testId: string;
}) => {
  return (
    <span
      data-cy={testId}
      className={`${
        active ? "bg-primary" : "bg-white"
      } rounded-full h-[14px] w-[14px]`}
    ></span>
  );
};

export const OnboardingPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<TSwiper>();
  const history = useHistory();

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (activeIndex === 3) {
      history.push("/home");
      return;
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
            <OnboardingScreen title="Welcome to Primate" />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <OnboardingScreen title="Promoting ethical primate tourism" />
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <OnboardingScreen title="Helping you and primates stay safe">
              <div className="mt-8">
                <IconCta>See illustrated guidelines</IconCta>
              </div>
            </OnboardingScreen>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <OnboardingScreen title="Let’s get exploring!" />
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter className="transparent ion-no-border">
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
                    data-cy="prev-btn"
                  >
                    <IonText color="primary">
                      <span className="font-[500]">Back</span>
                    </IonText>
                  </IonButton>
                )}
              </IonCol>
              <IonCol className="flex items-center">
                <div className="flex gap-2 items-center justify-center">
                  <PaginationBullet
                    testId="bullet-1"
                    active={activeIndex === 0}
                  />
                  <PaginationBullet
                    testId="bullet-2"
                    active={activeIndex === 1}
                  />
                  <PaginationBullet
                    testId="bullet-3"
                    active={activeIndex === 2}
                  />
                  <PaginationBullet
                    testId="bullet-4"
                    active={activeIndex === 3}
                  />
                </div>
              </IonCol>
              <IonCol>
                <IonButton
                  expand="block"
                  color="primary"
                  className="font-[500]"
                  onClick={handleNextSlide}
                  data-cy="next-btn"
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
