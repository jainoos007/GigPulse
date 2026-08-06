"use client";

import React from "react";
import { PhoneInput as ReactInternationalPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export interface PhoneInputProps {
  value?: string;
  onChange?: (phone: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`w-full relative ${className}`}>
      <ReactInternationalPhoneInput
        defaultCountry="us"
        value={value}
        onChange={(phone) => onChange?.(phone)}
        disabled={disabled}
        placeholder={placeholder}
        className="flex items-center w-full"
        inputClassName="!w-full !h-10 !bg-slate-50/80 dark:!bg-slate-950/80 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 !text-xs sm:!text-sm !rounded-r-xl focus:!ring-2 focus:!ring-blue-500/20 focus:!border-blue-500 transition-all placeholder:!text-slate-400 dark:placeholder:!text-slate-500"
        countrySelectorStyleProps={{
          buttonClassName: "!h-10 !bg-slate-100/80 dark:!bg-slate-900/80 !border-slate-200 dark:!border-slate-800 !px-3 !rounded-l-xl hover:!bg-slate-200/80 dark:hover:!bg-slate-800 transition-colors",
          dropdownStyleProps: {
            className: "!bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 !rounded-xl !shadow-xl !z-50",
          },
        }}
      />
    </div>
  );
};
