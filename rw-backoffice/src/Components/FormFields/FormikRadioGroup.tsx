import React from "react";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

type IFormikTextField = {
  name: string;
  options: any[];
  label: string;
  valueKey: string;
  labelKey: string;
  disabled?: boolean;
};

export default function FormikRadioGroup({
  name,
  options,
  labelKey,
  valueKey,
  label,
  disabled,
  ...others
}: IFormikTextField) {
  const { setFieldTouched, setFieldValue, values, touched, errors } =
    useFormikContext<any>();
  return (
    <FormControl
      component="div"
      onBlur={() => {
        setFieldTouched(name, true);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "start",
        alignContent: "center",
        height: "100%",
        flexWrap: "wrap",
      }}
    >
      <FormLabel component="legend" style={{ paddingRight: 8 }}>
        {label}{" "}
      </FormLabel>
      <RadioGroup aria-label={name} name={name} value={values[name]}>
        <div style={{ display: "flex" }}>
          {Array.isArray(options) &&
            options.map((item) => {
              return (
                <FormControlLabel
                  key={item[valueKey]}
                  value={item[valueKey]}
                  control={
                    <Radio
                      onChange={(e) => {
                        setFieldValue(name, e.target.value);
                      }}
                    />
                  }
                  label={item[labelKey]}
                  disabled={disabled}
                />
              );
            })}
        </div>
      </RadioGroup>
      <div>
        {touched[name] && errors[name] && (
          <Typography color="error" variant="caption">
            {errors[name]}
          </Typography>
        )}
      </div>
    </FormControl>
  );
}
