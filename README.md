# Frontend Mentor - Product feedback app solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6), for my personal Frontend Training routine.

## Table of contents

- [Frontend Mentor - Product feedback app solution](#frontend-mentor---product-feedback-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
      - [Desktop](#desktop)
      - [Mobile](#mobile)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

#### Desktop
![Desktop Version](./public/image.png)

#### Mobile
![Mobile Version](./public/image-mobile.png)


### Links

- Live Site URL: [https://product-feedback-app-remix.fly.dev/](https://product-feedback-app-remix.fly.dev/)
- Live Storybook URL: [https://main--6219d1181996c3003a295003.chromatic.com](https://main--6219d1181996c3003a295003.chromatic.com)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- Accessibility
- TypeScript
- [React](https://reactjs.org/) - JS library
- [Remix](https://remix.run/) - React framework
- [TailwindCSS 3](https://tailwindcss.com/) - For styles
- [Prisma](https://www.prisma.io/) - For Database and SQLite
- [Storybook](https://storybook.js.org) - Storybook: UI component explorer for frontend developers

### What I learned

My initial requirement was to practice some TypeScript, so I used a lot (https://react-typescript-cheatsheet.netlify.app/)[https://react-typescript-cheatsheet.netlify.app/] and tried to apply some of the good practices.

I wasn't sure wich technology between Remix and NextJS to practice/learn so i begin by doing a Design System of React components with StoryBook and Tailwind (easier to migrate between Next and Remix, i also wanted to use something else than styled components). The goal was to make a Fullstack App.


### Continued development

- I would like to make some refactoring into hooks to clean up code.
- Storybook is now broken, some of the Components need special Context and i'm not proud about that. I would like them to be the most presentationnal possible but i still need some work.

## Author

- Website - [Coding Dodo](https://codingdodo.com)
- Twitter - [@_philDL_](https://twitter.com/_philDL)


## Acknowledgments

Thanks to Josh from the [CSS For JS Dev course](https://courses.joshwcomeau.com/css-for-js) for this amazing ressource.