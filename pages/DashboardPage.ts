import { expect, Locator, Page } from "@playwright/test";
import {BasePage} from "./BasePage"
import {DASHBOARD_LOCATOR} from "../constants/dashboard-selector"
import { getSelector } from "../utility/init";

interface DashboardSelector{
loginSuccess:Locator
}
export class DashboardPage extends BasePage{
readonly locator:DashboardSelector;
constructor ( page:Page){
super(page);
this.locator= getSelector(DASHBOARD_LOCATOR,page);
}

async verifyDisplay(){
await expect (this.locator.loginSuccess).toBeVisible();
}


}