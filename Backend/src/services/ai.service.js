const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")
const pdfParse = require("pdf-parse")
const puppeteer = require("puppeteer");
const  ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})
console.log("GENAI KEY =", process.env.GOOGLE_GENAI_API_KEY);




const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `
const prompt = `
You are an expert HR Recruiter, ATS Resume Evaluator and Technical Interviewer.

Analyze the following candidate carefully.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON.

The JSON MUST contain these fields:

{
"title":"",
"matchScore":0,
"technicalQuestions":[
{
"question":"",
"intention":"",
"answer":""
}
],
"behavioralQuestions":[
{
"question":"",
"intention":"",
"answer":""
}
],
"skillGaps":[
{
"skill":"",
"severity":"low"
}
],
"preparationPlan":[
{
"day":1,
"focus":"",
"tasks":[]
}
]
}

Rules:

1. Extract the job title from the Job Description and put it in "title".

2. matchScore should be between 0 and 100.

3. Generate at least 10 technicalQuestions.

4. Generate at least 5 behavioralQuestions.

5. Find all missing skills.

6. Generate a complete 30-day preparationPlan.

7. Return ONLY JSON.

Every element inside technicalQuestions MUST be an object.

Example:

"technicalQuestions":[
{
"question":"What is React?",
"intention":"Check React fundamentals",
"answer":"Explain components, JSX and Virtual DOM."
}
]

Every element inside behavioralQuestions MUST be an object.

Example:

"behavioralQuestions":[
{
"question":"Tell me about yourself",
"intention":"Communication",
"answer":"Introduce yourself professionally."
}
]

Every element inside skillGaps MUST be an object.

Example:

"skillGaps":[
{
"skill":"Docker",
"severity":"high"
}
]

Every element inside preparationPlan MUST be an object.

Example:

"preparationPlan":[
{
"day":1,
"focus":"React",
"tasks":[
"Study Hooks",
"Practice Context API"
]
}
]


Every technicalQuestions item MUST be:

{
"question":"",
"intention":"",
"answer":""
}

Never return strings. 

Do not return markdown.
Do not return explanation.
`;

    const response = await ai.models.generateContent({
       model: "gemini-flash-lite-latest",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
           // responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    console.log(JSON.stringify(JSON.parse(response.text), null, 2));

    return JSON.parse(response.text)


}



// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();

    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}


                        1. Tailor every section to the given job description — mirror the exact keywords, tools, and skills the JD uses (this is critical for ATS keyword matching), but only where the candidate genuinely has that experience.
2. Write a 2-3 line professional summary at the top, specific to this role — no generic filler like "hardworking team player" or "passionate about technology."
3. Rewrite experience bullets using the format: [Action verb] + [what you did] + [quantified result/impact]. Use real numbers, percentages, timeframes wherever the candidate's input allows a reasonable estimate; otherwise keep it qualitative but concrete.
4. Vary sentence structure and length across bullets — avoid repeating the same verb or sentence pattern more than twice. Avoid stock AI phrasing: no "leveraged," "spearheaded," "utilized," "synergy," "dynamic," "results-driven," "proven track record," em-dashes used as a crutch, or triplet lists ("fast, scalable, and reliable").
5. Prioritize and trim: only include experience/projects/skills relevant to this JD. Cut or shrink anything irrelevant. Order sections by relevance to the JD, not just reverse-chronological by default.
6. Keep it to 1 page for <8 years experience, max 2 pages otherwise. If content overflows, cut lower-impact bullets rather than shrinking font below readable size
7. Do not fabricate employers, dates, degrees, or skills the candidate never mentioned. Only rephrase/reframe what was provided 
and Don't skip any skill related to job that they target.

=== ATS-FRIENDLY STRUCTURE RULES ===
8. Use semantic, linear HTML: headings (<h1>/<h2>), paragraphs, and <ul><li> bullets. NO tables, NO multi-column CSS layouts, NO floats, NO absolute positioning for content — ATS parsers read HTML/PDF text in DOM/reading order and multi-column layouts scramble it.
9. No text inside images, no icons-as-text (use plain text labels like "Email:", "Phone:", "LinkedIn:" instead of icon fonts/emoji which ATS can't parse).
10. Section headers must be standard, ATS-recognized labels: "Summary", "Experience", "Skills", "Education", "Projects", "Certifications" — not creative renamed headers.
11. Dates in a consistent, parseable format (e.g., "Jan 2022 – Present").
12. Contact info (name, phone, email, location, links) at the very top in plain text, not inside a table or sidebar.

=== LINKS ===
13. Any GitHub, LinkedIn, portfolio, or other URL provided by the candidate must render as a real clickable hyperlink: <a href="EXACT_URL">Display Text</a>. Never alter, shorten, or guess-complete the URL — use it byte-for-byte as given.

=== VISUAL DESIGN (for PDF quality) ===
14. Single accent color only (e.g., one shade of navy/dark teal/charcoal) used sparingly — name, section headings, maybe a thin divider line. Body text stays black/dark gray for print clarity and ATS text-extraction.
15. Use web-safe, PDF-render-safe fonts only: system fonts like Arial, Helvetica, Georgia, "Times New Roman", Calibri via generic fallbacks (e.g., font-family: 'Helvetica Neue', Arial, sans-serif). Do not use @font-face or Google Fonts links — Puppeteer may not fetch external resources reliably.
16. Set explicit @page size and margins in CSS for print:
    @page { size: A4; margin: 15mm 18mm; }
    body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
17. Use CSS to prevent awkward page breaks:
    .section, .job-entry { page-break-inside: avoid; break-inside: avoid; }
18. Consistent vertical rhythm: consistent margin/padding between sections (e.g., 10-14px), consistent line-height (1.3-1.45) for readability without wasting space.
19. Font sizes: name 20-24px, section headings 12-13px (uppercase, letter-spacing, bordered-bottom or accent-colored), body text 10.5-11px, bullets 10-10.5px — tuned to fit 1 page without looking cramped.
20. No background colors/shading blocks behind text (hurts ATS parsing and print-color-adjust reliability) — reserve color for text/borders only.
21. Upper me jo name hoga vo middle me hoga.
22. content aur jyada kro ye bahot km he

 

                          the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                          The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                           The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                           you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                           The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                           The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                           If the candidate provides GitHub, LinkedIn, portfolio, or any other website URL, display it as a clickable HTML hyperlink (<a href="...">) so it remains clickable in the generated PDF. Preserve the exact URLs provided by the user and never modify or replace them.
                       `
//
                    

    const response = await ai.models.generateContent({
     model: "gemini-flash-lite-latest",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
           // responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer

//     const data = JSON.parse(response.text);

// // console.log(
// //   JSON.stringify(data.technicalQuestions[0], null, 2)
// // );

// // return data;


}

module.exports = { generateInterviewReport, generateResumePdf }