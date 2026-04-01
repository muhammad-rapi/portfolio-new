// tina/config.ts
import { defineConfig } from "tinacms";
var BRANCH = "main";
var config_default = defineConfig({
  branch: BRANCH,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            required: true
          },
          {
            type: "number",
            name: "year",
            label: "Year",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags (comma separated)",
            list: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project"
          },
          {
            type: "string",
            name: "image",
            label: "Screenshot URL"
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live URL"
          },
          {
            type: "string",
            name: "repoUrl",
            label: "Repository URL"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Case Study Content",
            isBody: true
          }
        ]
      },
      {
        name: "about",
        label: "About",
        path: "src/content/about",
        format: "md",
        fields: [
          {
            type: "string",
            name: "headline",
            label: "Headline"
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            list: true,
            fields: [
              { type: "string", name: "label" },
              { type: "string", name: "value" }
            ]
          },
          {
            type: "string",
            name: "image",
            label: "Profile Photo URL"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Biography",
            isBody: true
          }
        ]
      },
      {
        name: "skills",
        label: "Skills",
        path: "src/content",
        match: {
          include: "skills"
        },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Skill Categories",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Name (EN)" },
              { type: "string", name: "nameId", label: "Name (ID)" },
              {
                type: "string",
                name: "skills",
                label: "Skills",
                list: true
              }
            ]
          }
        ]
      },
      {
        name: "experience",
        label: "Experience",
        path: "src/content",
        match: {
          include: "experience"
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Experience Items",
            list: true,
            fields: [
              { type: "string", name: "company" },
              { type: "string", name: "role" },
              { type: "string", name: "period" },
              { type: "string", name: "description" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
