# Cindy Wanady: CV

Source of truth for every data-side claim on the site. Converted from the LaTeX
CV on 2026-09-24. Sentences are verbatim; only markup was removed. Commented-out
LaTeX lines, which marked details not yet confirmed, were dropped. Edit this
file when the CV changes, then run `npm test` to find claims it no longer
supports.

## Summary

Data professional with 6 years across CRM automation, data migration, and operational reporting, including 4 years owning workflow automation and reporting for a B2B SaaS company. Completing an MSc in Data Science at Monash University with High Distinction (GPA 3.67 / 4.0), expected Sept 2026, while working full time. Cut a recurring stakeholder report from about 2 hours to a few minutes per event, and led CRM migrations where data integrity was the acceptance criterion. Master's thesis builds a retrieval-augmented chatbot (RAG and LLM) supervised by A/Prof. Derry Wijaya (https://research.monash.edu/en/persons/derry-wijaya/), grounded in Indonesia's Ministry of Health depression guideline and evaluated through a blind three-arm comparison rated by licensed psychologists rather than automated metrics alone. Works both sides of the pipeline, CRM systems that generate data and the models built on top of them.

## Experience

### Senior CRM Data, Analytics and Automation, Mekari, Jakarta, Indonesia (Feb 2022 – Present)

- Automated a multi-step stakeholder reporting workflow that previously required manual per-event downloads and compilation, cutting turnaround from about 2 hours to a few minutes per event and removing a recurring manual task from the operations team.
- Automated document generation by integrating CRM data with a document generation platform, reducing manual effort and making the process 5× faster.
- Led CRM platform migrations covering est. 50,000 records across 5 modules, defining field mapping, validation rules, and pre- and post-cutover reconciliation checks so reporting stayed consistent through the transition.
- Built Python integrations with Zoho's REST API to retrieve data not readily accessible through native features, eliminating manual extraction and documentation while improving data accessibility for operations teams.
- Designed, maintained, and optimized 700+ workflow automations across 50+ interconnected business modules.
- Consolidated 4 data sources into a single CRM system with Product and Engineering, reducing duplicate and conflicting records and giving downstream reporting one agreed source of truth.
- Delivered dashboards and ad hoc analyses in Zoho reporting and Tableau, then wrote SOPs and trained 30 end users, shifting recurring stakeholder requests toward self-serve reporting.

### Tax Associate, Financial Services, PwC Indonesia, Jakarta, Indonesia (May 2021 – Nov 2021)

- Prepared detailed tax calculations and submission documents for financial services clients in dispute proceedings, validating client-supplied data against source records before filing with tax auditors.
- Compiled and reviewed monthly tax compliance reports for 5 financial services clients, flagging inconsistencies ahead of statutory deadlines.
- Structured client data into analysis-ready summaries for tax due diligence engagements led by senior managers, and ran independence clearance and risk procedures for 6 proposals before engagement start.

### Finance Associate, JET Express, Tangerang, Indonesia (Oct 2019 – Apr 2021)

- Reconciled receivables across 23 branches and multiple sender accounts, resolving cash-on-delivery, payment-method, and package-value discrepancies to keep collection data auditable.
- Owned sales collection reporting for 12 branches and calculated commissions for branch personnel-in-charge, admins, and couriers, delivering on the monthly close schedule.
- Supervised an accounts receivable team of 3, tracking invoice collection and reporting aging positions to management.
- Analyzed branch budget versus sales performance and converted variances into recommendations for regional management.

### Earlier roles

- Teaching Assistant, Business Mathematics and Introductory Statistics, Prasetiya Mulya University (Sept 2018 – Jul 2019). Developed tutorial materials and led weekly quiz and tutorial sessions for first-year statistics and mathematics cohorts.
- Community Development, Cibeber, West Java (Jan 2018 – Jul 2018). Advised a local small business on production, marketing, and financial management over a 6-month placement.
- Analyst Division Intern, Investa Saran Mandiri (Jan 2016 – Feb 2016). Compiled fair value evaluations for 10 listed companies and presented findings to division leadership.

## Education

- Master of Data Science, Monash University (Sept 2024 – Sept 2026, expected). GPA 3.67 / 4.00, WAM ~80 (High Distinction). Monash Indonesia Welcome Scholarship recipient.
- Bachelor of Finance and Banking, Prasetiya Mulya University, School of Business and Economics (Sept 2015 – Dec 2019). GPA 3.74 / 4.00, Cum Laude. Achievement Scholarship, 2018/2019.
- Exchange Student, Tsinghua University, School of Economics and Management, China (Sept 2017 – Jan 2018).

## Projects

### RAG Chatbot for Depression Management in Indonesian Primary Care (2026)

Master's thesis, in progress, Monash University Indonesia. Python, LLM, RAG.

- Building a retrieval-augmented chatbot grounded in Indonesia's Ministry of Health primary-care depression guideline, so responses stay traceable to a source clinicians already accept.
- Designed a three-arm blind evaluation (chatbot, counselor, counselor assisted by chatbot) rated by licensed psychologists, putting response quality against a human baseline instead of automated metrics alone.

### Amazon Rating Prediction: Stacked SVD and LightGBM Recommender (2026)

Monash University. Python, scikit-learn, LightGBM.

- Built a two-tier SVD plus LightGBM recommender on a 99.81% sparse rating matrix with 17.8% cold-start items, improving RMSE by 29% over the baseline.

### NLP Benchmarking: Text Classification and Topic Discovery (2026)

Monash University. Python, Hugging Face Transformers.

- Benchmarked TF-IDF with logistic regression against DistilBERT under systematic hyperparameter tuning, reporting accuracy alongside runtime so the cheaper model stays on the table when the quality gap is small.
- Ran error analysis on the misclassified cases to explain where each model failed rather than reporting headline scores only.

### Mental Health Treatment-Seeking in Tech: Comparative Analysis (2025)

Monash University. R.

- Fitted comparative logistic regression models on multi-year global survey data (2017–2022) to identify predictors of treatment-seeking, then translated the results into recommendations a non-technical stakeholder can act on.

### Indonesia Climate Compass Dashboard (2025)

Monash University, demo at https://anantatw.shinyapps.io/Indonesia-climate-change/. R Shiny.

- Built and deployed an interactive Shiny dashboard over 10 years of provincial temperature and rainfall data, covering regional warming trends, seasonal patterns, and a 2025 projection.

### Data Science Job Market Trends (2025)

Monash University. Python.

- Cleaned and analyzed two large job-market datasets (2020–2025) covering salary trends, skill demand, and title distribution, and documented the data quality and sampling bias limits that constrain how far the findings generalize.

## Skills

- Languages and Query: Python (pandas, scikit-learn, LightGBM, Hugging Face Transformers), R (tidyverse, Shiny), SQL.
- Analytics and ML: Logistic regression, model evaluation (RMSE, error analysis, hyperparameter tuning), NLP and text classification, Retrieval-augmented generation, Recommender systems.
- Visualization and BI: Tableau, R Shiny, Zoho Analytics, CRM Analytics, Excel.
- CRM and Automation: Zoho CRM, Intercom, REST API integration, Data migration and reconciliation, Rule-based workflow design.
- Ways of Working: SOP and technical documentation, End-user training, Cross-functional delivery with Product and Engineering.
- Communication: Bahasa Indonesia (Native), English (Professional working proficiency).
