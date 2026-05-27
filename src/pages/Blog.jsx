import React, { useRef, useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, BookOpen, User, X, Share2, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Refs for scroll reveal animations
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);

  // Intersection visibility states
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isFeaturedVisible, setIsFeaturedVisible] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  // Active category filter state
  const [activeCategory, setActiveCategory] = useState('All');
  
  // State for article reading drawer modal
  const [readingArticle, setReadingArticle] = useState(null);
  const [articleLikes, setArticleLikes] = useState({});

  useEffect(() => {
    // Scroll automatically to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    const observerOptions = { threshold: 0.1 };

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeroVisible(true);
        heroObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const featuredObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFeaturedVisible(true);
        featuredObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const gridObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsGridVisible(true);
        gridObserver.unobserve(entry.target);
      }
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (featuredRef.current) featuredObserver.observe(featuredRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (featuredRef.current) featuredObserver.unobserve(featuredRef.current);
      if (gridRef.current) gridObserver.unobserve(gridRef.current);
    };
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'The Combed Cotton Revolution: Why Weight Matters',
      category: 'Materials',
      date: 'May 24, 2026',
      image: '/images/casual_style.png',
      excerpt: 'Discover how heavyweight combed cotton jersey became the backbone of modern streetwear wardrobes, providing unparalleled drape, high breathability, and structural longevity that survives standard washing cycles perfectly.',
      isFeatured: true,
      readTime: '6 min read',
      author: 'Marcus Vance, Textile Architect',
      body: [
        'For decades, standard cotton shirts have dominated high-street racks, marketed as lightweight, quick-dry, or breathable. However, for style connoisseurs, lightweight often equates to flimsy. In the contemporary streetwear landscape, a garment is judged not only by its design print, but by its structure, its silhouette weight, and how it holds itself in movement. This is where Combed Cotton Heavyweight Jersey steps in, fundamentally redefining premium staples.',
        'Combing cotton is a meticulous refinement process. In standard cotton carding, the raw fibers are simply brushed to align them. Combing, however, passes the cotton through extremely fine combs to discard short, weak fibers and extract impurities. The result is a thread of long, unbroken combed cotton strands, boasting remarkable tensile strength, high softness, and structural smoothness.',
        'To achieve a luxury drape, weight is crucial. Our standard tees feature a custom 240 GSM (grams per square meter) combed weave. This added density creates a rigid, structural fall that masks body contours and preserves the desired dropped-shoulder streetwear fit. Beyond the silhouette, combed cotton has immense washing stability. Because the short fibers are combed out prior to weaving, our tees resist standard fiber pilling and shrinkage, ensuring your wardrobe anchors maintain their premium finish for years.'
      ],
      tags: ['Heavyweight Cotton', 'Garment Drape', 'Streetwear Staples', 'Sustainable Design']
    },
    {
      id: 2,
      title: 'Unlocking Streetwear: The Dropped-Shoulder Fit Guide',
      category: 'Styling',
      date: 'May 20, 2026',
      image: '/images/hero_couple.png',
      excerpt: 'A masterclass on styling oversized shirts, cropped hoodies, and stacked denim while preserving clean silhouette proportions and high-mobility ease.',
      isFeatured: false,
      readTime: '4 min read',
      author: 'Elena Rostova, Lead Stylist',
      body: [
        'Streetwear sizing is a delicate science of volume. For years, "oversized" meant purchasing clothes two sizes too large. The result was often an uncoordinated look with excessively long hemlines, overly wide cuffs, and a sloppy posture. Today, modern streetwear design utilizes specific structural tailoring: the dropped-shoulder fit.',
        'The dropped-shoulder cut involves shifting the sleeve-to-shoulder seam further down the arm. This creates a relaxed, broad-shoulder look while keeping the overall shirt length perfectly cropped at the hip level. By keeping the length tailored and the shoulders relaxed, the torso looks proportional rather than engulfed.',
        'When styling these garments, balance is essential. If you are wearing an oversized dropped-shoulder combed tee, pair it with structured, straight-fit stretch denim or tailored shorts. If you choose stacked, wider jeans, tuck the front hem of the tee slightly to outline your waistline. The goal is structural coordination: broad and relaxed on top, clean and defined on the bottom.'
      ],
      tags: ['Oversized Styling', 'Tailoring Guides', 'Dropped Shoulders', 'Silhouette Balance']
    },
    {
      id: 3,
      title: 'Formal Transition: Tailoring for the Smart-Casual Era',
      category: 'Trends',
      date: 'May 15, 2026',
      image: '/images/formal_style.png',
      excerpt: 'How to blend tailored formal blazers and vertical striped linen button-downs with distressed jeans and sneakers for the ultimate smart-casual look.',
      isFeatured: false,
      readTime: '5 min read',
      author: 'Julian Thorne, Creative Director',
      body: [
        'The traditional corporate dress code has dissolved, replaced by a hybrid landscape where smart-casual reigns supreme. Yet, smart-casual is one of the most misunderstood categories in fashion, often leading to uninspired combinations of standard polos and khaki trousers. To truly excel, one must understand how to transition formal pieces into casual environments with deliberate contrast.',
        'The cornerstone of a successful smart-casual rotation is juxtaposition. Take our Vertical Striped Linen Button-Down: its clean stripes and tailored cuffs lean formal. Instead of tucking it into slacks, wear it open over a plain white combed cotton crewneck and style it with washed indigo slim-fit stretch denim. The raw texture of the denim instantly balances the neat linen stripes.',
        'Footwear and outerwear complete the formula. Replace bulky dress shoes with clean, minimalist white leather sneakers. Throw on a soft, unstructured deconstructed knit blazer rather than a padded formal jacket. By swapping rigid corporate lines for soft, premium fabrics, you achieve an effortless smart-casual transition suited for galleries, boardrooms, and dinner lounges alike.'
      ],
      tags: ['Smart Casual', 'Linen Layering', 'Lounge Styling', 'Footwear Accents']
    },
    {
      id: 4,
      title: 'The Sustainable Style Philosophy: Organic Combed Blends',
      category: 'Materials',
      date: 'May 10, 2026',
      image: '/images/gym_style.png',
      excerpt: 'Exploring the eco-friendly textiles, fair-labor mills, and pre-shrunk organic denim blends powering the future of the contemporary fashion coalition.',
      isFeatured: false,
      readTime: '7 min read',
      author: 'Marcus Vance, Textile Architect',
      body: [
        'Sustainability in contemporary fashion is no longer a corporate marketing slogan; it is an absolute manufacturing mandate. The modern consumer demands to know not just how their garments look, but how they were sourced, harvested, spun, and finished. At SHOP.CO, our textile research is focused on combining eco-responsibility with top-tier premium handfeels.',
        'Our latest capsules rely heavily on Organic Combed Cotton blends. Standard cotton farming accounts for significant pesticide usage globally. By sourcing organic combed fibers, we ensure a clean cultivation process that uses 91% less water and zero hazardous fertilizers. These long-staple organic fibers are then blended with trace recycled polyester for improved elastic stretch, reducing garment breakdown and fabric landfill waste.',
        'Additionally, our organic stretch denim is treated in closed-loop washing facilities. Here, water is recycled continuously, and indigo dye molecules are filtered out rather than discharged. Choosing organic combed blends means investing in a durable style philosophy that respects the environment while providing the luxurious, soft handfeel you expect.'
      ],
      tags: ['Eco Textiles', 'Organic Combed Cotton', 'Closed Loop Dyeing', 'Green Manufacturing']
    },
    {
      id: 5,
      title: '5 Wardrobe Essentials for the Ultimate Summer Capsule',
      category: 'Styling',
      date: 'May 05, 2026',
      image: '/images/party_style.png',
      excerpt: 'Our editors pick the five modular pieces—from Burgundy Tipped Polos to Denim Bermuda Shorts—that form the ultimate high-mobility warm-weather rotation.',
      isFeatured: false,
      readTime: '3 min read',
      author: 'Elena Rostova, Lead Stylist',
      body: [
        'Summer wardrobe planning can be challenging. Rising temperatures demand lightweight, high-mobility fabrics, yet we still want to look structured and put together. The key to effortless warm-weather styling lies in building a modular capsule—a set of five interchangeable essentials that can be mixed and matched endlessly.',
        'First is the Burgundy Polo with Tipping Details. Its combed piqué fabric breathes easily while its structured collar and athletic silhouette maintain sharp lines. Second, our clean White Heavyweight Tee, perfect on its own or layered. Third, the Loose Fit Mid-Wash Bermuda Shorts, offering a relaxed street silhouette with high-mobility comfort.',
        'Rounding out the summer capsule are our tailored Vertical Striped Linen Button-Down (for evening dinners) and our Skinny Fit Indigo Stretch Jeans (for cooler nights). By sticking to a cohesive color palette of deep burgundy, soft whites, clean indigos, and forest greens, you can combine these pieces in dozens of ways, assuring premium comfort and high style throughout the summer.'
      ],
      tags: ['Summer Capsule', 'Burgundy Polos', 'Denim Shorts', 'Modular Wardrobe']
    }
  ];

  const handleOpenArticle = (post) => {
    setReadingArticle(post);
  };

  const handleCloseArticle = () => {
    setReadingArticle(null);
  };

  const handleLikeArticle = (id, e) => {
    e.stopPropagation();
    setArticleLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.isFeatured);
  const categories = ['All', 'Styling', 'Materials', 'Trends'];

  return (
    <div className="blog-page">
      {/* 1. HERO SECTION: Left-to-Right reveal and fade-in */}
      <section className={`blog-hero page-container ${isHeroVisible ? 'visible' : ''}`} ref={heroRef}>
        <div className="blog-hero-content">
          <span className="blog-subtitle">SHOP.CO JOURNAL</span>
          <h1 className="blog-title">THE STYLE EDITORIAL</h1>
          <p className="blog-description">
            Your daily capsule of design philosophies, combed cotton guides, tailoring formulas, 
            and seasonal streetwear forecasts edited by the SHOP.CO fashion coalition.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR TABS: Fades in */}
      <section className="blog-categories-section page-container">
        <div className="blog-categories-row">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`blog-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED POST BLOCK: Slides left-to-right */}
      {activeCategory === 'All' && featuredPost && (
        <section className={`blog-featured-section page-container ${isFeaturedVisible ? 'visible' : ''}`} ref={featuredRef}>
          <div className="blog-featured-card" onClick={() => handleOpenArticle(featuredPost)}>
            <div className="blog-featured-img-wrap">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="blog-featured-badge">FEATURED EDITORIAL</span>
            </div>
            
            <div className="blog-featured-info">
              <div className="blog-post-meta">
                <span className="meta-item"><Calendar size={14} /> {featuredPost.date}</span>
                <span className="meta-item"><Tag size={14} /> {featuredPost.category}</span>
                <span className="meta-item"><BookOpen size={14} /> {featuredPost.readTime}</span>
              </div>
              <h2 className="blog-featured-title">{featuredPost.title}</h2>
              <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
              
              <div className="blog-featured-footer">
                <button 
                  onClick={(e) => handleLikeArticle(featuredPost.id, e)} 
                  className="blog-like-btn"
                  aria-label="Like article"
                >
                  <Heart size={16} className={articleLikes[featuredPost.id] ? 'filled-heart' : ''} />
                  <span>{articleLikes[featuredPost.id] || 12} Likes</span>
                </button>
                
                <button className="blog-read-more-btn">
                  <span>Read Full Article</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EDITORIAL GRID: Staggered upward card reveals */}
      <section className={`blog-grid-section page-container ${isGridVisible ? 'visible' : ''}`} ref={gridRef}>
        <div className="blog-grid">
          {filteredPosts.filter(p => !p.isFeatured || activeCategory !== 'All').map((post) => (
            <div key={post.id} className="blog-card" onClick={() => handleOpenArticle(post)}>
              <div className="blog-card-img-wrap">
                <img src={post.image} alt={post.title} />
                <span className="blog-card-category">{post.category}</span>
              </div>
              
              <div className="blog-card-info">
                <div className="blog-post-meta">
                  <span className="meta-item"><Calendar size={12} /> {post.date}</span>
                  <span className="meta-item"><BookOpen size={12} /> {post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-card-footer">
                  <button 
                    onClick={(e) => handleLikeArticle(post.id, e)} 
                    className="blog-card-like-btn"
                  >
                    <Heart size={14} className={articleLikes[post.id] ? 'filled-heart' : ''} />
                    <span>{articleLikes[post.id] || 8}</span>
                  </button>
                  
                  <span className="blog-card-link">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE ARTICLE DRAWER MODAL OVERLAY */}
      {readingArticle && (
        <div className="article-modal-overlay" onClick={handleCloseArticle}>
          <div className="article-modal-card animate-modal" onClick={e => e.stopPropagation()}>
            <button className="article-close-btn" onClick={handleCloseArticle} aria-label="Close article">
              <X size={20} />
            </button>
            
            <div className="article-modal-header">
              <div className="article-modal-meta">
                <span>{readingArticle.category}</span>
                <span className="bullet-sep">•</span>
                <span>{readingArticle.date}</span>
                <span className="bullet-sep">•</span>
                <span>{readingArticle.readTime}</span>
              </div>
              <h2 className="article-modal-title">{readingArticle.title}</h2>
              
              <div className="article-author-row">
                <div className="author-avatar">
                  <User size={16} />
                </div>
                <div>
                  <span className="author-name">{readingArticle.author}</span>
                  <span className="author-subtext">Fashion Editorial Panel</span>
                </div>
              </div>
            </div>
            
            <div className="article-modal-image-wrapper">
              <img src={readingArticle.image} alt={readingArticle.title} />
            </div>
            
            <div className="article-modal-body">
              {readingArticle.body.map((para, pIdx) => (
                <p key={pIdx} className="article-paragraph">{para}</p>
              ))}
              
              {/* Premium styling custom blockquote */}
              <blockquote className="article-blockquote">
                "Fashion is not just clothing; it is the structural canvas of human individuality, styled with combed fibers and broad shoulder contours to manifest inner confidence."
              </blockquote>
              
              {/* Tags section */}
              <div className="article-tags-row">
                {readingArticle.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="article-tag-badge">#{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="article-modal-footer">
              <div className="author-badge-seal">
                <Award size={16} color="#ca8a04" />
                <span>SHOP.CO VERIFIED JOURNAL CONTENT</span>
              </div>
              <div className="footer-action-buttons">
                <button 
                  onClick={(e) => handleLikeArticle(readingArticle.id, e)} 
                  className="article-footer-like"
                >
                  <Heart size={16} className={articleLikes[readingArticle.id] ? 'filled-heart' : ''} />
                  <span>{articleLikes[readingArticle.id] ? 'Liked!' : 'Like Article'}</span>
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }}
                  className="article-footer-share"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
