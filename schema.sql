-- 1. Create the Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_percent INTEGER,
    rating DECIMAL(3,2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    style TEXT NOT NULL,
    colors TEXT[] NOT NULL,
    sizes TEXT[] NOT NULL,
    description TEXT NOT NULL,
    is_new BOOLEAN DEFAULT false,
    is_top_selling BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Create a public read policy
CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

-- 4. Seed the Products Database with Initial Catalog
INSERT INTO public.products (id, name, price, original_price, discount_percent, rating, reviews_count, image, category, style, colors, sizes, description, is_new, is_top_selling)
VALUES
(1, 'Gradient Graphic T-shirt', 145, NULL, NULL, 3.5, 150, '/images/gradient_graphic_tshirt.png', 'T-shirts', 'Casual', ARRAY['#ffffff', '#aa3bff', '#000000'], ARRAY['Small', 'Medium', 'Large', 'X-Large'], 'This graphic t-shirt features a vibrant and retro color gradient graphic across the chest. Made from soft 100% premium cotton, it offers both unparalleled comfort and eye-catching streetwear style.', true, false),

(2, 'Polo with Tipping Details', 180, NULL, NULL, 4.5, 220, '/images/polo_tipping.png', 'Shirts', 'Casual', ARRAY['#6b0b24', '#000000', '#01ab31'], ARRAY['Medium', 'Large', 'X-Large', 'XX-Large'], 'Elevate your casual wear with this sophisticated burgundy polo shirt. Featuring precise dual white tipping details on the ribbed collar and sleeve cuffs, this structured polo offers a modern athletic silhouette.', false, false),

(3, 'Black Striped T-shirt', 120, 150, 20, 5.0, 85, '/images/black_striped_tshirt.png', 'T-shirts', 'Casual', ARRAY['#000000', '#ffffff'], ARRAY['Small', 'Medium', 'Large'], 'A timeless striped pattern that fits seamlessly into any daily wardrobe. Featuring horizontal white stripes on deep black cotton knit, this shirt provides clean structural lines and a comfortable relaxed drape.', true, false),

(4, 'Skinny Fit Jeans', 240, 260, 20, 3.5, 120, '/images/skinny_fit_jeans.png', 'Jeans', 'Casual', ARRAY['#2d4263', '#000000'], ARRAY['Small', 'Medium', 'Large', 'X-Large'], 'Crafted with dynamic stretch denim, these skinny-fit jeans offer maximum flexibility while maintaining their modern structured shape. Hand-washed indigo provides an authentic worn-in aesthetic.', true, false),

(5, 'Checkered Shirt', 180, NULL, NULL, 4.5, 310, '/images/checkered_shirt.png', 'Shirts', 'Casual', ARRAY['#ff3333', '#2d4263'], ARRAY['Small', 'Medium', 'Large', 'X-Large'], 'Classic red and navy plaid flannel button-up. Made with brushed cotton for extreme warmth and softness, it serves as the perfect layering piece or standalone casual flannel shirt.', false, true),

(6, 'Sleeve Striped T-shirt', 130, 160, 30, 4.5, 95, '/images/sleeve_striped_tshirt.png', 'T-shirts', 'Gym', ARRAY['#e65c00', '#000000'], ARRAY['Medium', 'Large', 'X-Large'], 'Contrast raglan crewneck with solid color-blocking. Bold orange body paired with stark black sleeves and details, providing a dynamic sporty design ideal for gym sessions or streetwear styling.', false, false),

(7, 'Vertical Striped Shirt', 212, 232, 20, 5.0, 140, '/images/vertical_striped_shirt.png', 'Shirts', 'Formal', ARRAY['#2d6a4f', '#ffffff'], ARRAY['Small', 'Medium', 'Large', 'X-Large'], 'Premium green and white vertical stripe button-down shirt. Perfect for smart-casual transition, styled with a clean button-down collar and tailored slim cuffs in high-grade linen blend cotton.', false, true),

(8, 'Courage Graphic T-shirt', 145, NULL, NULL, 4.0, 75, '/images/courage_graphic_tshirt.png', 'T-shirts', 'Casual', ARRAY['#d97736', '#ffffff', '#000000'], ARRAY['Small', 'Medium', 'Large', 'X-Large'], 'An artistic modern terracotta-colored graphic tee featuring bold retro ''COURAGE'' lettering printed across the chest. Clean heavy jersey construction makes it highly durable and structural.', false, true),

(9, 'Loose Fit Bermuda Shorts', 80, NULL, NULL, 3.0, 45, '/images/loose_bermuda_shorts.png', 'Shorts', 'Casual', ARRAY['#7fa8d8', '#e6e6e6'], ARRAY['Small', 'Medium', 'Large'], 'Relaxed mid-wash denim bermuda shorts, designed for everyday warmth and high-mobility comfort. Fully stitched hems and classic 5-pocket hardware setup for functional convenience.', false, true),

(10, 'T-shirt with Tape Details', 120, NULL, NULL, 4.5, 180, '/images/tshirt_tape_details.png', 'T-shirts', 'Casual', ARRAY['#000000', '#ffffff'], ARRAY['Small', 'Medium', 'Large', '#X-Large'], 'Premium black heavyweight t-shirt featuring minimal branding with industrial style tape details on the shoulders and cuffs, expressing a futuristic technical streetwear look.', true, false)
ON CONFLICT (id) DO NOTHING;
