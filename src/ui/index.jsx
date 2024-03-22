import {useEffect,useRef} from 'react';



const Index = ()=>{
  const moutedRef = useRef(false);

  useEffect(()=>{
   
    const information = document.getElementById('info')
    information.innerText = `This app is using Chrome (v${ipc.chrome()}), Node.js (v${ipc.node()}), and Electron (v${ipc.electron()})`
    console.log('👋 This message is being logged by "renderer.js", included via Vite');

    const func = async () => {
      const response = await window.ipc.ping()
      console.log(response) // prints out 'pong'
    }

    func()

    // send event to main
    const setButton = document.getElementById('btn')
    const titleInput = document.getElementById('title')
    setButton.addEventListener('click', () => {
      const title = titleInput.value
      window.ipc.setTitle(title)
    })
    // open a file then get the path
    const btn = document.getElementById('file-btn')
    const filePathElement = document.getElementById('filePath')

    btn.addEventListener('click', async () => {
      const filePath = await window.ipc.openFile()
      filePathElement.innerText = filePath
    })

    const counter = document.getElementById('counter')
    // prevent listen twice
    if (!moutedRef.current){
      window.ipc.onUpdateCounter((value) => {
        const oldValue = Number(counter.innerText)
        const newValue = oldValue + value
        counter.innerText = newValue.toString()
        window.ipc.counterValue(newValue)
      })
    }
   
    moutedRef.current = true;

  },[])

  return (
    <div>
      <h2>hello,index</h2>
      <div className="flex flex-row">
        <h1>
          Title:
        </h1><input id="title" />
      </div>
      <button id="btn" type="button" className="p-2 m-2 text-xl text-center rounded-md border">Set</button>

      <p id="info" className="text-xl text-emerald-200"></p>

      <button type="button" id="file-btn" className="p-2 m-2 text-xl text-white text-center rounded-md border bg-blue-500">Open a File</button>
      File path: <strong id="filePath"></strong>

      Current value: <strong id="counter">0</strong>
    </div>
  )
}

export default Index

