// Router debugging utility to catch undefined/object URLs

export const setupRouterDebugging = () => {
  if (typeof window === 'undefined') return;

  // Override fetch to catch undefined URLs
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    console.log('Fetch called with:', { input, type: typeof input });

    if (!input || input === 'undefined' || (typeof input === 'string' && input.includes('[object'))) {
      console.error('🚫 Invalid fetch URL detected!', { input, stack: new Error().stack });
      return Promise.reject(new Error(`Invalid fetch URL: ${input}`));
    }

    return originalFetch.call(this, input, init);
  };

  // Override XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
    console.log('XHR open called with:', { method, url, type: typeof url });

    if (!url || url === 'undefined' || (typeof url === 'string' && url.includes('[object'))) {
      console.error('🚫 Invalid XHR URL detected!', { method, url, stack: new Error().stack });
      throw new Error(`Invalid XHR URL: ${url}`);
    }

    return originalXHROpen.call(this, method, url, ...args);
  };

  // Override window.location assignments
  const originalLocationAssign = window.location.assign;
  window.location.assign = function(url: string | URL) {
    console.log('Location.assign called with:', { url, type: typeof url });

    if (!url || url === 'undefined' || (typeof url === 'string' && url.includes('[object'))) {
      console.error('🚫 Invalid location assignment detected!', { url, stack: new Error().stack });
      return;
    }

    return originalLocationAssign.call(this, url);
  };

  console.log('✅ Router debugging utilities installed');
};

// Auto-setup in browser environment
if (typeof window !== 'undefined') {
  setupRouterDebugging();
}