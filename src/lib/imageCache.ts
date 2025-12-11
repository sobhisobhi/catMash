class ImageCache {
  private cache = new Map<string, string>();
  private loading = new Set<string>();

  async preload(url: string): Promise<void> {
    if (this.cache.has(url) || this.loading.has(url)) {
      return;
    }

    this.loading.add(url);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, url);
        this.loading.delete(url);
        resolve();
      };
      img.onerror = () => {
        this.loading.delete(url);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });
  }

  async preloadBatch(urls: string[]): Promise<void> {
    await Promise.allSettled(urls.map(url => this.preload(url)));
  }

  isLoaded(url: string): boolean {
    return this.cache.has(url);
  }

  clear(): void {
    this.cache.clear();
    this.loading.clear();
  }
}

export const imageCache = new ImageCache();