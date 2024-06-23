import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { StepIndicator } from "./components/StepIndicator";

export const SelectPlanForm = () => {
  const form = useFormContext();
  const { nextStep, previousStep } = useWizard();
  const [billingYearly, setBillingYearly] = useState<boolean>(
    form.getValues().billingYearly
  );

  const onSubmit = () => {
    nextStep();
  };

  useEffect(() => {
    setBillingYearly(form.getValues().billingYearly);
  }, [form]);

  return (
    <div className="md:flex">
      <StepIndicator />
      <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px]">
        <h1 className="font-bold text-xl">Select your plan</h1>
        <p>You have the option of monthly or yearly billing</p>

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
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <ToggleGroupItem
                            className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary flex gap-4"
                            value="arcade"
                          >
                            <Image
                              src={"/icons/icon-arcade.svg"}
                              alt={"arcade icon"}
                              className="my-auto"
                              width={40}
                              height={40}
                            />
                            <div className="flex flex-col my-auto text-left">
                              <p className="font-bold text-accent">Arcade</p>
                              <p className="text-muted-foreground">{`$${
                                billingYearly ? "90/yr" : "9/mo"
                              }`}</p>
                              {billingYearly && (
                                <p className="text-accent">2 months free</p>
                              )}
                            </div>
                          </ToggleGroupItem>
                        </FormControl>
                        <FormLabel className="sr-only">Arcade</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <ToggleGroupItem
                            value="advanced"
                            className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary flex gap-4"
                          >
                            <Image
                              src={"/icons/icon-advanced.svg"}
                              alt={"advanced icon"}
                              className="my-auto"
                              width={40}
                              height={40}
                            />
                            <div className="flex flex-col my-auto text-left">
                              <p className="font-bold">Advanced</p>
                              <p className="text-muted-foreground">{`$${
                                billingYearly ? "120/yr" : "12/mo"
                              }`}</p>
                              {billingYearly && (
                                <p className="text-accent">2 months free</p>
                              )}
                            </div>
                          </ToggleGroupItem>
                        </FormControl>
                        <FormLabel className="sr-only">Advanced</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <ToggleGroupItem
                            value="pro"
                            className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary flex gap-4"
                          >
                            <Image
                              src={"/icons/icon-pro.svg"}
                              alt={"pro icon"}
                              className="my-auto"
                              width={40}
                              height={40}
                            />
                            <div className="flex flex-col my-auto text-left">
                              <p className="font-bold">Pro</p>
                              <p className="text-muted-foreground">{`$${
                                billingYearly ? "150/yr" : "15/mo"
                              }`}</p>
                              {billingYearly && (
                                <p className="text-accent">2 months free</p>
                              )}
                            </div>
                          </ToggleGroupItem>
                        </FormControl>
                        <FormLabel className="sr-only">Pro</FormLabel>
                      </FormItem>
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
                      "text-accent-foreground": !billingYearly,
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
                      "text-accent-foreground": billingYearly,
                    })}
                  >
                    Yearly
                  </FormLabel>
                </FormItem>
              )}
            />
            <div className="fixed bottom-0 right-0 left-0 bg-primary w-full justify-between p-4 flex md:relative md:mt-auto">
              <Button
                onClick={previousStep}
                variant={"link"}
                className="text-muted"
                disabled={form.formState.errors.plan ? true : false}
              >
                Go Back
              </Button>
              <Button type="submit" variant={"secondary"}>
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
