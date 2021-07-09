# @flyyer/types

![npm-version](https://badgen.net/npm/v/@flyyer/types)
![downloads](https://badgen.net/npm/dt/@flyyer/types)
![size](https://badgen.net/bundlephobia/minzip/@flyyer/types)
![tree-shake](https://badgen.net/bundlephobia/tree-shaking/@flyyer/types)

Flyyer type definition for Typescript templates created with [create-flyyer-app](https://github.com/useflyyer/create-flyyer-app/).

**👉 Want to learn more about rendering images? Visit us at [flyyer.io](https://flyyer.io?ref=flyyer-types)**

**📖 Checkout our official documentation: [docs.flyyer.io](https://docs.flyyer.io/docs/advanced/typescript?ref=flyyer-types)**

## Install

```sh
npm install --save-dev @flyyer/types

yarn add --dev @flyyer/types
```

## Usage

The provided `TemplateProps<T>` accepts a generic object type for the possible variables passed to the template. Keep in mind not every variable is guaranteed to be present, this is the reason why every variable will be marked as _possibly undefined_.

```tsx
import React from "react";
import { TemplateProps } from "@flyyer/types";

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
import { TemplateProps } from "@flyyer/types";
import { Variable as V, Static } from "@flayyer/variables";

// Example:
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

export default function Template({ variables }: TemplateProps<Variables>) {
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

### Platform information

Sometimes we can identify which platform your link are being shared on. You can get this information via the `agent` prop.

```tsx
import React from "react";
import { TemplateProps, FlyyerAgentName } from "@flyyer/types";

export default function MainTemplate({ agent }: TemplateProps) {
  if (agent.name === FlyyerAgentName.WHATSAPP) {
    // Custom rules for squared template
    return ...
  } else {
    // Default 1200x630 banner.
    return ...
  }
}
```

Handle multiple locales (languages) by reading the `locale` prop. You can use some lightweight libraries to process locale internationalization (i18n) just like: [lukeed/rosetta](https://github.com/lukeed/rosetta) and [airbnb/polyglot.js](https://github.com/airbnb/polyglot.js).

```tsx
export default function MainTemplate({ locale }: TemplateProps) {
  if (!locale) {
    // no locale info was provided
  } else if (locale === "en") {
    // ...
  } else if (locale === "es-CO") {
    // ...
  }

  // Native Intl module is supported ✅
  const formatter = new Intl.DateTimeFormat(locale);
  const humanized = formatter.format(new Date());
}
```

> NOTE: Sometimes web proxies used by crawlers ignores user's actual locale.

## Import assets

Remove Typescript warning when importing files such as images, fonts, style files, etc.
Use the following code in a `types.d.ts` file in the root fo your Flyyer project.

```ts
// types.d.ts

/// <reference types="@flyyer/types/global" />
```

## Experimental Javascript support

You can help your IDE with typing information. Here is an working but experimental example in Visual Studio Code:

```js
import { TemplateProps } from "@flyyer/types"; // eslint-disable-line no-unused-vars

/**
 * Make sure to default export a React component
 * @param {TemplateProps} [props] - Flyyer props.
 */
export default function JavascriptTemplate({ variables }) {
  const title = variables.title; // IDE will suggest `title` has type `string | undefined`
  // ...
}
```

## Validate Flyyer Config

This is optional but will help your IDE with IntelliSense to autocomplete and hint you.

```js
// flyyer.config.js
const { config } = require("@flyyer/types");
require("dotenv").config();

module.exports = config({
  engine: "react",
  key: process.env.FLYYER_KEY,
  deck: "my-deck",

  // Optionals
  name: "My Deck",
  description: "Lorem ipsum with **markdown**"
  private: false, // Make deck public on https://flyyer.io/community when `false`.
  license: "MIT",
  keywords: ["keyword"],
  sizes: ["THUMBNAIL", "BANNER", "SQUARE", "STORY"], // supported sizes
  repository: "https://github.com/useflyyer/repository", // show source on https://flyyer.io/community
});
```
