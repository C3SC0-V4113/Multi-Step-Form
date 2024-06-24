import { Button } from "@/components/ui/button";
import { calculator } from "@/lib/calculator";
import { Separator } from "@radix-ui/react-separator";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { z } from "zod";
import {
  AnimatedDiv,
  FormWrapper,
  StepButtons,
  StepIndicator,
} from "./components";

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
  const { goToStep } = useWizard();

  const { billingYearly, plan, addons } = form.getValues();

  const { planFull, planPrice, fullPrice, addonsArray } = calculator(
    addons,
    plan,
    billingYearly
  );

  return (
    <>
      <StepIndicator />
      <FormWrapper
        title="Finishing Up"
        description="Double-check everything looks OK before confirming"
      >
        <AnimatedDiv>
          <div className="p-4 mt-4 w-full flex flex-col bg-background text-foreground rounded">
            <div className="flex w-full">
              <div className="flex flex-col basis-4/5 text-left">
                <p className="font-bold text-accent">{planFull}</p>
                <Button
                  variant={"link"}
                  className="w-auto h-auto p-0 justify-start text-muted-foreground"
                  onClick={() => goToStep(1)}
                >
                  Change
                </Button>
              </div>
              <p className="flex basis-1/5 my-auto text-center font-bold text-accent">
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
                    <p className="flex basis-1/5 text-center text-accent">
                      {addonInfo.price}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="px-4 w-full mb-4 flex rounded">
            <p className="basis-4/5 text-left">{`Total ${
              billingYearly ? "(Yearly)" : "(Monthly)"
            }`}</p>
            <p className="font-bold text-border">{fullPrice}</p>
          </div>
        </AnimatedDiv>
        <StepButtons />
      </FormWrapper>
    </>
  );
};
