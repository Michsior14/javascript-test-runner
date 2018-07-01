import { WorkspaceFolder } from "vscode";
import { TerminalProvider } from "../providers/TerminalProvider";
import { ConfigurationProvider } from "../providers/ConfigurationProvider";

export interface TestRunnerInterface {
    name: string
    binPath: string,
    rootPath: WorkspaceFolder
    terminalProvider: TerminalProvider,
    configurationProvider: ConfigurationProvider,

    runTest (testName: string, fileName: string): void
    debugTest (testName: string, fileName: string): void
}
