import type {Metadata} from "next";
import {GalleryPage} from "@/components/gallery/gallery";

export const metadata: Metadata = { title: "Gallery" };
export default function Page() { return <GalleryPage />; }
