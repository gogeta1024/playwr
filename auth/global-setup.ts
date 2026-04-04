import { test as setup,expect } from '../fixtures/my-fixtures';
import{initPage} from '../utility/init'
import { getRandom } from '../utility/init';

setup('login and save session', async ({loginPage,page}) => {
//const loginPage = await initPage(LoginPage,page) ko dung nua
const { BASE_URL, ENV_NAME, ADMIN_USER, ADMIN_PASSWORD } = process.env;

const targetPath = ENV_NAME=='dev'? '/practice-test-login' :'/login';
const fullUrl = `${BASE_URL}${targetPath}`
await loginPage.gotoPage(fullUrl)

const loginAccount={userAccount:ADMIN_USER!,passAccount: ADMIN_PASSWORD!}
await loginPage.login(loginAccount)
await page.context().storageState({path:`playwright/.auth/${ENV_NAME}.json`})

const randomName = getRandom(['Ca','VN','BA','Sa']);
const randomNumber = getRandom([1,2,3,4,5,6])
console.log(`ten ngau nhien la: ${randomName}, so ngau nhien la: ${randomNumber}`);
});
