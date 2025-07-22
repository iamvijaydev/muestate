---
sidebar_position: 1
title: Muestate
description: A React library for creating stores with mutable state and shared via context API.
---

# Muestate
A React library for creating stores with mutable state and shared via context API. Store read/write doesn't cause re-renders. Convert state to reactive in select desired components.

In an app with complex data structure or sofisticated UI with numerious DOM node, this library provides means to control which part of app should render and when. Fine tune performance of any desired DOM node, small or big, via internal core utilities.

At Muestate's core:
1. State is mutable `useRef`, app wont re-render on state changes
2. State changes can be subscribed to made reactive using `useState`
3. If required, a sub-set of the state can be subscribed and made reactive
4. State and methods are encapsulated as a singleton store
5. Store is initialized and accessible via Context