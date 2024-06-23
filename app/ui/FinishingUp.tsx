import { Button } from "@/components/ui/button";
import { calculator } from "@/lib/calculator";
import { Separator } from "@radix-ui/react-separator";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { z } from "zod";
import { StepIndicator } from "./components/StepIndicator";

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

export const FinishingUp = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();
  const { nextStep, previousStep, goToStep } = useWizard();

  const { billingYearly, plan, addons } = form.getValues();

  const { planFull, planPrice, fullPrice, addonsArray } = calculator(
    addons,
    plan,
    billingYearly
  );

  return (
    <div className="md:flex">
      <StepIndicator />
      <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px]">
        <h1 className="font-bold text-xl">Finishing Up</h1>
        <p>Double-check everything looks OK before confirming</p>
        <div className="p-4 my-4 w-full flex flex-col bg-background text-foreground rounded">
          <div className="flex w-full">
            <div className="flex flex-col basis-4/5 text-left">
              <p className="font-bold text-accent-foreground">{planFull}</p>
              <Button
                variant={"link"}
                className="w-auto h-auto p-0 justify-start"
                onClick={() => goToStep(1)}
              >
                Change
              </Button>
            </div>
            <p className="flex basis-1/5 my-auto text-center font-bold text-accent-foreground">
              {planPrice}
            </p>
          </div>
          {addonsArray.length ? (
            <>
              <Separator className="my-2 border-muted border" />
              {addonsArray.map((addonInfo, index) => (
                <div className="flex w-full my-2" key={index}>
                  <p className="flex basis-4/5 text-left text-muted-foreground">
                    {addonInfo.cleanName}
                  </p>
                  <p className="flex basis-1/5 text-center text-accent-foreground">
                    {addonInfo.price}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="px-4 my-4 w-full flex rounded">
          <p className="basis-4/5 text-left">{`Total ${
            billingYearly ? "(Yearly)" : "(Monthly)"
          }`}</p>
          <p className="font-bold text-accent">{fullPrice}</p>
        </div>
        <div className="fixed bottom-0 right-0 left-0 bg-primary w-full justify-between p-4 flex md:relative md:mt-auto">
          <Button
            onClick={previousStep}
            variant={"link"}
            className="text-muted"
          >
            Go Back
          </Button>
          <Button onClick={() => nextStep()} variant={"secondary"}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
