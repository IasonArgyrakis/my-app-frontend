import axios, {AxiosRequestConfig, AxiosDefaults} from 'axios'
import {getToken} from "./auth.service";




export interface IHttpClientRequestParameters {
    url: string
    requiresToken?: boolean
    isForm?: boolean
    payload?: Object
}

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>

    post<T>(parameters: IHttpClientRequestParameters): Promise<T>

    put<T>(parameters: IHttpClientRequestParameters): Promise<T>

    delete<T>(parameters: IHttpClientRequestParameters): Promise<T>
}




class BackEndClient implements IHttpClient {

    config: AxiosRequestConfig = {
        baseURL: 'http://localhost:3333'
    }
    backendClient = axios.create(this.config)


    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, requiresToken} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }

            // finally execute the GET request with axios:
            this.backendClient
                .get(url, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response) => {
                    const error ={...response.response}
                    console.log(error)
                    if(error.status===400){
                        reject(error.data?.errors)
                    }
                    reject(error.data)
                })
        })
    }

    post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, payload, requiresToken = false, isForm = false} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }


            // finally execute the GET request with axios:
            this.backendClient
                .post(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response) => {
                    const error ={...response.response}
                    console.log(error)
                    if(error.status===400){
                        reject(error.data?.errors)
                    }
                    if(error.status===302){
                        reject(error.data?.errors)
                    }
                    reject(error.data)
                })
        })
    }

    put<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, payload, requiresToken} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }


            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }

            // finally execute the GET request with axios:
            this.backendClient
                .put(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response) => {
                    const error ={...response.response}
                    if(error.status===400){
                        reject(error.data?.errors)
                    }
                    if(error.status===302){
                        reject(error.data?.errors)
                    }
                    reject(error.data)
                })
        })
    }

    delete<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let {url, payload, requiresToken} = parameters

            const options: AxiosRequestConfig = {
                data:payload,
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }
            if(options?.data?.id){
                url+=`/${options.data.id}`
            }

            // finally execute the GET request with axios:
            this.backendClient
                .delete(url, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response) => {
                    const error ={...response.response}
                    if(error.status===400){
                        reject(error.data?.errors)
                    }
                    if(error.status===302){
                        reject(error.data?.errors)
                    }
                    reject(error.data)
                })
        })
    }

}

export const backend = new BackEndClient()