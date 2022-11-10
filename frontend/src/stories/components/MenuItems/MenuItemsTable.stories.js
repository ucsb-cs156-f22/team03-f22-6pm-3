import React from 'react';

import MenuItemsTable from "main/components/MenuItems/MenuItemsTable";
import { menuItemsFixtures } from 'fixtures/menuItemsFixtures';

export default {
    title: 'components/MenuItems/MenuItemsTable',
    component: MenuItemsTable
};

const Template = (args) => {
    return (
        <MenuItemsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuitems: []
};

export const ThreeMenuitem = Template.bind({});

ThreeMenuitem.args = {
    menuitems: menuItemsFixtures.threeMenuItem
};

