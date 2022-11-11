import React from 'react';

import HelpRequestsForm from "main/components/HelpRequests/HelpRequestsForm"
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestsForm',
    component: HelpRequestsForm
};


const Template = (args) => {
    return (
        <HelpRequestsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: (data) => { console.log('Create was clicked, parameter to submitAction=',data); }
};

export const Show = Template.bind({});

Show.args = {
    initialCommons: helpRequestsFixtures.oneHelpRequest,
    buttonLabel: "Update",
    submitAction: (data) => { console.log('Update was clicked, parameter to submitAction=',data); }
};
