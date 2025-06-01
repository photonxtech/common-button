# common-kendo-button

A reusable Button component for React + Kendo, written in TypeScript with SCSS styling.  
Supports —  
- **Primary** & **Secondary** themes  
- **Contained** (solid) and **Outlined** (ghost) fill modes  
- `startIcon`, `isLoading`, `disabled`, `href`, `onClick`, `fullWidth`, and more  
- Customizable via SCSS variables for colors, sizing, fonts, etc.  

---

## Installation

```bash
# Assuming you already have a React + Kendo setup:
npm install common-kendo-button
```

> **Peer dependencies:**  
> - `react` (≥16.8.0)  
> - `react-dom` (≥16.8.0)  
> - `@progress/kendo-react-buttons` (≥9.1.0)  
> - `@progress/kendo-theme-default` (≥10.0.1)  

---

## Quick Start

```tsx
// App.tsx (or any other file)
import React from 'react';
import { CommonButton } from 'common-kendo-button';
import { Icon } from '@progress/kendo-react-indicators'; // example icon

export const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <CommonButton
        fillMode="contained"
        themeColor="primary"
        startIcon={<Icon name="download" />}
        isLoading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        Download
      </CommonButton>

      <CommonButton
        fillMode="outlined"
        themeColor="secondary"
        customClass="my-extra-class"
        style={{ marginLeft: '1rem' }}
        onClick={() => alert('Clicked!')}
      >
        Cancel
      </CommonButton>

      <CommonButton
        fillMode="contained"
        themeColor="primary"
        href="https://example.com"
        style={{ marginTop: '1rem' }}
        fullWidth
      >
        Go to example.com
      </CommonButton>
    </div>
  );
};
```

---

## Props

| Prop           | Type                                           | Default      | Description                                                                                     |
|----------------|------------------------------------------------|--------------|-------------------------------------------------------------------------------------------------|
| `startIcon`    | `ReactNode`                                    | `undefined`  | Renders an icon (or any node) to the left of the button text.                                   |
| `disabled`     | `boolean`                                      | `false`      | When `true`, disables hover/focus interactions.                                                 |
| `isLoading`    | `boolean`                                      | `false`      | When `true`, shows a spinner and disables click.                                                |
| `onClick`      | `(e: MouseEvent) => void`                      | `undefined`  | Click handler.                                                                                  |
| `href`         | `string`                                       | `undefined`  | If present, renders an `<a>` instead of a `<button>`.                                           |
| `fillMode`     | `"contained"` \| `"outlined"`                  | `"contained"`| “contained” = solid background; “outlined” = ghost/outlined.                                    |
| `themeColor`   | `"primary"` \| `"secondary"`                   | `"primary"`  | Which color theme to use.                                                                       |
| `customClass`  | `string`                                       | `''`         | Additional CSS class names to apply.                                                            |
| `fullWidth`    | `boolean`                                      | `false`      | If `true`, stretches button to `width: 100%`.                                                   |
| `children`     | `ReactNode`                                    | _required_   | Button label or inner content.                                                                  |
| _any other_    | _`[key: string]: any`_                         | _–_          | Extra `<button>` / `<a>` props (e.g. `type="submit"`, `target`, `rel`, inline `style`, etc.).  |

---

## SCSS Variables & Customization

The SCSS file (`CommonButton.scss`) defines these CSS variables at `:root`:

```scss
:root {
  /* Primary */
  --kendo-button-primary: #87B668;
  --kendo-button-primary-hover: #70A84C;
  --kendo-white-bg: #ffffff;

  /* Secondary */
  --kendo-button-secondary: #656565;
  --kendo-button-secondary-hover: #202020;
  --kendo-button-secondary-disabled-border: #EAE6E6;
  --kendo-button-secondary-disabled: #A4A4A4;
}
```

If you need to override any of these colors, add a higher-priority CSS rule (e.g. in your global `_variables.scss` or a parent stylesheet) such as:

```scss
:root {
  --kendo-button-primary: #FF5722;              // override “primary” fill
  --kendo-button-primary-hover: #E64A19;        // override “primary” hover
  --kendo-button-secondary: #3F51B5;            // override “secondary”
  --kendo-button-secondary-hover: #303F9F;      // override “secondary” hover
}
```

You can also adjust typography or sizing by overriding the `.common-button` rules:

```scss
.common-button {
  font-size: 16px;
  font-family: "YourCustomFont", sans-serif;
  border-radius: 8px;
}
```

---

## How It Works

1. **SCSS class names:**  
   - `.common-button` (base)  
   - add `.primary` or `.secondary`  
   - add `.contained` or `.outlined`  
   - optionally `.full-width` or `.loading`  
   - plus any `customClass` you pass  

2. **Contained vs Outlined:**  
   - **Contained** → solid background, white text  
   - **Outlined** → white background, colored text and border  

3. **Disabled & Loading States:**  
   - If `disabled` or `isLoading` is `true`, we add `pointer-events: none` and apply a half-opacity style.  
   - When `isLoading`, we inject a small spinner to the left of the text (adjustable).  

4. **Icons:**  
   - If you pass `startIcon={<SomeIcon />}`, it renders inside a `<span class="btn-icon">…</span>` before the label. Adjust margin/size in SCSS as needed.

5. **Link support:**  
   - Pass an `href` prop and it renders `<a class="common-button …">…</a>`.  
   - We still apply all the same classes/SCSS so it looks identical to a `<button>`.  

---

## Example

```tsx
import React from 'react';
import { CommonButton } from 'common-kendo-button';
import { Icon } from '@progress/kendo-react-indicators';

const Example: React.FC = () => {
  return (
    <div>
      <CommonButton
        fillMode="contained"
        themeColor="primary"
        startIcon={<Icon name="upload" />}
        onClick={() => console.log('Uploaded!')}
      >
        Upload
      </CommonButton>

      <CommonButton
        fillMode="outlined"
        themeColor="secondary"
        disabled
        style={{ marginLeft: '1rem' }}
      >
        Disabled
      </CommonButton>

      <CommonButton
        fillMode="contained"
        themeColor="secondary"
        href="https://website.com"
        fullWidth
        style={{ marginTop: '1rem' }}
      >
        Visit Website
      </CommonButton>
    </div>
  );
};
```

---

## Notes

- If you already have a global Kendo theme imported (e.g. via `@progress/kendo-theme-default/dist/all.css`), the base Kendo Button CSS will be loaded. Our SCSS `.common-button` rules override colors and sizing.  
- Feel free to fork or adjust any part of this package—for instance, swap out the spinner `<span>` for Kendo’s own `<Loader>` if you prefer.  
- If you want to add more variants (e.g. “success”, “warning”), simply add new CSS variables (e.g. `--kendo-button-success`) and extend the SCSS with `.success.contained`, `.success.outlined`, etc.  