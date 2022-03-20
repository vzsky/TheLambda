import { ChangeEvent, Dispatch } from 'react'

export const newapi = async (
  method: string,
  path: string,
  headers: any,
  body?: any
) => {
  let req: any = {
    method: method,
  }
  if (headers) {
    req.headers = {
      'Content-type': 'application/json',
      ...headers,
    }
  }
  if (body) {
    req.body = JSON.stringify({
      ...body,
    })
  }
  try {
    let res = await fetch(path, req)
    let json = await res.json()
    return json
  } catch (e) {
    return "API ERROR"
  }
}

export const GetApi = async (path: string, headers?: object) => {
  return await newapi('GET', path, headers)
}

export const PostApi = async (path: string, headers?: object, body?: object) => {
  return await newapi('POST', path, headers, body)
}

export const createOnChange = (set: Dispatch<string>) => (
  (event: ChangeEvent<HTMLTextAreaElement>) => {
    set(event.target.value)
  }
)

export const timeLimitPromise = <T extends unknown>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('Promise timed out')
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => { reject(timeoutError) }, ms)
  });

  return Promise.race<T>([promise, timeout]);
}

export const LAMBDA = "λ"