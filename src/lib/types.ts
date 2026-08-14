export type PackageCategory = "makeup" | "hair" | "photography" | "bridal_combo";

export type PortfolioCategory = "brides" | "makeup" | "photography" | "hair";

export type InquiryStatus = "pending" | "attended";

export type ServicePackage = {
  id: string;
  title: string;
  category: PackageCategory;
  price: number;
  description: string;
  features: string[];
  duration: string;
  title_en?: string;
  description_en?: string;
  features_en?: string[];
  duration_en?: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  image_url: string;
  alt?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
};

export type Inquiry = {
  id: string;
  client_name: string;
  email: string | null;
  phone: string;
  event_date: string | null;
  service_type: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  role: string;
  quote: string;
  role_en?: string;
  quote_en?: string;
  rating: number;
  is_published?: boolean;
};

export type InquiryInput = {
  client_name: string;
  email?: string;
  phone: string;
  event_date?: string;
  service_type?: string;
  message?: string;
  website?: string;
};

export type ActionResult = {
  ok: boolean;
  error?: string;
};

export type SiteSettings = {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  phone_display: string;
  email: string;
  address: string;
  hours: string;
  announcement_es: string;
  announcement_en: string;
  announcement_enabled: boolean;
};

export type HeroSlide = {
  id: string;
  image_url: string;
  alt: string;
  caption: string;
  focal_x: number;
  focal_y: number;
  zoom: number;
  sort_order: number;
  is_published: boolean;
};

export type BeforeAfterPair = {
  id: string;
  before_image_url: string;
  after_image_url: string;
  title: string;
  before_label: string;
  after_label: string;
  sort_order: number;
  is_published: boolean;
};

export type InstagramStripItem = {
  id: string;
  image_url: string;
  alt: string;
  sort_order: number;
  is_published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  role_en: string;
  bio: string;
  bio_en: string;
  bio_2: string;
  bio_2_en: string;
  image_url: string;
  image_url_2: string;
  is_founder: boolean;
  is_published: boolean;
  sort_order: number;
};
