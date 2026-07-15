const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
      console.log("req.file =", req.file);
    console.log("req.body =", req.body);
    try {
        let resumeText = "";

if (req.file) {
    const parsed = await (
    new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
).getText();

resumeText = parsed.text;
}

        // const resumeContent = await (
        //     new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
        // ).getText();

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            // resume: resumeContent.text,
            resume:resumeText,
            selfDescription,
            jobDescription,
        });

        console.log("=========== AI RESPONSE ===========");
        console.log(interViewReportByAi);
        console.log("===================================");

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,

            title: interViewReportByAi.title,

            matchScore: interViewReportByAi.matchScore,
            technicalQuestions: interViewReportByAi.technicalQuestions,
            behavioralQuestions: interViewReportByAi.behavioralQuestions,
            skillGaps: interViewReportByAi.skillGaps,
            preparationPlan: interViewReportByAi.preparationPlan,
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport,
        });

    // } catch (err) {
    //     console.error(err);

    //     res.status(500).json({
    //         message: err.message,
    //     });
    // }
    }catch (err) {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("===========================");

    res.status(500).json({
        message: err.message,
    });
}
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id,
    });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found.",
        });
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport,
    });
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {

    const interviewReports = await interviewReportModel.find({
        user: req.user.id,
    })
        .sort({ createdAt: -1 })
        .select(
            "-resume -selfDescription -jobDescription -__v "
        );

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports,
    });
}

/**
 * @description Controller to generate resume PDF.
 */
async function generateResumePdfController(req, res) {

    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(
        interviewReportId
    );

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found.",
        });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
        resume,
        jobDescription,
        selfDescription,
    });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
};