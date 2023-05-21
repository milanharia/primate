import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "Primate",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      androidScaleType: "CENTER_CROP",
      splashImmersive: true,
    },
    Keyboard: {
      resize: KeyboardResize.None, // Temporary fix to stop web view resizing changing the map image size (Only using this resize mode to save time for this test)
      resizeOnFullScreen: true,
    },
  },
};

export default config;
