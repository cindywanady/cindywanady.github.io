/** Small, code-native marks for the two practices. */
export function PracticeMark({ tone }: { tone: "data" | "yoga" }) {
    if (tone === "data") {
        return (
            <svg aria-hidden="true" className="practice-mark" viewBox="0 0 48 48" fill="none">
                <path d="M9 37 20 11 39 19 31 38 9 37Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="m20 11 11 27M9 37l30-18" stroke="currentColor" strokeWidth="1" opacity=".65" />
                <circle cx="20" cy="11" r="3" fill="currentColor" />
                <circle cx="39" cy="19" r="3" fill="currentColor" />
                <circle cx="31" cy="38" r="3" fill="currentColor" />
                <circle cx="9" cy="37" r="3" fill="currentColor" />
            </svg>
        );
    }
    return (
        <svg aria-hidden="true" className="practice-mark" viewBox="0 0 48 48" fill="none">
            <path d="M24 42c-7-6-11-12-11-19 0-8 5-14 11-18 6 4 11 10 11 18 0 7-4 13-11 19Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M24 42C12 40 6 33 6 24c7-2 13-1 18 3M24 42c12-2 18-9 18-18-7-2-13-1-18 3M24 11v30" stroke="currentColor" strokeWidth="1.3" />
        </svg>
    );
}
