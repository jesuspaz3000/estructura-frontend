"use client"
import React from 'react';

function useDaAsyncTask(task: () => void) {

  const [done, setDone] = React.useState(true);
  
  React.useEffect(() => {
    if(!done){
      task?.bind(null);
      setTimeout(() => {
        setDone(true);
      }, 300);
    }
  }, [done, task]);

  function doTask() {
    setDone(false);
  }

  return {doTask, done}
}

export default useDaAsyncTask;