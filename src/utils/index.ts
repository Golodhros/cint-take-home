import type { Question } from '../hooks/useExternalQuestions';

export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(' ');
}

// Reference: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffledArray = (a: unknown[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const shuffledQuestionArray = (a: Question[]) => {
    return shuffledArray(a) as Question[];
};

export const shuffledAnswerArray = (a: string[]) => {
    return shuffledArray(a) as string[];
};
