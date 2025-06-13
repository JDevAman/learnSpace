# Framer Motion

## Overview

* Open source animation library specifically designed for React based smooth animation and interactions with minimal code.

* When to choose framer motion: Built for react

* When to choose GSAP:  Advanced library

## Basic Animation

Install - `npm i motion`
To Apply:

* Motion components: Make it as \<motion.div>
* Animate Props:
  Animate: Final Properties, give animate as prop and provide object
  Transition: delay, duration,repeat, ease: anticipate
  Initial: Initial Properties
* Simple Transitions
* Creating and using variants

## Advanced Animation

* KeyFrame animation: Move / Rotate thru steps.
* Drag Animation: Issue - Giving constraints.
* Hover and tap animation
* Staggering animation
* Sequencing animation

## Advanced concepts

* Scroll animations:
  GSAP: ScrollTrigger
  Framer Motion: UseScroll - it returns a object which gives XAxisProgress, YAxisProgress, scrollX, scrollY
* Animating layout
* Using 'AnimatePresence'
* Creating customAnimation Hooks

## Additional Key Concepts

* **`whileInView`**

  * Triggers animation when the component scrolls into view.

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
/>
```

* **`useInView` hook**

  * For logic-controlled visibility animations using refs.

```jsx
const ref = useRef(null);
const inView = useInView(ref, { once: true });
```

* **Shared Layout Animations (`layoutId`)**

  * Morph animations between components.

```jsx
<motion.div layoutId="image" />
```

* **`LayoutGroup` (formerly AnimateSharedLayout)**

  * Groups layout animations.

```jsx
import { LayoutGroup } from "framer-motion";

<LayoutGroup>
  {/* Components with layoutId */}
</LayoutGroup>
```

* **`motionValue` & `useTransform`**

  * `motionValue` is reactive animation state.
  * `useTransform` maps values (e.g., scroll to opacity).

```jsx
const scrollY = useScroll();
const scale = useTransform(scrollY.scrollY, [0, 300], [1, 0.5]);
```

* **Physics-Based Spring Animation**

```jsx
transition={{ type: "spring", stiffness: 200, damping: 20 }}
```

* **`layout` Prop**

  * Animates layout changes (position, size).

```jsx
<motion.div layout />
```

* **Exit Animations with `AnimatePresence`**

  * Animates element removal.

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```
