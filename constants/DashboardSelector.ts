import { Page } from "@playwright/test";
export const DASHBOARD_LOCATOR ={
dev:(page:Page) =>({
loginSuccess: page.getByText('Logged In Successfully')
}),
qa:(page:Page) =>({
loginSuccess: page.getByText('Dashboard')
}),
}