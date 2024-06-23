import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

export const StepButtons = () => {
  const { nextStep, previousStep, isFirstStep, activeStep } = useWizard();
  const form = useFormContext();

  if (isFirstStep) {
    return (
      <div className="bottom-0 right-0 left-0 fixed bg-primary w-full justify-end p-4 flex md:relative md:mt-auto">
        <Button type="submit" variant={"secondary"}>
          Next Step
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-primary w-full justify-between p-4 flex md:relative md:mt-auto">
      <Button
        onClick={previousStep}
        disabled={form.formState.errors.plan ? true : false}
        variant={"link"}
        className="text-muted"
      >
        Go Back
      </Button>
      {activeStep === 3 ? (
        <Button onClick={() => nextStep()} variant={"secondary"}>
          Confirm
        </Button>
      ) : (
        <Button type="submit" variant={"secondary"}>
          Next Step
        </Button>
      )}
    </div>
  );
};
