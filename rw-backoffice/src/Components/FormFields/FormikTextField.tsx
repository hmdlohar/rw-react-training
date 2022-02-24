import React from "react";
import { useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

export const isRequiredField = (validationSchema: any, name: any) => {
  try {
    let field = validationSchema.describe().fields[name];
    return field.tests.find((item: any) => item.name === "required");
    // return !!getIn(validationSchema.describe().fields, name).tests.find(
    //   (testName: any) => testName === "required"
    // );
  } catch (ex) {
    return false;
  }
};

export const getFormikLabel = (
  label: any,
  initialValues: any = {},
  name: string,
  showRequired?: boolean
) => {
  if (showRequired || isRequiredField(initialValues.__vs, name)) {
    return (
      <>
        {label} <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
      </>
    );
  }
  return label;
};

type IFormikTextField = TextFieldProps & {
  name: string;
  showRequired?: boolean;
};

export default function FormikTextField({
  name,
  showRequired,
  ...others
}: IFormikTextField) {
  const { getFieldProps, touched, errors, initialValues } =
    useFormikContext<any>();
  let label = getFormikLabel(others.label, initialValues, name, showRequired);

  return (
    <TextField
      {...getFieldProps(name)}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      {...others}
      label={label}
    />
  );
}
