import { Picasbs4Page } from './app.po';

describe('picasbs4 App', () => {
  let page: Picasbs4Page;

  beforeEach(() => {
    page = new Picasbs4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
