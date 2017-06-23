import { MySecondAppPage } from './app.po';

describe('my-second-app App', () => {
  let page: MySecondAppPage;

  beforeEach(() => {
    page = new MySecondAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
