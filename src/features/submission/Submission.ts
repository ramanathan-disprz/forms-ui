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

export interface FormSubmissionResponse {
    id: string;
    formId: string;
    userId: number;
    submittedAt: string;
}

export interface FormAnswer {
    id: string;
    submissionId: string;
    questionId: string;
    questionType: QuestionType;
    valueText?: string;
    valueJson?: string;
}

export interface FormSubmissionDetail {
    submission: FormSubmissionResponse;
    answers: FormAnswer[];
}