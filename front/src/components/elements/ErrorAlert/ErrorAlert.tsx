import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorAlert({
  id,
  key,
  error,
}: {
  id: string;
  key: number;
  error: string;
}) {
  return (
    <Alert variant="destructive" id={id} key={key} className="mb-1">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
