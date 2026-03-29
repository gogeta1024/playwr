import { Page } from "@playwright/test";

export async function initPage <T>(PageClass:new (page:Page) =>T,page:Page):Promise<T> {
const instance= new PageClass(page);
await page.waitForLoadState('networkidle');
return instance;
}

export function getSelector<T>(allSelector:any,page:Page):T{
const env=(process.env.ENV_NAME||'dev') as 'dev'|'qa'
console.log(`>>> Đang dùng locator cho: ${env}`)
return allSelector[env](page) as T
}

export function getRandom<T>(listAny:T[]):T{
if(listAny.length==0){throw new Error('mảng ko dc trống')}

const randomIndex = Math.floor(Math.random()*listAny.length);
return listAny[randomIndex]
}
const acc={user:'a',pass:'b'}
const lst=['a','b',1,2] //co mang 2 chieu ko
const login= async()=>{}