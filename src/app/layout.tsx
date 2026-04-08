import type {Metadata} from "next";
import "./globals.css";
import {SmoothScroll} from "@/components/ui/smooth-scroll";
import {CustomCursor} from "@/components/ui/custom-cursor";
import {Navbar} from "@/components/ui/navbar";
import {Footer} from "@/components/ui/footer";
import {ScrollProgress} from "@/components/ui/scroll-progress";
import {FloatingReserve} from "@/components/ui/floating-reserve";
import {PageTransition} from "@/components/ui/page-transition";
import {ClientShell} from "@/components/ui/client-shell";

export const metadata: Metadata = {
    title: { default: "Villa 76 — Weligama", template: "%s · Villa 76 Weligama" },
    description: "An intimate coastal sanctuary on Sri Lanka's southern shore. Three bespoke suites, steps from Weligama Bay.",
    keywords: ["villa weligama", "luxury villa sri lanka", "beach villa", "weligama accommodation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
        </head>
        <body className="grain">
        <SmoothScroll>
            <ClientShell>
                <CustomCursor />
                <ScrollProgress />
                <PageTransition />
                <Navbar />
                <FloatingReserve />
                <main>{children}</main>
                <Footer />
            </ClientShell>
        </SmoothScroll>
        </body>
        </html>
    );
}
