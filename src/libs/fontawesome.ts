import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faCog,
  faList,
  faSignOutAlt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEye,
  faChevronLeft,
  faUsers,
  faCog,
  faSignOutAlt,
  faList,
  faPlusSquare
);

export default FontAwesomeIcon;
