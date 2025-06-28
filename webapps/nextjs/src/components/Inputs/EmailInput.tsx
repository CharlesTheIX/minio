"use client";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  onInput?: (event: any) => void;
};

const EmailInput: React.FC<Props> = (props: Props) => {
  const { required = false, name, label, defaultValue = "", onInput = () => {}, className = "" } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input email-input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        type="email"
        value={value}
        autoComplete="true"
        required={required}
        onInput={(event: any) => {
          const target = event.currentTarget || event.target;
          setValue(target.value);
          onInput(target);
        }}
      />
    </div>
  );
};

export default EmailInput;
