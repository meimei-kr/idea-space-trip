export type ButtonType = {
  children: React.ReactNode;
  color: "pink" | "light-blue";
  size: "large";
  type: "button" | "submit";
  href?: string;
  flicker: "flicker" | "no-flicker";
};
