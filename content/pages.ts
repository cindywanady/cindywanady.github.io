/**
 * Each page's metadata, and the interface copy its template shows: headings,
 * link labels, short connecting lines. Templates read these; they hold no
 * copy of their own, so the writing rules in tests/unit/copy-rules.test.ts
 * cover every word a reader sees.
 */
export const pages = {
    home: {
        title: "Cindy Wanady",
        description: "Cindy Wanady works in data at Mekari and practices Hatha and Vinyasa yoga.",
        text: {},
    },
    data: {
        title: "Data work",
        description: "CRM automation, data migration and reporting at Mekari, and a master's thesis and course projects at Monash.",
        text: {
            current: "Current work",
            thesis: "Master's thesis",
            thesisLink: "Read about the thesis",
            course: "Course projects",
            earlier: "Earlier work",
            formative: "Before that",
            skills: "Skills",
        },
    },
    thesis: {
        title: "Master's thesis",
        description: "A RAG chatbot for depression care in Indonesian primary care, rated blind by licensed psychologists.",
        text: {
            supervisedBy: "Supervised by",
            back: "Back to data work",
        },
    },
    yoga: {
        title: "Yoga practice",
        description: "Hatha and Vinyasa yoga, a completed 100-hour teacher training at Vidyarasa, and a 200-hour training in progress.",
        text: {
            styles: "Styles",
            training: "Training",
            completed: "Completed",
            inProgress: "In progress",
            sequence: "Sequence",
            words: "In my words",
            instagram: "Follow my practice on Instagram",
        },
    },
    about: {
        title: "About",
        description: "Cindy Wanady's education at Monash, Prasetiya Mulya and Tsinghua, and the languages she works in.",
        text: {
            education: "Education",
            languages: "Languages",
        },
    },
    contact: {
        title: "Contact",
        description: "Reach Cindy Wanady on LinkedIn, Instagram or GitHub.",
        text: {
            lede: "Find me on LinkedIn for data work, Instagram for yoga, and GitHub for code.",
        },
    },
    notFound: {
        title: "Page not found",
        description: "This page does not exist.",
        text: {
            lede: "This page does not exist. Try one of these instead.",
            data: "Data work",
            yoga: "Yoga practice",
        },
    },
};
