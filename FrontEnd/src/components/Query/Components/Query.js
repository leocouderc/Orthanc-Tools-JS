import React, { Fragment } from 'react'
import QueryForm from '../Connected_Components/QueryForm'
import TableResultStudy from '../Connected_Components/TableResultStudy'

export default function Query () {
  return (
    <Fragment>
      <QueryForm />
      <TableResultStudy />
    </Fragment>
  )
}
