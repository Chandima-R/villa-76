import type {Metadata} from "next";
import {AboutPage} from "@/components/about/about";

export const metadata: Metadata = { title: "About · Location" };
export default function Page() { return <AboutPage />; }
