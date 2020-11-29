import React from "react";

import { TemplateProps } from "..";

type Variables = {
  title: string;
  count: number;
  price: number;
  createdAt: Date;
  object: {
    name: string;
    age: number;
  };
  array: [
    {
      id: number;
    },
  ];
};

export default function MainTemplate({ variables }: TemplateProps<Variables>) {
  const {
    title, // type is `string | undefined`
    count, // type is `string | undefined`
    price = 10, // type is `string | 10` because incoming values will be string!
    createdAt, // type is `string | undefined`
    object, // type is a recursive object with `string | undefined` values
    array, // type is a recursive array with `string | undefined` values
  } = variables;

  return <div>{title && <h1>{title}</h1>}</div>;
}
