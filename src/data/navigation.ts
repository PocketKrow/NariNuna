import type { NavigationItem } from "@/types/content";
// Six focused destinations; the brand supplies the desktop Home link. Credits is a utility.
export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Meet", href: "/meet-nari/" },
  { label: "Streams", href: "/streams/" },
  { label: "Creativity", href: "/nail-studio/" },
  { label: "Haven", href: "/haven/" },
  { label: "Work", href: "/work-with-nari/" }
];
export const footerNavigation: NavigationItem[] = [{ label: "Credits", href: "/credits/" }];
