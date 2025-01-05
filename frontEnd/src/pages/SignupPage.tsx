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
import { errorToast, successToast } from "@/lib/toast";
import api from "@/config/axiousInstance";
import { signupSchma } from "@/schemas/signupSchema";

export default function SignupPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signupSchma>>({
    resolver: zodResolver(signupSchma),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchma>) {
    setLoading(true);

    try {
      const response = await api.post("/user/signup", values);
      //validation
      if (response.status !== 201) {
        throw new Error("Signup Failed");
      }
      successToast("Signup Successful");
      console.log("User Signup Successful", response);
    } catch (error) {
      console.log("Signup Failed", error);
      errorToast("Signup Failed");
      return;
    } finally {
      setLoading(false);
      form.reset();
    }
  }
  return (
    <div className="lg:px-20 flex justify-center items-center px-10 py-5 my-auto">
      <div className="flex justify-center items-center">
      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-green-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
        >
        <h2 className="text-2xl font-bold text-center text-white ">
          Sign Up
        </h2>
        <p className="text-center text-gray-200">
          Create your account
        </p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="block md:text-base font-medium text-gray-100 ">
            Username
            </FormLabel>
            <FormControl>
            <Input
              className="w-full px-4 py-2 rounded-md bg-green-900 text-gray-100 border border-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none md:text-base"
              placeholder="Enter your name"
              {...field}
            />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />

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
          {loading ? "Wait" : "Sign Up"}
          </Button>
        </div>
        </form>
      </Form>
      </div>
    </div>
  );
}
