import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { StepIndicator, StepButtons, FormWrapper } from "./components";

export const SelectPlanForm = () => {
  const form = useFormContext();
  const { nextStep } = useWizard();
  const [billingYearly, setBillingYearly] = useState<boolean>(
    form.getValues().billingYearly
  );

  const onSubmit = () => {
    nextStep();
  };

  useEffect(() => {
    setBillingYearly(form.getValues().billingYearly);
  }, [form]);

  const items = [
    {
      label: "Arcade",
      value: "arcade",
      image: { src: "/icons/icon-arcade.svg", alt: "arcade icon" },
      prices: {
        yearly: 90,
        monthly: 9,
      },
    },
    {
      label: "Advanced",
      value: "advanced",
      image: { src: "/icons/icon-advanced.svg", alt: "advanced icon" },
      prices: {
        yearly: 120,
        monthly: 12,
      },
    },
    {
      label: "Pro",
      value: "pro",
      image: { src: "/icons/icon-pro.svg", alt: "pro icon" },
      prices: {
        yearly: 150,
        monthly: 15,
      },
    },
  ];

  return (
    <>
      <StepIndicator />
      <FormWrapper
        title="Select your plan"
        description="You have the option of monthly or yearly billing"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4 h-full"
          >
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormControl>
                    <ToggleGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      type="single"
                      className="flex flex-col gap-2 lg:flex-row w-full"
                    >
                      {items.map((item) => (
                        <FormItem
                          className="flex items-center basis-1/3"
                          key={item.value}
                        >
                          <FormControl>
                            <ToggleGroupItem
                              className="p-4 w-full border border-muted rounded data-[state=on]:bg-muted data-[state=on]:border-border flex gap-4 lg:flex-col"
                              value={item.value}
                            >
                              <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                className="my-auto"
                                width={40}
                                height={40}
                              />
                              <div className="flex flex-col my-auto text-left">
                                <p className="font-bold text-accent">
                                  {item.label}
                                </p>
                                <p className="text-muted-foreground">{`$${
                                  billingYearly
                                    ? `${item.prices.yearly}/yr`
                                    : `${item.prices.monthly}/mo`
                                }`}</p>
                                {billingYearly && (
                                  <p className="text-accent">2 months free</p>
                                )}
                              </div>
                            </ToggleGroupItem>
                          </FormControl>
                          <FormLabel className="sr-only">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingYearly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-background text-foreground p-4">
                  <FormLabel
                    className={clsx("text-base", {
                      "text-muted-foreground": billingYearly,
                      "text-accent": !billingYearly,
                    })}
                  >
                    Monthly
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel
                    className={clsx("text-base", {
                      "text-muted-foreground": !billingYearly,
                      "text-accent": billingYearly,
                    })}
                  >
                    Yearly
                  </FormLabel>
                </FormItem>
              )}
            />
            <StepButtons />
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};
