This is the monorepo holding the codebase for Trendiamo.

- **backend** is a rails project, which contains the old backend - not used anymore.
- **solidus-platform** is a rails & solidus project, which contains the new backend.
- **shopify-store** is a shopify theme project, which contains the the Shopify store.
- **shopify-store/app** contains a React app that is built and included in the Shopify store.
- **web-store** is a react project, which contains the the web store (will be used in future).

More info in the `README.md` of each project.

## Plan for second half of 2018

We will keep using Shopify while we build the Personal Store Creation feature

We will keep working in parallel to put ourselves in a situation where we can replace Shopify with Solidus

From now on we will work on two fronts:

- shopify-store
- web-store

But we will not be implementing stuff twice. We'll reuse code between projects (not copy-paste either!)

For the backend portion of the Shopify store, we'll use solidus-platform already

For the frontend portion of the Shopify store, we'll import Components from the web-store and use them

We'll keep a live and deployed version of the Solidus-React-based-shop (at a secret url), so we can see progress
