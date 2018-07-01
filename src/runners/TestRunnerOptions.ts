import { WorkspaceFolder } from "vscode";
import { TerminalProvider } from "../providers/TerminalProvider";
import { ConfigurationProvider } from "../providers/ConfigurationProvider";

export type TestRunnerOptions = {
    rootPath: WorkspaceFolder
    terminalProvider: TerminalProvider
    configurationProvider: ConfigurationProvider
}
