export const categories = [
  { id: 'all', label: 'All' },
  { id: 'shampoos', label: 'Shampoos' },
  { id: 'waxes', label: 'Waxes' },
  { id: 'creams', label: 'Creams' },
  { id: 'keratins', label: 'Keratins' },
]

export const brands = [
  { id: 'all', label: 'All Brands' },
  { id: 'Safi Bhai', label: 'Safi Bhai' },
  { id: 'Finger Arts', label: 'Finger Arts' },
]

export const products = [
  {
    id: 'sb-shampoo-01',
    name: 'SB Classic Clean Shampoo',
    brand: 'Safi Bhai',
    category: 'shampoos',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop',
    description:
      'A gentle daily shampoo formulated for all hair types. Removes buildup while keeping hair soft and manageable — the same formula trusted at Safi Bhai Barbershop.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Panthenol, Fragrance',
    size: '250ml',
    inStock: true,
  },
  {
    id: 'fa-shampoo-02',
    name: 'Finger Arts Moisture Shampoo',
    brand: 'Finger Arts',
    category: 'shampoos',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
    description:
      'Deep hydration shampoo for dry and damaged hair. Enriched with argan oil and keratin proteins for salon-quality moisture at home.',
    ingredients: 'Aqua, Argan Oil, Keratin, Aloe Vera, Vitamin E, Natural Fragrance',
    size: '300ml',
    inStock: true,
  },
  {
    id: 'sb-shampoo-03',
    name: 'SB Anti-Dandruff Wash',
    brand: 'Safi Bhai',
    category: 'shampoos',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1608248543801-ba977529e190?w=600&h=600&fit=crop',
    description:
      'Clinically inspired anti-dandruff formula that soothes the scalp and eliminates flakes. Used daily by our barbers for client scalp care.',
    ingredients: 'Aqua, Zinc Pyrithione, Tea Tree Oil, Salicylic Acid, Menthol',
    size: '250ml',
    inStock: true,
  },
  {
    id: 'sb-wax-01',
    name: 'SB Matte Styling Wax',
    brand: 'Safi Bhai',
    category: 'waxes',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
    description:
      'Medium-hold matte wax for textured, natural-looking styles. Non-greasy finish that lasts all day — a barbershop favorite.',
    ingredients: 'Beeswax, Carnauba Wax, Mineral Oil, Fragrance',
    size: '100g',
    inStock: true,
  },
  {
    id: 'fa-wax-02',
    name: 'Finger Arts High Hold Wax',
    brand: 'Finger Arts',
    category: 'waxes',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
    description:
      'Maximum hold wax for sculpted pompadours and sharp fades. Water-resistant formula keeps your style locked in place.',
    ingredients: 'Microcrystalline Wax, Lanolin, Castor Oil, Vitamin E',
    size: '85g',
    inStock: true,
  },
  {
    id: 'sb-wax-03',
    name: 'SB Premium Pomade',
    brand: 'Safi Bhai',
    category: 'waxes',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop',
    description:
      'Classic oil-based pomade with high shine and reworkable hold. Perfect for slick backs and vintage styles.',
    ingredients: 'Petrolatum, Beeswax, Lanolin, Coconut Oil, Fragrance',
    size: '113g',
    inStock: true,
  },
  {
    id: 'sb-cream-01',
    name: 'SB Beard Softening Cream',
    brand: 'Safi Bhai',
    category: 'creams',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
    description:
      'Lightweight beard cream that conditions, softens, and tames unruly facial hair. Leaves a subtle, masculine scent.',
    ingredients: 'Shea Butter, Jojoba Oil, Argan Oil, Beeswax, Essential Oils',
    size: '60ml',
    inStock: true,
  },
  {
    id: 'fa-cream-02',
    name: 'Finger Arts Skin Repair Cream',
    brand: 'Finger Arts',
    category: 'creams',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
    description:
      'Post-shave skin repair cream that calms irritation and restores moisture. Ideal after a close barbershop shave.',
    ingredients: 'Aloe Vera, Chamomile Extract, Allantoin, Vitamin B5, Glycerin',
    size: '75ml',
    inStock: true,
  },
  {
    id: 'sb-keratin-01',
    name: 'SB Keratin Smooth Treatment',
    brand: 'Safi Bhai',
    category: 'keratins',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop',
    description:
      'Professional-grade keratin smoothing treatment for frizz-free, silky hair. Reduces styling time and adds brilliant shine.',
    ingredients: 'Hydrolyzed Keratin, Collagen, Argan Oil, Silk Proteins, Formaldehyde-Free Formula',
    size: '200ml',
    inStock: true,
  },
  {
    id: 'fa-keratin-02',
    name: 'Finger Arts Keratin Revival Mask',
    brand: 'Finger Arts',
    category: 'keratins',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1571875257722-256c39da42af?w=600&h=600&fit=crop',
    description:
      'Intensive weekly keratin mask that repairs damage from heat styling and chemical treatments. Restores strength and elasticity.',
    ingredients: 'Keratin Complex, Coconut Oil, Avocado Oil, Biotin, Silk Amino Acids',
    size: '250ml',
    inStock: true,
  },
  {
    id: 'sb-cream-03',
    name: 'SB Scalp Nourish Cream',
    brand: 'Safi Bhai',
    category: 'creams',
    price: 20.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
    description:
      'Targeted scalp treatment cream that stimulates circulation and promotes healthy hair growth. Massage in during your grooming routine.',
    ingredients: 'Peppermint Oil, Rosemary Extract, Biotin, Niacinamide, Caffeine',
    size: '50ml',
    inStock: true,
  },
  {
    id: 'fa-keratin-03',
    name: 'Finger Arts Keratin Leave-In Serum',
    brand: 'Finger Arts',
    category: 'keratins',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
    description:
      'Lightweight leave-in keratin serum that protects against heat damage and adds mirror-like shine. A finishing touch after every wash.',
    ingredients: 'Keratin Peptides, Silicones, Argan Oil, UV Filters, Vitamin E',
    size: '100ml',
    inStock: false,
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function filterProducts({ search = '', category = 'all', brand = 'all' } = {}) {
  const query = search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesBrand = brand === 'all' || product.brand === brand
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)

    return matchesCategory && matchesBrand && matchesSearch
  })
}

export function getRelatedProducts(productId, limit = 3) {
  const product = getProductById(productId)
  if (!product) return []
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}
