import React from "react";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { getFormikLabel } from "./FormikTextField";

type IFormikTextField = {
  name: string;
  options: any[];
  valueKey: string;
  labelKey: string;
  selectProps: SelectProps<string>;
  showRequired?: boolean;
};

export default function FormikSelectFieldMenu({
  name,
  selectProps,
  options,
  labelKey,
  valueKey,
  showRequired,
  ...others
}: IFormikTextField) {
  const { getFieldProps, touched, errors, initialValues } =
    useFormikContext<any>();
  let label = getFormikLabel(
    selectProps.label,
    initialValues,
    name,
    showRequired
  );
  return (
    <FormControl fullWidth>
      <InputLabel style={{ paddingRight: 5, background: "white" }}>
        {label}{" "}
      </InputLabel>
      <Select
        {...getFieldProps(name)}
        {...selectProps}
        error={Boolean(touched[name] && errors[name])}
      >
        {Array.isArray(options) &&
          options.map((item) => {
            return (
              <MenuItem key={item[valueKey]} value={item[valueKey]}>
                {item[labelKey]}
              </MenuItem>
            );
          })}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText error style={{ marginLeft: 16 }}>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
}
