import { TemplateProps } from "../src";

describe("TemplateProps", () => {
  it("makes every variable 'optional'", () => {
    type Variables = { title: string };
    function generator(): TemplateProps<Variables> {
      const variables = { title: "foo" };
      return { variables, agent: {} } as any;
    }
    const props = generator();

    // TODO: assert typescript types

    // Should fail
    // expect(props.variables.title.toUpperCase()).toBeTruthy();

    // Should pass
    expect(props.variables.title && props.variables.title.toUpperCase()).toBeTruthy();
  });
});
