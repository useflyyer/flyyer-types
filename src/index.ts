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
   * Probably the viewer's locale but can depend on many factors such as proxies or web browsers.
   * Take this value with a grain of salt.
   * If no lang was present the value by default is `undefined` which is safe for native `Intl` modules.
   */
  lang?: string;

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

export type UserAgentSize = [number, number];

export const Sizes = {
  /**
   * Smallest size, usually for WhatsApp.
   */
  THUMBNAIL: [400, 400] as UserAgentSize,
  /**
   * Most common size for og:image and twitter:image, this is the most universal of all.
   */
  BANNER: [1200, 630] as UserAgentSize,
  /**
   * For sites such as Pinterest.
   */
  VERTICAL: [800, 1200] as UserAgentSize,
  /**
   * To export to Instagram post format.
   */
  SQUARE: [1080, 1080] as UserAgentSize,
  /**
   * To export to story format in platforms such as Instagram, Facebook and Twitter.
   */
  STORY: [1080, 1920] as UserAgentSize,
};
