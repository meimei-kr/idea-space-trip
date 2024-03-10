"use client";

type TailwindButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
  disabled?: boolean;
};

export function LitUpBorders({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <>
      {disabled ? (
        <button
          type={type}
          className="p-[3px] relative opacity-50"
          onClick={onClick}
          disabled={disabled}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white">
            {children}
          </div>
        </button>
      ) : (
        <button
          type={type}
          className="p-[3px] relative"
          onClick={onClick}
          disabled={disabled}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            {children}
          </div>
        </button>
      )}
    </>
  );
}

export function BorderMagic({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}

export function BackButton({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className="shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-normal text-xs bg-transparent hover:bg-[#616467] hover:text-white transition duration-200"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Shimmer({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Simle({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
