import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { StepIndicator, StepButtons, FormWrapper } from "./components";

export const PersonalInfoForm = () => {
  const form = useFormContext();
  const { nextStep } = useWizard();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <>
      <StepIndicator />
      <FormWrapper
        title="Personal Information"
        description={
          "Please provide your name, email address, and phone number."
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4 h-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-secondary-foreground"
                      placeholder="e.g. Sthephen King"
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="text-secondary-foreground"
                      placeholder="e.g. sthephenking@lorem.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. +1 234 567 890"
                      className="text-secondary-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
