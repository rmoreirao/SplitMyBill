Create a Web App based on these instructions:

## Instructions for the Copilot Agent ##

1) Understand all the Technical requirements for the foundation of the implementation
2) Implement all the "SplitMyBill Features"
3) At the end of the process validate that both Technical Requirements and Features are implemented


## Technical Foundation

Create a responsive, modern web application using only HTML5, CSS3, and vanilla JavaScript. The application should:

```
- Use semantic HTML5 elements for better accessibility and SEO
- Implement responsive design using CSS Grid and Flexbox
- Follow progressive enhancement principles
- Maintain clean separation between structure (HTML), presentation (CSS), and behavior (JS)
- Use ES6+ features with appropriate polyfills/fallbacks
- Implement client-side data validation and error handling
- Support offline functionality using Service Workers and local storage
- Follow WCAG accessibility guidelines (minimum AA compliance)
- Optimize performance with lazy loading and resource minification
- Implement proper security measures for user data
```

## UI/UX Design Approach

```
- Create a vibrant color palette featuring bold, contrasting colors (purples, teals, electric blues)
- Use playful animations for interactions (bounces, zooms, subtle particle effects)
- Incorporate nerdy references and Easter eggs throughout the UI
- Design with a pixel-perfect, clean interface despite the playful elements
- Use consistent spacing, alignment, and visual hierarchy
- Include dark mode toggle with appropriate persistence
- Implement micro-interactions for better user feedback
- Use skeleton screens during loading rather than spinners
```

## Open Source Resources

```
- Icons: Phosphor Icons or Remix Icons (nerdy, customizable SVG icons)
- CSS Framework: Water.css or Pico.css (lightweight, classless foundations)
- Animations: Animate.css for predefined animations
- Fonts: JetBrains Mono for code-like elements, combined with a clean sans-serif like Inter
- Color Palette: Generate from Coolors.co with bright, bold options
- Illustrations: unDraw or Open Doodles for fun, consistent artwork
```

## Implementation Guidelines

```
- Start with mobile-first design approach
- Build modular JavaScript with clear component structure
- Use CSS custom properties for theming
- Implement proper error states with humorous messages
- Create intuitive navigation with breadcrumbs where appropriate
- Focus on instant visual feedback for all user interactions
- Add subtle sound effects (optional, muted by default)
- Include humorous tooltips and helper text
- Implement proper form validation with nerdy error messages
- Add keyboard shortcuts for power users with a discoverable guide
```

## SplitMyBill Features

The journey must be:

1) Landing Page:
   - App title
   - "How Many Friends to Split the Bill?"
   - Dropdown with the possible number of friends - selected 0 by default and max 20.
   - When the user selects it, transition to next journey

2) Friends / Expense form
   - Each Friend can have maximun 10 bills
   - There must be a "Grid" with three columns: Friend, Bills and Total
   - Friend name and Amount are text boxes.
   - Friend Name must be pre-populated with "Friend{N}" - for example: Friend1
   - Bill must be populate with "0.00" - it must follow the number formating must follow the number formatting of the machine.
   - Bill must be pre-created with 2 "bills" - textboxes.
   - On the right side of the bills, there must a "plus" icon, where people can add more "bills" - textboxes.
   - "Total" column must be calculate as the total of the bills of that specific friend. For example - if a person has 2 bills of 10$ and 5$, total must be 15$
   - Total us calculated as the user enter the amounts
   - At the end of the journey, there must be a buttons called "Split Evenly" and "Reset Amounts"
   - "Split Evenly" will split the bills and move to the next journey
   - "Reset Amounts" will reset the "bills" column to the initial state

3) Calculation Summary:
   - Clear visual of the total amounts and who owes whom with exact amounts
   - Optimized to minimize number of transactions
   - Option to move back to the previous journey 
   - The calculation summary must be:

   ```
        Total Spent by Each:
        - Friend1: $20,00 + 0,05 = $20,05
        - Friend2: $0
        - Friend3: $0
        Total Spent: $20,05
        Each should pay: $20,05 / 3 = $6,69
   ```

4) The User Journeys:
   - The user journey is all in a single page
   - Users must be "sent down" on the page for each user journey. When they are moving "back" - it needs to move up.
   - There must be a smooth transition between the user journeys.

