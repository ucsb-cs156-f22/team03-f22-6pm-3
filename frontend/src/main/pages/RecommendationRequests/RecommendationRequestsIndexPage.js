import React from 'react';
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RecommendationRequestsTable from 'main/components/RecommendationRequests/RecommendationRequestsTable';
import { useCurrentUser } from 'main/utils/currentUser'

export default function RecommendationRequestsIndexPage() {
  
  const currentUser = useCurrentUser();

  const { data: recommendations, error: _error, status: _status } =
    useBackend(

      ["/api/recommendationrequests/all"],

            { method: "GET", url: "/api/recommendationrequests/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>RecommendationRequests</h1>
        <RecommendationRequestsTable recommendations={recommendations} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}