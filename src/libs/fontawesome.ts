import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faCog,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faList,
  faSignOutAlt,
  faTimes,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

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
  faExclamationCircle
);

export default FontAwesomeIcon;
