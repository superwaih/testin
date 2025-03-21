"use client";
import InputField from "@/components/inputs/input-field";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/services/auth";
import { setToken } from "@/services/get-token";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { mutate: login, isPending: isLoading } = useLogin();
  const router = useRouter();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    const formdata = {
      email: data.email,
      password: data.password,
    };

    login(formdata, {
      onSuccess: (res) => {
        setToken(res?.access_token, 7);
        router.push("/");
        toast.success("Login Successful");
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response?.data.error.message || "Login failed");
      },
    });
  };

  return (
    <section className="bg-white card-shadow m-4 flex flex-col space-y-6 px-[1.5rem] py-10 max-w-lg w-full">
      <div>
        <Icons.blacklogo />
      </div>
      <div>
        <h2 className="text-[#141416] text-3xl font-medium">Partner Login</h2>
      </div>
      <div className="flex flex-col pt-4 space-y-2">
        <div className="border-b pb-2 border-[#EDEDED]">
          <p className="text-[#242424] text-md">Login to your access portal</p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="py-2">
              <InputField
                name="email"
                label="Email"
                placeholder="Enter email address"
                type="text"
                inputClassName="bg-white text-black"
                isRequired
              />
            </div>
            <div className="py-2">
              <InputField
                name="password"
                label="Password"
                placeholder="Enter your secure password"
                type="password"
                inputClassName="bg-white text-black"
                isRequired
              />
            </div>
            <Button
              className="flex w-full mt-4 justify-center items-center disabled:opacity-50"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default LoginForm;
