/** @format */

interface SocialItemsProps {
	icon: React.ReactNode;
	link?: string;
}
const SocialItem = ({ icon, link }: SocialItemsProps) => {
	return (
		<li className="inline-block">
			<a
				href={link}
				className="text-[#51545f] transition-all p-2 hover:text-[#fe4c50] cursor-pointer">
				{icon}
			</a>
		</li>
	);
};

export default SocialItem;
