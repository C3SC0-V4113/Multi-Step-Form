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

export const PersonalInfoForm = () => {
  const form = useFormContext();
  const { nextStep } = useWizard();

  const onSubmit = () => {
    console.log(form.getValues());
    form.handleSubmit(form.getValues);
  };

  return (
    <>
      <h1 className="font-bold text-xl">Personal Information</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <Form {...form}>
        <form className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Sthephen King" {...field} />
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
                  <Input placeholder="e.g. +1 234 567 890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button onClick={() => onSubmit()}>Next Step</Button>
      </Form>
    </>
  );
};
