# client

* On a high-level consists of a typical TypeScript with React/Redux setup 



## Structure

* /app/src/constants.ts

  * primarily configures the baseURL where the server API should be reachable 

* /app/src/store.ts

  * contains central Redux store depending on reducers within /app/src/features 

* /app/src/Routes.tsx

  * uses react-router for typical url-based routing 
  * uses hash router to allow user to navigate to specific url in single-page application

* /app/src/pages

  * high-level components used in Routes.tsx that are composed of components

* /app/src/components	

  * individual components, recursively composed of sub-components and state and logic (ie services), serve to be used in pages 

  * only in rare cases, if at all, would a component be used directly in Routes.tsx 

* /app/src/features
  * primarily consists of reducers and their associated setup for user with store.ts
* /app/src/services
  * primarily serves as a convenient wrapper / abstraction providing a predictable promise resolve/error interface around many reducer-related actions and dispatches 



## Development

* Read through & complete tutorials of TypeScript, React, Redux 
* This can be deployed stand-alone and that is recommended, but its functionality will be severely limited without a working API base URL configured in constants 
* It can be run locally by going to app and running 'yarn install' followed by 'yarn start'
* There is a running deployment on Netlify that is not guaranteed to be up-to-date as it takes too many resources to rebuild on every commit 
  * https://quantx-algo.netlify.app/ (quantx taken)
