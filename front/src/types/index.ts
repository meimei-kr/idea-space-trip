export type LinkButtonProps = {
  children: React.ReactNode;
  color: "pink" | "light-blue";
  size: "large";
  href: string;
  flicker: "flicker" | "no-flicker";
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color: "pink" | "light-blue";
  size: "large";
  flicker: "flicker" | "no-flicker";
};

export type Option = {
  value: string;
  label: string;
};

export type RadioButtonsProps = {
  options: Option[];
  ariaDescribedby: string;
};

export type IdeaSessionType = {
  uuid?: string;
  isThemeDetermined?: boolean;
  isAiThemeGenerated?: boolean;
  themeCategory?: string | null;
  themeQuestion?: string | null;
  themeAnswer?: string;
  isAiAnswerGenerated?: boolean;
  theme?: string;
  isFinished?: boolean;
  userId?: number;
};

export type AiGeneratedThemeType = {
  ideaSessionId?: number;
  theme?: string;
};

export type AiUsageHistoryType = {
  date?: string;
  count?: number;
  userId?: number;
};
