import './index.css';
import { buttonClassName } from '@acme/ds';

const className = buttonClassName();
document.body.innerHTML = `<button class="${className}">Welcome</button><pre>class="${className}"</pre>`;
