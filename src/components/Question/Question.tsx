import { useState, useId, useRef, type FormEvent } from 'react';

import type { Question } from '../../hooks/useExternalQuestions';
import { Button } from '../Button/Button';
import { Card, ActionRow } from '../Card/Card';
import { shuffledAnswerArray } from '../../utils';

type QuestionCardProps = {
    question: Question;
    onAnswer: (answer: boolean) => void;
};

export const MultipleChoiceQuestion = ({
    question,
    onAnswer,
}: QuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const firstResponseId = useId();
    const secondResponseId = useId();
    const thirdResponseId = useId();
    const fourthResponseId = useId();
    const ids = [
        firstResponseId,
        secondResponseId,
        thirdResponseId,
        fourthResponseId,
    ];

    // Avoid re-shuffling the questions with every state change
    const shuffledAnswers = useRef(
        shuffledAnswerArray([
            ...(question.incorrect_answers || []),
            question.correct_answer,
        ])
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedAnswer) {
            const isCorrect = selectedAnswer === question.correct_answer;

            onAnswer(isCorrect);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4">{question.question}</h3>
                {shuffledAnswers.current.map((answer, index) => (
                    <div key={answer} className="mb-2 flex items-center">
                        <input
                            id={ids[index]}
                            type="radio"
                            value={answer}
                            checked={selectedAnswer === answer}
                            onChange={() => setSelectedAnswer(answer)}
                            name="answer"
                            className="size-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                            htmlFor={ids[index]}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {answer}
                        </label>
                    </div>
                ))}
                {selectedAnswer && (
                    <ActionRow>
                        <Button type="submit">Next</Button>
                    </ActionRow>
                )}
            </form>
        </Card>
    );
};

export const BooleanQuestion = ({ question, onAnswer }: QuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<
        'True' | 'False' | null
    >(null);
    const firstResponseId = useId();
    const secondResponseId = useId();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedAnswer !== null) {
            const isCorrect = selectedAnswer === question.correct_answer;

            onAnswer(isCorrect);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4">{question.question}</h3>
                <div className="mb-2 flex items-center">
                    <input
                        id={firstResponseId}
                        type="radio"
                        value="True"
                        name="answer"
                        className="size-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        checked={selectedAnswer === 'True'}
                        onChange={() => setSelectedAnswer('True')}
                    />
                    <label
                        htmlFor={firstResponseId}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        True
                    </label>
                </div>
                <div className="mb-2 flex items-center">
                    <input
                        id={secondResponseId}
                        type="radio"
                        value="False"
                        name="answer"
                        className="size-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        checked={selectedAnswer === 'False'}
                        onChange={() => setSelectedAnswer('False')}
                    />
                    <label
                        htmlFor={secondResponseId}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        False
                    </label>
                </div>
                {selectedAnswer !== null && (
                    <ActionRow>
                        <Button type="submit">Next</Button>
                    </ActionRow>
                )}
            </form>
        </Card>
    );
};

export const TextQuestion = ({ question, onAnswer }: QuestionCardProps) => {
    const [answer, setAnswer] = useState('');
    const inputId = useId();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (answer) {
            const isCorrect =
                answer.toLowerCase().trim() === question.correct_answer;

            onAnswer(isCorrect);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div key={answer}>
                    <label
                        htmlFor={inputId}
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        <h3 className="mb-4">{question.question}</h3>
                    </label>
                    <input
                        type="text"
                        id={inputId}
                        value={answer}
                        autoFocus
                        onChange={(e) => setAnswer(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                </div>
                {answer && (
                    <ActionRow>
                        <Button type="submit">Next</Button>
                    </ActionRow>
                )}
            </form>
        </Card>
    );
};
