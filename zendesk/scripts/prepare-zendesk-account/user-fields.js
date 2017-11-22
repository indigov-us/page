module.exports = [{
  data: {
    user_field: {
      type: 'tagger',
      title: 'Prefix',
      description: 'Prefix of constituent such as "Mr." or "Mrs."',
      active: true,
      key: 'prefix',
      custom_field_options: [
        {name: 'Mr.', value: 'mr.'},
        {name: 'Mrs.', value: 'mrs.'}
      ]
    }
  },
  message: 'Creating user prefix field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'First Name',
      description: 'First name of constituent.',
      active: true,
      key: 'first_name'
    }
  },
  message: 'Creating user first_name field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Middle Name',
      description: 'Middle name or initial of constituent.',
      active: true,
      key: 'middle_name'
    }
  },
  message: 'Creating user middle_name field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Last Name',
      description: 'Last name of constituent.',
      active: true,
      key: 'last_name'
    }
  },
  message: 'Creating user last_name field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Suffix',
      description: 'Suffix of constituent such as "Jr."',
      active: true,
      key: 'suffix'
    }
  },
  message: 'Creating user suffix field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Appellation',
      description: 'Appellation of constituent such as "MD"',
      active: true,
      key: 'appellation'
    }
  },
  message: 'Creating user appellation field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Salutation',
      description: 'Salutation used for the constituent such as "Bob" or "Dr. Jones"',
      active: true,
      key: 'salutation'
    }
  },
  message: 'Creating user salutation field'
}, {
  data: {
    user_field: {
      type: 'text',
      title: 'Date of Birth',
      description: "The individual's date of birth in the format YYYYMMDD",
      active: true,
      key: 'birthday'
    }
  },
  message: 'Creating user birthday field'
}, {
  data: {
    user_field: {
      type: 'checkbox',
      title: 'No Mail?',
      description: "True if the individual has requested that no mail be sent to him at any of his addresses",
      active: true,
      key: 'no_mail_flag'
    }
  },
  message: 'Creating user no_mail_flag field'
}, {
  data: {
    user_field: {
      type: 'checkbox',
      title: 'Deceased?',
      description: "True if the individual is deceased",
      active: true,
      key: 'deceased_flag'
    }
  },
  message: 'Creating user deceased_flag field'
}]
