# windows-98-ui

React component library inspired by and using the css from [98.css](https://github.com/jdan/98.css) library for vanilla html

![npm](https://img.shields.io/npm/v/windows-98-ui)
![license](https://img.shields.io/github/license/bensimmers/windows-98-ui)
![build](https://img.shields.io/github/actions/workflow/status/bensimmers/windows-98-ui/main.yml?branch=main)

## Overview

`windows-98-ui` is a React component library that brings the nostalgic look and feel of Windows 98 to your modern web applications. It leverages the [98.css](https://github.com/jdan/98.css) library to provide authentic styling.

## View Components

You can view the components using this storybook [link](https://bensimmers.github.io/windows-98-ui/)

## Installation

```bash
npm install windows-98-ui
```

## Usage

Here's a quick example of how to use the `Button` component:

```jsx
import React from 'react';
import { Button } from 'windows-98-ui';

function App() {
  return (
    <div>
      <Button onClick={() => alert('Clicked!')}>Click Me</Button>
    </div>
  );
}

export default App;
```

## Local Development

To set up the project locally, follow these steps:

```bash
git clone <repo>
cd windows-98-ui
npm install
npm start
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
