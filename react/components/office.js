// @flow

import React from 'react'

type Props = {
  id: string,
  street1: ?string,
  street2: ?string,
  city: ?string,
  state: ?string,
  title: ?string,
  zip: ?string,
  phone: ?string
}

const createGoogleMapsImgSrc = ({street1, city, state, zip}: {street1: ?string, city: ?string, state: ?string, zip: ?string}) => {
  const url = 'https://maps.googleapis.com/maps/api/staticmap'
  const zoom = '13'
  const size = '600x350'
  const mapType = 'roadmap'
  const key = 'AIzaSyDbJSPl3nHAdymq1J_fGseleM3IRcStito'
  const center = `${street1 || ''},${city || ''},${state || ''},${zip || ''}`
  return encodeURI(`${url}?center=${center}&zoom=${zoom}&size=${size}&maptap=${mapType}&key=${key}`)
}

const Office = ({id, street1, street2, city, state, title, zip, phone}: Props) => (
  <div>
    <div className='cf'>
      <div className='fl w-100 w-50-ns'>
        <div className='b'>{title}</div>
        <div>{street1}</div>
        <div>{street2}</div>
        <div>{`${city || ''}, ${state || ''} ${zip || ''}`}</div>
      </div>
    </div>
    <img
      className='db mt2'
      src={createGoogleMapsImgSrc({street1, city, state, zip})}
    />
  </div>
)

export default Office
