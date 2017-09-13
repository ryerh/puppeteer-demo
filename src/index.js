const puppeteer = require('puppeteer');

const WECHAT_URL = 'http://weixin.sogou.com/weixin?type=1&query=Ceph开发每周谈';

async function getWechat() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(WECHAT_URL);

  const href = await page.$eval('a[href*="http://mp.weixin"]', el => el.href);
  await page.goto(href);

  const titles = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h4.weui_media_title'));
    return els.map(e => e.textContent.trim());
  });
  console.log(titles.join('\n'));

  await page.screenshot({ path: 'example.png' });
  browser.close();
}

getWechat();
