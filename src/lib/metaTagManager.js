/**
 * Centralized Meta Tag Manager
 * Prevents duplicate meta tags and ensures consistent updates across all pages
 */

export function setPageMeta({
  title,
  description,
  canonicalUrl = null,
  keywords = null,
  ogTitle = null,
  ogDescription = null,
  ogImage = null,
  ogUrl = null,
  twitterTitle = null,
  twitterDescription = null,
  twitterImage = null,
  robots = 'index, follow'
}) {
  // Set title
  document.title = title

  // Helper function to safely update or create meta tags
  const updateMeta = (selector, attributeName, attributeValue, content) => {
    let meta = document.querySelector(selector)
    
    // Remove ALL existing meta tags matching this selector to prevent duplicates
    const allMeta = document.querySelectorAll(selector)
    allMeta.forEach((el, index) => {
      // Keep only the first one, remove duplicates
      if (index > 0) el.remove()
    })

    // Update or create the meta tag
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attributeName, attributeValue)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  // Update description meta tag
  if (description) {
    updateMeta('meta[name="description"]', 'name', 'description', description)
  }

  // Update robots meta tag
  if (robots) {
    updateMeta('meta[name="robots"]', 'name', 'robots', robots)
  }

  // Update keywords meta tag
  if (keywords) {
    updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords)
  }

  // Update canonical link
  if (canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]')
    
    // Remove all duplicate canonical tags
    const allCanonical = document.querySelectorAll('link[rel="canonical"]')
    allCanonical.forEach((el, index) => {
      if (index > 0) el.remove()
    })

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }

  // Update Open Graph tags
  if (ogTitle) {
    updateMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle)
  }
  if (ogDescription) {
    updateMeta('meta[property="og:description"]', 'property', 'og:description', ogDescription)
  }
  if (ogImage) {
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
  }
  if (ogUrl) {
    updateMeta('meta[property="og:url"]', 'property', 'og:url', ogUrl)
  }

  // Update Twitter Card tags
  if (twitterTitle) {
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', twitterTitle)
  }
  if (twitterDescription) {
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', twitterDescription)
  }
  if (twitterImage) {
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', twitterImage)
  }
}

/**
 * Cleanup function to remove meta tags on component unmount
 * This helps prevent stale meta tags from persisting
 */
export function cleanupCanonical() {
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.remove()
  }
}
