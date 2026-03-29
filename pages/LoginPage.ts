import { Locator, Page } from "@playwright/test";
import {BasePage} from "./BasePage"
import{LOGIN_LOCATOR} from "../constants/LoginSelector"
import { getSelector } from "../utility/init";

interface Account{
userAccount:string,
passAccount:string
}
interface LoginSelector{
user:Locator,
pass:Locator,
login:Locator
}
export class LoginPage extends BasePage{
readonly locator:LoginSelector;
constructor ( page:Page){
super(page);
this.locator= getSelector(LOGIN_LOCATOR,page);
}
async login({userAccount,passAccount}:Account){
await this.locator.user.fill(userAccount);
await this.locator.pass.fill(passAccount);
await this.locator.login.click();
}


}