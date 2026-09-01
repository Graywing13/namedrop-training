import './App.css'
import { Group } from './components/Group.tsx'
import { ColourType } from './components/types.ts'
import {
    type Context,
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface NotesMap {
    [amqSongId: string]: string
}

export const NotesContext: Context<{
    notes: NotesMap
    writeNote: (key: string, newValue: string) => void
}> = createContext({ notes: {}, writeNote: (_k, _v) => {} })

function App() {
    const [isSaved, setSaved] = useState(false)
    const [notes, setNotes] = useState<NotesMap>({})

    useEffect(() => {
        if (isSaved) {
            window.onbeforeunload = null
        } else {
            window.onbeforeunload = function () {
                return true
            }
        }
    }, [isSaved])

    const writeNoteWithDirty = useCallback((key: string, newValue: string) => {
        setSaved(false)
        setNotes({ ...notes, [key]: newValue })
    }, [])

    const bucketArea = useMemo(() => {
        return (
            <div className={'bg-black text-white'}>
                <Group
                    colour={ColourType.red}
                    showName={'Initial d'}
                    songIds={[]}
                />
            </div>
        )
    }, [])

    return (
        <NotesContext value={{ notes, writeNote: writeNoteWithDirty }}>
            {bucketArea}
        </NotesContext>
    )
}

export default App
