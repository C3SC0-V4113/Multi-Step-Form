import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useWizard } from "react-use-wizard";

export const StepIndicator = () => {
  const { activeStep } = useWizard();

  return (
    <div className="flex fixed md:w-80 md:relative md:flex-col top-10 right-0 left-0 w-full justify-center md:justify-start md:top-0 md:p-8 gap-4 lg:py-12 lg:gap-6 xl:py-16">
      <Image
        className="hidden md:block"
        src="/images/bg-sidebar-desktop.svg"
        alt="sidebar desktop"
        fill={true}
      />
      <div className="flex gap-3">
        <div
          className={clsx(
            "border my-auto rounded-full z-10 w-10 h-10 p-4 text-center flex justify-center items-center",
            { "bg-background text-foreground": activeStep + 1 === 1 }
          )}
        >
          1
        </div>
        <div className="z-50 hidden md:block flex-col">
          <p className="text-muted-foreground">STEP 1</p>
          <p className="text-primary-foreground font-bold">YOUR INFO</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div
          className={clsx(
            "border my-auto rounded-full z-10 w-10 h-10 p-4 text-center flex justify-center items-center",
            { "bg-background text-foreground": activeStep + 1 === 2 }
          )}
        >
          2
        </div>
        <div className="z-50 hidden md:block flex-col">
          <p className="text-muted-foreground">STEP 2</p>
          <p className="text-primary-foreground font-bold">SELECT PLAN</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div
          className={clsx(
            "border my-auto rounded-full z-10 w-10 h-10 p-4 text-center flex justify-center items-center",
            { "bg-background text-foreground": activeStep + 1 === 3 }
          )}
        >
          3
        </div>
        <div className="z-50 hidden md:block flex-col">
          <p className="text-muted-foreground">STEP 3</p>
          <p className="text-primary-foreground font-bold">ADD-ONS</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div
          className={clsx(
            "border my-auto rounded-full z-10 w-10 h-10 p-4 text-center flex justify-center items-center",
            {
              "bg-background text-foreground":
                activeStep + 1 === 4 || activeStep === 4,
            }
          )}
        >
          4
        </div>
        <div className="z-50 hidden md:block flex-col">
          <p className="text-muted-foreground">STEP 4</p>
          <p className="text-primary-foreground font-bold">SUMMARY</p>
        </div>
      </div>
    </div>
  );
};
