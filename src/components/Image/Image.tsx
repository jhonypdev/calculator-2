/** @format */

interface ImageProps {
	src: string;
	alt: string;
	className?: string;
}

const Image = ({ src, alt, className = "", ...props }: ImageProps) => {
	return <img src={src} alt={alt} className={className} {...props} />;
};

export default Image;
