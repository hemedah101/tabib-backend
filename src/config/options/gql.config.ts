import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GqlModuleConfig implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST'],
      },
      playground: {
        workspaceName: 'Admin Gateway',
        settings: {
          'request.credentials': 'same-origin',
          'editor.fontSize': 20,
        },
      },
      debug: true,
      // path: 'graph',
    };
  }
}
