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
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { IconCta } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as TSwiper } from "swiper/types";

import background from "./assets/background.png";

import "swiper/css";
import "swiper/css/pagination";
import { Preferences } from "@capacitor/preferences";
import { SplashScreen } from "@capacitor/splash-screen";

interface OnboardingScreenProps {
  title: string;
}

export const OnboardingScreen = ({
  title,
  children,
}: PropsWithChildren<OnboardingScreenProps>) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="px-12 text-4xl font-bold text-center text-white">
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
  const [backgroundImgLoaded, setBackgroundImgLoaded] = useState(false);

  const swiperRef = useRef<TSwiper>();
  const history = useHistory();

  // Hide splash screen once background image has loaded so you
  // do not see a white flash on launch
  useEffect(() => {
    if (backgroundImgLoaded) {
      SplashScreen.hide();
    }
  }, [backgroundImgLoaded]);

  const handlePrevSlide = () => {
    if (swiperRef.current && activeIndex > 0) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = async () => {
    if (activeIndex === 3) {
      await Preferences.set({ key: "hasUserOnboarded", value: "true" }).catch(
        (e) => console.log(e)
      );
      history.push("/home");
      return;
    }

    if (swiperRef.current && activeIndex < 3) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="flex flex-col">
        <IonImg
          onIonImgDidLoad={() => setBackgroundImgLoaded(true)}
          onIonError={() => setBackgroundImgLoaded(true)}
          src={background}
          className="absolute inset-0 object-cover z0"
        />
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
                <div className="flex items-center justify-center gap-2">
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
