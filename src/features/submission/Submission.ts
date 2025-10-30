import { QuestionType } from "../forms/Form";

export interface FormAnswerRequest {
    questionId?: string;
    questionType?: QuestionType;
    submissionId?: number;
    valueText?: string;
    valueJson?: string;
}

export interface FormSubmissionRequest {
    formId?: string;
    userId?: number;
    answers?: FormAnswerRequest[];
}
