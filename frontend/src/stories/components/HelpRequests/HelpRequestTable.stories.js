import React from 'react';

import HelpRequestsTable from "main/components/HelpRequests/HelpRequestTable";
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestTable',
    component: HelpRequestsTable
};

const Template = (args) => {
    return (
        <HelpRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    requests: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    requests: helpRequestsFixtures.threeHelpRequests
};


