# Contentstack Fundamentals for Front-End developers

Fundamental concepts for Front-End developers who work with Contentstack.

- [Contentstack Fundamentals for Front-End developers](#contentstack-fundamentals-for-front-end-developers)
  - [What is Contentstack](#what-is-contentstack)
  - [Traditional vs. Decoupled vs. Headless CMS](#traditional-vs-decoupled-vs-headless-cms)
    - [Traditional or Coupled CMS](#traditional-or-coupled-cms)
    - [Decoupled CMS](#decoupled-cms)
    - [Headless CMS](#headless-cms)
  - [Hierarchy of Data in Contentstack](#hierarchy-of-data-in-contentstack)
    - [Other key concepts of Contentstack](#other-key-concepts-of-contentstack)
  - [How Contentstack Works](#how-contentstack-works)
  - [Start Using Contentstack](#start-using-contentstack)

## What is Contentstack

Contentstack is a **headless content management system**. As other well-known traditional CMSs, it provides the infrastructure to create and manage content, but it serves content in a presentation-independent way, without any single presentation layer, such as these other CMSs for which content management and presentation are tightly bounded.

We can define Contentstack as a CMS backend. It provides all the backend tools that are needed to create and publish content via APIs. But it leaves the frontend tasks for the developer, providing a clear separation between content management and presentation.

## Traditional vs. Decoupled vs. Headless CMS

### Traditional or Coupled CMS

The **Traditional CMS** architecture tightly binds together the frontend and the backend. It combines everything related to an application: the application code, the content repository, the user interface for content managers, and the design templates. Due to its tightly bound nature, it is difficult to introduce any change in one component without affecting the other.

### Decoupled CMS

In Decoupled CMS architecture, the backend and the frontend decouples into two separate systems: one for content management and other for data consumption and presentation.

Once content is created in the backend, this frontend agnostic CMS architecture retrieves content via web services and APIs and delivers them to any frontend on any device or channel. Even though the backend and the frontend function independently of one another, the frontend component has a defined frontend or a specific presentation environment.

### Headless CMS

A Headless CMS shares almost all of the benefits provided by the Decoupled CMS thus it makes the presentation layer more flexible by eliminating the frontend system.

Headless CMS gives the development team the liberty to use the best-in-breed technology to develop the frontend, and content managers create content without worrying about how it would be displayed.

**Benefits** of having a Headless CMS:

- You can write applications using any programming language and use any tools and frameworks in the development process. Thus you have complete control over how and where your content appears.
- APIs make it possible to deliver content to any channel and on any device at a faster rate.
- It provides high security and high scalability.
- It’s easy and safe to integrate third-party applications into your application. Thus it’s possible to future-proof your content.

## Hierarchy of Data in Contentstack

In Contentstack, data is structured and categorized in four components:

- **Organization**. It acts as a parent entity that encapsulates stacks (and all the resources stored within), belonging to the same company or group making project management unbelievably easy.
- **Stacks** serve as a collaboration space that holds all the content related to a particular project, and stack users can work together to create, edit, approve, and publish content. A stack is a container that holds all the content (entries) and assets related to a site.
- **Content types** lets you define the structure or blueprint of a page or a section of your digital property. It helps you lay the foundation of your content. Content type consists of fields which are the building blocks for structured content. Using content types, you can create content of the same nature and pattern.
- **Content** comprises Entries and Assets.
  - An **entry** is the actual piece of content created using one of the defined content types. To create an entry, content managers simply fill data in the fields of a content type.
  - **Assets** refer to all the media files (images, videos, PDFs, audio files, and so on) uploaded to Contentstack. These files can be used in multiple entries.

![Hierarchy of Contentstack](./images/hierarchy_of_contentstack.jpeg)

### Other key concepts of Contentstack

- **Roles**. A collection of permissions that are applicable to all the users is called a Role. Using Roles, stack Owners or Admins can set specific permissions to each user.
- **Users**. A user is any member who is able to access a particular stack in an organization.
- **Environment**. A publishing environment corresponds to one or more deployment servers or a content delivery destination where the entries need to be published.
- **Language**. Contentstack offers multilingual support, which allows you to create entries in any language of your choice. Localization is the process of making an entry available in another language.
- **Extensions**. Contentstack provides its users with pre-built, ready to use, extensions to be used in content types. These can be selected from the Extensions list.
- **Releases** are a set of entries and assets that can be deployed(published or unpublished) all at once in a specific environment.
- **Workflows**. An order of steps that define the roadmap in a process is called as a Workflow in Contentstack.
- **Tokens**. Contentstack has Access Tokens, Delivery Tokens, Management Tokens, and Authtokens. These tokens are required to authorize API calls.
- **Webhooks**. In Contentstack, a user-defined HTTP callback is called a Webhook. It is an automated system that sends real-time information to third-party apps or services.
- **Publish queue**. An entry or asset that a Content Manager sends for publishing or unpublishing, the system puts the action into a publish queue. The stack user can view the status of these tasks in the Publish queue section.
- **Audit logs**. All events and activities that take place in a particular stack are recorded and displayed in the Audit log. This helps the user keep a track of all items that are published, updated, deleted and the current status of the existing content.
- **Trash**. All deleted items in Contentstack for a particular stack are stored in the Trash for a limited period of time.

## How Contentstack Works

Managing content in Contentstack is a simple 3-step process.

![How CS works](images/how_contenstack_works.png)

1. **Model your content**. Define the structure of your content in a platform-independent way. This involves creating a content type and adding relevant fields such as “single-line textbox,” “date,” “file”. Adding fields is a simple drag-and-drop process.
2. **Create content**. Once the required content types are ready, any user can add content, which is like filling up a form. Multiple users can work together in teams to create important content in multiple languages.
3. **Publish content**. The content, once created, can be published to your website, mobile app, or any other channel. The same content can be reused for any platform.

## Start Using Contentstack
