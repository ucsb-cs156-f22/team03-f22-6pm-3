import React from 'react';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function RecommendationRequestsIndexPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>RecommendationRequests</h1>
        <input type='text' placeholder = "RecommendationRequests placeholder text" />
      </div>
    </BasicLayout>
  )
}