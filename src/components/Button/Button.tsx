/** @format */

import { FC, ReactNode, ButtonHTMLAttributes } from "react";

const buttonVariants = {
	default: "bg-red-500 text-white",
	destructive: "bg-red-700 text-white",
	outline: "bg-transparent text-red-500 border border-red-500",
	dark: "bg-gray-800 text-white",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: keyof typeof buttonVariants;
	className?: string;
}

const Button: FC<ButtonProps> = ({
	children,
	variant = "default",
	className = "",
	...props
}) => {
	const buttonClass = `${buttonVariants[variant]} py-2 px-4 rounded text-base cursor-pointer hover:opacity-80 ${className}`;

	return (
		<button className={buttonClass} {...props}>
			{children}
		</button>
	);
};

export default Button;
