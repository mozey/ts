import { sprintf } from "sprintf-js"
import { HttpError } from "./error"
import { HttpbinResp } from "../http/models/httpbin";

// Fetch Wrapper in TypeScript
// https://eckertalex.dev/blog/typescript-fetch-wrapper
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config)
  const response = await fetch(request)
  
  let method: string | null = null
  if (config.method) {
    method = config.method
  }

  if (!response.ok) {
    throw new HttpError(method, path,
        sprintf("%i %s", response.status, response.statusText))
  }

  // Can't do this with httpbin response
  // return response.json().catch(
  //   // If there is no body return empty object
  //   () => ({}))

  // Filter httpbin response, contact is echoed back in the "json" property
  // https://httpbin.org/#/Anything/post_anything
  return new Promise((resolve) => {
    response.json().then((httpbinResp: HttpbinResp) => {
      resolve(httpbinResp.json)
    }).catch(() => {
      throw new HttpError(method, path,
        sprintf("%i %s", response.status, response.statusText))
    })
  })
}

export async function get<T>(
  path: string, config?: RequestInit): Promise<T> {

  const init = { method: 'get', ...config }
  return await http<T>(path, init)
}

export async function post<T, U>(
  path: string, body: T, config?: RequestInit): Promise<U> {

  const init = { method: 'post', body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}

export async function del<T>(
  path: string, config?: RequestInit): Promise<T> {
    
  const init = { method: 'delete', ...config }
  return await http<T>(path, init)
}

