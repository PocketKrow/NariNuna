import type { NavigationItem } from "@/types/content";
// Five ordinary documents. Credits remains a quiet utility.
export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Meet Nari", href: "/meet-nari/" },
  { label: "Creativity", href: "/nail-studio/" },
  { label: "Connections", href: "/links/" },
  { label: "Work", href: "/work-with-nari/" }
];
export const footerNavigation: NavigationItem[] = [{ label: "Credits", href: "/credits/" }];
