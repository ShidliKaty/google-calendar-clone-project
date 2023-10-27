import { useContext } from "react"
import { Context } from "./Events"

export const EVENT_COLORS = ["red", "green", "blue"] as const

export function useEvents() {
    const eventsContext = useContext(Context)
    if (eventsContext === null) {
        throw new Error("useEvents must be used within an EventsProvider")
    }
    return eventsContext
}