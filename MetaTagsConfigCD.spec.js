const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');
const jsonUtils = require('../../utils/jsonUtils');
const CDMetaTagsPage = require('../../Pages/CDMetaTagsConfigPage').default;
const CDLoginPage = require('../../Pages/CDLogin.page');
const Environment = require('../../Data/Environment');
const { title } = require('process');
const { debug } = require('console');
var xlsx = require('node-xlsx').default;

let cdPage;
let cdContext;
let browser;
let CDState;
let metaTagsPage;
let envURL = Environment.CDURL;

test.describe('MetaTags Configurations component CD Tests', () => {

  test.beforeAll(async () => {

    //getting CD state to pass to the new browsers
    CDState = JSON.parse(fs.readFileSync('CDstate.json'));

  })

  test.beforeEach(async () => {

    //start browsers with the correct states for CD
   test.setTimeout(90000);
   browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    cdContext = await browser.newContext({ viewport: null, storageState: CDState });
    
    cdPage = await cdContext.newPage();
    metaTagsPage = new CDMetaTagsPage(cdPage, cdContext);
    await cdPage.goto(`${envURL}`, { waitUntil: 'networkidle' });
    
    })


   test('Validate MetaTags Values on a Page', async () => {
    
    await metaTagsPage.OpenPageSourceofMetaTagsPage();
    expect(await metaTagsPage.CustomMetaLinkValuePage.allInnerTexts()).toContainEqual("og:Page:tag");
    expect(await metaTagsPage.CustomMetaLinkContentPage.allInnerTexts()).toContainEqual("Internal,International");
    expect(await metaTagsPage.CustomMetaTextValuePage.allInnerTexts()).toContainEqual("og:Page:author");
    expect(await metaTagsPage.CustomMetaTextContentPage.allInnerTexts()).toContainEqual("Automation @uthor");
    expect(await metaTagsPage.OpenGraphTextValuePage.allInnerTexts()).toContainEqual("og:title");
    expect(await metaTagsPage.OpenGraphTextContentPage.allInnerTexts()).toContainEqual("Automation Summary MetaTags");
    expect(await metaTagsPage.FallBackGroupTestValue.allInnerTexts()).toContainEqual("og:site_name");
    expect(await metaTagsPage.FallBackGroupTestContent.allInnerTexts()).toContainEqual("This Value Should Be Displayed");
    
  })

  test('Validate MetaTags Values on an Event', async () => {
    
    await metaTagsPage.OpenPageSourceofMetaTagsEvent();
    expect(await metaTagsPage.CustomMetaBooleanValueEvent.allInnerTexts()).toContainEqual("BreadCrumb");
    expect(await metaTagsPage.CustomMetaBooleanContentEvent.allInnerTexts()).toContainEqual("Turned Off");
    expect(await metaTagsPage.CustomMetaDateValueEvent.allInnerTexts()).toContainEqual("og:Event:published_time");
    expect(await metaTagsPage.CustomMetaDateContentEvent.allInnerTexts()).toContainEqual("26-02-2023");
    expect(await metaTagsPage.CustomMetaBasedTokenValueEvent.allInnerTexts()).toContainEqual("og:locale:alternate");
    expect(await metaTagsPage.CustomMetaBasedTokenContentEvent.allInnerTexts()).toContainEqual("en,ar,es");
    expect(await metaTagsPage.OpenGraphStaticValueValueEvent.allInnerTexts()).toContainEqual("og:admins");
    expect(await metaTagsPage.OpenGraphStaticValueContentEvent.allInnerTexts()).toContainEqual("Automation Admin");
    expect(await metaTagsPage.FallBackTestValueEvent.allInnerTexts()).toContainEqual("Event Title");
    expect(await metaTagsPage.FallBackTestContentEvent.allInnerTexts()).toContainEqual("Event Summary");
    
  })


  test.afterEach(async () => {
    await browser.close();
    })

})    
