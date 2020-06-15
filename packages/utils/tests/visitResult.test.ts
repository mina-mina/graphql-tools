import { buildSchema, parse } from 'graphql';
import { visitResult } from '../src/visitResult';
import { Request, ExecutionResult } from '../src/Interfaces';

describe('visitData', () => {
  it('should visit', async () => {
    const schema = buildSchema(`
      interface TestInterface {
        field: String
      }
      type Test {
        field: String
      }
      type Query {
        test: TestInterface
      }
    `);

    const query = '{ test { field } }';

    const document = parse(query);

    const request: Request = {
      document,
      variables: {},
    };

    const result: ExecutionResult = {
      data: {
        test: {
          __typename: 'Test',
          field: 'test',
        },
      },
    };

    expect(() => visitResult(result, request, schema)).not.toThrow();
  });
});
