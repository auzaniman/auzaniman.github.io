import { Archivo, Geist, Geist_Mono } from "next/font/google";

export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// Variable width axis lets headings use font-stretch: 85%.
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const fontVars = `${geist.variable} ${geistMono.variable} ${archivo.variable}`;
