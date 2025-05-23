import { Campaign } from '../../../../types/api/campaign';

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Test Campaign 1',
    description: 'This is test campaign 1',
    cover_image: { cropped_location: 'https://example.com/cover1.jpg' },
    logo: { cropped_location: 'https://example.com/logo1.jpg' },
    investment_raised: { amount_in_cents: 5000000, currency: 'USD' },
    investment_sought: { amount_in_cents: 10000000, currency: 'USD' },
    equity_offered: '10%',
    equity_offered_for_investment_raised: '5%',
    number_of_investors: 50,
    percentage_amount_raised: '50',
    expires_at: '2023-12-31',
    type: 'equity',
    favourite: false,
    listed_type: 'public',
    allowed_investor_type: 'all',
    nth_round: 1,
    tax_eligibility: null,
    slug: 'test-campaign-1',
    currency: 'USD',
    listed: true,
    video: { source: 'youtube', id: 'abc123' },
    status: 'active',
    pre_money_valuation: { amount_in_cents: 100000000, currency: 'USD' },
    partner_image: null,
    maximum_investment_sought: { amount_in_cents: 15000000, currency: 'USD' },
    featured: true,
    business_id: 101,
    preemption: false,
    introducer: null,
    target_eu: false,
    eligible_for_membership_benefits: true,
    externally_approved: true,
    externally_approved_at: '2023-01-01',
    allowed_to_invest: true,
    address: { country: 'USA', city: 'New York' },
  },
  {
    id: 2,
    name: 'Test Campaign 2',
    description: 'This is test campaign 2',
    cover_image: { cropped_location: 'https://example.com/cover2.jpg' },
    logo: { cropped_location: 'https://example.com/logo2.jpg' },
    investment_raised: { amount_in_cents: 2000000, currency: 'USD' },
    investment_sought: { amount_in_cents: 8000000, currency: 'USD' },
    equity_offered: '8%',
    equity_offered_for_investment_raised: '2%',
    number_of_investors: 25,
    percentage_amount_raised: '25',
    expires_at: '2023-11-30',
    type: 'equity',
    favourite: true,
    listed_type: 'public',
    allowed_investor_type: 'all',
    nth_round: 2,
    tax_eligibility: 'eligible',
    slug: 'test-campaign-2',
    currency: 'USD',
    listed: true,
    video: { source: 'vimeo', id: 'def456' },
    status: 'active',
    pre_money_valuation: { amount_in_cents: 80000000, currency: 'USD' },
    partner_image: 'https://example.com/partner2.jpg',
    maximum_investment_sought: { amount_in_cents: 10000000, currency: 'USD' },
    featured: false,
    business_id: 102,
    preemption: true,
    introducer: 'Partner Co',
    target_eu: true,
    eligible_for_membership_benefits: false,
    externally_approved: false,
    externally_approved_at: null,
    allowed_to_invest: true,
    address: { country: 'UK', city: 'London' },
  },
  {
    id: 3,
    name: 'Test Campaign 3',
    description: 'This is test campaign 3',
    cover_image: { cropped_location: 'https://example.com/cover3.jpg' },
    logo: { cropped_location: 'https://example.com/logo3.jpg' },
    investment_raised: { amount_in_cents: 7500000, currency: 'EUR' },
    investment_sought: { amount_in_cents: 10000000, currency: 'EUR' },
    equity_offered: '15%',
    equity_offered_for_investment_raised: '11.25%',
    number_of_investors: 75,
    percentage_amount_raised: '75',
    expires_at: '2023-10-15',
    type: 'debt',
    favourite: false,
    listed_type: 'private',
    allowed_investor_type: 'accredited',
    nth_round: 3,
    tax_eligibility: null,
    slug: 'test-campaign-3',
    currency: 'EUR',
    listed: true,
    video: { source: 'youtube', id: 'ghi789' },
    status: 'active',
    pre_money_valuation: { amount_in_cents: 50000000, currency: 'EUR' },
    partner_image: null,
    maximum_investment_sought: { amount_in_cents: 12000000, currency: 'EUR' },
    featured: true,
    business_id: 103,
    preemption: false,
    introducer: null,
    target_eu: true,
    eligible_for_membership_benefits: true,
    externally_approved: true,
    externally_approved_at: '2023-02-15',
    allowed_to_invest: true,
    address: { country: 'Germany', city: 'Berlin' },
  },
  {
    id: 4,
    name: 'Test Campaign 4',
    description: 'This is test campaign 4',
    cover_image: { cropped_location: 'https://example.com/cover4.jpg' },
    logo: { cropped_location: 'https://example.com/logo4.jpg' },
    investment_raised: { amount_in_cents: 1000000, currency: 'GBP' },
    investment_sought: { amount_in_cents: 5000000, currency: 'GBP' },
    equity_offered: '12%',
    equity_offered_for_investment_raised: '2.4%',
    number_of_investors: 10,
    percentage_amount_raised: '20',
    expires_at: '2023-12-01',
    type: 'revenue',
    favourite: false,
    listed_type: 'public',
    allowed_investor_type: 'all',
    nth_round: 1,
    tax_eligibility: 'eligible',
    slug: 'test-campaign-4',
    currency: 'GBP',
    listed: true,
    video: { source: 'vimeo', id: 'jkl012' },
    status: 'active',
    pre_money_valuation: { amount_in_cents: 40000000, currency: 'GBP' },
    partner_image: 'https://example.com/partner4.jpg',
    maximum_investment_sought: { amount_in_cents: 6000000, currency: 'GBP' },
    featured: false,
    business_id: 104,
    preemption: true,
    introducer: 'Investor Group',
    target_eu: false,
    eligible_for_membership_benefits: false,
    externally_approved: false,
    externally_approved_at: null,
    allowed_to_invest: true,
    address: { country: 'Canada', city: 'Toronto' },
  },
];
