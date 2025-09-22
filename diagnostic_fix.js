// Diagnostic script to identify and fix undefined URL issues

console.log('Starting diagnostic...');

// Override router.push to catch undefined/object URLs
if (typeof window !== 'undefined') {
  // Monkey patch Next.js router to catch invalid URLs
  const originalPush = window.next?.router?.push || function() {};

  if (window.next && window.next.router) {
    window.next.router.push = function(url, as, options) {
      console.log('Router.push called with:', { url, as, options, type: typeof url });

      if (!url || typeof url !== 'string') {
        console.error('🚫 Invalid URL detected!', { url, type: typeof url, stack: new Error().stack });

        // Fallback to dashboard instead of causing error
        return originalPush.call(this, '/dashboard', as, options);
      }

      if (url.includes('[object') || url === 'undefined') {
        console.error('🚫 Object or undefined URL detected!', { url, stack: new Error().stack });
        return originalPush.call(this, '/dashboard', as, options);
      }

      return originalPush.call(this, url, as, options);
    };
  }

  // Also override any global Link or navigation functions
  console.log('Diagnostic script loaded - monitoring navigation calls');
}