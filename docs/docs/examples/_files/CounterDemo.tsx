import { Sandpack } from "@codesandbox/sandpack-react";
import { styles } from './counterApp/styles';
import { store } from './counterApp/store';
import { App } from './counterApp/App';
import { Form } from './counterApp/Form';
import { Footer } from './counterApp/Footer';
import { IconBtn } from './counterApp/IconBtn';
import { SkeletonCore } from './counterApp/SkeletonCore';
import { Skeleton } from './counterApp/Skeleton';

export const CounterDemo = () => {
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
          "/index.js": {
            hidden: true,
            code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

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
          "/Form.tsx": Form,
          "/Footer.tsx": Footer,
          "/styles.ts": {
            hidden: true,
            code: styles
          },
          "/animation.css": {
            hidden: true,
            code: `@keyframes slideup {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.show {
  animation: slideup 0.3s ease-in-out;
}

.hide {
  animation: slideup 0.1s ease-in-out reverse;
}
`
          },
          "/IconBtn.tsx": {
            hidden: true,
            code: IconBtn
          },
          "/SkeletonCore.tsx": {
            hidden: true,
            code: SkeletonCore
          },
          "/Skeleton.tsx": {
            hidden: true,
            code: Skeleton
          },
        }}
      />
    </div>
  );
};
