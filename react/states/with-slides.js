// @flow

import type {State} from '../hoc/with-slides'

export const goToSlide = (desiredSlide: number) => ({slideIndex}: State) => ({slideIndex: desiredSlide})
export const nextSlide = ({slideIndex}: State) => ({slideIndex: slideIndex + 1})
export const prevSlide = ({slideIndex}: State) => ({slideIndex: slideIndex - 1})
