// ---------------------------------------------------------
// CommonButton.tsx
// ---------------------------------------------------------
//
// A reusable “CommonButton” that wraps Kendo’s Button but 
// applies our own styling (via CommonButton.scss).
//
// Props:
//   - startIcon          : optionally render an icon node before children
//   - disabled           : boolean
//   - isLoading          : boolean (shows a simple spinner & disables interactions)
//   - onClick            : (e) => void
//   - href               : string (if present, renders an <a> instead of <button>)
//   - fillMode           : "contained" | "outlined" (maps to our SCSS modifiers)
//   - themeColor         : "primary" | "secondary" (also maps to SCSS)
//   - customClass        : string (for any extra classes)
//   - fullWidth          : boolean (stretches width: 100%)
//   - children           : ReactNode (button label/text)
//   - ...rest            : any other <button> / <a> attributes as needed
//
// Usage: See README.md below.
// ---------------------------------------------------------

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as KendoButton } from '@progress/kendo-react-buttons';
import './CommonButton.scss';

type FillMode = 'contained' | 'outlined';
type ThemeColor = 'primary' | 'secondary';

interface BaseProps {
  startIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  fillMode?: FillMode;
  themeColor?: ThemeColor;
  customClass?: string;
  fullWidth?: boolean;
  children: ReactNode;
  // Allow passing any extra attributes (e.g., type="submit", target, rel, etc.)
  [key: string]: any;
}

/**
 * If href is provided, we render an <a> styled as a button.
 * Otherwise, we render a Kendo <Button>.
 */
export const CommonButton: React.FC<BaseProps> = (props) => {
  const {
    startIcon,
    disabled = false,
    isLoading = false,
    onClick,
    href,
    fillMode = 'contained',
    themeColor = 'primary',
    customClass = '',
    fullWidth = false,
    children,
    ...rest
  } = props;

  // Compute class names:
  const classes = [
    'common-button',
    themeColor,
    fillMode,
    fullWidth ? 'full-width' : '',
    isLoading ? 'loading' : '',
    customClass,
  ]
    .filter((c) => c && c.length > 0)
    .join(' ');

  // Simple spinner: you can replace with a Kendo loader or SVG.
  const Spinner = () => (
    <span
      style={{
        width: 16,
        height: 16,
        border: '2px solid rgba(255,255,255,0.6)',
        borderTopColor: 'rgba(255,255,255,1)',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.6s linear infinite',
        marginRight: startIcon ? 4 : 0,
      }}
    />
  );

  // Keyframes for spinner (injecting as inline <style> because SCSS not set up for 
  // keyframes in this file; you can move this to a global CSS/SCSS if preferred).
  const spinnerKeyframes = (
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  );

  // Button contents: spinner (if loading) → startIcon → text
  const content = (
    <>
      {spinnerKeyframes}
      {isLoading ? (
        <Spinner />
      ) : (
        startIcon && <span className="btn-icon">{startIcon}</span>
      )}
      <span className="btn-text">{children}</span>
    </>
  );

  if (href) {
    // Render an anchor styled as a button
    return (
      <a
        className={classes}
        href={href}
        onClick={disabled || isLoading ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled || isLoading}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Render a Kendo Button
  return (
    <KendoButton
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {content}
    </KendoButton>
  );
};

export default CommonButton;
