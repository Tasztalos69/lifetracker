import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faCog,
  faSignOutAlt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faChevronLeft, faUsers, faCog, faSignOutAlt);

export default FontAwesomeIcon;
