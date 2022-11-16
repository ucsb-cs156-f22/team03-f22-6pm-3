import React from 'react';

import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { menuItemReviewsFixtures } from 'fixtures/menuItemReviewsFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemReviewsForm',
    component: MenuItemReviewsForm
};


const Template = (args) => {
    return (
        <MenuItemReviewsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    initialMenuItemReview: menuItemReviewsFixtures.oneReview[0],
    buttonLabel: "Edit",
    submitAction: () => { console.log("Edit was clicked"); }
};
