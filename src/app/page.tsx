import {HomeHero} from "@/components/home/home-hero";
import {HomeMarquee} from "@/components/home/home-marquee";
import {HomeIntro} from "@/components/home/home-intro";
import {HomeRooms} from "@/components/home/home-rooms";
import {HomeDining} from "@/components/home/home-dining";
import {HomeExperiences} from "@/components/home/home-experiences";
import {HomeGallery} from "@/components/home/home-gallery";
import {HomeCTA} from "@/components/home/home-cta";
import {HomeTestimonials} from "@/components/home/home-testimonials";

export default function Home() {
    return (
        <>
            <HomeHero/>
            <HomeMarquee/>
            <HomeIntro/>
            <HomeRooms />
            <HomeDining />
            <HomeExperiences />
            <HomeGallery />
            <HomeTestimonials />
            <HomeCTA />
        </>
    );
}
