import React, { useRef } from 'react';

import type { Question } from '../../hooks/useExternalQuestions';
import {
    TextQuestion,
    MultipleChoiceQuestion,
    BooleanQuestion,
} from '../Question/Question';

import { shuffledQuestionArray } from '../../utils';

type QuizProps = {
    questions: Question[];
    roundSize: number;
};

export const Quiz = ({ questions, roundSize }: QuizProps) => {
    console.log('questions', questions);
    // Select roundSize number of questions
    const [questionOne, questionTwo, questionThree, ...restOfQuestions] =
        shuffledQuestionArray(questions);
    const remainingQuestions = useRef(restOfQuestions);
    // Start a round
    const newRound = [questionOne, questionTwo, questionThree];
    // Keep track
    // Show Summary

    console.log('roundQuestions', questionOne, questionTwo, questionThree);
    console.log('remainingQuestions', remainingQuestions.current);

    return (
        <div>
            {newRound.map((question) => {
                switch (question.type) {
                    case 'boolean':
                        return (
                            <BooleanQuestion
                                key={question.id}
                                question={question}
                                onAnswer={() => {}}
                            />
                        );
                    case 'multiple':
                        return (
                            <MultipleChoiceQuestion
                                key={question.id}
                                question={question}
                                onAnswer={() => {}}
                            />
                        );
                    case 'text':
                        return (
                            <TextQuestion
                                key={question.id}
                                question={question}
                                onAnswer={() => {}}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};
