import { jsonContentType, serverPath } from './constant';

function isResponseValid(response: any) {
    return  response.returnCode === 200;
}

const crosAjaxSetting = (url:string, method: string="get", body?: object)=>({
    url:`${serverPath}`+url,
    body: body,
    method: method,
    withCredentials: true,
    crossDomain: true,
    headers: jsonContentType,
    responseType: 'json',
    timeout:20000
})
export {isResponseValid,crosAjaxSetting}