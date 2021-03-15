/* eslint-disable @typescript-eslint/ban-types */

/**
 * Recursive query-string serializable object
 * @see Kudos to this person: https://stackoverflow.com/a/57859435
 */
export type FlayyerSerializable<V> = V extends string | number | boolean | Date
  ? string | undefined
  : V extends null | undefined
  ? V
  : V extends Function
  ? never
  : V extends object
  ? { [K in keyof V]: FlayyerSerializable<V[K]> }
  : string | undefined;

/**
 * Some popular user-agents but not limited to this list.
 * Future agents will be added over time.
 */
export enum FlayyerAgentName {
  FACEBOOK = "facebook",
  MESSENGER = "messenger",
  WHATSAPP = "whatsapp",
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
  PINTEREST = "pinterest",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  BING = "bing",
  REDDIT = "reddit",
  GOOGLE = "google",
  GOOGLE_ADS = "google ads",
  AMAZON_ALEXA = "amazon alexa",
  AMAZON = "amazon",
  YANDEX = "yandex",
  YAHOO = "yahoo",
  HUBSPOT = "hubspot",
  MSN = "msn",
  ZOOM = "zoom",
  SLACK = "slack",
  DISCORD = "discord",
  SAFARI = "safari",
  FLIPBOARD = "flipboard",
  APPLE = "apple",
  DUCKDUCKGO = "duckduckgo",
  DISQUS = "disqus",
}

export type FlayyerAgent = {
  name?: FlayyerAgentName | string;
};

export type TemplateProps<Variables = { [key: string]: string }> = {
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
    [P in keyof Variables]: FlayyerSerializable<Variables[P]> | undefined;
  };

  /**
   * Represents the crawler of the site where a link was posted.
   * @example
   * function Template({ agent, variables }: TemplateProps) {
   *   if (agent.name === "whatsapp") {
   *     // Rendered as squared template
   *   }
   * }
   */
  agent: FlayyerAgent;

  /**
   * Viewport and image width dimension in pixels.
   */
  width: number;
  /**
   * Viewport and image width dimension in pixels.
   */
  height: number;

  /**
   * User-provided ID to identify the template on future analytic reports
   */
  id?: string;
  /**
   * User-provided tags to identify the template on future analytic reports
   */
  tags?: string[];
};
