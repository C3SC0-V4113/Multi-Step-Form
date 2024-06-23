export const FormWrapper = ({
  children,
  title,
  description,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  description?: string;
}>) => {
  return (
    <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px] lg:w-[620px] justify-center lg:p-8 xl:w-[880px] xl:p-12 xl:gap-4 2xl:w-[1080px]">
      {title && <h1 className="font-bold text-2xl mt-4">{title}</h1>}

      {description && <p>{description}</p>}

      {children}
    </div>
  );
};
