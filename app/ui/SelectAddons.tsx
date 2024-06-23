import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { FormWrapper, StepButtons, StepIndicator } from "./components";

const items = [
  {
    id: "online-service",
    label: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "larger-storage",
    label: "Larger Storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "customizable-profile",
    label: "Customizable Profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

export const SelectAddons = () => {
  const form = useFormContext();
  const { nextStep } = useWizard();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <>
      <StepIndicator />
      <FormWrapper
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4 h-full"
          >
            <FormField
              control={form.control}
              name="addons"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="addons"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className={clsx(
                            "flex flex-row items-start space-x-3 border p-4 rounded space-y-0",
                            {
                              "border-accent":
                                field.value?.includes(item.id) === true,
                            }
                          )}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex w-full gap-1">
                            <div className="flex flex-col basis-4/5 gap-2">
                              <p className="font-bold text-accent">
                                {item.label}
                              </p>
                              <p>{item.description}</p>
                            </div>
                            <p className="basis-1/5 self-center text-center">{`+$${
                              form.getValues().billingYearly === false
                                ? item.monthlyPrice + "/mo"
                                : item.yearlyPrice + "/yr"
                            }`}</p>
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
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
