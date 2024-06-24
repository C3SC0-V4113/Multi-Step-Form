"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wizard } from "react-use-wizard";
import {
  FinishingUp,
  PersonalInfoForm,
  SelectAddons,
  SelectPlanForm,
  ThankYou,
} from "./ui";
import { isValidPhoneNumber } from "react-phone-number-input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  billingYearly: z.boolean(),
  plan: z.enum(["arcade", "advanced", "pro"], {
    errorMap: () => ({ message: "You need to select a plan type." }),
  }),
  addons: z
    .array(z.enum(["online-service", "larger-storage", "customizable-profile"]))
    .optional(),
});

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
      <div className="bg-primary m-4 p-4 text-primary-foreground rounded mb-20 md:flex">
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
