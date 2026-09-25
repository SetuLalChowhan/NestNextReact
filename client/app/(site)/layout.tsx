
import SiteLayout from '@/layout/SiteLayout'
import React from 'react'


interface Props {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <SiteLayout>
      {children}
    </SiteLayout>
  )
}

export default layout