import { cli } from "cli-ux";
import * as contentstackSdk from "@contentstack/management";

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
    const client = contentstackSdk.client({
      host: host,
    });
    const stackInstance = client.stack({
      api_key: tokenDetails.apiKey,
      management_token: tokenDetails.token,
    });
    await processStack(flags, stackInstance, startTime);
  } catch (error) {
    throw new Error(regexMessages.errors.stack.apiKey);
  }
}
