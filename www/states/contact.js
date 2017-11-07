// @flow

import type {Slides, State} from '../components/contact'

export const changeSlide = (toSlide: Slides) => ({activeSlide}: State) => ({activeSlide: toSlide})
