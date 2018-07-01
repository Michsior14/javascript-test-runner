import { Terminal, window, TerminalOptions } from 'vscode'

export class TerminalProvider {
    activeTerminal: Terminal

    get(terminalOptions: TerminalOptions): Terminal {
        if (this.activeTerminal) {
            this.activeTerminal.dispose()
        }

        this.activeTerminal = window.createTerminal(terminalOptions)

        return this.activeTerminal
    }
}
