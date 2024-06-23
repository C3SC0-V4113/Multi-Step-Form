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
    <div className="flex flex-col md:ml-3 md:h-[680px] md:w-[320px] justify-center">
      {title && <h1 className="font-bold text-2xl mt-4">{title}</h1>}

      {description && <p>{description}</p>}

      {children}
    </div>
  );
};
