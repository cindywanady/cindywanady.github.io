/** The yoga half. Quotes are from sources/yoga.md. */
export const yoga = {
    column: {
        heading: "Yoga practice",
        trueLine: {
            text: "I have practiced Hatha and Vinyasa yoga since 2022.",
            source: "yoga",
            quote: "Practicing Hatha yoga and Vinyasa yoga since 2022",
        },
        strip: {
            title: "Opening flow of Sun Salutation A",
            steps: [
                { label: "Mountain", detail: "Tadasana" },
                { label: "Upward salute", detail: "Urdhva Hastasana" },
                { label: "Forward fold", detail: "Uttanasana" },
                { label: "Half lift", detail: "Ardha Uttanasana" },
                { label: "Four-limbed staff", detail: "Chaturanga Dandasana" },
                { label: "Upward-facing dog", detail: "Urdhva Mukha Svanasana" },
                { label: "Downward-facing dog", detail: "Adho Mukha Svanasana" },
            ],
            evidence: {
                text: "I practice this sequence.",
                source: "yoga",
                quote: "Practices Surya Namaskar A",
            },
        },
        proof: [
            {
                text: "I completed a 100-hour yoga teacher training at Vidyarasa.",
                source: "yoga",
                quote: "YTT 100-hour, completed, at Vidyarasa",
            },
            {
                text: "My 200-hour yoga teacher training is in progress.",
                source: "yoga",
                quote: "YTT 200-hour, in progress",
            },
            {
                text: "My practice includes a seven-pose sequence, from Mountain to Downward-facing dog.",
                source: "yoga",
                quote: "Practices Surya Namaskar A: Mountain (Tadasana), Upward salute (Urdhva Hastasana), Forward fold (Uttanasana), Half lift (Ardha Uttanasana), Four-limbed staff (Chaturanga Dandasana), Upward-facing dog (Urdhva Mukha Svanasana), Downward-facing dog (Adho Mukha Svanasana).",
            },
        ],
        href: "/yoga/",
        cta: "See yoga practice",
    },

    styles: ["Hatha", "Vinyasa"],

    trainings: [
        {
            name: "Yoga teacher training",
            hours: 100,
            status: "completed",
            school: { label: "Vidyarasa", url: "https://vidyarasa.id/" },
            evidence: {
                text: "I completed a 100-hour yoga teacher training at Vidyarasa.",
                source: "yoga",
                quote: "YTT 100-hour, completed, at Vidyarasa",
            },
        },
        {
            name: "Yoga teacher training",
            hours: 200,
            status: "in_progress",
            evidence: {
                text: "My 200-hour yoga teacher training is in progress.",
                source: "yoga",
                quote: "YTT 200-hour, in progress",
            },
        },
    ],
};
