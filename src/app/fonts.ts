import localFont from "next/font/local";

// Le Voyage type system (Font_apply.md): Poppins headings, Inter body/UI,
// Lora editorial, DejaVu Sans Mono for codes.
export const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Inter-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/Inter-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const lora = localFont({
  src: [{ path: "./fonts/Lora-Variable.ttf", weight: "400 700", style: "normal" }],
  display: "swap",
  variable: "--font-lora",
});

export const dejavuMono = localFont({
  src: [{ path: "./fonts/DejaVuSansMono.ttf", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-dejavu-mono",
});
