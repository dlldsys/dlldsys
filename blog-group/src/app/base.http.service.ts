import { HttpClient, HttpHeaders } from "@angular/common/http";

export class BaseHttpService {
    baseUrl: string = 'https://blog.dlld0319.asia/api/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            pragma: 'no-cache'
        })
        // withCredentials: true
    };
    constructor(protected http: HttpClient) {
        // this.apiUrl = `${this.baseUrl}api/backend/v1/roles`;
    }

    //const ='https://blog.dlld0319.asia/api/articles/list';
    getArticlesList() {
        const url=this.baseUrl+'articles/list';
        return this.http.post(url, {  headers: this.httpOptions.headers });
    }

}