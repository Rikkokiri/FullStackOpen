interface IRadioGroupProps {
  name: string;
  options: string[];
  legendText: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup = ({
  name,
  options,
  legendText,
  value,
  onChange,
}: IRadioGroupProps) => {
  return (
    <fieldset className="radio-group">
      <legend>{legendText}</legend>
      <div className="radio-options">
        {options.map((option) => (
          <div key={option} className="radio-option">
            <input
              id={option}
              name={name}
              type="radio"
              value={option}
              checked={value === option}
              onChange={onChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
