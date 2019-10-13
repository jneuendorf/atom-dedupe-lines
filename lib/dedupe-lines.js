'use babel'

import {CompositeDisposable} from 'atom'


class DedupeLines {
    subscriptions = new CompositeDisposable()

    activate(_state) {
        // Register command that dedupes this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'dedupe-lines:dedupe': () => this.dedupe()
        }))
    }

    deactivate() {
        return this.subscriptions.dispose()
    }

    serialize() {}

    // https://www.atom-tweaks.com/tweaks/fe66551d-1849-410c-9ad0-6cb903282b14
    dedupe() {
        const editor = atom.workspace.getActiveTextEditor()
        const lineEnding = editor.getBuffer().getPreferredLineEnding()
        const lines = editor.getText().split(lineEnding)
        console.log(lines)

        const set = new Set()
        const deduped = []
        for (const line of lines) {
            // Keep emtpy lines where they are.
            if (!line) {
                deduped.push(line)
            }
            else {
                if (!set.has(line))  {
                    deduped.push(line)
                    set.add(line)
                    console.log(set)
                }
            }
        }

        editor.setText(deduped.join(lineEnding))
    }
}

const dedupeLines = new DedupeLines()


export default dedupeLines
