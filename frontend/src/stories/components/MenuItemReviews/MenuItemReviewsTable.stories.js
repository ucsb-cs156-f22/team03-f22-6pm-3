import React from 'react';

import MenuItemReviewsTable from "main/components/MenuItemReviews/MenuItemReviewsTable";
import { menuItemReviewsFixtures } from 'fixtures/menuItemReviewsFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemsReviewTable',
    component: MenuItemReviewsTable
};

const Template = (args) => {
    return (
        <MenuItemReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItemReviews: []
};

export const OneDate = Template.bind({});
OneDate.args = {
    menuItemReviews: menuItemReviewsFixtures.oneReview
}

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    menuItemReviews: menuItemReviewsFixtures.threeReviews
};


