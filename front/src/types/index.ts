/**
 * コンポーネントの型
 */
export type LinkButtonProps = {
  children: React.ReactNode;
  color: "pink" | "light-blue" | "purple";
  size: "large";
  href: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color: "pink" | "light-blue" | "purple";
  size: "large";
};

export type Option = {
  value: string;
  label: string;
};

export type RadioButtonsProps = {
  options: Option[];
  ariaDescribedby: string;
};

export type RadioButtonProps = {
  option: Option;
  index: number;
  selectedOption: string | null;
  ariaDescribedby: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TextboxProps = {
  id: string;
  name: string;
  ariaDescribedby: string;
  placeholder?: string;
  defaultValue?: string;
};

/**
 * Propsの型
 */
export type IdeaSessionType = {
  uuid?: string;
  isThemeDetermined?: boolean;
  isAiThemeGenerated?: boolean;
  themeCategory?: string;
  themeQuestion?: string;
  themeAnswer?: string;
  isAiAnswerGenerated?: boolean;
  aiAnswerRetryCount?: number;
  theme?: string;
  isFinished?: boolean;
  userId?: number;
  ideaMemos?: IdeaMemoType[];
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

export type PerspectiveType = {
  name: string;
  description: string;
};

export type PerspectivesType = {
  [key: string]: PerspectiveType;
};

export type AiGeneratedAnswerType = {
  ideaSessionId?: number;
  perspective?: string;
  hint?: string;
  answer?: string;
};

export type IdeaMemoType = {
  ideaSessionId?: number;
  perspective?: string;
  hint?: string | null;
  answer?: string;
  comment?: string | null;
  uuid?: string;
  createdAt?: string;
  ideaSession?: IdeaSessionType;
  isLiked?: boolean;
};

export type UserType = {
  name?: string;
  email?: string;
  provider?: string;
};
