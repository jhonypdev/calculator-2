/** @format */

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		setIsVisible(scrollTop > 0);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		isVisible && (
			<div className="flex items-center justify-center ease-in duration-200 fixed bottom-12 right-12 hover:bottom-[3.5rem] bg-[#fe4c50] hover:text-gray-400 hover:bg-[#ff5b5d] rounded-[100%] bg-cover h-10 w-10">
				<a
					href="#top"
					className="w-full h-full flex justify-center items-center cursor-pointer">
					<FaChevronUp />
				</a>
			</div>
		)
	);
};

export default ScrollTop;
