import { Command, flags } from "@contentstack/cli-command";
import { inquireAlias, inquireModule } from "../../../utils/interactive";
import connectStack from "../../../utils/connect-stack";
const regexMessages = require("../../../../messages/index.json").validateRegex;

export default class ValidateRegex extends Command {
  static description = regexMessages.command.description;

  static flags = {
    help: flags.help({ char: "h", description: regexMessages.command.help }),
    alias: flags.string({
      char: "a",
      description: regexMessages.command.alias,
    }),
    contentType: flags.boolean({
      char: "c",
      description: regexMessages.command.contentTypes,
    }),
    globalField: flags.boolean({
      char: "g",
      description: regexMessages.command.globalFields,
    }),
    filePath: flags.string({
      char: "f",
      description: regexMessages.command.filePath,
    }),
  };

  static examples = [
    "$ csdx cm:stacks:validate-regex",
    "$ csdx cm:stacks:validate-regex -a <management_token_alias>",
    "$ csdx cm:stacks:validate-regex -c",
    "$ csdx cm:stacks:validate-regex -g",
    "$ csdx cm:stacks:validate-regex -f <path/to/the/directory>",
    "$ csdx cm:stacks:validate-regex -a <management_token_alias> -c -g",
    "$ csdx cm:stacks:validate-regex -a <management_token_alias> -c -g -f <path/to/the/directory>",
  ];

  async run() {
    const commandObject = this.parse(ValidateRegex);

    await inquireAlias(commandObject.flags);

    let tokenDetails: any;
    try {
      tokenDetails = await this.getToken(commandObject.flags.alias);
    } catch (error) {
      this.error(regexMessages.errors.tokenNotFound, {
        ref: regexMessages.command.addManagementToken,
      });
    }

    await inquireModule(commandObject.flags);

    try {
      await connectStack(commandObject.flags, this.cmaHost, tokenDetails);
    } catch (error) {
      this.error(regexMessages.errors.stack.fetch);
    }
  }
}
