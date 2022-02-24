import React from "react";
import { useFormikContext } from "formik";
import { FormHelperText, TextField } from "@mui/material";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

type IFormikDateTime = {
  name: string;
  label: string;
  value?: Date | null;
  onChange?: (newVal: any) => void;
  onChangePost?: (newVal: any) => void;
  pickerProps?: Partial<DatePickerProps<any>>;
};

export default function FormikDateTime({
  name,
  label,
  value,
  onChange,
  onChangePost,
  pickerProps,
  ...others
}: IFormikDateTime) {
  const { setFieldValue, setFieldTouched, touched, errors, values } =
    useFormikContext<any>();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={value !== undefined ? value : values[name]}
          onChange={(newValue) => {
            if (onChange) return onChange(newValue);
            setFieldValue(name, newValue);
            if (onChangePost) onChangePost(newValue);
          }}
          {...pickerProps}
          renderInput={(params) => (
            <TextField
              {...params}
              onBlur={() => {
                setFieldTouched(name, true);
              }}
              name={name}
              error={Boolean(touched[name] && errors[name])}
            />
          )}
        />
      </LocalizationProvider>
      {Boolean(touched[name] && errors[name]) && (
        <FormHelperText error style={{ marginLeft: 16 }}>
          {touched[name] && errors[name]}
        </FormHelperText>
      )}
    </>
  );
}
