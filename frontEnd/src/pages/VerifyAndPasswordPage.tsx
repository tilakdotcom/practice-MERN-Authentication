import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { errorToast, successToast } from "@/utils/toast";
import api from "@/utils/axiousInstance";
import { passwordSchema } from "@/schemas/passwordSchma";

export default function VerifyAndPasswordPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    setLoading(true);

    try {
      const response = await api.post("/user/VerifyEmail ", values);
      //validation
      if (response.status !== 201) {
        throw new Error("Failed to reset password");
      }
      successToast("Successfully password reset");
      console.log("Failed to reset password", response);
    } catch (error) {
      console.log("Failed to reset password", error);
      errorToast("Failed to reset password");
      return;
    } finally {
      setLoading(false);
      form.reset();
    }
  }
  return (
    <div className="h-full lg:px-20 flex justify-center items-center px-10 py-5 my-auto">
      <div className="flex justify-center items-center md:w-96">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-green-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
          >
            <h2 className="text-2xl font-bold text-center text-white ">
              Reset Your Password
            </h2>
            <p className="text-center text-gray-200">
              Enter your new password here
            </p>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-100 ">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 rounded-md bg-green-900 text-gray-100 border border-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none md:text-base"
                      placeholder="Enter your Password "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-2 md:py-4">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-green-400 hover:bg-green-500 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ease-linear ${
                  loading ? " cursor-not-allowed bg-green-300" : ""
                }`}
              >
                {loading ? "Wait" : "Verify"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
