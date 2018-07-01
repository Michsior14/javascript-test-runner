import { CodeLens, Range } from 'vscode'

export default class TestDebugRunnerCodeLens extends CodeLens {
    constructor(rootPath: string, fileName: string, testName: string, range: Range) {
        super(range, {
            title: 'Debug Test',
            command: 'javascript-test-runner.debug.test',
            arguments: [rootPath, fileName, testName]
        })
    }
}
