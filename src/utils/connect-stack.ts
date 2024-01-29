import { cli } from "cli-ux";
import * as contentstackSdk from "@contentstack/management";
import { configHandler } from '@contentstack/cli-utilities';
import processStack from "./process-stack";
const regexMessages = require("../../messages/index.json").validateRegex;

export default async function connectStack(
  flags: any,
  host: string,
  tokenDetails: any
) {
  try {
    const startTime = Date.now();
    cli.action.start(regexMessages.cliAction.connectStackStart, "", {
      stdout: true,
    });

    const option: contentstackSdk.ContentstackConfig = {
      host: host,
    }

    // Adding early access headers
    const earlyAccessHeaders = configHandler.get(`earlyAccessHeaders`);
    if (earlyAccessHeaders && Object.keys(earlyAccessHeaders).length > 0) {
      option.early_access = Object.values(earlyAccessHeaders);
    }

    const client = contentstackSdk.client(option);
    const stackInstance = client.stack({
      api_key: tokenDetails.apiKey,
      management_token: tokenDetails.token,
    });
    await processStack(flags, stackInstance, startTime);
  } catch (error) {
    throw new Error(regexMessages.errors.stack.apiKey);
  }
}
