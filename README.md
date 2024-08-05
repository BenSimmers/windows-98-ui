# windows-98-ui

React component library inspired by and using the css from [98.css](https://github.com/jdan/98.css) library for vanilla html

## Installation

```bash
npm install windows-98-ui
```

## Usage

windows-98-ui is a collection of React components that can be used to build a Windows 98 inspired UI. One cool feature about this library is that we can use the components as they are or extend them to create other components without having to worry about the styling or adding extra code.

e.g. we use a the `as` prop to override the default HTML tag of a component.

````jsx
import { TextBox } from 'windows-98-ui';
<TextBox
  as="input"
  className="textbox-override"
  id="text17"
  label="Occupation"
  stacked={true}
  type="text"

/>

// we can override the default HTML tag of the TextBox component to use a different HTML tag or another React component.

<TextBox
  as="textarea"
  className="textbox-override"
  id="text17"
  label="Occupation"
  stacked={true}
  type="text"
/>

### Button

The Button component is a simple button that can be used to trigger an action. The windows-98-ui library provides a Button component which extends the native button element. The Button component can be used to create a button with a label and a disabled state.

```jsx
import { Button } from 'windows-98-ui';

// Base
<Button label="Button"  />

// Disabled
<Button label="Disabled" disabled={true} />
````

### Dropdown

The Dropdown component is a simple dropdown that can be used to select an option from a list. The windows-98-ui library provides a Dropdown component which extends the native select element. The Dropdown component can be used to create a dropdown with a list of options.

```jsx
import { Dropdown } from 'windows-98-ui';
<Dropdown
  options={[
    {
      label: '5 - Incredible!',
      value: '5',
    },
    {
      label: '2 - Not so great',
      value: '2',
    },
    {
      label: '1 - Unfortunate',
      value: '1',
    },
  ]}
/>;

// as prop is an override of the default HTML tag. Can also be another React component.
<Dropdown
  as="select" // or any other React component
  options={[
    {
      label: '5 - Incredible!',
      value: '5',
    },
    {
      label: '2 - Not so great',
      value: '2',
    },
    {
      label: '1 - Unfortunate',
      value: '1',
    },
  ]}
/>;
```

### Slider

The Slider component is a simple slider that can be used to select a value from a range. The windows-98-ui library provides a Slider component which extends the native input element. The Slider component can be used to create a slider with a range of values.

```jsx
import { Slider } from 'windows-98-ui';
<Slider
  id="range25" // reference for label
  label="Volume:"
  max="11"
  min="1"
  value="5"
/>;
```

### TextBox

The TextBox component is a simple text box that can be used to input text. The windows-98-ui library provides a TextBox component which extends the native input element. The TextBox component can be used to create a text box with a placeholder and a value.

```jsx
import { TextBox } from 'windows-98-ui';

<TextBox as="input" className="textbox-override" id="text17" label="Occupation" stacked={true} type="text" />;
```
