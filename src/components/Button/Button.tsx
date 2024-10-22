import { classNames } from '../../utils';

export const Button = ({
    children,
    onClick,
    type = 'button',
    className = '',
}: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                'px-4 py-2 bg-blue-500 text-white rounded',
                'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
                'transition duration-150 ease-in-out',
                className
            )}
        >
            {children}
        </button>
    );
};
