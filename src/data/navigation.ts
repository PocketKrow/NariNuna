import type { NavigationItem } from "@/types/content";
// Five ordinary documents. Credits remains a quiet utility.
export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Nari", href: "/meet-nari/" },
  { label: "Nails", href: "/nail-studio/" },
  { label: "Links", href: "/links/" },
  { label: "Work", href: "/work-with-nari/" }
];
export const footerNavigation: NavigationItem[] = [{ label: "Credits", href: "/credits/" }];
