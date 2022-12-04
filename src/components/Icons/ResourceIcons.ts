import BbbIcon from '@assets/icons/markers/bikes-big-black.svg?url';
import BbgIcon from '@assets/icons/markers/bikes-big-gray.svg?url';
import BbvIcon from '@assets/icons/markers/bikes-big-green.svg?url';
import BboIcon from '@assets/icons/markers/bikes-big-orange.svg?url';
import BbrIcon from '@assets/icons/markers/bikes-big-red.svg?url';
import BsbIcon from '@assets/icons/markers/bikes-small-black.svg?url';
import BsgIcon from '@assets/icons/markers/bikes-small-gray.svg?url';
import BsvIcon from '@assets/icons/markers/bikes-small-green.svg?url';
import BsoIcon from '@assets/icons/markers/bikes-small-orange.svg?url';
import BsrIcon from '@assets/icons/markers/bikes-small-red.svg?url';
import DbbIcon from '@assets/icons/markers/docks-big-black.svg?url';
import DbgIcon from '@assets/icons/markers/docks-big-gray.svg?url';
import DbvIcon from '@assets/icons/markers/docks-big-green.svg?url';
import DboIcon from '@assets/icons/markers/docks-big-orange.svg?url';
import DbrIcon from '@assets/icons/markers/docks-big-red.svg?url';
import DsbIcon from '@assets/icons/markers/docks-small-black.svg?url';
import DsgIcon from '@assets/icons/markers/docks-small-gray.svg?url';
import DsvIcon from '@assets/icons/markers/docks-small-green.svg?url';
import DsoIcon from '@assets/icons/markers/docks-small-orange.svg?url';
import DsrIcon from '@assets/icons/markers/docks-small-red.svg?url';
import { StationResourceTypeEnum } from 'src/types';

const icons = {
  [StationResourceTypeEnum.bikes]: {
    big: {
      black: BbbIcon,
      gray: BbgIcon,
      green: BbvIcon,
      orange: BboIcon,
      red: BbrIcon,
    },
    small: {
      black: BsbIcon,
      gray: BsgIcon,
      green: BsvIcon,
      orange: BsoIcon,
      red: BsrIcon,
    },
  },
  [StationResourceTypeEnum.docks]: {
    big: {
      black: DbbIcon,
      gray: DbgIcon,
      green: DbvIcon,
      orange: DboIcon,
      red: DbrIcon,
    },
    small: {
      black: DsbIcon,
      gray: DsgIcon,
      green: DsvIcon,
      orange: DsoIcon,
      red: DsrIcon,
    },
  },
};

export default icons;
