import { Page } from "@playwright/test";
export const LOGIN_LOCATOR ={
dev:(page:Page) =>({
user: page.getByRole('textbox', { name: 'Username' }),
pass: page.getByRole('textbox', { name: 'Password' }),
login: page.getByRole('button', { name: 'Submit' })
}),
qa:(page:Page) =>({
user: page.getByRole('textbox', { name: 'Email' }),
pass: page.getByRole('textbox', { name: 'Password' }),
login: page.getByRole('button', { name: 'Login' })
}),
}