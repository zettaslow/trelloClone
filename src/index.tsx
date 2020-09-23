import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppStateProvider } from './AppStateContext';
import { DndProvider } from "react-dnd";
import { HTML5Backend as Backend} from "react-dnd-html5-backend"

// Wrapping <App/> with AppStateProvider gives our app a global state

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);