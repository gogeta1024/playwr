import {test as base, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import path from 'node:path';
import * as fs from 'fs'; // Import thư viện quản lý file

interface MyPages{
loginPage:LoginPage;
dashboardPage:DashboardPage;
}
// Mở rộng (extend) fixture mặc định của Playwright
export const test=base.extend<MyPages>({

loginPage:async({page},use)=>{
const lp = new LoginPage(page);
const authPath = path.resolve(`playwright/.auth/${process.env.ENV_NAME}.json`)
if(fs.existsSync(authPath)){fs.unlinkSync(authPath)} //xoa file session json
await use(lp)
console.log('>>> Hoàn tất chu kỳ của LoginPage');
},

dashboardPage:async({page},use) => {
const dp = new DashboardPage(page)
await use(dp)    
}

})

export {expect} from '@playwright/test'