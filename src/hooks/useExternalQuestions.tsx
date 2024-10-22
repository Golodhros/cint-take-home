import { useState, useEffect } from 'react';
import he from 'he';
import questionsData from '../fixtures/data.json';

const FAKE_DELAY = 500;
const FETCHING_ERROR_MESSAGE = 'Error fetching questions';

const waitForDelayToSimulateRealCall = () =>
    new Promise((resolve) => setTimeout(resolve, FAKE_DELAY));

const addUuid = (questions: RawQuestion[]): Question[] => {
    return questions.map((question) => ({
        ...question,
        id: crypto.randomUUID(),
    }));
};

const formatQuestion = (question: RawQuestion): RawQuestion => ({
    ...question,
    question: he.decode(question.question),
});

type RawQuestion = {
    category: string;
    type: 'multiple' | 'boolean' | 'text';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    id: string;
};

export type Question = RawQuestion & { id: string };

export const useExternalQuestions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Question[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const fetchQuestions = async () => {
        try {
            await waitForDelayToSimulateRealCall();
            // TODO: We might add validation on this type assertion if we deem it necessary
            setData(
                addUuid(questionsData.results as RawQuestion[]).map(
                    formatQuestion
                )
            );
            setIsLoading(false);
        } catch (err) {
            setError(new Error(FETCHING_ERROR_MESSAGE));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return { isLoading, data, error };
};
