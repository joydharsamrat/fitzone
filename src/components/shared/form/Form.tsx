import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TDefaultProductValues } from "../../../interface";

const Form = ({
  onSubmit,
  defaultValues,
  children,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues: TDefaultProductValues;
  children: ReactNode;
}) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
