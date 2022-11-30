import { AspectRatio } from '@chakra-ui/react'

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-100">
      <div className='m-4'>
        <h1 className="text-3xl font-bold">
          Simple Video
        </h1>
      </div>
      <div className='w-80'>
        <video controls muted>
            <source src="http://localhost:4000/video" type="video/mp4"></source>
        </video>
      </div>
    </div>

  );
}

export default App;
