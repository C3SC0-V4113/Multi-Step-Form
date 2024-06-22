"use client";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PersonalInfoForm } from "./ui/PersonalInfoForm";
import { Wizard } from "react-use-wizard";
import { SelectPlanForm } from "./ui/SelectPlanForm";
import SelectAddons from "./ui/SelectAddons";
import { FinishingUp } from "./ui/FinishingUp";
import { ThankYou } from "./ui/ThankYou";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(6),
  billingYearly: z.boolean(),
  plan: z.enum(["arcade", "advanced", "pro"], {
    required_error: "You need to select a plan type.",
    invalid_type_error: "You need to select a plan type.",
  }),
  addons: z
    .array(z.enum(["online-service", "larger-storage", "customizable-profile"]))
    .optional(),
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
      billingYearly: false,
      plan: "arcade",
      addons: [],
    },
  });

  return (
    <>
      <div className="bg-primary m-4 p-4 text-primary-foreground rounded mb-20">
        <FormProvider {...form}>
          <Wizard>
            <PersonalInfoForm />
            <SelectPlanForm />
            <SelectAddons />
            <FinishingUp />
            <ThankYou />
          </Wizard>
        </FormProvider>
      </div>
    </>
  );
}
