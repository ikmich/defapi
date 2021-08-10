## Installation

```shell
## (with npm)
npm install defapi --save

## (or with yarn)
yarn add defapi
```

## Setup/Initialization

### 1. Initialize

```shell
defapi init
```

The following files/dirs will be created:

```
/defapi-config.js
/__defapi/
  |-- current/
      |-- defs/
```

### 2. Configure your express app to use defapi router and middleware

```javascript
const app = express();

/*
 * Use defapiRouter.
 * This provides defapi routes functionality to your api
 */
app.use(defapiRouter);

/*
 * In place of using defapiRouter, you can use the convenient defapiRegister() function, passing your app instance as 
 * the argument.
 */
defapiRegister(app);

/*
 * Ideally `defapiRegister(app)` should be all that's needed. But depending on your express framework, and also on the
 * way the project is setup, either method may work for you.
 */
```

### 3. Test that the setup is working

Start your server and call the defapi `status` endpoint (or any defapi endpoint). A success response means the setup
should be fine.

```
GET http(s)://{PROJECT_API_BASE_PATH}/defapi/status
```

## Generating endpoint definitions

The core of **defapi**'s operation is based on the generated json files that represent definitions of your endpoints.
You can generate endpoint defs in the following ways:

- If you have set `api.baseUri` in `defapi-config.js`, you can run `defapi generate` from the terminal to generate json
  files for of all the endpoints in your api. If `api.baseUri` is not configured in `defapi-config.js`, this cli command
  will fail.
- Calling `POST {BASE_API_PATH}/defapi/defs` will generate the endpoint json files without needing to read the baseUri
  from the defapi config file.
- The generated endpoint def files are stored in `__defapi/` under the project root.
- You can edit the endpoint json files to define your endpoints.

## Defining endpoints using Typescript decorators

In addition to the endpoint definition json files, endpoints can also be defined using decorators inside your controller
classes as shown in the example below:

```typescript
import { defEndpoint, defQuery } from './index';

export class Controller {
  @defEndpoint('post', '/foo-api/users/login', {
    queryParams: {
      role: {
        type: 'string',
        description: 'The specified role to log in as, for extra validation',
        options: ['admin', 'manager', 'officer']
      }
    },
    bodyParams: {
      email: 'string',
      password: 'string'
    }
  })
  async login(req: Request, res: Response) {
    // ... handle logic
  }

  @defEndpoint('get', '/foo-api/users', {
    title: 'Get Users',
    description: 'Get paginated list of users on the platform'
  })
  async getUsers(
    req: Request,
    res: Response,
    @defQuery('status') status: string,
    @defQuery('page') page: number,
    @defQuery size: number
  ) {
    // ... handle logic
  }

  @defEndpoint('post', '/foo-api/users', {
    title: 'Create User (User signup/register)',
    bodyParams: {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      phone: 'string',
      password: 'string'
    }
  })
  async createUsers(req: Request, res: Request) {
    // ... handle logic
  }
}
```

With the decorators used as above, generating the endpoint def files will give priority to the data provided in the
defapi decorators, and merge data with those in the existing generated endpoint def json files.

## View API definitions in the browser

Install defapi-client and follow the instructions to view your endpoint definitions in the browser.

## Defapi-defined routes

- `GET {API_BASE_PATH}/defapi/endpoints` - Get list of endpoints
- `POST {API_BASE_PATH}/defapi/defs` - Generate endpoint defs
- `GET {API_BASE_PATH}/defapi/defs/json` - Get endpoint defs json document
- `GET {API_BASE_PATH}/defapi/manifest` - Get API manifest json document
- `POST {API_BASE_PATH}/defapi/manifest` - Generate API manifest json document
-

## Core types and interfaces

```typescript
/**
 * Structure for an endpoint definition json.
 */
interface EndpointDef {
  path: string;
  method: string;
  title?: Stringx;
  description?: Stringx;
  contentType?: Stringx;
  queryParams?: TQueryParamsDef;
  bodyParams?: TBodyParamsDef;
  headers?: Objectx;
  response?: ResponseDef;
  deprecated?: boolean;
}

type Objectx = object | null | undefined;

type Stringx = string | null | undefined;

type Arrayx<T> = Array<T> | null | undefined;

type CompositeTypeDef = {
  type?: string;
  description?: string;
  defaultValue?: any;
  options?: any[];
};

type TypeDef = CompositeTypeDef | Stringx;

type TQueryParamsDef = {
  [k: string]: TypeDef;
};

type TBodyParamsDef = {
  [k: string]: TypeDef;
};

type TResponseBodyDef = { [k: string]: TResponseBody } | TResponseBody | null;

type TResponseBody = {
  [k: string]: TypeDef;
} | null;

type ResponseDef = {
  type?: Stringx;
  body?: TResponseBodyDef;
  headers?: Objectx;
  [k: string]: any;
};

/**
 * Structure for the defapi-config.js file
 */
interface DefapiConfig {
  api: {
    baseUri?: string;
    title?: string;
    headers?: Objectx;
    authenticationHeaders?: Objectx;
    rootPath?: string;
  }
}

/**
 * Structure for the API manifest.
 */
interface ApiManifest {
  baseUri: string;
  title: string;
  headers?: Objectx;
  authenticationHeaders?: Objectx;
  endpoints: EndpointDef[];
}
```
