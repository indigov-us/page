// @flow

import React from 'react'

// when adding icons, update the logic in quick-links.php
import EmailIcon from 'react-icons/lib/io/ios-email-outline'
import PassportIcon from 'react-icons/lib/io/ios-bookmarks-outline'
import QuestionIcon from 'react-icons/lib/io/ios-paper-outline'
import CalendarIcon from 'react-icons/lib/io/calendar'
import WrenchIcon from 'react-icons/lib/io/wrench'
import PeopleIcon from 'react-icons/lib/io/ios-people-outline'
import RibbonIcon from 'react-icons/lib/io/ribbon-a'
import PersonIcon from 'react-icons/lib/io/ios-person-outline'

type Props = {
  title: string,
  link: string,
  icon: string
}

const Icon = (icon: string) => {
  const size = 50

  switch (icon) {
    case 'email':
      return <EmailIcon size={size} />
    case 'passport':
      return <PassportIcon size={size} />
    case 'question':
      return <QuestionIcon size={size} />
    case 'calendar':
      return <CalendarIcon size={size} />
    case 'wrench':
      return <WrenchIcon size={size} />
    case 'people':
      return <PeopleIcon size={size} />
    case 'ribbon':
      return <RibbonIcon size={size} />
    case 'person':
      return <PersonIcon size={size} />
  }
}

const HeroQuickLink = ({title, link, icon}: Props) => (
  <a
    className='db white tc b no-underline ba bg-black-40 b--white-10 relative hover-bg-primary bg-animate'
    href={link}
  >
    <div className='v-center absolute left-0 right-0'>
      {icon && (
        <div className='mb1'>
          {Icon(icon)}
        </div>
      )}
      <div>{title}</div>
    </div>
    <style jsx>{`
      a { height: 150px }
    `}</style>
  </a>
)

export default HeroQuickLink
