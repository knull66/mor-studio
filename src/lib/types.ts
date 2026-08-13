export type PackageCategory = "makeup" | "photography" | "bridal_combo";

export type PortfolioCategory =
  | "brides"
  | "makeup"
  | "studio"
  | "exteriors";

export type InquiryStatus = "pending" | "attended";

export type ServicePackage = {
  id: string;
  title: string;
  category: PackageCategory;
  price: number;
  description: string;
  features: string[];
  duration: string;
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
  rating: number;
};

export type InquiryInput = {
  client_name: string;
  email?: string;
  phone: string;
  event_date?: string;
  service_type?: string;
  message?: string;
};

export type ActionResult = {
  ok: boolean;
  error?: string;
};
