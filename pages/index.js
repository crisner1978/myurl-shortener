import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import isURL from "validator/lib/isURL"
import { Orbit } from '@uiball/loaders'

const Home = () => {
  const { register, handleSubmit, reset } = useForm()

  const { data, mutateAsync, isLoading } = useMutation((url) => fetch("/api/shorturl", {
    method: "POST",
    body: JSON.stringify(url)
  }).then((res) => res.json()), {
    onSuccess: (data) => {
      reset()
    }
  })
  console.log(data)
  const onSubmit = (data) => {
    const { url } = data
    return isURL(url) && mutateAsync(url)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <Head>
        <title>Microservice - URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center max-w-6xl px-10 relative">
        <form onSubmit={handleSubmit(onSubmit)} className='border p-16 sm:p-20 bg-white shadow-lg w-full'>
          <h1 className='text-2xl sm:text-3xl'>We Shorten URL's daily!</h1>
          <p className='pt-4 text-sm sm:text-base'>Give it a try. Drop a URL to get your Short URL!</p>

          <div className={`${isLoading && "items-center justify-center"} flex flex-col py-4`}>
            {isLoading ? (
              <div className='py-8 mt-4'>
                <Orbit
                  className=""
                  size={35}
                  speed={1.5}
                  color="black"
                />
              </div>
            ) : (
              <>
                <label className='text-left font-black text-gray-500 text-sm mb-1' htmlFor="url">Enter a URL to Shorten</label>
                <input {...register("url")} className='outline-none bg-black/10 rounded-md py-2 px-4' type="text" name='url' id='url' placeholder='your URL to shorten goes here' />
                <button className='py-2 mt-2 bg-gradient-to-br from-blue-500 to-sky-600 text-white font-semibold text-lg sm:text-xl rounded-md hover:brightness-110 transition-all transform duration-300 ease-out'>Get your Short URL</button>
              </>
            )}
          </div>
        </form>
        {data && (
          <div className='absolute top-0 left-0 container px-10 pt-3'>
            <ul className='sm:flex justify-evenly  space-y-2 sm:space-y-0'>
              <div className='flex items-center justify-center space-x-1'>
                <h3 className='text-xs font-black text-gray-500 sm:text-left'>Original</h3>
                <li className='text-xs'>{data.original_url.substr(0, 20) + "..."}</li>
              </div>

              <Link href={`/api/shorturl/${data.short_url}`} className="cursor-pointer ">
                <div className='group-hover:text-blue-500 flex items-center justify-center space-x-1 cursor-pointer hover:text-blue-500 hover:font-semibold hover:scale-110 transition-all transform duration-200'>
                  <h3 className='text-xs font-black text-gray-500 sm:text-left'>Shortened</h3>
                  <li className='text-xs'>{data.short_url}</li>
                </div>
              </Link>

            </ul>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
