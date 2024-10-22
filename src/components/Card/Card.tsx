import type { ReactNode } from 'react';

import { classNames } from '../../utils';

export const Card = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'bg-white shadow-md rounded-lg p-6',
                'border border-gray-200',
                'transition-shadow duration-300 ease-in-out',
                'hover:shadow-lg',
                className
            )}
        >
            {children}
        </div>
    );
};

export const ActionRow = ({ children }: { children: ReactNode }) => {
    return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
};
