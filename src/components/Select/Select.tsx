/** @format */

import React from "react";
import { IoMdArrowDropright } from "react-icons/io";

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	id?: string;
	className?: string;
	label?: string;
	defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	id,
	className,
	label,
	defaultValue,
}) => {
	return (
		<div
			className={`flex items-center relative group rounded-lg w-fit bg-gray-800 overflow-hidden ${className}`}>
			<IoMdArrowDropright className="w-8 h-8 absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 group-hover:rotate-90 group-hover:text-white duration-300" />
			<label className="text-gray-300 p-2 font-bold min-w-14">{label}</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				className="appearance-none bg-transparent ring-1 ring-gray-600 text-gray-300 placeholder-gray-500 text-sm font-bold rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5">
				<option
					value="Selecione uma moéda"
					className="bg-gray-800 text-gray-300">
					Selecione uma moeda
				</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="bg-gray-800 text-gray-300">
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
