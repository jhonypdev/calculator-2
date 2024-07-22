/** @format */
import { CiUser } from "react-icons/ci";
// import { FaCartShopping } from "react-icons/fa6";

import { Nav } from "react-bootstrap";

const NavUser = () => {
	return (
		<Nav className="sm:ml-5 gap-4 justify-center flex-row items-center text-xl py-4 md:py-0">
			<Nav.Item className="inline-block text-center ">
				<Nav.Link
					href="#"
					className="flex items-center justify-center relative w-9 h-9 text-slate-900 ">
					<CiUser />
				</Nav.Link>
			</Nav.Item>

			{/* <Nav.Item className="inline-block text-center text-slate-400">
				<Nav.Link
					href="#"
					className="flex items-center justify-center relative w-9 h-9 text-slate-900 bg-[#eceff6] rounded-[100%] ">
					<FaCartShopping />
					<span className="flex items-center justify-center absolute -top-1 -right-0 bg-[#fe4c50] rounded-[100%] w-4 h-4 text-xs text-white font-semibold">
						2
					</span>
				</Nav.Link>
			</Nav.Item> */}
		</Nav>
	);
};

export default NavUser;
