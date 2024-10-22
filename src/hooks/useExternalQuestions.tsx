import { useState, useEffect } from 'react';
import he from 'he';
import questionsData from '../fixtures/data.json';

const FAKE_DELAY = 500;
const FETCHING_ERROR_MESSAGE = 'Error fetching questions';

const waitForDelayToSimulateRealCall = () =>
    new Promise((resolve) => setTimeout(resolve, FAKE_DELAY));

const addUuid = (questions: RawQuestion[]): Question[] =>
    questions.map((question) => ({
        ...question,
        id: crypto.randomUUID(),
    }));

const formatQuestion = (question: Question): Question => ({
    ...question,
    question: he.decode(question.question),
    correct_answer: he.decode(question.correct_answer),
    incorrect_answers:
        question.incorrect_answers && question.incorrect_answers.length > 0
            ? question.incorrect_answers.map((answer) => he.decode(answer))
            : undefined,
});

type RawQuestion = {
    category: string;
    type: 'multiple' | 'boolean' | 'text';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers?: string[];
};

export type Question = RawQuestion & { id: string };

export const useExternalQuestions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Question[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchQuestions = async () => {
        try {
            await waitForDelayToSimulateRealCall();
            // TODO: We might add validation on this type assertion if we deem it necessary
            const formattedQuestions = addUuid(
                questionsData.results as RawQuestion[]
            ).map(formatQuestion);
            setData(formattedQuestions);
        } catch (err) {
            setError(new Error(FETCHING_ERROR_MESSAGE));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return { isLoading, data, error };
};
