import clsx from "clsx";
import { Button } from "@/components/ui/button";
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
import { StepIndicator } from "./components/StepIndicator";

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

const SelectAddons = () => {
  const form = useFormContext();
  const { nextStep, previousStep } = useWizard();

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="md:flex">
      <StepIndicator />
      <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px]">
        <h1 className="font-bold text-xl">Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience</p>
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
                          <FormLabel className="font-normal flex w-full">
                            <div className="flex flex-col basis-4/5  gap-2">
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
            <div className="fixed bottom-0 right-0 left-0 bg-primary w-full justify-between p-4 flex md:relative md:mt-auto">
              <Button
                onClick={previousStep}
                variant={"link"}
                className="text-muted"
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

export default SelectAddons;
