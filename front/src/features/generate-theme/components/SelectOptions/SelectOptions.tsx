import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeQuestionEnum } from "@/utils/enums";

export default function SelectOptions() {
  return (
    <Select name="option" aria-describedby="theme-question-error">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="回答する質問を選んでね" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="question1">
            {ThemeQuestionEnum.question1}
          </SelectItem>
          <SelectItem value="question2">
            {ThemeQuestionEnum.question2}
          </SelectItem>
          <SelectItem value="question3">
            {ThemeQuestionEnum.question3}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
