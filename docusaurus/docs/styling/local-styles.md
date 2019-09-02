---
id: local-styles
title: Local Styles
---

**NextWeb.js** uses [**Emotion**](https://emotion.sh/) for styling. The combining of ```css``` prop and ```Object Styles``` make styling in react app super easy. No more imports!

```javascript
function MainLayout({ children }) {
  return (
    <div css={{ maxWidth: 960, margin: '0 auto' }}>
      <main>{children}</main>
    </div>
  )
}
```

To make this happen, we have to add a babel preset.

```bash
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

Fortunately, **NextWeb.js** handles this for you. All you have to do is to write some styles and see the [**document**](https://emotion.sh/docs/object-styles) from emotion.