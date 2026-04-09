import HeroSection from "../components/home/HeroSection";
import FeaturedTours from "../components/home/FeaturedTours";
import UpcomingTrips from "../components/home/UpcomingTrips";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTABanner from "../components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <WhyChooseUs />
      <UpcomingTrips />
      <Testimonials />
      <CTABanner />
    </>
  );
}
