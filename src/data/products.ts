export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  image?: string;
}

export interface ProductVariation {
  id: string;
  name: string; // e.g. "זהב צהוב 14K"
  hex: string;  // For UI color circles
}

export interface Product {
  id: string;
  name: string;
  englishName: string;
  description: string;
  detailedDescription: string;
  price: number;
  salePrice?: number;
  category: "rings" | "necklaces" | "earrings" | "bracelets" | "collections";
  categoryHebrew: string;
  images: string[]; // [primary, secondary/model, tertiary, ...]
  variations: ProductVariation[];
  sizes: string[];
  stock: number;
  tags: ("New" | "Sale" | "VIP" | "Best Seller")[];
  rating: number;
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "טבעת סוליטר אוריאנה",
    englishName: "Oriana Solitaire Ring",
    description: "טבעת אירוסין קלאסית בזהב 18 קראט משובצת יהלום מרכזי בחיתוך בריליאנט 1.0 קראט.",
    detailedDescription: "טבעת סוליטר אוריאנה היא יצירת מופת של עיצוב קלאסי ונצחי. משובצת ביהלום מרכזי נקי במיוחד (VS1, צבע F) במשקל 1.0 קראט, המוחזק על ידי שש שיניים מעוצבות להשגת נצנוץ אופטימלי. החישוק מעוצב בזהב 18K מלוטש בקפידה התורם למראה נקי, דק ומלא נוכחות. מיוצרת בעבודת יד קפדנית בבית המלאכה שלנו.",
    price: 12900,
    salePrice: 10900,
    category: "rings",
    categoryHebrew: "טבעות",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v1-1", name: 'זהב צהוב 18K', hex: "#E5D3B3" },
      { id: "v1-2", name: 'זהב לבן 18K', hex: "#E5E5E5" },
      { id: "v1-3", name: 'זהב אדום 18K', hex: "#D2A292" }
    ],
    sizes: ["48", "50", "52", "54", "56", "58", "60"],
    stock: 5,
    tags: ["New", "Best Seller"],
    rating: 4.9,
    reviews: [
      {
        id: "r1",
        author: "מיכל א.",
        rating: 5,
        date: "2026-04-12",
        content: "טבעת מושלמת! היהלום מנצנץ ברמות שאי אפשר להסביר והשירות בסטודיו היה מדהים ואדיב ביותר.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
      },
      {
        id: "r2",
        author: "דניאל ג.",
        rating: 5,
        date: "2026-05-01",
        content: "רכשתי כהצעת נישואין, זוגתי לא מפסיקה לקבל מחמאות. מומלץ בחום.",
      }
    ]
  },
  {
    id: "p2",
    name: "שרשרת פניני ונציה",
    englishName: "Venezia Pearl Necklace",
    description: "שרשרת זהב לבן מעודנת משובצת פנינת מים מתוקים מובחרת בעיטור יהלומים זעירים.",
    detailedDescription: "שרשרת מעודנת זו מביאה את הרומנטיקה של ונציה לעולם המודרני. פנינת בארוק טבעית ומובחרת בקוטר 9 מ״מ תלויה על שרשרת עדינה מזהב לבן 14K, מעוטרת בכתר יהלומים קטנים בחיתוך עגול המעניקים לה שובל של אור ויוקרה מאופקת. מתאימה לענידה יומיומית אצילית או לאירועים מיוחדים.",
    price: 4500,
    category: "necklaces",
    categoryHebrew: "שרשראות",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v2-1", name: 'זהב לבן 14K', hex: "#E5E5E5" },
      { id: "v2-2", name: 'זהב צהוב 14K', hex: "#E5D3B3" }
    ],
    sizes: ["42 ס״מ", "45 ס״מ"],
    stock: 12,
    tags: ["Best Seller"],
    rating: 4.8,
    reviews: [
      {
        id: "r3",
        author: "רונית ל.",
        rating: 5,
        date: "2026-03-28",
        content: "שרשרת עדינה ויפהפיה. הפנינה בעלת ברק מדהים ואיכות העבודה ללא פשרות. פשוט תענוג.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "p3",
    name: "עגילי חישוק אולטימט",
    englishName: "Ultimate Hoop Earrings",
    description: "עגילי חישוק רחבים בטקסטורה ייחודית של זהב שמפניה צהוב 18 קראט.",
    detailedDescription: "עגילי החישוק אולטימט מציגים פרשנות חדשנית ואמיצה לקלאסיקה המוכרת. עשויים זהב 18K מלוטש ומיוצרים בטכנולוגיית Electroforming המאפשרת להם להיות קלי משקל ונוחים לענידה ממושכת על אף נפחם המרשים. הגימור המבריק משקף את האור בצורה רכה ונקייה.",
    price: 3200,
    category: "earrings",
    categoryHebrew: "עגילים",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v3-1", name: 'זהב צהוב 18K', hex: "#E5D3B3" },
      { id: "v3-2", name: 'זהב אדום 18K', hex: "#D2A292" }
    ],
    sizes: ["OS (קוטר 2.5 ס״מ)"],
    stock: 8,
    tags: ["New"],
    rating: 4.7,
    reviews: [
      {
        id: "r4",
        author: "טל מ.",
        rating: 4,
        date: "2026-05-10",
        content: "עגילים מרשימים וקלים מאוד על האוזן. הגיע באריזה יוקרתית יפה במיוחד."
      }
    ]
  },
  {
    id: "p4",
    name: "צמיד טניס אינפיניטי",
    englishName: "Infinity Tennis Bracelet",
    description: "צמיד טניס יוקרתי משובץ 3.5 קראט יהלומים טבעיים מסודרים ברצף אינסופי של ברק.",
    detailedDescription: "צמיד הטניס אינפיניטי מייצג את שיא היוקרה הטכנולוגית המינימליסטית. 68 יהלומים איכותיים בחיתוך אידיאלי משובצים בטכניקת שיבוץ שיניים ייחודית המטשטשת את מראה הזהב וגורמת ליהלומים להיראות כקו אור רציף סביב פרק כף היד. מנגנון סגירה כפול ובטיחותי המובנה בצורה סמויה בעיצוב.",
    price: 24500,
    category: "bracelets",
    categoryHebrew: "צמידים",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v4-1", name: 'זהב לבן 18K', hex: "#E5E5E5" },
      { id: "v4-2", name: 'זהב צהוב 18K', hex: "#E5D3B3" }
    ],
    sizes: ["16 ס״מ", "17 ס״מ", "18 ס״מ"],
    stock: 2,
    tags: ["VIP"],
    rating: 5.0,
    reviews: [
      {
        id: "r5",
        author: "אורית ב.",
        rating: 5,
        date: "2026-02-14",
        content: "יצירת אמנות. הצמיד נוצץ למרחקים ונשאר סופר יציב על היד. שירות VIP אמיתי של תכשיטי יאיר.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "p5",
    name: "טבעת זהב מפותלת קוסמוס",
    englishName: "Cosmos Twisted Ring",
    description: "טבעת פיסולית רחבה במראה מפותל העשויה זהב צהוב 14 קראט מבריק.",
    detailedDescription: "טבעת זהב קוסמוס היא עיצוב פיסולי בעל נוכחות מרשימה אך נקייה. הקווים המעוגלים יוצרים זרימה טבעית על האצבע, ויוצרים משחקי אור וצל על גבי משטח הזהב המלוטש לרמת מראה. מושלמת כטבעת אמירה עצמאית או בשילוב עם טבעות עדינות.",
    price: 2800,
    category: "rings",
    categoryHebrew: "טבעות",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v5-1", name: 'זהב צהוב 14K', hex: "#E5D3B3" },
      { id: "v5-2", name: 'זהב אדום 14K', hex: "#D2A292" },
      { id: "v5-3", name: 'זהב לבן 14K', hex: "#E5E5E5" }
    ],
    sizes: ["50", "52", "54", "56", "58"],
    stock: 15,
    tags: ["New"],
    rating: 4.6,
    reviews: []
  },
  {
    id: "p6",
    name: "עגילי טיפות טופז",
    englishName: "Topaz Drop Earrings",
    description: "עגילי תליון עשויים זהב 14K משובצים באבני טופז כחולות בחיתוך טיפה מלכותי.",
    detailedDescription: "עגילי טיפות טופז משלבים צבע מהפנט ועיצוב מינימליסטי יוקרתי. אבני טופז כחולות (Sky Blue Topaz) בחיתוך טיפה נקי תלויות בעדינות על ציר זהב צהוב 14K קשיח, המעוטר ביהלום קטן בודד בראש התליון. תנועת העגיל מעניקה חיות וזוהר לעונדת.",
    price: 3900,
    category: "earrings",
    categoryHebrew: "עגילים",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
    ],
    variations: [
      { id: "v6-1", name: 'זהב צהוב 14K', hex: "#E5D3B3" },
      { id: "v6-2", name: 'זהב לבן 14K', hex: "#E5E5E5" }
    ],
    sizes: ["OS"],
    stock: 4,
    tags: ["Sale"],
    salePrice: 3200,
    rating: 4.9,
    reviews: [
      {
        id: "r6",
        author: "אביגיל ש.",
        rating: 5,
        date: "2026-04-19",
        content: "עגילים מדהימים ביופיים! הכחול של הטופז עמוק וצלול והשילוב עם הזהב מושלם."
      }
    ]
  }
];
