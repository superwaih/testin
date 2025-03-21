"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, XIcon } from "lucide-react";
import Select from "react-select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import InputField from "@/components/inputs/input-field";
import { useAddBankAccount, useGetAllBanks } from "@/services/dashboard";
import { toast } from "sonner";
import { useEffect } from "react";

const bankSchema = z.object({
  bank: z.object({
    value: z.string().min(1, "Please select a bank"),
    label: z.string().min(1, "Bank name is required"),
  }),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits"),
  accountName: z.string().min(2, "Account name is required"),
});

type BankFormValues = z.infer<typeof bankSchema>;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  bankdetails?: {
    account_number: string;
    account_name: string;
    bank_name: string;
    bank_code?: string; // Optional in case it's needed
  } | null;
}

export const AddAccountModal = ({
  isOpen,
  setIsOpen,
  bankdetails,
}: ModalProps) => {
  const methods = useForm<BankFormValues>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bank: { value: "", label: "" },
      accountNumber: "",
      accountName: "",
    },
  });
  const { mutate: addBankAccount, isPending } = useAddBankAccount();
  const { data: allBanks } = useGetAllBanks();

  const bankOptions =
    allBanks?.data?.map((bank: any) => ({
      value: bank.code,
      label: bank.name,
    })) || [];

  useEffect(() => {
    if (bankdetails) {
      methods.reset({
        bank: {
          value: bankdetails.bank_code ?? "",
          label: bankdetails.bank_name,
        },
        accountNumber: bankdetails.account_number,
        accountName: bankdetails.account_name,
      });
    }
  }, [bankdetails, methods]);
  const onSubmit = (data: BankFormValues) => {
    const bankdetails = {
      bank_code: data.bank.value,
      bank_name: data.bank.label,
      account_number: data.accountNumber,
      account_name: data.accountName,
    };
    addBankAccount(bankdetails, {
      onSuccess: () => {
        toast.success("Bank details added successfully");
        setIsOpen(false);
        methods.reset();
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error?.response?.data?.error || "An error occurred");
      },
    });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogOverlay className="z-[55] fixed inset-0 bg-black/15 backdrop-blur-md" />

      <AlertDialogContent className="z-[56] rounded-2xl lg:rounded-2xl modal border-[#FFFFFFE5] px-6 py-10 w-[90%] max-w-[480px] space-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="w-full flex border-b border-[#ECECEC] py-2 justify-between items-center text-[16px] md:text-lg">
              <span className="font-semibold">Add Bank Details</span>
              <XIcon
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg mt-2 text-black">
            Add your bank details for payouts
          </AlertDialogDescription>
        </AlertDialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            {/* Bank Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank <span className="text-red-500">*</span>
              </label>
              <Select
                options={bankOptions}
                onChange={(selectedOption) =>
                  methods.setValue(
                    "bank",
                    selectedOption as { value: string; label: string }
                  )
                }
                value={bankOptions.find(
                  (option: { value: string; }) => option.value === methods.watch("bank")?.value
                )} // ✅ Control the Select component
                className="mt-1 cursor-pointer"
                placeholder="Search and select a bank"
                isSearchable
              />
              {methods.formState.errors.bank && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.bank.message}
                </p>
              )}
            </div>

            {/* Account Number */}
            <InputField
              name="accountNumber"
              label="Account Number"
              placeholder="Enter account number"
              inputClassName="bg-white text-black"
              type="text"
              isRequired
            />

            {/* Account Name */}
            <InputField
              name="accountName"
              label="Account Name"
              inputClassName="bg-white text-black"
              placeholder="Enter account name (e.g., John Doe)"
              type="text"
              isRequired
            />

            <AlertDialogFooter>
              <Button
                disabled={isPending}
                className="w-full flex items-center"
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  " Add Bank Details"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};
