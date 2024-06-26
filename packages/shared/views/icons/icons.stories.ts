import type { Meta, StoryObj } from "@storybook/html";
import { BurgerIcon, SearchIcon } from ".";

const meta: Meta = {
    title: "icons",
    tags: ["autodocs"],
    render: ({ icon }) => {
        const div = document.createElement("div");
        div.innerHTML = icon;

        setInterval(() => {
            div.setAttribute(
                "aria-expanded",
                div.getAttribute("aria-expanded") === "true" ? "false" : "true",
            );
        }, 1000);

        return div;
    },
};

export default meta;
type Story = StoryObj;

export const Burger: Story = {
    args: {
        icon: BurgerIcon().render({ language: "nb" }),
    },
};

export const Search: Story = {
    args: {
        icon: SearchIcon({ menuSearch: true }).render({ language: "nb" }),
    },
};
