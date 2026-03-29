import{test,expect} from '../fixtures/my-fixtures'

test('verify dashboard page', async({dashboardPage,page})=>{
    const dashboardURL = process.env.ENV_NAME=='dev' ? '/logged-in-successfully' :'/admin' 
    await dashboardPage.gotoPage(dashboardURL);
    await dashboardPage.verifyDisplay();

})