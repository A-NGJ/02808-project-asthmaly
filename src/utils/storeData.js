import * as React from "react";

export function storeData(buttonType) {
  const timestamp = new Date();

  switch (buttonType) {

    case "symptom":
      // store user timestamp in firebase under document with symptom logs
      break;

    case "medication":
      // store timestamp in firebase under document with medication logs
      break;

    case "activity":
      // store timestamp in firebase under document with activity logs
      break;

    default:
      console.error("Button type not found");

  }
}
