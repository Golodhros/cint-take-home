import React, { useRef, useState, useEffect } from 'react';

import type { Question } from '../../hooks/useExternalQuestions';
import {
    TextQuestion,
    MultipleChoiceQuestion,
    BooleanQuestion,
} from '../Question/Question';
import { Summary } from '../Summary/Summary';

type QuizProps = {
    questions: Question[];
    onRestart: () => void;
};

export const Quiz = ({ questions, onRestart }: QuizProps) => {
    const [results, setResults] = useState<Record<string, boolean> | null>(
        null
    );
    const [activeStep, setActiveStep] = useState<number>(0);

    useEffect(() => {
        setResults(
            questions.reduce((acc, question) => {
                return {
                    ...acc,
                    [question.id]: false,
                };
            }, {})
        );
        setActiveStep(0);
    }, [questions]);

    const handleQuestionAnswer = (questionId: string, isCorrect: boolean) => {
        setResults((results) => {
            return {
                ...results,
                [questionId]: isCorrect,
            };
        });
        setActiveStep(activeStep + 1);
    };

    const isFinished = questions.length === activeStep;
    if (results && isFinished) {
        return (
            <Summary
                results={Object.values(results)}
                onRestart={() => {
                    onRestart();
                }}
            />
        );
    }

    return (
        <div>
            {results &&
                questions.map((question) => {
                    if (question.id === questions[activeStep].id) {
                        switch (question.type) {
                            case 'boolean':
                                return (
                                    <BooleanQuestion
                                        key={question.id}
                                        question={question}
                                        onAnswer={(isCorrect) => {
                                            handleQuestionAnswer(
                                                question.id,
                                                isCorrect
                                            );
                                        }}
                                    />
                                );
                            case 'multiple':
                                return (
                                    <MultipleChoiceQuestion
                                        key={question.id}
                                        question={question}
                                        onAnswer={(isCorrect) => {
                                            handleQuestionAnswer(
                                                question.id,
                                                isCorrect
                                            );
                                        }}
                                    />
                                );
                            case 'text':
                                return (
                                    <TextQuestion
                                        key={question.id}
                                        question={question}
                                        onAnswer={(isCorrect) => {
                                            handleQuestionAnswer(
                                                question.id,
                                                isCorrect
                                            );
                                        }}
                                    />
                                );
                            default:
                                return null;
                        }
                    }
                })}
        </div>
    );
};
