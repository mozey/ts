// This file contains interface definitions
// for the JSON responses from https://httpbin.org

export interface Headers {
    Accept: string
    "Accept-Encoding": string
    "Accept-Language": string
    Host: string
    "Sec-Fetch-Dest": string
    "Sec-Fetch-Mode": string
    "Sec-Fetch-Site": string
    "Sec-Fetch-User": string
    "Upgrade-Insecure-Requests": string
    "User-Agent": string
    "X-Amzn-Trace-Id": string
}

export interface HttpbinResp {
    args?: any
    data?: string
    files?: any
    form?: any
    headers?: Headers
    json?: any
    origin?: string
    url: string
}

