import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { MembershipPreview } from '@/components/landing/MembershipPreview';
import { AppShowcase } from '@/components/landing/AppShowcase';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTASection } from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <MembershipPreview />
        <AppShowcase />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}