import React from "react";

import { Variable as V, Static } from "@flayyer/variables";

import { TemplateProps, FlyyerAgentName } from "../src";

/**
 * Export `schema` to make variables visible on https://flyyer.io/
 */
export const schema = V.Object({
  title: V.String({ description: "Show this on https://flyyer.io" }),
  count: V.Integer({ title: "Count of items" }),
  price: V.Number({ default: 10.0 }),
  createdAt: V.Optional(V.String({ format: "date-time" })),
  object: V.Object({
    name: V.String(),
    age: V.Integer(),
  }),
  array: V.Array(V.Number(), { description: "An array of numbers" }),
});

type Variables = Static<typeof schema>;

export default function MainTemplate({ width, height, agent, variables }: TemplateProps<Variables>) {
  const {
    title, // type is `string | undefined`
    count, // type is `string | undefined`
    price = 10, // type is `string | 10` because incoming values will be string!
    createdAt, // type is `string | undefined`
    object, // type is a recursive object with `string | undefined` values
    array, // type is a recursive array with `string | undefined` values
  } = variables;

  if (agent.name === FlyyerAgentName.WHATSAPP) {
    // Custom rules for squared template
    return <div>{title && <h1>{title}</h1>}</div>;
  }

  return <div>{title && <h1>{title}</h1>}</div>;
}
