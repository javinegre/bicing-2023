declare global {
  interface Window {
    initGoogleMapCallback: () => void;
    googleMapsLoaded: boolean | undefined;
  }
}

export {};
