import React from 'react';

import RecommendationRequestsTable from "main/components/RecommendationRequests/RecommendationRequestsTable";
import { RecommendationRequestsFixtures } from 'fixtures/RecommendationRequestsFixtures';
// import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/RecommendationRequests/RecommendationRequestsTable',
    component: RecommendationRequestsTable
};

const Template = (args) => {
    return (
        <RecommendationRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    recommendations: []
};

export const ThreeRecommendations = Template.bind({});

ThreeRecommendations.args = {
    recommendations: RecommendationRequestsFixtures.threeRecommendations
};

// export const ThreeDatesAsAdmin = Template.bind({});

// ThreeDatesAsAdmin.args = {
//     recrequests: RecommendationRequests.threeRequests,
//     currentUser: currentUserFixtures.adminUser
// };

