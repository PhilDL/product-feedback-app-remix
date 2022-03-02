import { Meta } from "@storybook/react";
import { ComponentStory } from "@storybook/react";
import { FC } from "react";
import { MemoryRouter } from "react-router";

import RoadmapMenu, {
  RoadmapMenuProps,
} from "../../app/components/RoadmapMenu";

const meta: Meta = {
  title: "components/RoadmapMenu",
  component: RoadmapMenu,
};
export default meta;

const Template: ComponentStory<FC<RoadmapMenuProps>> = (args) => (
  <MemoryRouter>
    <RoadmapMenu {...args} />
  </MemoryRouter>
);

const feedbackStatuses = [
  { name: "Planned", key: "planned", count: 0, color: "#F49F85" },
  { name: "In-Progress", key: "in-progress", count: 0, color: "#AD1FEA" },
  { name: "Live", key: "live", count: 0, color: "#62BCFA" },
];

export const Default = Template.bind({});
Default.args = {
  feedbackStatuses: feedbackStatuses,
};
