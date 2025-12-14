"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { FormInputField } from "@/components/form/FormInputField";
import { FormPasswordInputField } from "@/components/form/FormPasswordInputField";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { Form } from "@/components/ui/form";
import { TypographyP } from "@/components/ui/typography";
import { api } from "@/src/lib/fetch-json";
import { LoginResponse } from "@/src/types/responses/login";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginValues = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: LoginValues) => {
      return api.post<LoginResponse, LoginValues>("/api/auth/login", values);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  function onSubmit(values: LoginValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <FormInputField<LoginValues>
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
        />

        <FormPasswordInputField<LoginValues>
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
        />

        {mutation.isError && (
          <TypographyP className="text-red-500 text-sm">
            {(mutation.error as Error).message}
          </TypographyP>
        )}

        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Loading..." : "Login"}
        </Button>

        <div className="flex flex-row justify-center">
          <ThemeToggler />
        </div>
      </form>
    </Form>
  );
}
