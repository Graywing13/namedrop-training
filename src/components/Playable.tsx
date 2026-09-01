import useSound from 'use-sound'
import { Input } from 'antd'
import { useContext } from 'react'
import { NotesContext } from '../App.tsx'

interface PlayableProps {
    amqSongId: string
}

export function Playable(props: PlayableProps) {
    const soundUrl = 'https://nawdist.animemusicquiz.com/v12as3.mp3'
    const { writeNote } = useContext(NotesContext)

    const [play] = useSound(soundUrl, {
        sprite: {
            kick: [0, 350],
            hihat: [374, 160],
            snare: [666, 290],
            cowbell: [968, 200],
        },
    })
    return (
        <div>
            <button onClick={() => play({ id: 'kick' })}>clickme</button>
            <Input
                showCount
                allowClear
                maxLength={60}
                onChange={(e) => writeNote(props.amqSongId, e.target.value)}
                placeholder="disable resize"
                size={'small'}
            />
        </div>
    )
}
