/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const Form = ({
  onSubmit,
  defaultValues,
  children,
  resolver,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues: Record<string, unknown>;
  children: ReactNode;
  resolver?: any;
}) => {
  const formConfig: Record<string, unknown> = {
    defaultValues,
    resolver,
  };

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
