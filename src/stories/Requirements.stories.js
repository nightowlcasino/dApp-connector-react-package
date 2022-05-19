import React from "react";
import { storiesOf } from "@storybook/react";
import {Requirements} from "../components/Requirements";

const stories = storiesOf("App test", module);

stories.add("App test", () => {
  return (<Requirements color={"black"}/>);
});
