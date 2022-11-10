import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemsTable from 'main/components/MenuItems/MenuItemsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function MenuItemsIndexPage() {

  const currentUser = useCurrentUser();

  const { data: menuItem, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ucsbdinningcommonsmenu/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/ucsbdinningcommonsmenu/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>MenuItems</h1>
        <MenuItemsTable menuItem={menuItem} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}