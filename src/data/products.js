const base = {
  colour: "Natural Black",
  capSizes: ["Small", "Medium", "Large"],
  densityOptions: ["150%", "180%"],
  stockStatus: "Made to order",
  rating: 4.8,
  reviewCount: 0,
  careInstructions: "Detangle gently from ends to roots, use lightweight products and store on a wig stand.",
  estimatedProcessingTime: "Demo estimate: 5–10 business days",
  tags: ["human hair", "demo product"]
};

const image = (name) => `/images/products/${name}.webp`;

export const products = [
  {
    ...base, id: 1, slug: "classic-short-bob-wig", name: "Classic Short Bob Wig", shortName: "Classic Bob",
    category: "Bob Wigs", collections: ["bob-wigs", "best-sellers"], texture: "Silky Straight",
    description: "A polished, easy-to-wear bob with a soft natural finish for effortless everyday styling.",
    shortDescription: "Clean lines, soft movement and everyday ease.", priceCAD: 89, priceNGN: 95000,
    compareAtPriceCAD: 105, compareAtPriceNGN: 112000, images: [image("short-bob-05"), image("short-natural-06")],
    lengths: ["8\"", "10\"", "12\""], availableLengths: ["8\"", "10\"", "12\""], laceTypes: ["None", "2x4 Closure"],
    featured: true, bestSeller: true, newArrival: false, stockStatus: "Low stock"
  },
  {
    ...base, id: 2, slug: "sleek-fringe-bob", name: "Sleek Fringe Bob", shortName: "Fringe Bob",
    category: "Bob Wigs", collections: ["bob-wigs", "new-arrivals"], texture: "Straight with Bangs",
    description: "A chic fringe bob designed for instant style without lace blending.",
    shortDescription: "A modern fringe with a sleek, face-framing finish.", priceCAD: 105, priceNGN: 112000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("fringe-bob-10"), image("short-bob-05")],
    lengths: ["10\"", "12\""], availableLengths: ["10\"", "12\""], laceTypes: ["None"],
    featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 3, slug: "everyday-closure-bob", name: "Everyday Closure Bob", shortName: "Closure Bob",
    category: "Closure Wigs", collections: ["bob-wigs", "everyday-wigs"], texture: "Straight",
    description: "An easy closure bob with a neat part and lightweight, natural movement.",
    shortDescription: "Beginner-friendly polish with a tidy closure part.", priceCAD: 129, priceNGN: 138000,
    compareAtPriceCAD: 145, compareAtPriceNGN: 155000, images: [image("short-natural-06"), image("fringe-bob-10")],
    lengths: ["10\"", "12\"", "14\""], availableLengths: ["10\"", "12\"", "14\""], laceTypes: ["4x4 Closure", "5x5 Closure"],
    featured: false, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 4, slug: "bone-straight-human-hair-wig", name: "Bone Straight Human-Hair Wig", shortName: "Bone Straight",
    category: "Straight Hair", collections: ["straight-hair", "best-sellers"], texture: "Bone Straight",
    description: "A smooth, high-shine straight style with fluid length and an elegant centre part.",
    shortDescription: "Sleek, glossy length with a polished finish.", priceCAD: 179, priceNGN: 192000,
    compareAtPriceCAD: 205, compareAtPriceNGN: 220000, images: [image("long-straight-08"), image("sleek-straight-07")],
    lengths: ["14\"", "16\"", "18\"", "20\"", "22\""], availableLengths: ["14\"", "16\"", "18\"", "20\"", "22\""],
    laceTypes: ["5x5 Closure", "13x4 Frontal"], featured: true, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 5, slug: "silky-straight-virgin-hair", name: "Silky Straight Virgin Hair", shortName: "Silky Straight",
    category: "Virgin Hair", collections: ["straight-hair", "virgin-hair"], texture: "Silky Straight",
    description: "Soft straight virgin hair selected for versatile styling and an airy, natural feel.",
    shortDescription: "Soft, versatile virgin hair with natural movement.", priceCAD: 159, priceNGN: 170000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("sleek-straight-07"), image("long-straight-08")],
    lengths: ["16\"", "18\"", "20\"", "22\"", "24\""], availableLengths: ["16\"", "18\"", "20\"", "22\"", "24\""],
    laceTypes: ["Bundles", "4x4 Closure"], featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 6, slug: "natural-black-frontal-wig", name: "Natural Black Frontal Wig", shortName: "Natural Frontal",
    category: "Frontal Wigs", collections: ["lace-wigs", "premium-wigs"], texture: "Silky Straight",
    description: "A versatile frontal wig for flexible parting and a smooth natural-black finish.",
    shortDescription: "Flexible styling with a natural-looking hairline.", priceCAD: 199, priceNGN: 213000,
    compareAtPriceCAD: 225, compareAtPriceNGN: 241000, images: [image("lace-straight-14"), image("long-straight-08")],
    lengths: ["14\"", "16\"", "18\"", "20\""], availableLengths: ["14\"", "16\"", "18\"", "20\""],
    laceTypes: ["13x4 Frontal", "13x6 Frontal"], featured: true, bestSeller: false, newArrival: false
  },
  {
    ...base, id: 7, slug: "deep-wave-lace-wig", name: "Deep Wave Lace Wig", shortName: "Deep Wave",
    category: "Curly Hair", collections: ["curly-hair", "best-sellers"], texture: "Deep Wave",
    description: "Defined deep waves with full-bodied movement and a soft lace finish.",
    shortDescription: "Defined waves with rich, touchable volume.", priceCAD: 169, priceNGN: 181000,
    compareAtPriceCAD: 195, compareAtPriceNGN: 209000, images: [image("deep-wave-curly-01"), image("curly-volume-12")],
    lengths: ["16\"", "18\"", "20\"", "22\""], availableLengths: ["16\"", "18\"", "20\"", "22\""],
    laceTypes: ["5x5 Closure", "13x4 Frontal"], featured: true, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 8, slug: "water-wave-everyday-wig", name: "Water Wave Everyday Wig", shortName: "Water Wave",
    category: "Curly Hair", collections: ["curly-hair", "everyday-wigs"], texture: "Water Wave",
    description: "Loose, soft waves with a relaxed shape made for simple everyday styling.",
    shortDescription: "Relaxed waves with soft, effortless texture.", priceCAD: 149, priceNGN: 159000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("natural-curl-04"), image("soft-wave-13")],
    lengths: ["14\"", "16\"", "18\"", "20\""], availableLengths: ["14\"", "16\"", "18\"", "20\""],
    laceTypes: ["4x4 Closure", "5x5 Closure"], featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 9, slug: "kinky-curly-headband-wig", name: "Kinky Curly Headband Wig", shortName: "Kinky Headband",
    category: "Headband Wigs", collections: ["headband-wigs", "beginner-friendly"], texture: "Kinky Curly",
    description: "A full kinky-curly texture with no lace to blend—secure, quick and beginner friendly.",
    shortDescription: "Natural volume with a quick, no-lace fit.", priceCAD: 119, priceNGN: 127000,
    compareAtPriceCAD: 135, compareAtPriceNGN: 145000, images: [image("kinky-curly-02"), image("headband-long-09")],
    lengths: ["12\"", "14\"", "16\"", "18\""], availableLengths: ["12\"", "14\"", "16\"", "18\""],
    laceTypes: ["Headband"], featured: false, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 10, slug: "loose-curl-glueless-wig", name: "Loose Curl Glueless Wig", shortName: "Loose Curl",
    category: "Glueless Wigs", collections: ["curly-hair", "everyday-wigs"], texture: "Loose Curl",
    description: "Soft curls and a secure glueless fit for polished style without adhesive.",
    shortDescription: "Soft curls meet a secure, adhesive-free fit.", priceCAD: 159, priceNGN: 170000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("loose-curl-03"), image("natural-curl-04")],
    lengths: ["16\"", "18\"", "20\""], availableLengths: ["16\"", "18\"", "20\""],
    laceTypes: ["5x5 Closure"], featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 11, slug: "body-wave-closure-wig", name: "Body Wave Closure Wig", shortName: "Body Wave",
    category: "Closure Wigs", collections: ["curly-hair", "best-sellers"], texture: "Body Wave",
    description: "Classic body wave movement with a natural closure and soft, brushable volume.",
    shortDescription: "Classic waves with soft, brushable volume.", priceCAD: 169, priceNGN: 181000,
    compareAtPriceCAD: 190, compareAtPriceNGN: 204000, images: [image("body-wave-11"), image("soft-wave-13")],
    lengths: ["16\"", "18\"", "20\"", "22\""], availableLengths: ["16\"", "18\"", "20\"", "22\""],
    laceTypes: ["4x4 Closure", "5x5 Closure"], featured: true, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 12, slug: "layered-shoulder-length-wig", name: "Layered Shoulder-Length Wig", shortName: "Layered Midi",
    category: "Everyday Wigs", collections: ["everyday-wigs", "new-arrivals"], texture: "Light Wave",
    description: "Face-framing layers and a wearable shoulder length for easy everyday confidence.",
    shortDescription: "Face-framing layers at an easy everyday length.", priceCAD: 139, priceNGN: 149000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("soft-wave-13"), image("body-wave-11")],
    lengths: ["12\"", "14\"", "16\""], availableLengths: ["12\"", "14\"", "16\""],
    laceTypes: ["4x4 Closure"], featured: false, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 13, slug: "natural-yaki-straight-wig", name: "Natural Yaki Straight Wig", shortName: "Yaki Straight",
    category: "Straight Hair", collections: ["straight-hair", "everyday-wigs"], texture: "Yaki Straight",
    description: "A softly textured straight finish that blends polish with realistic fullness.",
    shortDescription: "Realistic texture with smooth, full movement.", priceCAD: 159, priceNGN: 170000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("headband-long-09"), image("sleek-straight-07")],
    lengths: ["14\"", "16\"", "18\"", "20\""], availableLengths: ["14\"", "16\"", "18\"", "20\""],
    laceTypes: ["5x5 Closure", "13x4 Frontal"], featured: false, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 14, slug: "curly-bob-glueless-wig", name: "Curly Bob Glueless Wig", shortName: "Curly Bob",
    category: "Bob Wigs", collections: ["bob-wigs", "curly-hair"], texture: "Loose Curl",
    description: "A playful curly bob with a glueless fit and flattering chin-to-shoulder shape.",
    shortDescription: "Bouncy curls in an easy glueless bob.", priceCAD: 129, priceNGN: 138000,
    compareAtPriceCAD: 149, compareAtPriceNGN: 159000, images: [image("natural-curl-04"), image("deep-wave-curly-01")],
    lengths: ["10\"", "12\"", "14\""], availableLengths: ["10\"", "12\"", "14\""],
    laceTypes: ["4x4 Closure"], featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 15, slug: "full-volume-deep-curl-wig", name: "Full Volume Deep Curl Wig", shortName: "Deep Curl",
    category: "Curly Hair", collections: ["curly-hair", "premium-wigs"], texture: "Deep Curl",
    description: "Statement curls with generous density and length for a full, confident silhouette.",
    shortDescription: "Statement curls with generous, defined volume.", priceCAD: 189, priceNGN: 202000,
    compareAtPriceCAD: 215, compareAtPriceNGN: 230000, images: [image("curly-volume-12"), image("kinky-curly-02")],
    lengths: ["18\"", "20\"", "22\"", "24\""], availableLengths: ["18\"", "20\"", "22\"", "24\""],
    laceTypes: ["5x5 Closure", "13x4 Frontal"], densityOptions: ["180%", "200%"], featured: true, bestSeller: false, newArrival: false
  },
  {
    ...base, id: 16, slug: "beginner-friendly-headband-wig", name: "Beginner-Friendly Headband Wig", shortName: "Easy Headband",
    category: "Headband Wigs", collections: ["headband-wigs", "beginner-friendly"], texture: "Body Wave",
    description: "A comfortable starter wig with a simple headband fit and soft, natural movement.",
    shortDescription: "A comfortable, quick-fit style for first-time wearers.", priceCAD: 99, priceNGN: 106000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("headband-long-09"), image("body-wave-11")],
    lengths: ["12\"", "14\"", "16\""], availableLengths: ["12\"", "14\"", "16\""],
    laceTypes: ["Headband"], featured: false, bestSeller: true, newArrival: false
  },
  {
    ...base, id: 17, slug: "hd-lace-straight-wig", name: "HD Lace Straight Wig", shortName: "HD Straight",
    category: "Premium Wigs", collections: ["straight-hair", "premium-wigs"], texture: "Silky Straight",
    description: "A refined straight wig with HD lace for a lightweight, polished hairline finish.",
    shortDescription: "Refined HD lace with smooth, flowing length.", priceCAD: 229, priceNGN: 245000,
    compareAtPriceCAD: 259, compareAtPriceNGN: 277000, images: [image("lace-straight-14"), image("long-straight-08")],
    lengths: ["16\"", "18\"", "20\"", "22\""], availableLengths: ["16\"", "18\"", "20\"", "22\""],
    laceTypes: ["HD 5x5 Closure", "HD 13x4 Frontal"], featured: true, bestSeller: false, newArrival: true
  },
  {
    ...base, id: 18, slug: "soft-curl-closure-wig", name: "Soft Curl Closure Wig", shortName: "Soft Curl",
    category: "Closure Wigs", collections: ["curly-hair", "everyday-wigs"], texture: "Soft Curl",
    description: "Soft, romantic curls with a tidy closure and an easy-to-style everyday shape.",
    shortDescription: "Romantic curls with an easy closure finish.", priceCAD: 159, priceNGN: 170000,
    compareAtPriceCAD: null, compareAtPriceNGN: null, images: [image("loose-curl-03"), image("soft-wave-13")],
    lengths: ["14\"", "16\"", "18\"", "20\""], availableLengths: ["14\"", "16\"", "18\"", "20\""],
    laceTypes: ["4x4 Closure", "5x5 Closure"], featured: false, bestSeller: true, newArrival: false
  }
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
