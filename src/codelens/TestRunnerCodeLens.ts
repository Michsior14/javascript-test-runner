import { CodeLens, Range } from 'vscode'

export default class TestRunnerCodeLens extends CodeLens {
    constructor(rootPath: string, fileName: string, testName: string, range: Range) {
        super(range, {
            title: 'Run Test',
            command: 'javascript-test-runner.run.test',
            arguments: [rootPath, fileName, testName]
        })
    }
}
