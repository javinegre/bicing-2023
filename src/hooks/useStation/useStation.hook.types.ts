import { StationInfoItem, StationStatusItem } from '@store/api/api.slice';

export type Station = StationInfoItem & StationStatusItem;
