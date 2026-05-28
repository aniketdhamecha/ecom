import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// High-fidelity fallback catalog to prevent app breakdown if DB is not seeded/configured yet
const mockProducts = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 3.5,
    reviewsCount: 150,
    image: "/images/gradient_graphic_tshirt.png",
    category: "T-shirts",
    style: "Casual",
    colors: ["#ffffff", "#aa3bff", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "This graphic t-shirt features a vibrant and retro color gradient graphic across the chest. Made from soft 100% premium cotton, it offers both unparalleled comfort and eye-catching streetwear style.",
    isNew: true,
    isTopSelling: false,
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.5,
    reviewsCount: 220,
    image: "/images/polo_tipping.png",
    category: "Shirts",
    style: "Casual",
    colors: ["#6b0b24", "#000000", "#01ab31"],
    sizes: ["Medium", "Large", "X-Large", "XX-Large"],
    description: "Elevate your casual wear with this sophisticated burgundy polo shirt. Featuring precise dual white tipping details on the ribbed collar and sleeve cuffs, this structured polo offers a modern athletic silhouette.",
    isNew: false,
    isTopSelling: false,
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    price: 120,
    originalPrice: 150,
    discountPercent: 20,
    rating: 5.0,
    reviewsCount: 85,
    image: "/images/black_striped_tshirt.png",
    category: "T-shirts",
    style: "Casual",
    colors: ["#000000", "#ffffff"],
    sizes: ["Small", "Medium", "Large"],
    description: "A timeless striped pattern that fits seamlessly into any daily wardrobe. Featuring horizontal white stripes on deep black cotton knit, this shirt provides clean structural lines and a comfortable relaxed drape.",
    isNew: true,
    isTopSelling: false,
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    discountPercent: 20,
    rating: 3.5,
    reviewsCount: 120,
    image: "/images/skinny_fit_jeans.png",
    category: "Jeans",
    style: "Casual",
    colors: ["#2d4263", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Crafted with dynamic stretch denim, these skinny-fit jeans offer maximum flexibility while maintaining their modern structured shape. Hand-washed indigo provides an authentic worn-in aesthetic.",
    isNew: true,
    isTopSelling: false,
  },
  {
    id: 5,
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    reviewsCount: 310,
    image: "/images/checkered_shirt.png",
    category: "Shirts",
    style: "Casual",
    colors: ["#ff3333", "#2d4263"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Classic red and navy plaid flannel button-up. Made with brushed cotton for extreme warmth and softness, it serves as the perfect layering piece or standalone casual flannel shirt.",
    isNew: false,
    isTopSelling: true,
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    discountPercent: 30,
    rating: 4.5,
    reviewsCount: 95,
    image: "/images/sleeve_striped_tshirt.png",
    category: "T-shirts",
    style: "Gym",
    colors: ["#e65c00", "#000000"],
    sizes: ["Medium", "Large", "X-Large"],
    description: "Contrast raglan crewneck with solid color-blocking. Bold orange body paired with stark black sleeves and details, providing a dynamic sporty design ideal for gym sessions or streetwear styling.",
    isNew: false,
    isTopSelling: false,
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discountPercent: 20,
    rating: 5.0,
    reviewsCount: 140,
    image: "/images/vertical_striped_shirt.png",
    category: "Shirts",
    style: "Formal",
    colors: ["#2d6a4f", "#ffffff"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Premium green and white vertical stripe button-down shirt. Perfect for smart-casual transition, styled with a clean button-down collar and tailored slim cuffs in high-grade linen blend cotton.",
    isNew: false,
    isTopSelling: true,
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    reviewsCount: 75,
    image: "/images/courage_graphic_tshirt.png",
    category: "T-shirts",
    style: "Casual",
    colors: ["#d97736", "#ffffff", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "An artistic modern terracotta-colored graphic tee featuring bold retro 'COURAGE' lettering printed across the chest. Clean heavy jersey construction makes it highly durable and structural.",
    isNew: false,
    isTopSelling: true,
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    reviewsCount: 45,
    image: "/images/loose_bermuda_shorts.png",
    category: "Shorts",
    style: "Casual",
    colors: ["#7fa8d8", "#e6e6e6"],
    sizes: ["Small", "Medium", "Large"],
    description: "Relaxed mid-wash denim bermuda shorts, designed for everyday warmth and high-mobility comfort. Fully stitched hems and classic 5-pocket hardware setup for functional convenience.",
    isNew: false,
    isTopSelling: true,
  },
  {
    id: 10,
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    reviewsCount: 180,
    image: "/images/tshirt_tape_details.png",
    category: "T-shirts",
    style: "Casual",
    colors: ["#000000", "#ffffff"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    description: "Premium black heavyweight t-shirt featuring minimal branding with industrial style tape details on the shoulders and cuffs, expressing a futuristic technical streetwear look.",
    isNew: true,
    isTopSelling: false,
  }
];

export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // Fallback to static mock products if Supabase credentials are not set
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(200).json({
      success: true,
      source: 'static_fallback',
      data: mockProducts
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Query active products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      // If table is missing or query fails, output the mockProducts catalog gracefully
      return res.status(200).json({
        success: true,
        source: 'static_database_fallback',
        data: mockProducts
      });
    }

    // If query was successful but table has no entries, seed them or return fallback
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        source: 'static_empty_fallback',
        data: mockProducts
      });
    }

    return res.status(200).json({
      success: true,
      source: 'database',
      data: products
    });

  } catch (err) {
    // Graceful error fallback
    return res.status(200).json({
      success: true,
      source: 'exception_fallback',
      data: mockProducts
    });
  }
}
