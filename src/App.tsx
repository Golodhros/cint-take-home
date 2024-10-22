// Assumptions and cut corners
// - Works on Chrome
// - We can use all newest JS and TS APIs
//
// Application Requirements
// Quiz interface that shows a set of questions and lets the user select an answer.
// Functional
// - Three types of questions: multiple-choice, boolean and open-ended text
// - Get questions from .json file
// - Show one question at a time, randomly selected from the set, without repeating them
// - After responding a number of questions set in DEFAULT_QUESTION_COUNT the questions, we show a summary page with results
//   - They cour restart the Quiz with different questions from the question pool. If there aren't enough, we'll not allow to restart.
//
// Non-functional
// - A11y: will be keyboard navigable, we won't test screen readers for now
// - Performance: should be pretty snappy
//
// Improvements from here
// - Add unit tests
// - Test and fix a11y in screen readers

import { useEffect, useState } from 'react';
import {
    useExternalQuestions,
    type Question,
} from 'hooks/useExternalQuestions';
import { Quiz } from './components/Quiz/Quiz';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { shuffledQuestionArray } from './utils';

const DEFAULT_QUESTION_COUNT = 3;

function App() {
    const { isLoading, error, data: allQuestions } = useExternalQuestions();
    const [round, setRound] = useState<Question[]>([]);
    const [rest, setRest] = useState<Question[]>([]);

    const splitQuestions = (questions: Question[]) => {
        const shuffledArray = shuffledQuestionArray(questions);
        const newRound = shuffledArray.slice(0, DEFAULT_QUESTION_COUNT);
        const restOfQuestions = shuffledArray.slice(
            DEFAULT_QUESTION_COUNT,
            DEFAULT_QUESTION_COUNT + shuffledArray.length
        );

        return { newRound, restOfQuestions };
    };

    useEffect(() => {
        const { newRound, restOfQuestions } = splitQuestions(allQuestions);
        setRound(newRound);
        setRest(restOfQuestions);
    }, [allQuestions]);

    const handleRestart = () => {
        const { newRound, restOfQuestions } = splitQuestions(rest);
        setRound(newRound);
        setRest(restOfQuestions);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (!allQuestions) {
        return <ErrorMessage message={'No Messages available'} />;
    }

    return (
        <div className="relative overflow-hidden bg-white">
            <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    {isLoading ? (
                        'Loading...'
                    ) : (
                        <Quiz questions={round} onRestart={handleRestart} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
