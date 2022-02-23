import { Alert } from "@mui/material";
import React from "react";
import utils from "../Services/Utils";

interface IErrorPlaceHolder {
  ex?: any;
  message?: string;
}

export default function ErrorPlaceHolder(props: IErrorPlaceHolder) {
  let objEx = props.ex;
  if (!props.ex && props.message) objEx = new Error(props.message);
  if (!objEx) objEx = new Error("Unexpected Error.");
  const errorString = utils.prepareErrorMessage(objEx);
  // console.log(errorString, errorString);
  return (
    <div style={{ maxWidth: "90vw", overflow: "auto", wordBreak: "break-all", margin: 'auto' }}>
      {objEx && <Alert severity="error">{errorString}</Alert>}
    </div>
  );
}
