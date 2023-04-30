import { IconType } from "react-icons";
import {
  FiHome,
  FiFilePlus,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "/dashboard" },
  { name: "Add New Lease", icon: FiFilePlus, link: "/add-lease" },
  { name: "Search Leases", icon: FiCompass, link: "/search-lease" },
  { name: "Favourites", icon: FiStar, link: "/favourites" },
  { name: "Settings", icon: FiSettings, link: "/settings" },
];
