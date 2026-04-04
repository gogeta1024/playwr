import type {Reporter,TestCase,TestResult} from '@playwright/test/reporter'
import fs from 'fs/promises'
import path from 'path'

class FileCopyReporter implements Reporter {

async onTestEnd(test: TestCase, result: TestResult) {
console.log(`Finished test ${test.title}: ${result.status}`);
const dateFolder = new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Tokyo'});
const monthYear = dateFolder.substring(0,7).replace('-','');
const statusFolder = result.status.toUpperCase();
const targetDir = path.join('upload-results',monthYear, dateFolder,statusFolder)

// tao thư mục nếu attachment tồn tại
if(result.attachments.length > 0){
await fs.mkdir(targetDir,{recursive:true});
}

// 2. Duyệt qua tất cả attachment của test
 for(const attachment of result.attachments){
const testTitle=test.title.replace(/\s+/g,'_').replace(/[^a-z0-9_-]/gi,'')
if(attachment.path){
const timeStamp = new Date().toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo', hour12:false}).replace(/:/g,'-')
const ext = path.extname(attachment.path);
const fileName = `${testTitle}__${attachment.name}_${timeStamp}${ext}`;
const destFile = path.join(targetDir,fileName);

try{
await fs.copyFile(attachment.path,destFile);
console.log(`Đã lưu ${attachment.name} vào server: ${fileName}`)
   }
catch(err){console.error(`Không thể copy ${attachment.name} lên server: ${err}`)}
}
}
}
}

export default FileCopyReporter;