import content from "./content.json";

const servicePresentation: Record<string, { eyebrow: string; image: string }> = {
  "residential-cleaning": { eyebrow: "Homes & apartments", image: "/img/residential.webp" },
  "commercial-cleaning": { eyebrow: "Retail & hospitality", image: "/img/image-service/office-cleaning/b1.webp" },
  "office-cleaning": { eyebrow: "Workplaces", image: "/img/office.webp" },
  "move-in-out-cleaning": { eyebrow: "Fresh starts", image: "/img/move.webp" },
  "deep-cleaning": { eyebrow: "Extra attention", image: "/img/deep.webp" },
};

const areaPresentation: Record<string, { image: string; neighborhoods: string[] }> = {
  manhattan: {
    image: "/img/hero.webp",
    neighborhoods: ["Downtown Manhattan", "Upper East Side", "Upper West Side", "Financial District"],
  },
  brooklyn: {
    image: "/img/residential.webp",
    neighborhoods: ["Williamsburg", "Brooklyn Heights", "DUMBO", "Park Slope"],
  },
  queens: {
    image: "/img/office.webp",
    neighborhoods: ["Long Island City", "Astoria", "Forest Hills", "Nearby Queens neighborhoods"],
  },
  bronx: {
    image: "/img/deep.webp",
    neighborhoods: ["Residential neighborhoods", "Apartments", "Offices", "Commercial spaces"],
  },
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const business = {
  name: `${content.businessInfo.name} Multiservices`,
  phone: content.businessInfo.phone,
  phoneHref: `tel:${content.businessInfo.phoneRaw}`,
  email: content.businessInfo.email,
  emailHref: `mailto:${content.businessInfo.email}`,
  location: content.businessInfo.location,
  address: content.businessInfo.address,
  instagram: content.businessInfo.social.instagram.url,
  hours: content.businessInfo.hours.schedule.replace(": ", ", ").replace("Mon - Sun", "Mon–Sun"),
  serviceArea: content.businessInfo.serviceArea,
  founded: `Serving New York City since ${content.businessInfo.foundedYear}`,
};

export const services = content.services.list
  .filter((service) => service.flags?.cleaning !== false)
  .map((service) => {
    const presentation = servicePresentation[service.slug] ?? {
      eyebrow: "Professional cleaning",
      image: service.image ?? "/img/residential.webp",
    };

    return {
      slug: service.slug,
      eyebrow: presentation.eyebrow,
      title: service.title,
      short: service.description,
      intro: service.longDescription,
      image: presentation.image,
      items: service.features.slice(0, 4),
      resultTitle: service.whyChoose,
      showResults: service.flags?.showResults ?? false,
      gallery: service.gallery ?? [],
    };
  });

export const reviews = content.testimonials.list
  .map((review) => review.content);

const residentialFaqs = content.services.list.find(
  (service) => service.slug === "residential-cleaning",
)?.faqs ?? [];

export const faqs = [
  ...residentialFaqs,
  ...content.pricing.faq.slice(0, 1),
].map((item) => ({
  question: item.question,
  answer: item.answer,
}));

export const pricing = content.pricing.services.map((plan, index) => ({
  label: plan.title,
  price: plan.items[0]?.price ?? "",
  note: index === 0 ? "Minimum visit" : "Day rate",
  detail: plan.items[0]?.label ?? "",
  extras: plan.items.slice(1).map((item) =>
    item.price ? `${item.price} ${item.label}` : item.label,
  ),
}));

export const areas = content.coverage.areas.map((area) => {
  const slug = slugify(area.name);
  const presentation = areaPresentation[slug] ?? {
    image: "/img/coverage.webp",
    neighborhoods: [area.description],
  };

  return {
    slug,
    name: area.name,
    title: `Cleaning services in ${area.name}`,
    description: area.description,
    neighborhoods: presentation.neighborhoods,
    image: presentation.image,
  };
});

export { content };
