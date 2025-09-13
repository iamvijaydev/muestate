import { Sandpack } from "@codesandbox/sandpack-react";
import { IconBtn } from './shared/IconBtn';
import { styles } from './counterApp/styles';
import { store } from './counterApp/store';
import { App } from './counterApp/App';
import { Form } from './counterApp/Form';
import { InputGroup } from './counterApp/InputGroup';
import { Footer } from './counterApp/Footer';
import { SkeletonCore } from './counterApp/SkeletonCore';
import { Skeleton } from './counterApp/Skeleton';

export const FiltersDemo = () => {
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
          "/InputGroup.tsx": InputGroup,
          "/Footer.tsx": Footer,
          "/styles.ts": {
            hidden: true,
            code: styles
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
