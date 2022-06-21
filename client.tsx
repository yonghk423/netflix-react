import React from 'react';
import App from './app'

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

//-------------React 17-----------------
// import React from 'react';
// import { render } from 'react-dom';
// import App from './app'

// render(
//     <App />,    
//     document.querySelector('#app')
// );

