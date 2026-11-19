// All facts come from veon/client.json (ids in comments). Nothing here is invented:
// no city counts, no assortment totals, no reviews, no prices.

export const phones = [
  // company.contacts.phones
  { label: "(095) 275 55 50", href: "tel:+380952755550" },
  { label: "(097) 775-55-50", href: "tel:+380977755550" },
] as const;

export const emails = {
  // company.contacts.emails
  retail: { label: "KOA@asiaparts.com.ua", href: "mailto:KOA@asiaparts.com.ua", note: "роздріб" },
  wholesale: { label: "pdk@asiaparts.com.ua", href: "mailto:pdk@asiaparts.com.ua", note: "опт" },
} as const;

export const vinMail = `mailto:KOA@asiaparts.com.ua?subject=${encodeURIComponent("Підбір за VIN")}`;

// company.contacts.hours
export const hoursShort = "пн–пт 9–18, сб 9–15";
export const hoursLong = ["пн–пт 9:00–18:00", "сб 9:00–15:00", "нд вихідний"];

// company.products_services[1], alphabetical as on the client's catalogue
export const brands = [
  "BYD", "Chana", "Chery", "Geely", "Great Wall", "JAC", "JETOUR", "Lifan",
  "MG", "SsangYong", "TESLA", "TOYOTA", "VW", "WELTMEISTER", "ZEEKR",
];

// company.products_services[0]
export const categories = [
  "Запчастини для ТО",
  "Гальмівна система",
  "Двигун і система вихлопу",
  "Підвіска та рульове",
  "Коробка передач",
  "Охолодження та опалення",
  "Електрика і освітлення",
  "Кузовні деталі",
  "Масла і автохімія",
  "Аксесуари",
  "Шини б/в",
];

// W-F015: 15 popular models of the catalogue (audit/notes/ux.md, ua-desktop-s04.png), grouped by make
export const modelGroups = [
  { make: "Chery", models: ["Amulet", "Tiggo", "QQ", "Forza", "Jaggi", "Eastar", "Kimo", "Tiggo 2", "M11"] },
  { make: "Geely", models: ["CK", "MK", "CK2", "Emgrand EC7"] },
  { make: "Great Wall", models: ["Hover H2"] },
  { make: "BYD", models: ["F3"] },
];

// C-020 / W-F002
export const amulet = {
  goods: "1 303",
  makers: "90",
  top: [
    { name: "KLM AutoParts", n: 435 },
    { name: "Aftermarket", n: 234 },
    { name: "Kimiko", n: 138 },
    { name: "CHERY", n: 122 },
    { name: "BOSCH", n: 23 },
  ],
  others: ["ASHIKA", "DAYCO", "SCT"], // products_services[3]
  checked: "19.11.2026",
};

// company.contacts.addresses + C-016..C-019
const mapUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const pickup = [
  {
    city: "Дніпро",
    points: [
      { street: "вул. Марії Лисиченко, 10", hours: ["пн–пт 9:00–18:00", "сб 9:00–15:00", "нд вихідний"], note: "Поруч СТО Asia Service", map: mapUrl("Дніпро, вул. Марії Лисиченко, 10") },
      { street: "вул. Перекопська, 2", hours: ["пн–пт 9:00–17:00", "сб 10:00–15:00", "нд вихідний"], map: mapUrl("Дніпро, вул. Перекопська, 2") },
      { street: "Донецьке шосе, 122К", hours: ["пн–пт 9:00–17:00", "сб 10:00–15:00", "нд вихідний"], map: mapUrl("Дніпро, Донецьке шосе, 122К") },
    ],
  },
  {
    city: "Київ",
    points: [
      { street: "вул. Новокостянтинівська, 22/15", hours: ["пн–пт 9:00–17:00", "сб 10:00–14:00", "нд вихідний"], map: mapUrl("Київ, вул. Новокостянтинівська, 22/15") },
    ],
  },
];

export const futureNote = "Розділ у розробці";
export const formNote = "Онлайн-заявка з'явиться в повній версії сайту";
