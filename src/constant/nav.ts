import { History, Location, Pathname } from 'history';


export const navToUrl = (history:any, url:Pathname )=>{
    history.push(url);
}

export const navWithLocation = (history:any, location:any )=>{
    history.push(location);
}