import React from "react";
import { storiesOf } from "@storybook/react";
import {ErgoDappConnector} from "../components/Requirements";

const stories = storiesOf("App test", module);

stories.add("App test", () => {
  return (

  <ErgoDappConnector color={"orange"}/>);

});
