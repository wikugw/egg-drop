import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Vacancy",
    icon: Calendar,
    children: [
      {
        title: "Master",
        url: "/vacancy/master/list",
      },
      {
        title: "Active",
        url: "/vacancy/active/list",
      },
    ],
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
