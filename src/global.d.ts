declare global {
  interface Window {
    initGoogleMapCallback: () => void;
    googleMapsLoaded: boolean | undefined;
    googleMapsReady: boolean | undefined;
  }
}

export {};
