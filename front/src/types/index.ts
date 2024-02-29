export type LinkButtonType = {
  children: React.ReactNode;
  color: "pink" | "light-blue";
  size: "large";
  href: string;
  flicker: "flicker" | "no-flicker";
};

export type ButtonType = {
  children: React.ReactNode;
  onClick: () => void;
  color: "pink" | "light-blue";
  size: "large";
  flicker: "flicker" | "no-flicker";
};

export type IdeaSessionType = {
  uuid?: string;
  isThemeDetermined?: boolean;
  isAIThemeGenerated?: boolean;
  category?: number;
  question?: number;
  isAIAnswerGenerated?: boolean;
  theme?: string;
  isFinished?: boolean;
  userId?: number;
};
