import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook
import MenuItemReviewsTable from 'main/components/MenuItemReviews/MenuItemReviewsTable';

export default function MenuItemReviewsIndexPage() {

  const currentUser = useCurrentUser();

  const { data: menuItemReviews, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/menuitemreview/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/menuitemreview/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>MenuItem Reviews</h1>
        <MenuItemReviewsTable menuItemReviews={menuItemReviews} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}