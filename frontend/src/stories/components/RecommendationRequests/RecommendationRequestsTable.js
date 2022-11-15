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
    recrequests: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    recrequests: RecommendationRequestsFixtures.threeRequests
};

// export const ThreeDatesAsAdmin = Template.bind({});

// ThreeDatesAsAdmin.args = {
//     recrequests: RecommendationRequests.threeRequests,
//     currentUser: currentUserFixtures.adminUser
// };

