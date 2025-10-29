
export enum FormStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export enum FormViewStatus {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED'
}

export enum QuestionType {
    SHORT_TEXT = 'SHORT_TEXT',
    LONG_TEXT = 'LONG_TEXT',
    NUMBER = 'NUMBER',
    DATE = 'DATE',
    FILE = 'FILE',
    SELECT = 'SELECT'
}

export interface Option {
    id: string;
    order: number;
    value: string;
    label: string;
}

export interface QuestionRequest {
    id?: string; // for ui
    formId?: string;
    type?: QuestionType;
    questionText?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    order?: number;

    minLength?: number;
    maxLength?: number;

    minDate?: Date;
    maxDate?: Date;
    dateFormat?: string;

    allowedFileTypes?: string[];
    maxFileSizeMB?: number;
    maxTotalFileSizeMB?: number;
    maxFiles?: number;

    minValue?: number;
    maxValue?: number;

    options?: Option[];
    multiSelect?: boolean;
}

export interface FormRequest {
    title?: string;
    description?: string;
    publishedBy?: number;
    publishedDate?: Date;
    formStatus?: FormStatus;
    formViewStatus?: FormViewStatus;
    questionLimit?: number;
    allowMultipleResponses?: boolean;
    questions?: QuestionRequest[];
}