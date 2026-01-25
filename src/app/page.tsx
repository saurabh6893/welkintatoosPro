import Hero from "@/components/home/Hero";
import ArtistSection from "@/components/home/ArtistSection";
import Intro from "@/components/home/Intro";
import ServicesSection from "@/components/home/ServicesSection";
import StudioSection from "@/components/home/StudioSection";
import TextRevealSection from "@/components/home/TextRevealSection";
import GallerySection from "@/components/home/GallerySection";
// StyledSection removed in favor of ServicesSection BENTO grid
import PhilosophySection from "@/components/home/PhilosophySection";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import BookingSection from "@/components/home/BookingSection";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ArtistSection />
      <Intro />
      <ServicesSection />
      <StudioSection />
      <TextRevealSection />
      <GallerySection />
      <PhilosophySection />
      <Testimonials />
      <FAQSection />
      <BookingSection />
    </div>
  );
}
