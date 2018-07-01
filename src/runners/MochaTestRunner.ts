import { debug, WorkspaceFolder } from "vscode";

import { TestRunnerInterface } from "../interfaces/TestRunnerInterface";
import { TestRunnerOptions } from "./TestRunnerOptions";
import { ConfigurationProvider } from "../providers/ConfigurationProvider";
import { TerminalProvider } from "../providers/TerminalProvider";

export class MochaTestRunner implements TestRunnerInterface {
    name: string = "mocha"
    rootPath: WorkspaceFolder = null
    terminalProvider: TerminalProvider = null
    configurationProvider: ConfigurationProvider = null

    get binPath(): string {
        return `${this.rootPath}/node_modules/.bin/mocha`
    }

    constructor({ rootPath, terminalProvider, configurationProvider }: TestRunnerOptions) {
        this.rootPath = rootPath
        this.terminalProvider = terminalProvider
        this.configurationProvider = configurationProvider
    }

    runTest (testName: string, fileName: string) {
        const additionalArguments = this.configurationProvider.additionalArguments
        const environmentVariables = this.configurationProvider.environmentVariables

        const command = `${this.binPath} ${fileName} --grep="${testName}" ${additionalArguments}`

        const terminal = this.terminalProvider.get({
            env: environmentVariables
        })

        terminal.sendText(command, true)
        terminal.show(true)
    }

    debugTest(testName: string, fileName: string) {
        const additionalArgs = this.configurationProvider.additionalArguments
        const environmentVariables = this.configurationProvider.environmentVariables

        debug.startDebugging(this.rootPath, {
            name: 'Debug Test',
            type: "node",
            request: "launch",
            program: this.binPath,
            args: [
                fileName,
                `--grep "${testName}"`,
                "--no-timeout",
                ...additionalArgs.split(' ')
            ],
            console: "integratedTerminal",
            env: environmentVariables
        })
    }
}
