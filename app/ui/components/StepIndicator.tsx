import clsx from "clsx";
import React from "react";
import { useWizard } from "react-use-wizard";

export const StepIndicator = () => {
  const { activeStep } = useWizard();

  return (
    <div className="flex fixed top-10 right-0 left-0 w-full justify-center gap-4">
      <div
        className={clsx(
          "border rounded-full w-10 h-10 p-4 text-center flex justify-center items-center",
          { "bg-background text-foreground": activeStep + 1 === 1 }
        )}
      >
        1
      </div>
      <div
        className={clsx(
          "border rounded-full w-10 h-10 p-4 text-center flex justify-center items-center",
          { "bg-background text-foreground": activeStep + 1 === 2 }
        )}
      >
        2
      </div>
      <div
        className={clsx(
          "border rounded-full w-10 h-10 p-4 text-center flex justify-center items-center",
          { "bg-background text-foreground": activeStep + 1 === 3 }
        )}
      >
        3
      </div>
      <div
        className={clsx(
          "border rounded-full w-10 h-10 p-4 text-center flex justify-center items-center",
          {
            "bg-background text-foreground":
              activeStep + 1 === 4 || activeStep === 4,
          }
        )}
      >
        4
      </div>
    </div>
  );
};
