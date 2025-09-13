import { Sandpack } from "@codesandbox/sandpack-react";
import { IconBtn } from './shared/IconBtn';
import { styles } from './cardNameApp/styles';
import { store } from './cardNameApp/store';
import { App } from './cardNameApp/App';
import { CreditCard } from './cardNameApp/CreditCard';
import { Form } from './cardNameApp/Form';
import { SkeletonInput } from './cardNameApp/SkeletonInput';
import { InputGroup } from './cardNameApp/InputGroup';

export const CardNameDemo = () => {
  return (
    <div>
      <Sandpack
        theme="auto"
        template="react"
        options={{
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 800,
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            muestate: "latest",
          },
          entry: "/index.js",
        }}
        files={{
          "tailwind.css": {
            hidden: true,
            code: `
  @keyframes fadeSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-slide-in {
    animation: fadeSlideIn 0.3s ease-in-out;
  }
`
          },
          "/index.js": {
            hidden: true,
            code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './tailwind.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>
);`,
          },
          "/store.ts": {
            code: store,
            active: true,
          },
          "/App.tsx": App,
          "/CreditCard.tsx": CreditCard,
          "/Form.tsx": Form,
          "/InputGroup.tsx": InputGroup,
          "/styles.ts": {
            hidden: true,
            code: styles
          },
          "/SkeletonInput.tsx": {
            hidden: true,
            code: SkeletonInput
          },
          "/IconBtn.tsx": {
            hidden: true,
            code: IconBtn
          },
        }}
      />
    </div>
  );
};
