/* eslint-disable @typescript-eslint/ban-types */

/**
 * Recursive query-string serializable object
 * @see Kudos to this person: https://stackoverflow.com/a/57859435
 */
export type FlayyerSerializable<T> = T extends string | number | boolean | Date
  ? string | undefined
  : T extends null | undefined
  ? T
  : T extends Function
  ? never
  : T extends object
  ? { [K in keyof T]: FlayyerSerializable<T[K]> }
  : string | undefined;

export type TemplateProps<T = { [key: string]: string }> = {
  /**
   * Provided variables parsed from the query-string of the smart Flayyer URL.
   * This object has been decoded and parsed, but keep in mind that every variable is a `string`, `object` or an `array`.
   * If you expect a number please convert the value from string to number. Eg: `Number(variable.count)`
   * @example
   * function Template({ variables }: TemplateProps) {}
   * @example
   * function Template({ variables }: TemplateProps<{ title: string, count: string }>) {
   *   const count = Number(variables.count); // Always parse string to number
   *   return (<Content>{variables.title} - {count}</Content>);
   * }
   */
  variables: {
    // Taken from `Partial<K>` source code
    [P in keyof T]: FlayyerSerializable<T[P]> | undefined;
  };
};
