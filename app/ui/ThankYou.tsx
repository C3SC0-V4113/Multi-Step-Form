import Image from "next/image";
import { AnimatedDiv, FormWrapper, StepIndicator } from "./components";

export const ThankYou = () => {
  return (
    <>
      <StepIndicator />
      <FormWrapper>
        <AnimatedDiv>
          <div className="flex flex-col justify-center items-center gap-3 py-10 px-6">
            <Image
              src={"/icons/icon-thank-you.svg"}
              alt="Thank You Check"
              width={60}
              height={60}
            />
            <h1 className="font-bold text-2xl text-primary-foreground">
              Thank you!
            </h1>
            <p className="text-center">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </AnimatedDiv>
      </FormWrapper>
    </>
  );
};
