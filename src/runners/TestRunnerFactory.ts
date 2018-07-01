import { exists } from 'fs'
import { workspace, TerminalOptions, WorkspaceFolder } from 'vscode'

import { TestRunnerInterface } from "../interfaces/TestRunnerInterface";
import { JestTestRunner } from './JestTestRunner';
import { MochaTestRunner } from './MochaTestRunner';
import { TerminalProvider } from '../providers/TerminalProvider';
import { ConfigurationProvider } from '../providers/ConfigurationProvider';

const terminalProvider = new TerminalProvider()
const configurationProvider = new ConfigurationProvider()

function doesFileExist(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
        exists(filePath, (doesFileExist) => {
            resolve(doesFileExist)
        })
    })
}

async function getAvailableTestRunner(testRunners: Array<TestRunnerInterface>): Promise<TestRunnerInterface> {
    for (const runner of testRunners) {
        const doesRunnerExist = await doesFileExist(runner.binPath)

        if (doesRunnerExist) {
            return runner
        }
    }

    throw new Error('No test runner in your project. Please install one.')
}


export async function getTestRunner(rootPath: WorkspaceFolder): Promise<TestRunnerInterface> {
    const jestTestRunner = new JestTestRunner({rootPath, terminalProvider, configurationProvider })
    const mochaTestRunner = new MochaTestRunner({rootPath, terminalProvider, configurationProvider })

    return getAvailableTestRunner([jestTestRunner, mochaTestRunner])
}
