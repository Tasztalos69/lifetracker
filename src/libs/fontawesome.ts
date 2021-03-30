import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faChevronDown,
  faChevronLeft,
  faCog,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faList,
  faMinus,
  faPlus,
  faSignOutAlt,
  faTimes,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

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
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faChevronDown,
  faPlus,
  faCheck,
  faMinus
);

export default FontAwesomeIcon;
