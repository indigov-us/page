// @flow

import type {State} from '../components/hero-search'

export const updateS = (newS: ?string) => ({q}: State) => ({q: newS})
