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
    <button
      type={type}
      className={`p-[2px] relative ${disabled ? "opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      <div className={`px-8 py-2  bg-black rounded-full relative group transition duration-200 text-white text-md ${disabled ? "" : "hover:bg-transparent"}`}>
        {children}
      </div>
    </button>
  );
}

export function LitUpBordersLg({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className={`p-[2px] relative ${disabled ? "opacity-50 cursor-default" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      <div
        className={`px-12 py-3  bg-black rounded-full relative group transition duration-200 text-white ${disabled ? "" : "hover:bg-transparent"}`}
      >
        {children}
      </div>
    </button>
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
      className="relative inline-flex h-36 w-36 overflow-hidden rounded-full p-0.5"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-base font-medium text-white backdrop-blur-3xl hover:bg-transparent">
        {children}
      </span>
    </button>
  );
}

export function Playlist({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      className="shadow-[inset_0_0_0_2px_#616467] px-8 py-3 rounded-full tracking-widest uppercase font-normal text-xs bg-transparent hover:bg-[#616467] hover:text-white transition duration-200"
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

export function Simple({
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

export function TailwindcssConnect({
  children,
  onClick,
  type,
  disabled,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <span>{children}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.75 8.75L14.25 12L10.75 15.25"
          ></path>
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </button>
  );
}
