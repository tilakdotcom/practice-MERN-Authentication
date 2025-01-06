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
import { errorToast, successToast } from "@/lib/toast";
import { LoginSchma } from "@/schemas/loginSchema";
import { loginRequest } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof LoginSchma>>({
    resolver: zodResolver(LoginSchma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchma>) {
    setLoading(true);
    try {
      const response = await loginRequest(values);
      //validation
      if (!response) {
        return errorToast("Login failed");
      }
      //how to pass the data as json

      dispatch(setUser(response.data));
      successToast("Login Successful");
      console.log("User Login Successful", response);
      navigate("/dashboard", { replace: true });
      console.log("User Login Successful", response);
    } catch (error) {
      console.log("Login  Failed", error);
      errorToast("Login Failed");
      return;
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="h-screen lg:px-20 flex justify-center items-center px-10 py-5 my-auto">
      <div className="flex justify-center items-center md:w-1/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-green-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
          >
            <h2 className="text-2xl font-bold text-center text-white ">
              Login
            </h2>
            <p className="text-center text-gray-200">Login to your account</p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-100 ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 rounded-md bg-green-900 text-gray-100 border border-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none md:text-base"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:text-base font-medium text-gray-100 ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full px-4 py-2 rounded-md bg-green-900 text-gray-100 border border-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none md:text-base"
                      placeholder="Enter your password"
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
                {loading ? "Wait" : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
