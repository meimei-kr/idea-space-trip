"use client";

import * as CheckTheme from "@/features/check-theme/components";

export default function CheckThemePresentation({ uuid }: { uuid: string }) {
  return <CheckTheme.Buttons uuid={uuid} />;
}
