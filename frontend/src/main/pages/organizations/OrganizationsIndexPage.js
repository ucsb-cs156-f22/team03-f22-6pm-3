import React from 'react'

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function OrganizationIndexPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Help Requests</h1>
        <input type="text" placeholder="Organization placeholder text" />
      </div>
    </BasicLayout>
  )
}