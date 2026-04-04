import { test } from '@playwright/test';

test.describe('API test product @qa', () => {

  test('product create via API', async ({ browser }) => {
    const { ENV_NAME } = process.env;

    // Load state (cookie + auth)
    const context = await browser.newContext({
      storageState: `playwright/.auth/${ENV_NAME}.json`
    });

    const page = await context.newPage();

    // 1. Load trang create để lấy CSRF
    await page.goto('https://cms.anhtester.com/admin/products/create');

    const csrfToken = await page.locator('meta[name="csrf-token"]').getAttribute('content');

    if (!csrfToken) {
      throw new Error('❌ Không lấy được CSRF Token');
    }

    // 2. Gửi API POST
    const response = await page.request.post(
  'https://cms.anhtester.com/admin/products/store',
  {
    multipart: {
      _token: csrfToken,
      added_by: 'admin',
      name: `API Product ${Date.now()}`,
      category_id: '1260',
      unit: 'pcs',
      weight: '12',
      min_qty: '1',
      'tags[]': '[{"value":"testapi"}]',
      unit_price: '11121',
      discount: '10',
      discount_type: 'amount',
      current_stock: '12',
      low_stock_quantity: '1',
      stock_visibility_state: 'quantity',
      cash_on_delivery: '1',

      // ❗ UI gửi thumbnail_img = "" (string rỗng)
      thumbnail_img: "",

      // ❗ KHÔNG GỬI photos
      // KHÔNG để photos: ''
      // KHÔNG để photos: []

      'tax_id[]': '4',
      'tax[]': '0',
      'tax_type[]': 'amount',
      button: 'unpublish'
    }
  }
);

    console.log('Status:', response.status());
    console.log('URL:', response.url());

    if (response.status() === 200 || response.status() === 302) {
      console.log('✅ Product created successfully!');
    } else {
      console.log('❌ Failed');
      console.log((await response.text()).substring(0, 500)); // In ra một phần nội dung phản hồi để debug
      throw new Error('Product creation failed');
    }

  });

});