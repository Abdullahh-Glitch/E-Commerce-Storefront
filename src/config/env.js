const env = {
  mode: import.meta.env.VITE_APP_MODE || 'development',

  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000/api',

  storeSlug:
    import.meta.env.VITE_STORE_SLUG ||
    'safi-bhai-barber-shop',

  siteTitle:
    import.meta.env.VITE_SITE_TITLE ||
    'Safi Bhai',

  siteSubtitle:
    import.meta.env.VITE_SITE_SUBTITLE ||
    'Finger Arts',

  siteTagline:
    import.meta.env.VITE_SITE_TAGLINE ||
    'Premium barbershop care, bottled for you.',

  logoText:
    import.meta.env.VITE_LOGO_TEXT ||
    'SB',

  heroImage:
    // import.meta.env.VITE_HERO_IMAGE ||
    'https://bigg.cz/uploads/2023/06/buddyapavlik_hair_cosmetics_for_man_019be4eb-65c5-43c3-b8d7-a4d9402495a1.jpg',

  contactEmail:
    import.meta.env.VITE_CONTACT_EMAIL ||
    'hello@safibhai.com',

  contactPhone:
    import.meta.env.VITE_CONTACT_PHONE ||
    '+1 (234) 567-890',

  contactAddress:
    import.meta.env.VITE_CONTACT_ADDRESS ||
    '123 Main Street, Downtown',

  contactHours:
    import.meta.env.VITE_CONTACT_HOURS ||
    'Mon – Sat: 9:00 AM – 8:00 PM',

  isDev:
    import.meta.env.VITE_APP_MODE !== 'production',
}

export default env
