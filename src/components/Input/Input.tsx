/** @format */

import React from "react";

interface InputProps {
	name?: string;
	type: string;
	id?: string;
	className?: string;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	autoComplete?: string;
	maxLength?: number;
}

const Input: React.FC<InputProps> = ({
	name,
	type,
	id,
	className = "",
	value,
	onChange,
	placeholder,
	disabled,
	required,
	autoComplete,
	maxLength,
	checked,
}) => {
	return (
		<input
			className={`bg-gray-800 px-4 py-3 outline-none text-gray-300 rounded-lg border-2 transition-colors duration-100 border-solid focus:border-gray-500 ${className}`}
			name={name}
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			required={required}
			autoComplete={autoComplete}
			maxLength={maxLength}
			checked={checked}
		/>
	);
};

export default Input;
