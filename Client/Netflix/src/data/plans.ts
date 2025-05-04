export interface PlanFeature {
  label: string;
  value: string;
}

export enum PlanName {
  BASIC = "Basic",
  STANDARD = "Standard",
  PREMIUM = "Premium",
}

export interface Plan {
  id: string;
  title: PlanName;
  resolution: string;
  price: number;
  features: PlanFeature[];
  isMostPopular?: boolean;
  currency: string;
}

export const plans: Plan[] = [
  {
    id: "premium",
    title: PlanName.PREMIUM,
    resolution: "4K + HDR",
    price: 69.9,
    currency: "ILS",
    features: [
      { label: "Video & Audio Quality", value: "Best" },
      { label: "Resolution", value: "4K (Ultra HD) + HDR" },
      { label: "Supported Devices", value: "TV, Computer, Phone, Tablet" },
      { label: "Devices you can watch on at once", value: "4" },
      { label: "Download on Devices", value: "6" },
    ],
    isMostPopular: true,
  },
  {
    id: "standard",
    title: PlanName.STANDARD,
    resolution: "1080p (Full HD)",
    price: 54.9,
    currency: "ILS",
    features: [
      { label: "Video & Audio Quality", value: "Great" },
      { label: "Resolution", value: "1080p (Full HD)" },
      { label: "Supported Devices", value: "TV, Computer, Phone, Tablet" },
      { label: "Devices you can watch on at once", value: "2" },
      { label: "Download on Devices", value: "2" },
    ],
  },
  {
    id: "basic",
    title: PlanName.BASIC,
    resolution: "720p (HD)",
    price: 32.9,
    currency: "ILS",
    features: [
      { label: "Video & Audio Quality", value: "Good" },
      { label: "Resolution", value: "720p (HD)" },
      { label: "Supported Devices", value: "TV, Computer, Phone, Tablet" },
      { label: "Devices you can watch on at once", value: "1" },
      { label: "Download on Devices", value: "1" },
    ],
  },
];
