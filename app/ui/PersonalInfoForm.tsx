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
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { StepIndicator } from "./components/StepIndicator";

export const PersonalInfoForm = () => {
  const form = useFormContext();
  const { nextStep } = useWizard();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="md:flex">
      <StepIndicator />
      <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px]">
        <h1 className="font-bold text-xl">Personal Information</h1>
        <p>Please provide your name, email address, and phone number.</p>
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
            <div className="bottom-0 right-0 left-0 fixed bg-primary w-full justify-end p-4 flex md:relative md:mt-auto">
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
