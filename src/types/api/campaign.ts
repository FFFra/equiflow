export interface CoverImage {
  cropped_location: string;
}

export interface Logo {
  cropped_location: string;
}

export interface InvestmentAmount {
  amount_in_cents: number | null;
  currency: string;
}

export interface Video {
  source: string;
  id: string | null;
}

export interface Address {
  country: string;
  city: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  cover_image: CoverImage;
  logo: Logo;
  investment_raised: InvestmentAmount;
  investment_sought: InvestmentAmount;
  equity_offered: string;
  equity_offered_for_investment_raised: string;
  number_of_investors: number;
  percentage_amount_raised: string;
  expires_at: string | null;
  type: string;
  favourite: boolean;
  listed_type: string;
  allowed_investor_type: string;
  nth_round: number;
  tax_eligibility: string | null;
  slug: string;
  currency: string;
  listed: boolean;
  video: Video;
  status: string;
  pre_money_valuation: InvestmentAmount;
  partner_image: string | null;
  maximum_investment_sought: InvestmentAmount;
  featured: boolean;
  business_id: number;
  preemption: boolean;
  introducer: string | null;
  target_eu: boolean;
  eligible_for_membership_benefits: boolean;
  externally_approved: boolean;
  externally_approved_at: string | null;
  allowed_to_invest: boolean;
  address: Address;
}

export interface CampaignsAPIResponse {
  result: Campaign[];
}
