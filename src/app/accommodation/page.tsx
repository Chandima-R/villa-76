import type {Metadata} from "next";
import {AccomodationPage} from "@/components/accomodation/accomodation";

export const metadata: Metadata = { title: "Accommodation" };
export default function Page() { return <AccomodationPage />; }
