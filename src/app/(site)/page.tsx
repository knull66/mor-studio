import { About } from "@/components/home/about";
import { BeforeAfter } from "@/components/home/before-after";
import { BookingForm } from "@/components/home/booking-form";
import { Categories } from "@/components/home/categories";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { InfoBar } from "@/components/home/info-bar";
import { InstagramStrip } from "@/components/home/instagram-strip";
import { PackagesSection } from "@/components/home/packages-section";
import { PortfolioGallery } from "@/components/home/portfolio-gallery";
import { Testimonials } from "@/components/home/testimonials";
import { getBeforeAfterPairs, getInstagramStrip, getPackages, getPortfolio, getTeamMembers, getTestimonials } from "@/lib/data/queries";
import { isStripeConfigured } from "@/lib/stripe";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ paquete?: string; pago?: string }>;
}) {
  const params = await searchParams;
  const stripeEnabled = isStripeConfigured();
  const [packages, portfolio, testimonials, beforeAfter, instagramStrip, team] = await Promise.all([
    getPackages(),
    getPortfolio(),
    getTestimonials(),
    getBeforeAfterPairs(),
    getInstagramStrip(),
    getTeamMembers(),
  ]);

  return (
    <>
      <Hero />
      <Categories />
      <About members={team} />
      <BeforeAfter pairs={beforeAfter} />
      <PackagesSection packages={packages} stripeEnabled={stripeEnabled} />
      <PortfolioGallery items={portfolio} />
      <Testimonials items={testimonials} />
      <Faq />
      <BookingForm
        packages={packages}
        stripeEnabled={stripeEnabled}
        initialPackageId={params.paquete}
        initialMethod={params.pago === "stripe" ? "stripe" : "whatsapp"}
      />
      <InfoBar />
      <InstagramStrip items={instagramStrip} />
    </>
  );
}
