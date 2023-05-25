import { configure } from "@vendia/serverless-express";
import { createApp } from "./app";

const app = createApp();

export const handler = configure({ app });
