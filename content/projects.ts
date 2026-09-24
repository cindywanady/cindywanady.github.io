/** The thesis and five course projects. Quotes are from sources/cv.md. */
export const projects = {
    thesis: {
        title: "RAG chatbot for depression management in Indonesian primary care",
        year: 2026,
        context: "Master's thesis, completed, Monash University Indonesia",
        tools: ["Python", "LLM", "RAG"],
        supervisor: { label: "A/Prof. Derry Wijaya", url: "https://research.monash.edu/en/persons/derry-wijaya/" },
        claims: [
            {
                text: "The chatbot answers from Indonesia's Ministry of Health primary-care depression guideline.",
                source: "cv",
                quote: "Built a retrieval-augmented chatbot grounded in Indonesia's Ministry of Health primary-care depression guideline",
            },
            {
                text: "Every answer stays traceable to a source clinicians already accept.",
                source: "cv",
                quote: "so responses stay traceable to a source clinicians already accept",
            },
            {
                text: "Licensed psychologists rate three arms blind: chatbot, counselor, and counselor assisted by chatbot.",
                source: "cv",
                quote: "Designed a three-arm blind evaluation (chatbot, counselor, counselor assisted by chatbot) rated by licensed psychologists",
            },
            {
                text: "That measures response quality against a human baseline.",
                source: "cv",
                quote: "putting response quality against a human baseline",
            },
        ],
    },

    course: [
        {
            title: "Amazon rating prediction with stacked SVD and LightGBM",
            year: 2026,
            context: "Monash University",
            tools: ["Python", "scikit-learn", "LightGBM"],
            claims: [
                {
                    text: "A two-tier SVD and LightGBM recommender improved RMSE by 29% over the baseline.",
                    source: "cv",
                    quote: "Built a two-tier SVD plus LightGBM recommender on a 99.81% sparse rating matrix with 17.8% cold-start items, improving RMSE by 29% over the baseline.",
                },
                {
                    text: "The rating matrix was 99.81% sparse, with 17.8% cold-start items.",
                    source: "cv",
                    quote: "on a 99.81% sparse rating matrix with 17.8% cold-start items",
                },
            ],
        },
        {
            title: "NLP benchmarking for text classification and topic discovery",
            year: 2026,
            context: "Monash University",
            tools: ["Python", "Hugging Face Transformers"],
            claims: [
                {
                    text: "I benchmarked TF-IDF with logistic regression against DistilBERT, reporting runtime alongside accuracy.",
                    source: "cv",
                    quote: "Benchmarked TF-IDF with logistic regression against DistilBERT under systematic hyperparameter tuning, reporting accuracy alongside runtime",
                },
                {
                    text: "Error analysis on misclassified cases showed where each model failed.",
                    source: "cv",
                    quote: "Ran error analysis on the misclassified cases to explain where each model failed",
                },
            ],
        },
        {
            title: "Mental health treatment-seeking in tech",
            year: 2025,
            context: "Monash University",
            tools: ["R"],
            claims: [
                {
                    text: "I fitted logistic regression models on global survey data from 2017 to 2022.",
                    source: "cv",
                    quote: "Fitted comparative logistic regression models on multi-year global survey data (2017–2022)",
                },
                {
                    text: "The results became recommendations a non-technical stakeholder can act on.",
                    source: "cv",
                    quote: "translated the results into recommendations a non-technical stakeholder can act on",
                },
            ],
        },
        {
            title: "Indonesia Climate Compass dashboard",
            year: 2025,
            context: "Monash University",
            tools: ["R Shiny"],
            link: { label: "Open the dashboard", url: "https://anantatw.shinyapps.io/Indonesia-climate-change/" },
            claims: [
                {
                    text: "A Shiny dashboard over 10 years of provincial temperature and rainfall data, with a 2025 projection.",
                    source: "cv",
                    quote: "Built and deployed an interactive Shiny dashboard over 10 years of provincial temperature and rainfall data, covering regional warming trends, seasonal patterns, and a 2025 projection.",
                },
            ],
        },
        {
            title: "Data science job market trends",
            year: 2025,
            context: "Monash University",
            tools: ["Python"],
            claims: [
                {
                    text: "I analyzed two job-market datasets from 2020 to 2025 on salary, skills and titles.",
                    source: "cv",
                    quote: "Cleaned and analyzed two large job-market datasets (2020–2025) covering salary trends, skill demand, and title distribution",
                },
                {
                    text: "I documented the data quality and sampling bias limits on the findings.",
                    source: "cv",
                    quote: "documented the data quality and sampling bias limits that constrain how far the findings generalize",
                },
            ],
        },
    ],
};
