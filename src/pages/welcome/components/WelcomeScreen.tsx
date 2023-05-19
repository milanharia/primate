import { PropsWithChildren } from "react";
import { SwiperSlide } from "swiper/react";

interface ScreenProps {
  title: string;
}

export const WelcomeScreen = ({
  title,
  children,
}: PropsWithChildren<ScreenProps>) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-white font-bold text-4xl px-12 text-center">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
};
