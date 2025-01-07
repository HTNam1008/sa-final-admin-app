import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Campaign",
    icon: IconLayoutDashboard,
    href: "/campaign",
  },
  {
    id: uniqueId(),
    title: "Account",
    icon: IconLayoutDashboard,
    href: "/account",
  },
  {
    id: uniqueId(),
    title: "Payment",
    icon: IconLayoutDashboard,
    href: "/payment",
  },
  {
    id: uniqueId(),
    title: "Quizzes",
    icon: IconLayoutDashboard,
    href: "/quizzes",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  }
];

export default Menuitems;
