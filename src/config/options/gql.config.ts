import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

const whitelist = [
  '/example.com$/',
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:80',
  'http://localhost:8080',
];

@Injectable()
export class GqlModuleConfig implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      autoSchemaFile: true, // TODO disable playground in production
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: whitelist,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST'],
      },
      playground: {
        workspaceName: 'Admin Gateway',
        settings: {
          'request.credentials': 'same-origin',
          'editor.fontSize': 20,
          'editor.fontFamily': "'Ubuntu Mono'",
        },
      },
      debug: true,
      // path: 'graph',
    };
  }
}
