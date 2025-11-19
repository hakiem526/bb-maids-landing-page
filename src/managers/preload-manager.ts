// Vite-first image preloader for assets in src/assets/images/**

export type PreloadState = {
    started: boolean;
    done: boolean;
    total: number;
    loaded: number;
    failed: number;
};

type Listener = (state: PreloadState) => void;

export default class PreloadManager {
    private static _instance: PreloadManager | null = null;

    static get instance(): PreloadManager {
        if (!this._instance) this._instance = new PreloadManager();
        return this._instance;
    }

    private state: PreloadState = {
        started: false,
        done: false,
        total: 0,
        loaded: 0,
        failed: 0,
    };

    private listeners = new Set<Listener>();
    private startPromise: Promise<void> | null = null;

    /** Subscribe to progress updates. Returns an unsubscribe fn. */
    subscribe(fn: Listener): () => void {
        this.listeners.add(fn);
        // emit current snapshot immediately
        fn({ ...this.state });
        return () => this.listeners.delete(fn);
    }

    /** Snapshot (no subscription). */
    getState(): PreloadState {
        return { ...this.state };
    }

    /** Convenience: true when all images attempted */
    isLoaded(): boolean {
        return this.state.done;
    }

    /** Idempotent start. Safe to call many times. */
    start(): Promise<void> {
        if (this.startPromise) return this.startPromise;

        this.state.started = true;
        this.emit();

        this.startPromise = this.preloadImages().then(() => {
            this.state.done = true;
            this.emit();
        });

        return this.startPromise;
    }

    // ===== Internals =====

    private emit() {
        const snapshot = { ...this.state };
        this.listeners.forEach((l) => l(snapshot));
    }

    private async preloadImages(): Promise<void> {
        // If you add types, extend this glob.
        const files = import.meta.glob(
            '../assets/images/**/*.{png,jpg,jpeg,gif,webp,avif,svg}',
            { eager: true, as: 'url' }
        ) as Record<string, string>;

        const urls = Object.values(files);
        this.state.total = urls.length;
        this.emit();

        if (urls.length === 0) return;

        const loadOne = (src: string) =>
            new Promise<void>((resolve) => {
                const img = new Image();
                img.decoding = 'async';
                img.loading = 'eager';
                img.onload = () => resolve();
                img.onerror = () => resolve(); // count failure but don't block
                img.src = src;
            });

        // Concurrency cap to avoid network spikes
        const CONCURRENCY = 16;
        let i = 0;

        const next = async () => {
            while (i < urls.length) {
                const idx = i++;
                try {
                    await loadOne(urls[idx]);
                    this.state.loaded++;
                } catch {
                    this.state.failed++;
                } finally {
                    this.emit();
                }
            }
        };

        const workers = Array.from({ length: Math.min(CONCURRENCY, urls.length) }, () => next());
        await Promise.all(workers);
    }
}