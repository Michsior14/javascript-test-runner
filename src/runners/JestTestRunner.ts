import { workspace, debug, Terminal, WorkspaceFolder } from "vscode";

import { TestRunnerInterface } from "../interfaces/TestRunnerInterface";
import { TestRunnerOptions } from "./TestRunnerOptions";
import { ConfigurationProvider } from "../providers/ConfigurationProvider";
import { TerminalProvider } from "../providers/TerminalProvider";

export class JestTestRunner implements TestRunnerInterface {
    name: string = "jest"
    rootPath: WorkspaceFolder = null
    terminalProvider: TerminalProvider = null
    configurationProvider: ConfigurationProvider = null

    get binPath(): string {
        return `${this.rootPath}/node_modules/.bin/jest`
    }

    constructor({ rootPath, terminalProvider, configurationProvider }: TestRunnerOptions) {
        this.rootPath = rootPath
        this.terminalProvider = terminalProvider
        this.configurationProvider = configurationProvider
    }

    runTest (testName: string, fileName: string) {
        const additionalArguments = this.configurationProvider.additionalArguments
        const environmentVariables = this.configurationProvider.environmentVariables

        const command = `${this.binPath} ${fileName} --testNamePattern="${testName}" ${additionalArguments}`

        const terminal = this.terminalProvider.get({
            env: environmentVariables
        })

        terminal.sendText(command, true)
        terminal.show(true)
    }

    debugTest(testName: string, fileName: string) {
        const additionalArguments = this.configurationProvider.additionalArguments
        const environmentVariables = this.configurationProvider.environmentVariables

        debug.startDebugging(this.rootPath, {
            name: 'Debug Test',
            type: "node",
            request: "launch",
            program: this.binPath,
            args: [
                fileName,
                `--testNamePattern`,
                testName,
                "--runInBand",
                ...additionalArguments.split(' ')
            ],
            console: "integratedTerminal",
            env: environmentVariables
        })
    }
}
