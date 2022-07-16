import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import isURL from 'validator/lib/isURL'
import { Orbit } from '@uiball/loaders'
import { isDev, DEV_URL, PROD_URL } from '../config'
import { useRef, useState } from 'react'

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const textRef = useRef(null)
  const [copySuccess, setCopySuccess] = useState('')
  const { data, mutateAsync, isLoading } = useMutation(
    (url) =>
      fetch('/api/shorturl', {
        method: 'POST',
        body: JSON.stringify(url),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        reset()
      },
    }
  )

  const copyToClipboard = async (copyMe) => {
    await navigator.clipboard.writeText(copyMe)
    setCopySuccess('Copied!')
  }

  const onSubmit = (data) => {
    setCopySuccess('')
    const { url } = data
    return isURL(url) && mutateAsync(url)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-orange-200 via-yellow-100 to-blue-800">
      <Head>
        <title>Microservice - URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative max-w-6xl px-10 text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full border bg-white p-16 shadow-lg sm:p-20"
        >
          <h1 className="text-2xl sm:text-3xl">We Shorten URL's daily!</h1>
          <p className="pt-4 text-sm sm:text-base">
            Give it a try. Drop a URL to get your Short URL!
          </p>

          <div
            className={`${
              isLoading && 'items-center justify-center'
            } relative flex flex-col py-4`}
          >
            {isLoading ? (
              <div className="mt-4 py-8">
                <Orbit className="" size={35} speed={1.5} color="black" />
              </div>
            ) : (
              <div className="relative flex flex-col">
                <label
                  className="mb-1 text-left text-sm font-black text-gray-500"
                  htmlFor="url"
                >
                  URL
                </label>
                <input
                  {...register('url', {
                    required: 'URL required',
                    validate: (value) => {
                      return (
                        (isURL(value) && value.includes('https://')) ||
                        'Provide a valid URL'
                      )
                    },
                  })}
                  className="rounded-md bg-black/10 py-2 px-4 outline-none"
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Shorten your URL here"
                />
                <button className="mt-2 transform rounded-md bg-gradient-to-br from-blue-500 to-sky-600 py-2 text-lg font-semibold text-white transition-all duration-300 ease-out hover:brightness-110 sm:text-xl">
                  Get your Short URL
                </button>
                <span className="absolute top-0 right-0 z-50 mb-1 text-sm font-black text-red-500">
                  {errors.url?.message}
                </span>
              </div>
            )}
          </div>
          {data &&
            (copySuccess ? (
              <span className="absolute bottom-0 right-0 left-0 mb-6 text-sm font-bold sm:text-base">
                {copySuccess}
              </span>
            ) : (
              <p className="absolute bottom-0 right-0 left-0 mb-6 transform cursor-pointer text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:text-sky-600 sm:text-base">
                <span
                  onClick={() =>
                    copyToClipboard(
                      isDev
                        ? `${DEV_URL}${data?.short_url}`
                        : `${PROD_URL}${data?.short_url}`
                    )
                  }
                >
                  {isDev
                    ? `${DEV_URL}${data?.short_url}`
                    : `${PROD_URL}${data?.short_url}`}{' '}
                </span>

                <a
                  href={
                    isDev
                      ? `${DEV_URL}${data?.short_url}`
                      : `${PROD_URL}${data?.short_url}`
                  }
                  className="ml-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 px-3 py-2 text-lg text-white shadow-lg"
                >
                  GO
                </a>
              </p>
            ))}
        </form>
        {data && (
          <div className="container absolute top-0 left-0 px-10 pt-3">
            <ul className="justify-evenly space-y-2  sm:flex sm:space-y-0">
              <div className="flex items-center justify-center space-x-1">
                <h3 className="text-xs font-black text-gray-500 sm:text-left">
                  Original
                </h3>
                <li className="text-xs">
                  {data?.original_url?.substr(0, 20) + '...'}
                </li>
              </div>

              <Link
                href={`/api/shorturl/${data?.short_url}`}
                className="cursor-pointer "
              >
                <div className="flex transform cursor-pointer items-center justify-center space-x-1 transition-all duration-200 hover:scale-110 hover:font-semibold hover:text-blue-500 group-hover:text-blue-500">
                  <h3 className="text-xs font-black text-gray-500 sm:text-left">
                    Shortened
                  </h3>
                  <li className="text-xs">{data?.short_url}</li>
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
