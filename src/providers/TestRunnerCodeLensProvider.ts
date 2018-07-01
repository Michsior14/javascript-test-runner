import { CodeLensProvider, TextDocument, CancellationToken, CodeLens, Position, Range, Uri, workspace } from "vscode"

import TestRunnerCodeLens from "../codelens/TestRunnerCodeLens"
import TestDebugRunnerCodeLens from "../codelens/TestDebugRunnerCodeLens"
import { codeParser } from "../parser/codeParser"

function getRootPath({uri}) {
    const fileUri = Uri.parse(uri.path)
    const activeWorkspace = workspace.getWorkspaceFolder(fileUri)

    if (activeWorkspace) {
        return activeWorkspace.uri.path
    }

    return workspace.rootPath
}

function getCodeLens(rootPath, fileName, testName, startPosition) {
    const testRunnerCodeLens = new TestRunnerCodeLens(
        rootPath,
        fileName,
        testName,
        startPosition
    )

    const debugRunnerCodeLens = new TestDebugRunnerCodeLens(
        rootPath,
        fileName,
        testName,
        startPosition
    )

    return [testRunnerCodeLens, debugRunnerCodeLens]
}

export default class TestRunnerCodeLensProvider implements CodeLensProvider {
    provideCodeLenses(document: TextDocument, token: CancellationToken): CodeLens[] | Thenable<CodeLens[]> {
        const createRangeObject = ({line}) => document.lineAt(line - 1).range
        const rootPath = getRootPath(document)

        return codeParser(document.getText())
            .reduce((acc, {loc, testName}) => [
                ...acc,
                ...getCodeLens(
                    rootPath,
                    document.fileName,
                    testName,
                    createRangeObject(loc.start)
                )
            ], [])
    }

    resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): CodeLens | Thenable<CodeLens> {
        return
    }
}
