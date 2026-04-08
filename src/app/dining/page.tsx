import type {Metadata} from "next";
import {DiningPage} from "@/components/dining/dining";

export const metadata: Metadata = { title: "Dining" };
export default function Page() { return <DiningPage />; }
