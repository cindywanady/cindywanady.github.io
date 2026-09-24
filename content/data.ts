/** The data half: work, the home column, skills. Quotes are from sources/cv.md. */
export const data = {
    column: {
        heading: "Data",
        trueLine: {
            text: "I work on both sides of the pipeline: CRM systems that generate data, and models built on them.",
            source: "cv",
            quote: "Works both sides of the pipeline, CRM systems that generate data and the models built on top of them.",
        },
        strip: {
            title: "How I run a CRM migration",
            steps: [
                { label: "Field mapping" },
                { label: "Validation rules" },
                { label: "Pre-cutover reconciliation" },
                { label: "Cutover" },
                { label: "Post-cutover reconciliation" },
            ],
            evidence: {
                text: "Each migration runs field mapping, validation rules, then reconciliation before and after cutover.",
                source: "cv",
                quote: "defining field mapping, validation rules, and pre- and post-cutover reconciliation checks",
            },
        },
        proof: [
            {
                text: "I cut a recurring stakeholder report from about 2 hours to a few minutes per event.",
                source: "cv",
                quote: "Cut a recurring stakeholder report from about 2 hours to a few minutes per event",
            },
            {
                text: "I led CRM migrations of about 50,000 records across 5 modules.",
                source: "cv",
                quote: "Led CRM platform migrations covering est. 50,000 records across 5 modules",
            },
            {
                text: "My master's thesis built a RAG chatbot, rated blind by licensed psychologists.",
                source: "cv",
                quote: "Master's thesis built a retrieval-augmented chatbot (RAG and LLM) supervised by A/Prof. Derry Wijaya (https://research.monash.edu/en/persons/derry-wijaya/), grounded in Indonesia's Ministry of Health depression guideline and evaluated through a blind three-arm comparison rated by licensed psychologists",
            },
        ],
        href: "/data/",
        cta: "See data work",
    },

    current: {
        title: "Senior CRM Data, Analytics and Automation",
        organization: "Mekari",
        place: "Jakarta, Indonesia",
        dates: "Feb 2022 – Present",
        claims: [
            {
                text: "I automated a stakeholder report that took about 2 hours per event. It now takes a few minutes.",
                source: "cv",
                quote: "Automated a multi-step stakeholder reporting workflow that previously required manual per-event downloads and compilation, cutting turnaround from about 2 hours to a few minutes per event",
            },
            {
                text: "I connected CRM data to a document generation platform, making document generation 5× faster.",
                source: "cv",
                quote: "Automated document generation by integrating CRM data with a document generation platform, reducing manual effort and making the process 5× faster.",
            },
            {
                text: "I led CRM platform migrations of about 50,000 records across 5 modules.",
                source: "cv",
                quote: "Led CRM platform migrations covering est. 50,000 records across 5 modules",
            },
            {
                text: "Reporting stayed consistent through each transition, checked by reconciliation before and after cutover.",
                source: "cv",
                quote: "pre- and post-cutover reconciliation checks so reporting stayed consistent through the transition",
            },
            {
                text: "I built Python integrations with Zoho's REST API to retrieve data the native features did not readily expose.",
                source: "cv",
                quote: "Built Python integrations with Zoho's REST API to retrieve data not readily accessible through native features",
            },
            {
                text: "I design and maintain 700+ workflow automations across 50+ connected business modules.",
                source: "cv",
                quote: "Designed, maintained, and optimized 700+ workflow automations across 50+ interconnected business modules.",
            },
            {
                text: "With Product and Engineering, I merged 4 data sources into one CRM system.",
                source: "cv",
                quote: "Consolidated 4 data sources into a single CRM system with Product and Engineering",
            },
            {
                text: "I wrote SOPs and trained 30 end users, moving routine requests toward self-serve reporting.",
                source: "cv",
                quote: "wrote SOPs and trained 30 end users, shifting recurring stakeholder requests toward self-serve reporting",
            },
        ],
    },

    earlier: [
        {
            title: "Tax Associate, Financial Services",
            organization: "PwC Indonesia",
            place: "Jakarta, Indonesia",
            dates: "May 2021 – Nov 2021",
            claims: [
                {
                    text: "I checked client-supplied data against source records before filing with tax auditors.",
                    source: "cv",
                    quote: "validating client-supplied data against source records before filing with tax auditors",
                },
                {
                    text: "I reviewed monthly tax compliance reports for 5 financial services clients.",
                    source: "cv",
                    quote: "Compiled and reviewed monthly tax compliance reports for 5 financial services clients",
                },
            ],
        },
        {
            title: "Finance Associate",
            organization: "JET Express",
            place: "Tangerang, Indonesia",
            dates: "Oct 2019 – Apr 2021",
            claims: [
                {
                    text: "I reconciled receivables across 23 branches and kept collection data auditable.",
                    source: "cv",
                    quote: "Reconciled receivables across 23 branches and multiple sender accounts, resolving cash-on-delivery, payment-method, and package-value discrepancies to keep collection data auditable.",
                },
                {
                    text: "I supervised an accounts receivable team of 3.",
                    source: "cv",
                    quote: "Supervised an accounts receivable team of 3",
                },
            ],
        },
    ],

    formative: [
        {
            title: "Teaching Assistant, Business Mathematics and Introductory Statistics",
            organization: "Prasetiya Mulya University",
            dates: "Sept 2018 – Jul 2019",
            claims: [
                {
                    text: "I wrote tutorial materials and led weekly sessions for first-year statistics cohorts.",
                    source: "cv",
                    quote: "Developed tutorial materials and led weekly quiz and tutorial sessions for first-year statistics and mathematics cohorts.",
                },
            ],
        },
        {
            title: "Community Development",
            organization: "Cibeber, West Java",
            dates: "Jan 2018 – Jul 2018",
            claims: [
                {
                    text: "I advised a local small business on production, marketing and finance over 6 months.",
                    source: "cv",
                    quote: "Advised a local small business on production, marketing, and financial management over a 6-month placement.",
                },
            ],
        },
        {
            title: "Analyst Division Intern",
            organization: "Investa Saran Mandiri",
            dates: "Jan 2016 – Feb 2016",
            claims: [
                {
                    text: "I compiled fair value evaluations for 10 listed companies.",
                    source: "cv",
                    quote: "Compiled fair value evaluations for 10 listed companies",
                },
            ],
        },
    ],

    skills: [
        { group: "Languages and Query", items: "Python (pandas, scikit-learn, LightGBM, Hugging Face Transformers), R (tidyverse, Shiny), SQL." },
        {
            group: "Analytics and ML",
            items: "Logistic regression, model evaluation (RMSE, error analysis, hyperparameter tuning), NLP and text classification, Retrieval-augmented generation, Recommender systems.",
        },
        { group: "Visualization and BI", items: "Tableau, R Shiny, Zoho Analytics, CRM Analytics, Excel." },
        { group: "CRM and Automation", items: "Zoho CRM, Intercom, REST API integration, Data migration and reconciliation, Rule-based workflow design." },
    ],
};
