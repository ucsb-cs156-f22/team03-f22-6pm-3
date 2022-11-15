import React from 'react';

import HelpRequestForm from "main/components/HelpRequests/HelpRequestForm"
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestForm',
    component: HelpRequestForm
};


const Template = (args) => {
    return (
        <HelpRequestForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: () => { console.log('Submit was clicked'); }
};

export const Show = Template.bind({});

Show.args = {
    initialRequests: helpRequestsFixtures.oneHelpRequest,
    buttonLabel: "",
    submitAction: () => { }
};
