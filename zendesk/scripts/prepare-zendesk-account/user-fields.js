module.exports = [{
  type: 'tagger',
  title: 'Type',
  description: 'Type of individual',
  active: true,
  key: 'type',
  custom_field_options: [
    {name: 'Agency', value: 'AG'},
    {name: 'Business', value: 'BU'},
    {name: 'Constituent', value: 'CS'},
    {name: 'Family', value: 'FM'},
    {name: 'Individual who is not a constituent', value: 'IN'},
    {name: 'Member of Congress', value: 'MC'},
    {name: 'Organzation', value: 'OR'},
    {name: 'Unknown or does not fit listed types', value: 'OT'},
  ]
}, {
  type: 'tagger',
  title: 'Prefix',
  description: 'Prefix of constituent such as "Mr." or "Mrs."',
  active: true,
  key: 'prefix',
  custom_field_options: [
    {name: 'Mr.', value: 'mr.'},
    {name: 'Mrs.', value: 'mrs.'}
  ]
}, {
  type: 'text',
  title: 'First Name',
  description: 'First name of constituent.',
  active: true,
  key: 'first_name'
}, {
  type: 'text',
  title: 'Middle Name',
  description: 'Middle name or initial of constituent.',
  active: true,
  key: 'middle_name'
}, {
  type: 'text',
  title: 'Last Name',
  description: 'Last name of constituent.',
  active: true,
  key: 'last_name'
}, {
  type: 'text',
  title: 'Suffix',
  description: 'Suffix of constituent such as "Jr."',
  active: true,
  key: 'suffix'
}, {
  type: 'text',
  title: 'Appellation',
  description: 'Appellation of constituent such as "MD"',
  active: true,
  key: 'appellation'
}, {
  type: 'text',
  title: 'Salutation',
  description: 'Salutation used for the constituent such as "Bob" or "Dr. Jones"',
  active: true,
  key: 'salutation'
}, {
  type: 'text',
  title: 'Date of Birth',
  description: "The individual's date of birth in the format YYYYMMDD",
  active: true,
  key: 'birthday'
}, {
  type: 'checkbox',
  title: 'No Mail?',
  description: "True if the individual has requested that no mail be sent to him at any of his addresses",
  active: true,
  key: 'no_mail_flag'
}, {
  type: 'checkbox',
  title: 'Deceased?',
  description: "True if the individual is deceased",
  active: true,
  key: 'deceased_flag'
}]
