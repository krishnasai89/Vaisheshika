export interface PadarthaCategory {
  _id?: string;
  id?: string;
  name: string;
  sanskritName: string;
  description: string;
  attributes?: string[];
}

const API_BASE_URL = "https://vaisheshikaapi.vercel.app";

/**
 * Service handler for fetching the 7 core ontological categories (Padārthas)
 */
export async function fetchCategories(): Promise<PadarthaCategory[]> {
  try {
    // We use dynamic ISR caching (revalidate every 24 hours) for performance and high SEO rating
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      next: { revalidate: 86400 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to pull Vaisheshika ontological dataset:", error);

    // Failover: Static baseline structure to prevent UI crashes if server sleeps
    return [
      {
        name: "Substance",
        sanskritName: "Dravya",
        description:
          "The primordial elements and physical substratums of reality.",
        attributes: [
          "Earth",
          "Water",
          "Fire",
          "Air",
          "Ether",
          "Time",
          "Space",
          "Self",
          "Mind",
        ],
      },
      {
        name: "Quality",
        sanskritName: "Guṇa",
        description:
          "The static attributes or characteristics that inherent in a substance.",
        attributes: ["Color", "Taste", "Smell", "Touch", "Number", "Dimension"],
      },
      {
        name: "Action",
        sanskritName: "Karma",
        description:
          "The kinetic properties, movements, and dynamic physics of a substance.",
        attributes: [
          "Upward",
          "Downward",
          "Contraction",
          "Expansion",
          "Locomotion",
        ],
      },
    ];
  }
}
