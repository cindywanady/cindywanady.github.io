/** First focusable element on every page. Hidden until focused. */
export function SkipLink() {
    return (
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand-700 focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-white"
        >
            Skip to content
        </a>
    );
}
