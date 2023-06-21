# cli-cm-regex-validate

Validate Fields with Regex Property of Content Type and Global Field in a Stack

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-cm-regex-validate.svg)](https://npmjs.org/package/cli-cm-regex-validate)
[![Downloads/week](https://img.shields.io/npm/dw/cli-cm-regex-validate.svg)](https://npmjs.org/package/cli-cm-regex-validate)
[![License](https://img.shields.io/npm/l/cli-cm-regex-validate.svg)](https://github.com/contentstack/cli-cm-regex-validate/blob/master/package.json)

<!-- toc -->
* [cli-cm-regex-validate](#cli-cm-regex-validate)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @contentstack/cli-cm-regex-validate
$ csdx COMMAND
running command...
$ csdx (--version)
@contentstack/cli-cm-regex-validate/1.1.4 darwin-arm64 node-v18.15.0
$ csdx --help [COMMAND]
USAGE
  $ csdx COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`csdx cm:stacks:validate-regex`](#csdx-cmstacksvalidate-regex)

## `csdx cm:stacks:validate-regex`

This command is used to find all the invalid regexes present in the content types and global fields of your stack.

```
USAGE
  $ csdx cm:stacks:validate-regex [-h] [-a <value>] [-c] [-g] [-f <value>]

FLAGS
  -a, --alias=<value>     Alias (name) assigned to the management token
  -c, --contentType       To find invalid regexes within the content types
  -f, --filePath=<value>  [optional] The path or the location in your file system where the CSV output file should be
                          stored.
  -g, --globalField       To find invalid regexes within the global fields
  -h, --help              To show the flags that can be used with this CLI command

DESCRIPTION
  This command is used to find all the invalid regexes present in the content types and global fields of your stack.

EXAMPLES
  $ csdx cm:stacks:validate-regex

  $ csdx cm:stacks:validate-regex -a <management_token_alias>

  $ csdx cm:stacks:validate-regex -c

  $ csdx cm:stacks:validate-regex -g

  $ csdx cm:stacks:validate-regex -f <path/to/the/directory>

  $ csdx cm:stacks:validate-regex -a <management_token_alias> -c -g

  $ csdx cm:stacks:validate-regex -a <management_token_alias> -c -g -f <path/to/the/directory>
```

_See code: [src/commands/cm/stacks/validate-regex.ts](https://github.com/contentstack/cli-cm-regex-validate/blob/v1.1.4/src/commands/cm/stacks/validate-regex.ts)_
<!-- commandsstop -->
