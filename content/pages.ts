/**
 * Each page's metadata, and the interface copy its template shows: headings,
 * link labels, short connecting lines. Templates read these; they hold no
 * copy of their own, so the writing rules in tests/unit/copy-rules.test.ts
 * cover every word a reader sees.
 */
export const pages = {
    home: {
        title: "Cindy Wanady | Data Scientist in CRM & Yoga Practitioner",
        description: "Cindy Wanady is a data scientist working in CRM at Mekari and a Hatha and Vinyasa yoga practitioner.",
        text: {
            greeting: "I'm Cindy Wanady.",
        },
    },
    data: {
        title: "Data science and CRM",
        description: "CRM automation and data migration at Mekari, plus applied machine learning projects and a research thesis.",
        text: {
            current: "Current work",
            thesis: "Master's thesis",
            thesisLink: "Read about the thesis",
            course: "Projects",
            earlier: "Earlier work",
            formative: "Before that",
            skills: "Skills",
        },
        ledes: {
            current: "CRM data, analytics and automation at Mekari, since February 2022.",
            thesis: "Supervised by A/Prof. Derry Wijaya at Monash University Indonesia.",
            earlier: "Tax at PwC Indonesia and finance at JET Express, then earlier roles.",
            skills: "The tools I work with, grouped as they are in my CV.",
        },
    },
    thesis: {
        title: "Master's thesis",
        description: "A RAG chatbot for depression care in Indonesian primary care, rated blind by licensed psychologists.",
        text: {
            supervisedBy: "Supervised by",
            back: "Back to data work",
        },
        ledes: {},
    },
    yoga: {
        title: "Yoga practice",
        description: "Hatha and Vinyasa yoga, a completed 100-hour teacher training at Vidyarasa, and a 200-hour training in progress.",
        text: {
            styles: "Styles",
            training: "Training",
            completed: "Completed",
            inProgress: "In progress",
            sequence: "Practice sequence",
            instagram: "Follow my practice on Instagram",
        },
        ledes: {
            training: "Teacher training at Vidyarasa, with a longer course in progress.",
            sequence: "These are the first seven poses. A full round returns to standing after Downward-facing dog.",
        },
    },
    about: {
        title: "About",
        description: "Cindy Wanady's education at Monash, Prasetiya Mulya and Tsinghua, and the languages she works in.",
        text: {
            education: "Education",
            languages: "Languages",
        },
        ledes: {
            education: "Degrees from Monash and Prasetiya Mulya, and an exchange at Tsinghua.",
        },
    },
    contact: {
        title: "Contact",
        description: "Reach Cindy Wanady on LinkedIn, Instagram or GitHub.",
        text: {
            lede: "Find me on LinkedIn for data work, Instagram for yoga, and GitHub for code.",
        },
        ledes: {},
    },
    notFound: {
        title: "Page not found",
        description: "This page does not exist.",
        text: {
            heading: "This page does not exist.",
            lede: "The link may be out of date, or the address mistyped. These pages do exist.",
            ways: "Pages that do exist",
            home: "Back to the home page",
        },
    },
};
