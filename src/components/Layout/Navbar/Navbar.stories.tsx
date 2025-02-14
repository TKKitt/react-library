import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Navbar, {NavbarProps} from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as Meta;

const Template: StoryFn<NavbarProps> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  dropDowns: [
    {label: 'About Us', links: [{label: 'Our Story', to: './test'}, {label: 'Our Team', to: './test'}]}
  ],
  links: [
    { label: 'Track Order', to: 'https://chatgpt.com/' },
    { label: 'Fundraising', to: 'https://chatgpt.com/' },
    { label: 'Shop', to: 'https://chatgpt.com/' },
  ],
};