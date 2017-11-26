module.exports = [{
  type: 'tagger',
  title: 'Type',
  description: 'Type of address',
  active: true,
  key: 'type',
  custom_field_options: [
    {name: 'Business', value: 'BU'},
    {name: 'Home', value: 'HO'},
    {name: 'International', value: 'IN'},
    {name: 'Unknown or does not fit listed types', value: 'OT'},
  ]
}, {
  type: 'checkbox',
  title: 'Primary?',
  description: "Is this the primary address?",
  active: true,
  key: 'primary_flag'
}, {
  type: 'checkbox',
  title: 'Default?',
  description: "Is this the default address?",
  active: true,
  key: 'default_flag'
}, {
  type: 'text',
  title: 'Title',
  description: 'Title associated with the address',
  active: true,
  key: 'title'
}, {
  type: 'text',
  title: 'Name',
  description: 'Name associated with the address',
  active: true,
  key: 'name'
}, {
  type: 'text',
  title: 'Address Line 1',
  description: 'First line of the address',
  active: true,
  key: 'address_line_1'
}, {
  type: 'text',
  title: 'Address Line 2',
  description: 'Second line of the address',
  active: true,
  key: 'address_line_2'
}, {
  type: 'text',
  title: 'Address Line 3',
  description: 'Third line of the address',
  active: true,
  key: 'address_line_3'
}, {
  type: 'text',
  title: 'Address Line 4',
  description: 'Fourth line of the address',
  active: true,
  key: 'address_line_4'
}, {
  type: 'text',
  title: 'City',
  description: 'The city',
  active: true,
  key: 'city'
}, {
  type: 'text',
  title: 'State',
  description: 'The state',
  active: true,
  key: 'state'
}, {
  type: 'text',
  title: 'Zip Code',
  description: 'The 5 or 9-digit zip code',
  active: true,
  key: 'zip_code'
}, {
  type: 'text',
  title: 'Carrier Route',
  description: "The carrier route",
  active: true,
  key: 'carrier_route'
}, {
  type: 'text',
  title: 'County',
  description: "The county",
  active: true,
  key: 'county'
}, {
  type: 'text',
  title: 'Country',
  description: "The country",
  active: true,
  key: 'country'
}, {
  type: 'text',
  title: 'District',
  description: "Congressional district",
  active: true,
  key: 'district'
}, {
  type: 'text',
  title: 'Precinct',
  description: "The precinct",
  active: true,
  key: 'precinct'
}, {
  type: 'checkbox',
  title: 'No Mail?',
  description: "Should mail not be sent to the address?",
  active: true,
  key: 'no_mail_flag'
}, {
  type: 'text',
  title: 'Agency Code',
  description: "A code associated with an agency if the record is for an agency",
  active: true,
  key: 'agency_code'
}]
