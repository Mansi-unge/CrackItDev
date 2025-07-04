import {
  FiHome,
  FiBookOpen,
  FiCode,
  FiClipboard,
  FiBarChart2,
} from "react-icons/fi";
import { TiFlowMerge } from "react-icons/ti";

const navLink = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "TheoryHub", href: "/topics", icon: FiBookOpen },
  { name: "CodeLab", href: "/challenges", icon: FiCode },
  { name: "QuickQuiz", href: "/quiz", icon: FiClipboard },
  { name: "DSA Corner", href: "/dsa", icon: TiFlowMerge },
  { name: "Dashboard", href: "/dashboard", icon: FiBarChart2 },
];

export default navLink;
