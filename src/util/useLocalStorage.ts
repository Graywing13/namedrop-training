import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'

/**
 * useState but with localStorage. assumes you never will useLocalStorage a function.
 */
export function useLocalStorage<T>(
    key: string,
    defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        if (typeof defaultValue === 'function') {
            throw new Error('Cannot pass a function into useLocalStorage')
        }
        try {
            const existingJsonString = window.localStorage.getItem(key)
            if (existingJsonString) return JSON.parse(existingJsonString)
        } catch (e) {
            console.error(e)
        }
        return defaultValue
    })

    function update(newValueOrGetter: ((prevState: T) => T) | T) {
        const newValue =
            typeof newValueOrGetter === 'function'
                ? (newValueOrGetter as Function)(value)
                : newValueOrGetter
        const newString = JSON.stringify(newValue)
        try {
            setValue(newValue)
            if (newString) {
                window.localStorage.setItem(key, newString)
            } else {
                window.localStorage.removeItem(key)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return [value, useCallback(update, [update, key, defaultValue])]
}
