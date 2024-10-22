import { Card, ActionRow } from '../Card/Card';
import { Button } from '../Button/Button';

type RoundData = {
    correct: number;
    wrong: number;
    total: number;
    score: number;
};

const computeRoundData = (results: boolean[]): RoundData => {
    const correct = results.filter((result) => result).length;
    const total = results.length;
    const wrong = total - correct;
    const score = Math.round((correct / total) * 100);

    return {
        correct,
        wrong,
        total,
        score,
    };
};

export type SummaryProps = {
    onRestart: () => void;
    results: boolean[];
};

export const Summary = ({ onRestart, results }: SummaryProps) => {
    const handleRestart = () => {
        onRestart();
    };
    const { correct, wrong, total, score } = computeRoundData(results);

    return (
        <Card>
            <div>
                <h3 className="mb-4 text-xl">Summary</h3>
                <dl className="space-y-2">
                    <div className="flex items-center">
                        <dt className="mr-2 text-lg font-medium text-gray-500">
                            Correct:
                        </dt>
                        <dd className="text-lg  font-semibold text-green-600 ">
                            {correct}
                        </dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="mr-2 text-lg font-medium text-gray-500">
                            Wrong:
                        </dt>
                        <dd className="text-lg  font-semibold text-red-600">
                            {wrong}
                        </dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="mr-2 text-lg font-medium text-gray-500">
                            Questions Answered:
                        </dt>
                        <dd className="text-lg  font-semibold text-gray-900">
                            {total}
                        </dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="mr-2 text-lg font-medium text-gray-500">
                            Final Score:
                        </dt>
                        <dd className="text-lg  font-semibold text-blue-600">
                            {score}%
                        </dd>
                    </div>
                </dl>
                <ActionRow>
                    <Button onClick={handleRestart}>Restart Quiz</Button>
                </ActionRow>
            </div>
        </Card>
    );
};
