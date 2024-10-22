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
// -

import { useExternalQuestions } from 'hooks/useExternalQuestions';
import { Quiz } from './components/Quiz/Quiz';

const DEFAULT_QUESTION_COUNT = 3;

function App() {
    // Get Questions and store them in state
    const { isLoading, data: allQuestions } = useExternalQuestions();

    if (!allQuestions) {
        return null;
    }

    return (
        <div className="relative overflow-hidden bg-white">
            <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <h1>Quiz</h1>
                    {isLoading ? (
                        'Loading...'
                    ) : (
                        <Quiz
                            questions={allQuestions}
                            roundSize={DEFAULT_QUESTION_COUNT}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
