interface LabelProps {
  label?: string;
  className?: string;
  htmlFor?: string;
  ariaLabel?: string;
}

const Label = ({ label, className, htmlFor, ariaLabel }: LabelProps) => {
  return (
    <label
      aria-label={ariaLabel}
      htmlFor={htmlFor}
      className={`text-gray-300 p-2 font-bold min-w-14 ${className}`}
    >
      {label}
    </label>
  );
};

export default Label;
