import { createFileRoute } from '@tanstack/react-router'
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {addValue, removeValue} from "@/redux/valueReducer.ts";
import {use, useCallback} from "react";
import {IsOnlineContext} from "@/contexts/IsOnlineProvider.tsx";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const vals = useAppSelector(s => s.todos);
  const dispatch = useAppDispatch();
  const isOnline = use(IsOnlineContext);
  
  const newValue = useCallback(() => {
      const max = Math.max(...vals.map(x => x.order), 0) + 1;
      dispatch(addValue({type: addValue.name, data: {order: max , text: `test ${max}`, completed: false}}))
  }, [vals]);
  
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
          <div className="w-max">{isOnline ? "ONLINE" : "OFFLINE"}</div>
          <button onClick={newValue}>+</button>
        {
          vals?.map(x => <div key={x.order}>
            {JSON.stringify(x)}
            <button onClick={() => dispatch(removeValue({type: removeValue.name, data: x.order, isOnline}))}>X</button>
          </div>)
        }
      </header>
    </div>
  )
}
