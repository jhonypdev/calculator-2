/** @format */

import { ReactNode, FC } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
	id?: string;
}

const Container: FC<ContainerProps> = ({
	children,
	id,
	className = "",
	...props
}) => {
	return (
		<div className={`container mx-auto px-4 ${className}`} {...props}>
			{children}
		</div>
	);
};

export default Container;
