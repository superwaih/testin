"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface InputFieldProps {
  name: string;
  label?: string;
  type: string;
  // options: DropdownOption[];
  loading?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  showLabel?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  variant?: "default" | "outline";
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  checked?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  icon,
  isRequired = false,
  showLabel = true,
  containerClassName,
  inputClassName,
  labelClassName,
  variant = "default",
  checked,
  onChange
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderInput = () => {
    const baseClass = "w-full py-[10px] pl-[16px] rounded-[8.08px]";
    const defaultClass = "bg-neutral15 border-[#EDEDED] text-[#121212] border placeholder:text-[#00000066] text-[#00000066]";
    const outlineClass = "border-[#D9D9D9] border bg-white";
    const variantClass = variant === "outline" ? outlineClass : defaultClass;
    const registeredProps = register(name, { required: `${label} is required` });
    switch (type) {
      case "file":
        return (
          <div
            className={`text-textgreen border-bordergray flex gap-3 items-center w-full max-w-[60rem] border p-2 rounded-md text-sm cursor-pointer ${
              variant === "outline" ? "border-[#EDEDED] bg-white" : ""
            }`}
            onClick={() => document.getElementById(name)?.click()}
          >
            <PencilIcon className="size-5" />
            <p>{fileName || "Upload Corporate Files"}</p>
            <input
              type="file"
              id={name}
              {...register(name, { required: `${label} is required` })}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        );
      case "checkbox":
        return (
          <>
          <Checkbox
            // type='checkbox'
            id={name}
            checked={checked}
            // onCheckedChange={(checked) => onChange?.({ target: { checked } } as any)}
            // {...register(name, { required: `${label} is required` })}
            {...registeredProps}
          onCheckedChange={(checked) => {
            registeredProps.onChange({ target: { checked } } as any);
            onChange?.({ target: { checked } } as any);
          }}
            className={cn(  inputClassName)}
            // placeholder={placeholder}
          />
        </>
        )
      case "password":
        return (
          <>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id={name}
              {...registeredProps}
              onChange={(e) => {
                registeredProps.onChange(e);
                onChange?.(e); 
              }}
              // {...register(name, { required: `${label} is required` })}
              className={cn(baseClass, variantClass, inputClassName)}
              placeholder={placeholder}
            />
            <div
              className="bg-color-1000 absolute right-0 top-0 p-4 rounded-[8.08px] w-fit cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <Eye className="text-[#004CBD] size-5" />
              ) : (
                <EyeOff className="text-[#004CBD] size-5" />
              )}
            </div>
          </>
        );
      case "textarea": 
      return(
        <>
            <textarea
            rows={3}
            
              id={name}
              {...registeredProps}
              onChange={(e) => {
                registeredProps.onChange(e);
                onChange?.(e); 
              }}
              className={cn(baseClass, variantClass, inputClassName)}
              placeholder={placeholder}
            />
          </>
      );
      default:
        return (
          <>
            <input
              type={type}
              id={name}
              {...registeredProps}
              onChange={(e) => {
                registeredProps.onChange(e);
                onChange?.(e); 
              }}
              
              className={cn(baseClass, variantClass, inputClassName)}
              placeholder={placeholder}
            />
          </>
        );
    }
  };

  return (
    <div className={cn("w-full flex flex-col space-y-4", containerClassName)}>
      {showLabel && type !== "checkbox" && (
        <label
          className={cn(
            "text-neutral90 text-sm font-medium flex items-center gap-1 ",
            labelClassName
          )}
          htmlFor={name}
        >
          <span>{label}</span>
          {isRequired && <span className="text-[#004CBD]">*</span>}
        </label>
      )}
      {type === "checkbox" ? (
        <div className="cursor-pointer  flex gap-2 items-center  w-full">
          <div className="relative">{renderInput()}</div>
          <p className="text-[#121212]  text-right font-medium">
            {label}
          </p>
        </div>
      ) : (
        <div className="relative">{renderInput()}</div>
      )}
      {errors[name] && typeof errors[name]?.message === "string" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default InputField;
