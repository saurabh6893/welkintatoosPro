import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ArtistSection from "@/components/home/ArtistSection";
import Intro from "@/components/home/Intro";
import ServicesSection from "@/components/home/ServicesSection";
import StudioSection from "@/components/home/StudioSection";
import TextRevealSection from "@/components/home/TextRevealSection";
import GallerySection from "@/components/home/GallerySection";
// StyledSection removed in favor of ServicesSection BENTO grid
import PhilosophySection from "@/components/home/PhilosophySection";
import TestimonialsScrollSection from "@/components/TestimonialsScrollSection";
import FAQSection from "@/components/home/FAQSection";
import BookingSection from "@/components/home/BookingSection";

export const metadata: Metadata = {
  title: "Welkin Tattoos | Best Tattoo Artist in Kalyan",
  description: "Visit Welkin Tattoos in Kalyan for custom, minimalist, and portrait tattoos. Book your appointment with the best tattoo artist in Kalyan today.",
};

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
      <TestimonialsScrollSection />
      <FAQSection />
      <BookingSection />
    </div>
  );
}
