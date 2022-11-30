import type { Station } from '@hooks/useStation';

export interface UiStoreState {
  selectedStation: Station['id'] | null;
}
