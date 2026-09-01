import type { ColourType } from './types.ts'
import { Playable } from './Playable.tsx'

interface GroupProps {
    colour: ColourType
    showName: string
    songIds: number[]
}

export function Group(props: GroupProps) {
    return (
        <div className={props.colour}>
            <h2>{props.showName}</h2>
            <div>
                <Playable />
            </div>
        </div>
    )
}
