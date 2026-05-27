import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shop_co_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    } else {
      return [
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
          variationId: "1-Large-#ffffff",
          quantity: 1,
          selectedSize: "Large",
          selectedColor: "#ffffff",
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
          variationId: "5-Medium-#ff3333",
          quantity: 1,
          selectedSize: "Medium",
          selectedColor: "#ff3333",
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
          variationId: "4-Large-#2d4263",
          quantity: 1,
          selectedSize: "Large",
          selectedColor: "#2d4263",
        }
      ];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('shop_co_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [promoCode, setPromoCode] = useState(() => {
    return localStorage.getItem('shop_co_promo') || '';
  });

  const [discountPercent, setDiscountPercent] = useState(() => {
    return promoCode.toUpperCase() === 'DISCOUNT20' ? 20 : 0;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('shop_co_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shop_co_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('shop_co_promo', promoCode);
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      setDiscountPercent(20);
    } else {
      setDiscountPercent(0);
    }
  }, [promoCode]);

  // Add Item to Cart
  const addToCart = (product, quantity = 1, size = 'Medium', color = 'Black') => {
    setCartItems((prevItems) => {
      // Create a unique key for each item variation (id + size + color)
      const variationId = `${product.id}-${size}-${color}`;
      
      const existingItemIndex = prevItems.findIndex(
        (item) => item.variationId === variationId
      );

      if (existingItemIndex > -1) {
        // Variation exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // New variation, add to cart
        return [
          ...prevItems,
          {
            ...product,
            variationId,
            quantity,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
  };

  // Update Item Quantity
  const updateQuantity = (variationId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.variationId === variationId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove Item from Cart
  const removeFromCart = (variationId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.variationId !== variationId)
    );
  };

  // Apply Coupon / Promo Code
  const applyPromoCode = (code) => {
    setPromoCode(code);
    if (code.toUpperCase() === 'DISCOUNT20') {
      return { success: true, message: 'Promo code applied successfully (20% off)!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "DISCOUNT20"' };
    }
  };

  // Remove Coupon / Promo Code
  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  // Math Computations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 20% discount if applied
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  
  // Delivery Fee is $15 as per screenshot, or free if cart is empty
  const deliveryFee = subtotal > 0 ? 15 : 0;
  
  const total = subtotal - discountAmount + deliveryFee;

  // Global cart quantity count
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        wishlistItems,
        promoCode,
        discountPercent,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
