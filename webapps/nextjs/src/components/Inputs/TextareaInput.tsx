"use client";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
  onInput?: (event: any) => void;
};

const TextareaInput: React.FC<Props> = (props: Props) => {
  const { required = false, name, label, defaultValue = "", onInput = () => {}, className = "" } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input text-area-input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <textarea
        id={name}
        name={name}
        value={value}
        required={required}
        autoComplete="false"
        onInput={(event: any) => {
          const target = event.currentTarget || event.target;
          setValue(target.value);
          onInput(target);
        }}
      />
    </div>
  );
};

export default TextareaInput;
