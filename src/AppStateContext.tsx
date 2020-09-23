import { nanoid } from "nanoid";
import React, { createContext, useReducer, useContext } from "react";
import { DragItem } from "./DragItem";
import { moveItem } from "./moveItem";
import { findItemIndexById } from "./utils/findItemIndexById";

/*
    The overall purpose of this file is to create a kind of poor man's version of Redux for global state management. 
*/

export interface AppState {
    lists: List[];
    draggedItem: DragItem | undefined;
  }
  
  interface Task {
    id: string;
    text: string;
  }
  
  interface List {
    id: string;
    text: string;
    tasks: Task[];
  }

type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_LIST";
      payload: {
          dragIndex: number
          hoverIndex: number
      }
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload: DragItem | undefined;
  };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    // Reducer Logic goes in these blocks.
    case "ADD_LIST": {
        return {
            ...state,
            lists: [
                ...state.lists,
                { id: nanoid(), text: action.payload, tasks: []}
            ]
        };
    }
    case "ADD_TASK": {
        const targetLaneIndex = findItemIndexById(
            state.lists,
            action.payload.listId
        )
        state.lists[targetLaneIndex].tasks.push({
            id: nanoid(),
            text: action.payload.text
        })
        return {
            ...state,
        };
    }
    case "MOVE_LIST": {
        const {dragIndex, hoverIndex } = action.payload
        state.lists = moveItem(state.lists, dragIndex, hoverIndex)
        return { ...state }
    }
    case "SET_DRAGGED_ITEM": {
        return {
            ...state, draggedItem: action.payload 
        }
    }
    default: {
        return state;
    }
  }
};

// Our important global app data (which is a bunch of task lists. )
const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
  draggedItem: undefined
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// Parentheses value defines our default state (an empty object).
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{state, dispatch}}>
      {children}
    </AppStateContext.Provider>
  );
};

// Components can import AppStateContext and access this hook to get access to global state.
export const useAppState = () => {
  return useContext(AppStateContext);
};