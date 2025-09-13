import { Sandpack } from "@codesandbox/sandpack-react";
import { IconBtn } from './shared/IconBtn';
import { ActionBtn } from './shared/ActionBtn';
import { styles } from './todoAdvancedApp/styles';
import { state } from './todoAdvancedApp/state';
import { store } from './todoAdvancedApp/store';
import { App } from './todoAdvancedApp/App';
import { TodoForm } from './todoAdvancedApp/TodoForm';
import { TodoCategories } from './todoAdvancedApp/TodoCategories';
import { TodoList } from './todoAdvancedApp/TodoList';
import { TodoFooter } from './todoAdvancedApp/TodoFooter';

export const TodoAdvancedDemo = () => {
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
            uuid: "latest",
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
          "/state.ts": state,
          "/store.ts": {
            code: store,
            active: true,
          },
          "/App.tsx": App,
          "/TodoForm.tsx": TodoForm,
          "/TodoCategories.tsx": TodoCategories,
          "/TodoList.tsx": TodoList,
          "/TodoFooter.tsx": TodoFooter,
          "/styles.ts": {
            hidden: true,
            code: styles
          },
          "/IconBtn.tsx": {
            hidden: true,
            code: IconBtn
          },
          "/ActionBtn.tsx": {
            hidden: true,
            code: ActionBtn
          },
        }}
      />
    </div>
  );
};
