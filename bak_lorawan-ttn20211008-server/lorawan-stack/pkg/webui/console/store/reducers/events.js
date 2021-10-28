// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { memoize } from 'lodash'

import EVENT_STORE_LIMIT from '@console/constants/event-store-limit'
import { EVENT_VERBOSE_FILTERS_REGEXP, EVENT_FILTER_MAP } from '@console/constants/event-filters'
import CONNECTION_STATUS from '@console/constants/connection-status'

import { getCombinedDeviceId } from '@ttn-lw/lib/selectors/id'

import {
  createStatusReconnectedEvent,
  createStatusClearedEvent,
  createStatusClosedEvent,
  createStatusPausedEvent,
  createStatusResumedEvent,
  createStatusVerboseEnabled,
  createStatusVerboseDisabled,
  EVENT_STATUS_RESUMED,
} from '@console/lib/events/definitions'
import { createSyntheticEventFromError } from '@console/lib/events/utils'

import {
  createGetEventMessageSuccessActionType,
  createGetEventMessageFailureActionType,
  createStartEventsStreamActionType,
  createStartEventsStreamSuccessActionType,
  createStartEventsStreamFailureActionType,
  createPauseEventsStreamActionType,
  createResumeEventsStreamActionType,
  createStopEventsStreamActionType,
  createEventStreamClosedActionType,
  createClearEventsActionType,
  createSetEventsFilterActionType,
} from '@console/store/actions/events'

// Use memoized RegExp constructor to prevent costly instantiations since
// filters are stored as strings and need to be converted for each event.
const MemoizedRegExp = memoize(RegExp)

const addEvent = (state, event) => {
  const { events, filter } = state
  const { paused } = state

  if (paused && !event.name.startsWith('synthetic')) {
    return {}
  }

  // See https://github.com/TheThingsNetwork/lorawan-stack/pull/2989
  if (event.name === 'events.stream.start' || event.name === 'events.stream.stop') {
    return {}
  }

  // Apply filter, if exists.
  if (!event.name.startsWith('synthetic') && filter && !MemoizedRegExp(filter).test(event.name)) {
    return {}
  }

  // We want to disregard events that arrived after event resumption but are
  // timestamped before it. This is to avoid showing events before the synthetic
  // resumption event.
  if (events[0] && events[0].name === EVENT_STATUS_RESUMED && event.time < events[0].time) {
    return {}
  }

  const currentEvents = events

  // Keep events sorted in descending order by `time`.
  let insertIndex = 0
  while (insertIndex < currentEvents.length) {
    const currentEventTime = currentEvents[insertIndex].time

    if (event.time < currentEventTime) {
      insertIndex += 1
    } else {
      break
    }
  }

  const newEvents = currentEvents
    .slice(0, insertIndex)
    .concat(event, currentEvents.slice(insertIndex, EVENT_STORE_LIMIT - 1))

  return { events: newEvents, truncated: events.length + 1 > EVENT_STORE_LIMIT }
}

const defaultState = {
  events: [],
  truncated: false,
  error: undefined,
  interrupted: false,
  paused: false,
  status: CONNECTION_STATUS.DISCONNECTED,
  filter: EVENT_VERBOSE_FILTERS_REGEXP,
}

const createNamedEventReducer = (reducerName = '') => {
  const START_EVENTS = createStartEventsStreamActionType(reducerName)
  const START_EVENTS_SUCCESS = createStartEventsStreamSuccessActionType(reducerName)
  const START_EVENTS_FAILURE = createStartEventsStreamFailureActionType(reducerName)
  const PAUSE_EVENTS = createPauseEventsStreamActionType(reducerName)
  const RESUME_EVENTS = createResumeEventsStreamActionType(reducerName)
  const STOP_EVENTS = createStopEventsStreamActionType(reducerName)
  const GET_EVENT_SUCCESS = createGetEventMessageSuccessActionType(reducerName)
  const GET_EVENT_FAILURE = createGetEventMessageFailureActionType(reducerName)
  const CLEAR_EVENTS = createClearEventsActionType(reducerName)
  const EVENT_STREAM_CLOSED = createEventStreamClosedActionType(reducerName)
  const SET_EVENTS_FILTER = createSetEventsFilterActionType(reducerName)

  return (state = defaultState, action) => {
    switch (action.type) {
      case START_EVENTS:
        return {
          ...state,
          status: CONNECTION_STATUS.CONNECTING,
        }
      case START_EVENTS_SUCCESS:
        return {
          ...state,
          ...(state.interrupted ? addEvent(state, createStatusReconnectedEvent()) : state.events),
          status: CONNECTION_STATUS.CONNECTED,
          interrupted: false,
          error: undefined,
        }
      case GET_EVENT_SUCCESS:
        return {
          ...state,
          ...addEvent(state, action.event),
        }
      case START_EVENTS_FAILURE:
        return {
          ...state,
          ...(!state.interrupted
            ? addEvent(state, createSyntheticEventFromError(action.error))
            : state.events),
          error: action.error,
          status: CONNECTION_STATUS.DISCONNECTED,
        }
      case GET_EVENT_FAILURE:
        return {
          ...state,
          ...addEvent(state, createSyntheticEventFromError(action.error)),
          status: CONNECTION_STATUS.DISCONNECTED,
          interrupted: true,
        }
      case PAUSE_EVENTS:
        return {
          ...state,
          ...addEvent(state, createStatusPausedEvent()),
          paused: true,
        }
      case RESUME_EVENTS:
        return {
          ...state,
          ...addEvent(state, createStatusResumedEvent()),
          paused: false,
        }
      case STOP_EVENTS:
        return {
          ...state,
          status: CONNECTION_STATUS.DISCONNECTED,
          interrupted: false,
        }
      case EVENT_STREAM_CLOSED:
        return {
          ...state,
          ...addEvent(state, createStatusClosedEvent()),
          status: CONNECTION_STATUS.DISCONNECTED,
          interrupted: true,
        }
      case CLEAR_EVENTS:
        return {
          ...state,
          events: [createStatusClearedEvent()],
          truncated: false,
        }
      case SET_EVENTS_FILTER:
        return {
          ...state,
          ...addEvent(
            state,
            Boolean(action.filter)
              ? createStatusVerboseDisabled({
                  filter: EVENT_FILTER_MAP[action.filter],
                  applied_converted_regexp: action.filter,
                })
              : createStatusVerboseEnabled({
                  filter: [],
                }),
          ),
          filter: action.filter,
        }
      default:
        return state
    }
  }
}

const createNamedEventsReducer = (reducerName = '') => {
  const START_EVENTS = createStartEventsStreamActionType(reducerName)
  const START_EVENTS_SUCCESS = createStartEventsStreamSuccessActionType(reducerName)
  const START_EVENTS_FAILURE = createStartEventsStreamFailureActionType(reducerName)
  const PAUSE_EVENTS = createPauseEventsStreamActionType(reducerName)
  const RESUME_EVENTS = createResumeEventsStreamActionType(reducerName)
  const GET_EVENT_SUCCESS = createGetEventMessageSuccessActionType(reducerName)
  const GET_EVENT_FAILURE = createGetEventMessageFailureActionType(reducerName)
  const CLEAR_EVENTS = createClearEventsActionType(reducerName)
  const STOP_EVENTS = createStopEventsStreamActionType(reducerName)
  const EVENT_STREAM_CLOSED = createEventStreamClosedActionType(reducerName)
  const SET_EVENTS_FILTER = createSetEventsFilterActionType(reducerName)
  const event = createNamedEventReducer(reducerName)

  return (state = {}, action) => {
    if (!action.id) {
      return state
    }

    const id = typeof action.id === 'object' ? getCombinedDeviceId(action.id) : action.id

    switch (action.type) {
      case START_EVENTS:
      case START_EVENTS_FAILURE:
      case START_EVENTS_SUCCESS:
      case PAUSE_EVENTS:
      case RESUME_EVENTS:
      case STOP_EVENTS:
      case EVENT_STREAM_CLOSED:
      case GET_EVENT_FAILURE:
      case GET_EVENT_SUCCESS:
      case SET_EVENTS_FILTER:
      case CLEAR_EVENTS:
        return {
          ...state,
          [id]: event(state[id], action),
        }
      default:
        return state
    }
  }
}

export default createNamedEventsReducer
