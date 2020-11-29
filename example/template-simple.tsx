import React from "react";

import { TemplateProps } from "..";

export default function SimpleTemplate({ variables }: TemplateProps) {
  const title = variables.title; // type is `string | undefined`;
  return <div>{title && <h1>{title}</h1>}</div>;
}
