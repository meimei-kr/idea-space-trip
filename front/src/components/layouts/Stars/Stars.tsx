"use client";

import { SparklesCore } from "@/components/ui/sparkles";

export default function Stars() {
  return (
    <div className="w-full absolute inset-0 h-full">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.0}
        particleDensity={50}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>
  );
}
