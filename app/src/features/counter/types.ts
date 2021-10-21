import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/actionTypes'

interface IncrementCounterAction {
  type: typeof INCREMENT_COUNTER
}
interface DecrementCounterAction {
  type: typeof DECREMENT_COUNTER
}
export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction

export interface SystemState {
  count: {
    value: number
  }
}
