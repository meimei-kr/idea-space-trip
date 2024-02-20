export type ButtonType = {
  children: React.ReactNode;
  color: "pink";
  size: "large";
  type: "button" | "submit";
  href?: string;
  onClick?: () => void;
};
