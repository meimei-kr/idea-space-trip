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
  id: number;
  user_id: number;
  uuid: string;
  isThemeDetermined: boolean;
  isAIThemeGenerated: boolean;
  category: number;
  question: number;
  isAIAnswerGenerated: boolean;
  theme: string;
  is_finished: boolean;
  created_at: string;
  updated_at: string;
};
