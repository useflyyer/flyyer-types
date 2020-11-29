# @flayyer/flayyer-types

Flayyer type definition for Typescript templates created with [create-flayyer-app](https://github.com/flayyer/create-flayyer-app/).

**Want to learn more about smart image previews? Visit as at [flayyer.com](https://flayyer.com?ref=flayyer-types)**

## Install

```sh
npm install --save-dev @flayyer/flayyer-types

yarn add --dev @flayyer/flayyer-types
```

## Usage

The provided `TemplateProps<T>` accepts a generic object type for the possible variables passed to the template. Keep in mind not every variable is guaranteed to be present, this is the reason why every variable will be marked as _possibly undefined_.

```tsx
export default function SimpleTemplate({ variables }: TemplateProps) {
  const title = variables.title; // type is `string | undefined`;
  return (
    <div>
      {title && <h1>{title}</h1>}
    </div>
  );
}
```

Since URL serialization converts `Date` and `number` to strings, every field type will be typed as `string | undefined`. Objects and arrays will be also typed using a recursive strategy.

```tsx
import React from "react";
import { TemplateProps } from "@flayyer/flayyer-types";

// Example:
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

  return (
    <div>
      {title && <h1>{title}</h1>}
    </div>
  );
}

```
