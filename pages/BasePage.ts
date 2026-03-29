import { expect, Page } from "@playwright/test";
export class BasePage{
constructor(readonly page:Page){}

async verifyPageTitle(expectedTitle:string) {
await expect(this.page).toHaveTitle(expectedTitle);
}

async gotoPage(url:string){
await this.page.goto(url);
}
}