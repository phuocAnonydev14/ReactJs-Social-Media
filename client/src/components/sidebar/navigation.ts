import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import {
  HomeOutlined,
  PriceChangeOutlined,
  ShareOutlined,
 Attachment,
} from "@mui/icons-material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import TopicIcon from '@mui/icons-material/Topic';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export const navigations = [
  {
    subheader: "Main",
    key: "homáde",
    label: "Home",
    href: "/home",
    icon: WebOutlinedIcon,
    children: [
      {
        key: "all post",
        href: "/home",
        label: "All post",
        icon: HomeOutlined,
      },
      {
        key: "site-agency",
        href: "/search",
        label: "Search post",
        icon: PriceChangeOutlined,
      },
      {
        key: "service-price",
        href: "/add-post",
        label: "Add post",
        icon: AllInboxIcon,
      },
      {
        key: "service-price13",
        href: "/post-tags",
        label: "Taged post",
        icon: Attachment,
      },
      {
        key: "service-price13",
        href: "/topic",
        label: "Topics",
        icon: Attachment,
      },

    ],
  },
  {
    subheader: "Account",
    key: "home",
    label: "Home",
    href: "/home",
    icon: WebOutlinedIcon,
    children: [
      {
        key: "service-price1ádsads",
        href: "/shared-post",
        label: "Shared post",
        icon: ShareOutlined,
      },
      {
        key: "service-price13ádhsad",
        href: "/activities",
        label: "Activities",
        icon: Attachment,
      },
      {
        key: "service-price13213",
        href: "/saved-post",
        label: "Saved post",
        icon: TopicIcon,
      },
    ],
  },
  {
    subheader: "Utilities",
    key: "homesadsa",
    label: "Utilities",
    href: "/home",
    icon: WebOutlinedIcon,
    children: [
      {
        key: "service-price13ádhsasadasd",
        href: "/calendar",
        label: "Calendar",
        icon: CalendarMonthIcon,
      },
    ],
  }
];
