# Creating a website with Contentstack JavaScript SDK and Next.js

Let's create a website built on top of Next.js and using Contentstack’s JavaScript SDK.

- [Creating a website with Contentstack JavaScript SDK and Next.js](#creating-a-website-with-contentstack-javascript-sdk-and-nextjs)
  - [JavaScript Delivery SDK](#javascript-delivery-sdk)
  - [Pre-Requisites](#pre-requisites)
  - [Configure Contentstack and Import Content](#configure-contentstack-and-import-content)
    - [Create Delivery token](#create-delivery-token)
  - [Create a Next.js Project](#create-a-nextjs-project)
    - [Install Additional Libraries](#install-additional-libraries)
    - [Configure Environment Variables](#configure-environment-variables)
    - [Install and Configure the JavaScript SDK](#install-and-configure-the-javascript-sdk)
    - [Create React Components](#create-react-components)
    - [Create a Page Layout](#create-a-page-layout)
    - [Create the Home Page](#create-the-home-page)
    - [Update Components to Receive the new properties](#update-components-to-receive-the-new-properties)
    - [Create new Pages](#create-new-pages)
  - [Run your Project](#run-your-project)
  - [Deploy your Project](#deploy-your-project)

## JavaScript Delivery SDK

Contentstack provides JavaScript Delivery SDK that developers can use to create JavaScript applications and power its content from Contentstack. The Contentstack JavaScript Delivery SDK uses the **Content Delivery APIs** to fetch content from Contentstack and deliver it to a JavaScript-based application.

> Note: It should not to be confused with the [JavaScript Management SDK](https://www.contentstack.com/docs/developers/nodejs/about-javascript-management-sdk/) that uses Content Management APIs and includes creating, updating, deleting, and fetching content of your account.

## Pre-Requisites

To get started, Contentstack JS Delivery SDK requires **NodeJS 4.4.7 or later**.

Also you need a [Contentstack account](../README.md#start-using-contentstack).

## Configure Contentstack and Import Content

1. Log in to your Contentstack account, and create a **new stack**. Note down the master language and the stack API key as you will need later.

2. Create a **management token** and note down the management token and the stack API key to import content into your stack in the next step.

3. Import **content types and content** into your stack by using the Contentstack command-line interface (CLI)

- **Install the CLI** globally by running:

```bash
npm install -g @contentstack/cli
# or
yarn global add @contentstack/cli
```

- Set the **Region**. By default, the CLI uses the North America endpoint. To use the European endpoint, run the following command in your terminal:

```bash
csdx config:set:region EU
```

- Use the **add token command** to add the management token to this CLI session with an alias:

```bash
csdx auth:tokens:add -a <alias_for_token> -k <API_key_of_stack> -t <value_of_management_token>
```

- Download the [content zip file](https://github.com/contentstack/contentstack-nextjs-react-universal-demo/raw/master/data/contents.zip), extract it, and note down its path to use in the next step.

- Import all the assets, content types, entries, languages, and environments into your stack by using the **import content command**:

```bash
csdx cm:import -a <management_token_alias> -d "<path_where_content_folder_is_stored>"
```

The command will automatically publish the imported entries and assets to all the environments.

### Create Delivery token

A delivery token lets you fetch published content of an environment. You can create a delivery token for the “local” environment.

1. Go to your stack and click on the “Settings” icon on the left navigation panel.
2. Click on API Tokens.
3. Open the Delivery Tokens tab, and click on the **+ New Token button**.
4. Provide a suitable Name and Description for the delivery token.
5. In the Scope section, select the publishing environment for which you want to generate a delivery token.
6. Finally, click on the Generate Token button. You will see a new token in the Delivery Token field. Note it down for the next step.

Now, you can use the generated token to fetch the content of only the selected environment. It cannot be used to fetch the content of any other environment.

Later, while deploying your site, you can create tokens for other environments.

## Create a Next.js Project

For this tutorial, we have assumed that you are familiar with Next.js. If not, then please refer to the [Next.js docs](https://nextjs.org/docs) for more details.

Create a new Next.js application using `create-next-app` by running:

```bash
npx create-next-app
# or
yarn create next-app
```

### Install Additional Libraries

Additional libraries to be installed:

- Styled Components
- Babel

```bash
npm install -D babel-core
# or
yarn add -D babel-core
```

Create a `.babelrc` file and add:

```json
{
  "presets": ["next/babel"]
}
```

### Configure Environment Variables

Navigate to the root folder and create a configuration file named .env.local and provide your credentials:

```bash
API_KEY = {api_key_of_your_stack}
DELIVERY_TOKEN = {delivery_token_of_the_environment}
ENVIRONMENT = {environment_name}
REGION = {eu | us}
```

### Install and Configure the JavaScript SDK

To use the JavaScript Delivery SDK, open the terminal and install the contentstack module via npm:

```bash
npm install contentstack
# or
yarn add contentstack
```

Once done, create a `services` directory and a new `contentstack.js` file inside to import the SDK in your project, using the following expression:

```js
import contentstack from ‘contentstack’
```

To initialize the SDK, you will need to specify the stack’s API key, delivery token, name of the environment and region. Check the API Reference to [Initialize an instance of ‘Stack’](https://www.contentstack.com/docs/developers/javascript-browser/api-reference/Stack.html)

```js
const Stack =
  process.env.API_KEY && process.env.DELIVERY_TOKEN && process.env.ENVIRONMENT
    ? contentstack.Stack({
        api_key: process.env.API_KEY,
        delivery_token: process.env.DELIVERY_TOKEN,
        environment: process.env.ENVIRONMENT,
        region: process.env.REGION,
      })
    : "";
```

According to the documentation for the Javascript API [Query object](https://www.contentstack.com/docs/developers/javascript-browser/api-reference/Query.html), create a new method to fetch the content by content type from contentstack. Other optional parameters could be added:

```js
/**
 *
 * Fetches all the entries from specific content-type and optional params to restrict response
 * @param {string} ctUid
 * @param {string} locale required
 * @param {object} params
 * @param {string} params.url optional url for specific entry
 * @param {array} params.refs optional references to include in response
 *
 */
const getEntry = (ctUid, locale = "en-us", params = {}) => {
  return new Promise((resolve, reject) => {
    let stackQuery = Stack.ContentType(ctUid).Query().language(locale);
    stackQuery = params.url ? blogQuery.where("url", params.url) : stackQuery;
    stackQuery = params.refs
      ? blogQuery.includeReference(params.refs)
      : stackQuery;
    stackQuery
      .toJSON()
      .find()
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

export default {
  getEntry,
};
```

We are going to use it to retrieve the imported content from the specified Stack to our Next.js pages.

### Create React Components

First, let's create few simple components, a Header and a Footer and place them into a new `components` directory.

**Header**.jsx

```jsx
import React from "react";

const Header = (props) => {
  return (
    <header>
      <a className="logo" href="/">
        <span className="logoText">
          <i className="fa fa-file-code-o" aria-hidden="true" />
          <span className="logoTitle">Logo Title</span>
        </span>
      </a>
      <nav className="navMenu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

**Footer**.jsx

```jsx
import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <div className="copyright">
        <div>Copyright</div>
      </div>
    </footer>
  );
};

export default Footer;
```

### Create a Page Layout

Create a `layouts` folder adding the following PageLayout component:

**PageLayout**.jsx

```jsx
import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageLayout = (props) => {
  return (
    <>
      <Head>
        <title>Next and Contentstack Project</title>
        <link
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
      </Head>
      {props.header ? <Header /> : ""}
      <main>{props.children}</main>
      {props.footer ? <Footer /> : ""}
    </>
  );
};

export default PageLayout;
```

### Create the Home Page

Open `pages/index.js` and replace the existing code with:

```js
import React from "react";
import Stack from "../services/contentstack";
import PageLayout from "../layouts/PageLayout";
import HomeLayout from "../layouts/HomeLayout";

export default function Home(props) {
  return (
    <PageLayout header={props.data.header[0]} footer={props.data.footer[0]}>
      <HomeLayout page={props.data.home[0]} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  try {
    const home = await Stack.getEntry("home", "en-us");
    const header = await Stack.getEntry("header", "en-us");
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        data: { home, header, footer },
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
    console.error(error);
  }
}
```

### Update Components to Receive the new properties

**PageLayout**.jsx

```diff
- {props.header ? <Header /> : ""}
+ {props.header ? <Header header={props.header} /> : ""}

- {props.footer ? <Footer /> : ""}
+ {props.footer ? <Footer footer={props.footer} /> : ""}
```

The Header and Footer components are going to receive new properties:

**Header**.jsx

```jsx
import React from "react";

const Header = (props) => {
  return (
    <header>
      <a className="logo" href="/">
        <span className="logoText">
          <i className="fa fa-file-code-o" aria-hidden="true" />
          <span className="logoTitle">{props.header.logo_title}</span>
        </span>
      </a>
      <nav className="navMenu">
        {props.header.nav_menu.link.map((item, index) => (
          <a href={item.href} key={index}>
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
```

**Footer**.jsx

```jsx
import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <div className="copyright">
        <div>{props.footer.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
```

### Create new Pages

Proceed in the same way to create other pages for the project: About, Blog, Posts and Contact.

## Run your Project

Fire up your terminal, point it to your project location, and run the following commands:

```bash
npm run dev
```

You can now view the website at [http://localhost:3000](http://localhost:3000). And you also have the stack that has all the content and resources for the website. Try experimenting by creating new entries and publishing on the “development” environment. You should be able to see the changes on the website at the localhost.

## Deploy your Project

The easiest and the quickest way to deploy a Next.js starter website on production is to use Vercel. You need a Vercel account before you start deploying.
