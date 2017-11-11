// @flow

import type {FormValues, State} from '../hoc/with-newsletter-subscription-modal'

export const providedFormValues = (formValues: FormValues) => (state: State) => ({...state, form: {values: formValues}})
export const openedModal = (state: State) => ({...state, isOpen: true})
export const closedModal = (state: State) => ({...state, isOpen: false})
