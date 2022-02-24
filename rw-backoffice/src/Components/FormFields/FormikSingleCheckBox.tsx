import React from "react";
import { useFormikContext } from "formik";
import { FormControlLabel, FormHelperText } from "@mui/material";
import { FormControlLabelProps } from "@mui/material";

type IFormikTextField = FormControlLabelProps & {
  name: string;
  control?: any;
};

export default function FormikSingleCheckBox({ name, control, ...others }: IFormikTextField) {
  const { getFieldProps, touched, errors, setFieldValue } = useFormikContext<any>();

  const { value, onChange, ...fieldProps } = getFieldProps(name)
  return (
    <>
      <FormControlLabel
        control={control}
        {...fieldProps}
        {...others}
        checked={value}
        onChange={(e: any) => { setFieldValue(name, e.target.checked) }}
      />
      <FormHelperText error={Boolean(touched[name] && errors[name])}>{touched[name] && errors[name]}</FormHelperText>
    </>
  );
}
