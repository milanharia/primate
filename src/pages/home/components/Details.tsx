import {
  IonAvatar,
  IonContent,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Site } from "../../../types";
import { chevronDown } from "ionicons/icons";
import { PrimateDetailsTitle } from "./PrimateDetailsTitle";
import { Chip } from "./Chip";
import { ReactNode, useState } from "react";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import guides1 from "../assets/guides1.png";
import guides2 from "../assets/guides2.png";
import guides3 from "../assets/guides3.png";
import { Swiper, SwiperSlide } from "swiper/react";

const SectionHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full px-4 py-1 bg-gray-100">
      <span className="text-sm font-semibold">{children}</span>
    </div>
  );
};

const Safety: React.FC = () => {
  return (
    <section>
      <SectionHeader>KEY SAFETY ADVICE</SectionHeader>
      <IonList className="my-4" lines="none">
        <IonItem>
          <IonAvatar slot="start">
            <img src={avatar1} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="ion-text-wrap">
            “
            <strong className="underline">
              Maintain a safe distance from us please
            </strong>
            , about a bus length (7m)”
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <img src={avatar2} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="ion-text-wrap">
            "<strong className="underline">Wear a mask</strong>, if you have a
            cold and I catch it I could die”
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <img src={avatar3} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="ion-text-wrap">
            “<strong className="underline">Please don’t feed us</strong>, giving
            us the wrong food can make us sick”
          </IonLabel>
        </IonItem>
      </IonList>
      <SectionHeader>MORE INFORMATION</SectionHeader>
      <div className="p-4">
        <a
          className="text-[#0075F8] underline font-[500]"
          href="www.linktoiucn.com/guidelines"
        >
          www.linktoiucn.com/guidelines
        </a>
      </div>
    </section>
  );
};

const ProjectInfo: React.FC = () => {
  return (
    <section>
      <SectionHeader>PROJECT OVERVIEW</SectionHeader>
      <div className="p-4">
        <p>
          Project description text. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sagittis eget gravida cursus sit volutpat nam enim
          duis sem. Dignissim aliquam ultrices risus malesuada nunc sem ante
          convallis diam. Maecenas neque in odio dolor proin enim euismod. Nisi,
          porttitor tristique suspendisse vestibulum.{" "}
        </p>
      </div>
      <SectionHeader>GUIDES</SectionHeader>
      <Swiper slidesPerView={2.75} className="mt-4">
        <SwiperSlide className="ml-4">
          <div className="relative w-32 h-32 overflow-hidden rounded-2xl">
            <IonImg
              src={guides1}
              className="absolute inset-0 z-0 object-cover brightness-75"
            />
            <div className="absolute inset-0 z-50 p-2 text-xl font-semibold text-white">
              Primates To See
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-32 h-32 overflow-hidden rounded-2xl">
            <IonImg
              src={guides2}
              className="absolute inset-0 z-0 object-cover brightness-75"
            />
            <div className="absolute inset-0 z-50 p-2 text-xl font-semibold text-white">
              What To Do
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-32 h-32 overflow-hidden rounded-2xl">
            <IonImg
              src={guides3}
              className="absolute inset-0 z-0 object-cover brightness-75"
            />
            <div className="absolute inset-0 z-50 p-2 text-xl font-semibold text-white">
              How To Stay Safe
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

const Sightings: React.FC = () => {
  return (
    <section>
      <SectionHeader>MY SIGHTINGS</SectionHeader>
      <IonList className="my-4" lines="none">
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar2} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">Gorillas</span>
            <span className="text-xs text-tertiary">8h Ago</span>
          </IonLabel>
        </IonItem>
      </IonList>
      <SectionHeader>RECENT SIGHTINGS</SectionHeader>
      <IonList className="my-4" lines="none">
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar3} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">Orangutans</span>
            <span className="text-xs text-tertiary">3h Ago</span>
          </IonLabel>
        </IonItem>
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar2} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">Gorillas</span>
            <span className="text-xs text-tertiary">8h Ago</span>
          </IonLabel>
        </IonItem>
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar1} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">More Primates</span>
            <span className="text-xs text-tertiary">1 Day Ago</span>
          </IonLabel>
        </IonItem>
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar3} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">More Primates</span>
            <span className="text-xs text-tertiary">24 May 2022</span>
          </IonLabel>
        </IonItem>
        <IonItem detail>
          <IonAvatar slot="start">
            <img src={avatar1} alt="avatar1" />
          </IonAvatar>
          <IonLabel className="flex flex-col">
            <span className="block font-semibold">More Primates</span>
            <span className="text-xs text-tertiary">22 May 2022</span>
          </IonLabel>
        </IonItem>
      </IonList>
    </section>
  );
};

enum Section {
  "SAFETY",
  "INFO",
  "SIGHTINGS",
}

type DetailsProps = Site & {
  onDismiss: () => void;
};

export const Details: React.FC<DetailsProps> = ({ onDismiss, ...site }) => {
  const [activeChip, setActiveChip] = useState<Section>(Section.SAFETY);

  return (
    <>
      <IonContent fullscreen>
        <IonFabButton
          data-cy="details-close-btn"
          onClick={onDismiss}
          size="small"
          color="secondary"
          slot="fixed"
          className="right-0 top-12"
        >
          <IonIcon icon={chevronDown}></IonIcon>
        </IonFabButton>
        <div className="relative w-full overflow-hidden aspect-video rounded-2xl">
          <IonImg
            src={site.img}
            alt={site.title}
            className="absolute inset-0 object-cover"
          />
        </div>
        <div className="p-4">
          <PrimateDetailsTitle {...site} />
        </div>
        <div className="flex items-center justify-center gap-1 ">
          <Chip
            testId="filter-chip-safety"
            onClick={() => setActiveChip(Section.SAFETY)}
            active={activeChip === Section.SAFETY}
          >
            Safety
          </Chip>
          <Chip
            testId="filter-chip-info"
            onClick={() => setActiveChip(Section.INFO)}
            active={activeChip === Section.INFO}
          >
            Project Info
          </Chip>
          <Chip
            testId="filter-chip-sightings"
            onClick={() => setActiveChip(Section.SIGHTINGS)}
            active={activeChip === Section.SIGHTINGS}
          >
            Sightings
          </Chip>
        </div>
        <div className="mt-8">
          {activeChip === Section.SAFETY && <Safety />}
          {activeChip === Section.INFO && <ProjectInfo />}
          {activeChip === Section.SIGHTINGS && <Sightings />}
        </div>
      </IonContent>
    </>
  );
};
