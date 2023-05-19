import { IonContent, IonHeader, IonIcon, IonImg, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { WelcomeScreen } from "./components/WelcomeScreen";

import monkey from "./assets/monkey.svg";
import background from "./assets/background.png";

import "swiper/css";

const SeeIllustratedGuidelinesButton = () => (
  <button className="bg-black text-white font-bold py-2 px-6 rounded-l-full rounded-r-full mt-8 flex gap-2 items-center">
    <span>See illustrated guidelines</span>
    <IonIcon size="large" icon={monkey} />
  </button>
);

export const WelcomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen className="flex flex-col">
        <IonImg src={background} className="absolute inset-0 object-cover z0" />
        <Swiper
          className="h-full flex-1"
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
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
    </IonPage>
  );
};
