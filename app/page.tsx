"use client";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PersonalInfoForm } from "./ui/PersonalInfoForm";
import { Wizard } from "react-use-wizard";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(6),
});

const steps = [
  { label: "Your Info", element: <PersonalInfoForm /> },
  { label: "Select Plan", element: <h1>Select your Plan</h1> },
];

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    console.log(form.getValues());
  }, [form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="bg-primary m-4 p-4 text-primary-foreground rounded">
        <FormProvider {...form}>
          <Wizard>
            <PersonalInfoForm />
            <h1>Hola</h1>
          </Wizard>
        </FormProvider>
      </div>
    </>
  );
}
