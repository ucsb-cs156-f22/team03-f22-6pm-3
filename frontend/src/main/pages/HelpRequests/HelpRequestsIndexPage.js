import React from 'react'

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function HelpRequestsIndexPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Help Requests</h1>
        <input type="text" placeholder="Help Requests placeholder text" />
      </div>
    </BasicLayout>
  )
}