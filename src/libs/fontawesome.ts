import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faEye,
  faPlusSquare,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDoubleDown,
  faBackspace,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faCog,
  faDrumstickBite,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faList,
  faLongArrowAltRight,
  faMinus,
  faPlus,
  faSignOutAlt,
  faTimes,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

// TODO Refactor for dynamic import

library.add(
  faEye,
  faChevronLeft,
  faUsers,
  faCog,
  faSignOutAlt,
  faList,
  faPlusSquare,
  faTimes,
  faTimesCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faChevronDown,
  faPlus,
  faCheck,
  faMinus,
  faChevronLeft,
  faLongArrowAltRight,
  faBackspace,
  faAngleDoubleDown,
  faDrumstickBite, // OVERRIDE
);

export default FontAwesomeIcon;
