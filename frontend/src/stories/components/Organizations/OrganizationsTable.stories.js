import React from 'react';

//import UCSBDatesTable from "main/components/UCSBDates/UCSBDatesTable";
import OrganizationsTable from 'main/components/Organizations/OrganizationsTable';
//import { ucsbDatesFixtures } from 'fixtures/ucsbDatesFixtures';
import { ucsbOrganizationFixtures } from 'fixtures/OrganizationsFixtures';

export default {
    title: 'components/Organizations/OrganizationsTable',
    component: OrganizationsTable
};

const Template = (args) => {
    return (
        <OrganizationsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    organizations: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    organizations: ucsbOrganizationFixtures.threeOrganizations
};


