---
name: recipecraft-ui
description: Design and implement RecipeCraft responsive UI components, pages, animations, layouts, recipe cards, forms, dashboard interfaces, and mobile experiences.
---

# RecipeCraft UI Skill

## Visual Identity

Primary:
#C8501A

Background:
#FAF8F5

Muted text:
#737C76

Border:
#E8DDD4

## Design Direction

RecipeCraft should feel:

- modern
- premium
- warm
- clean
- food-focused
- professional

Avoid:

- excessive gradients
- excessive glassmorphism
- excessive animations
- cluttered interfaces
- inconsistent spacing

## Responsive Design

Every new interface must work on:

- mobile
- tablet
- desktop

Design mobile behavior intentionally.

Do not simply shrink desktop layouts.

## Animation

Framer Motion is already used.

Use animation for:

- page transitions
- card hover
- buttons
- modals
- drawer/sidebar transitions
- meaningful entrance animations

Avoid animations that interfere with usability.

## Forms

Forms should have:

- clear labels
- validation
- focus states
- loading states
- disabled submit state
- useful error messages
- mobile-friendly controls

## Dashboard

Dashboard is visually separate from public pages.

Do NOT wrap dashboard pages in the public Navbar/Footer.

Desktop:

Sidebar + content

Mobile:

Mobile header + drawer/navigation

## Accessibility

Use:

- semantic HTML
- labels
- keyboard-accessible controls
- visible focus states
- meaningful button labels
- aria attributes when necessary

Do not use clickable divs when a button or link is appropriate.