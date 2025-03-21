import { CheckCircle, XCircle } from "lucide-react";

const PasswordValidation = ({ password }: {password: string}) => {
  // Validation criteria
  const validations = [
    { label: "Characters", heading: '8+', isValid: password.length >= 8 },
    { label: "UpperCase", heading: 'AAA', isValid: /[A-Z]/.test(password) },
    { label: "LowerCase", heading: 'Aa', isValid: /[a-z]/.test(password) },
    { label: "Numbers", heading: '23', isValid: /[0-9]/.test(password) },
  ];

  return (
    <div className="grid grid-cols-4 my-4 place-content-center place-items-center items-center gap-3 space-x-4">
      {validations.map(({ label, heading, isValid }) => (
        <div
          key={label}
          className="flex flex-col space-y-3 w-4/5 text-sm font-medium"
        >
          {isValid ? (
            <div className="bg-[#27AE60] rounded-md  h-[3px]" ></div>
          ) : (
            <div className="bg-gray-500 rounded-md  h-[3px]">

            </div>
          )}
          <div className="flex flex-col justify-center items-center">
          <span className={isValid ? "font-bold text-darktext" : "font-bold text-darktext"}>{heading}</span>

          <span className={isValid ? "text-[#878C95]" : "text-[#878C95]"}>{label}</span>

          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidation;