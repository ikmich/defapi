## Installation

```shell
# Install global cli
## (with npm)
npm install -g defapi
## (or with yarn)
yarn global add defapi

# Install project dependency
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

Run this to create the defapi config file and the defapi working dirs. `defapi-config.js` will be generated in the
project root.

### 2. Configure your express app to use defapi router and middleware

```javascript
const app = express();

/*
 * Use defapiBootstrap middleware.
 * This is important to allow processing of static resources for rendering the
 * built-in html client. */
app.use(defapiBootstrap);

/*
 * Use defapiRouter.
 * This sets up defapi specific routes for using defapi's features in your api
 */
app.use(defapiRouter);

/*
 * In place of the above command, you can simply register the app using defapiRegister().
 */
defapiRegister(app);

/*
 * Ideally `defapiRegister(app)` should be all that's needed. But depending on your express framework, and also on the
 * way the project is already setup currently, you may need to try out what setup process works.
 */
```

### 3. Test that the setup is working

Start your server and call this endpoint below. If it returns a success response, the setup is working fine.

```
GET http(s)://{PROJECT_API_BASE_PATH}/defapi/endpoints
```

## Generate endpoint definitions

The core of **defapi**'s operation is based on the generated json files that represent definitions of your endpoints.
You can generate endpoint defs in the following ways:

- If you have set `api.baseUri` in `defapi-config.js`, you can run `defapi generate` from the terminal to generate defs
  of all the endpoints in your api. If `api.baseUri` is not configured in `defapi-config.js`, this cli command will
  fail.
- Calling `POST {BASE_API_PATH}/defapi/defs/generate` will generate the endpoint def json files without needing to read
  the baseUri from the defapi config file.
- Generated endpoint def files are stored in `__defapi/` under the src root.
- You can edit the endpoint def files to provide documentation about your endpoints.

## Defining endpoints using Typescript decorators

In addition to the endpoint def json files, endpoints can also be defined using defapi decorators inside your controller
classes. See example below:

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

Defapi provides a built-in web front-end that presents your api definitions in a user-friendly UI. It comes with a
search/filter feature which is extremely handy to quickly find or get insight into the APIs on the platform or to get
info about specific APIs for which some work needs to be done.

To view your API information, visit this url in your browser:

```
{API_BASE_URL}/defapi/view/html
```

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
  };
  project: {
    srcPath?: string;
  };
  defapi: {
    routePrefix?: string;
  };
}

/**
 * Structure for the API definition.
 */
interface ApiManifest {
  baseUri: string;
  title: string;
  headers?: Objectx;
  authenticationHeaders?: Objectx;
  endpoints: EndpointDef[];
}
```

## Defapi-defined routes

- `GET {API_BASE_PATH}/endpoints` - Get list of endpoints
- `GET {API_BASE_PATH}/view/html` - View html web front-end
- `POST {API_BASE_PATH}/defs/generate` - Generate endpoint defs
- `GET {API_BASE_PATH}/defs/json` - Get/view endpoint defs json document
- `GET {API_BASE_PATH}/manifest` - Get API manifest json document
