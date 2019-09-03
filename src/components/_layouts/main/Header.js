import React from 'react'
import 'antd/dist/antd.css'
import { PageHeader, Button, Icon } from 'antd'

export default function Header() {
  return (
    <PageHeader
      title={
        <span>
          <Icon type="star" theme="filled" /> Music
        </span>
      }
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}>
      <hr />
    </PageHeader>
  )
}
