/**
 * Each page's metadata, and the interface copy its template shows: headings,
 * link labels, short connecting lines. Templates read these; they hold no
 * copy of their own, so the writing rules in tests/unit/copy-rules.test.ts
 * cover every word a reader sees.
 */
export const pages = {
    home: {
        title: "Cindy Wanady: Data and Yoga",
        description: "Data and yoga. Cindy Wanady works in CRM data and analytics in the tech industry and practices Hatha and Vinyasa yoga.",
        text: {
            greeting: "I'm Cindy Wanady.",
        },
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
        ledes: {
            current: "CRM data, analytics and automation at Mekari, since February 2022.",
            thesis: "Supervised by A/Prof. Derry Wijaya at Monash University Indonesia.",
            course: "Five projects from my Master of Data Science at Monash.",
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
            sequence: "Sequence",
            words: "In my words",
            instagram: "Follow my practice on Instagram",
        },
        ledes: {
            training: "Teacher training at Vidyarasa, with a longer course in progress.",
            sequence: "Seven poses, in the order I practice them.",
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
