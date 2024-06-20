import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

export const SelectPlanForm = () => {
  const form = useFormContext();
  const { nextStep, previousStep } = useWizard();

  const onSubmit = () => {
    console.log(form.getValues());
    nextStep();
  };

  useEffect(() => {
    console.log(form.getValues().billingYearly);
    console.log(form.getValues().plan);
  }, [form]);

  return (
    <>
      <h1 className="font-bold text-xl">Personal Information</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
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
                          className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary"
                          value="arcade"
                        >
                          Arcade
                        </ToggleGroupItem>
                      </FormControl>
                      <FormLabel className="sr-only">Arcade</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <ToggleGroupItem
                          value="advanced"
                          className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary"
                        >
                          Advanced
                        </ToggleGroupItem>
                      </FormControl>
                      <FormLabel className="sr-only">Advanced</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <ToggleGroupItem
                          value="pro"
                          className="p-4 w-full border border-muted-foreground rounded data-[state=on]:border-secondary"
                        >
                          Pro
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">Monthly</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-base">Yearly</FormLabel>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button onClick={previousStep}>Go Back</Button>
            <Button type="submit">Next Step</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
