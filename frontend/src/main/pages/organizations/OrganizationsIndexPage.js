import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
//import UCSBDatesTable from 'main/components/UCSBDates/UCSBDatesTable';
import _OrganizationsTable from 'main/components/Organizations/OrganizationsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function OrganizationsIndexPage() {

  const _currentUser = useCurrentUser();

  
  const { data: _organizations, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/ucsborganization/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
           { method: "GET", url: "/api/ucsborganization/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSB Organizations</h1>
        {/*<OrganizationsTable dates={organizations} currentUser={currentUser} />*/}
      </div>
    </BasicLayout>
  )
}