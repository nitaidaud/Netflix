export interface PlanFeature {
    label: string;
    value: string;
  }
  
  export interface Plan {
    id: string;
    title: string;
    resolution: string;
    price: string;
    features: PlanFeature[];
    isMostPopular?: boolean;
  }
  
  export const plans: Plan[] = [
    {
      id: "premium",
      title: "Premium",
      resolution: "4K + HDR",
      price: "₪69.90",
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
      title: "Standard",
      resolution: "1080p (Full HD)",
      price: "₪54.90",
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
      title: "Basic",
      resolution: "720p (HD)",
      price: "₪32.90",
      features: [
        { label: "Video & Audio Quality", value: "Good" },
        { label: "Resolution", value: "720p (HD)" },
        { label: "Supported Devices", value: "TV, Computer, Phone, Tablet" },
        { label: "Devices you can watch on at once", value: "1" },
        { label: "Download on Devices", value: "1" },
      ],
    },
  ];
  