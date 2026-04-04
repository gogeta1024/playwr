import{test, request} from '@playwright/test'
test.describe('API test login for @qa',()=>{
test('api test login',async({})=>{
const {ENV_NAME,BASE_URL,ADMIN_USER,ADMIN_PASSWORD} = process.env;
const authFile=`playwright/.auth/${ENV_NAME}.json`
const apiContext=await request.newContext();
const response = await apiContext.post('https://cms.anhtester.com/login',{
form:{
email: ADMIN_USER!,
password: ADMIN_PASSWORD!
}
})
if(response.ok()){
console.log(`API login thành công`);
await apiContext.storageState({path:authFile})
}
else{
throw new Error('login failed')
}

})
})