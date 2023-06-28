import { test, expect } from '@playwright/test';
const Environment = require('../Data//Environment.json');

const pagename = Environment.CDURL;
let pageSource = 'view-source:';

class CDMetaTagsConfigPage {

    constructor(page, context) {
        this.page = page;
        this.context = context;
        this.CustomMetaLinkValuePage = page.locator("//*[contains(text(),'og:Page:tag')]");
        this.CustomMetaLinkContentPage = page.locator("//*[contains(text(),'Internal,International')]");
        this.CustomMetaTextValuePage = page.locator("//*[contains(text(),'og:Page:author')]");
        this.CustomMetaTextContentPage = page.locator("//*[contains(text(),'Automation @uthor')]");
        this.OpenGraphTextValuePage = page.locator("//*[contains(text(),'og:title')]");
        this.OpenGraphTextContentPage = page.locator("//*[contains(text(),'Automation Summary MetaTags')]");

        this.CustomMetaBooleanValueEvent = page.locator("//*[contains(text(),'BreadCrumb')]");
        this.CustomMetaBooleanContentEvent = page.locator("//*[contains(text(),'Turned Off')]");
        this.CustomMetaDateValueEvent = page.locator("//*[contains(text(),'og:Event:published_time')]");
        this.CustomMetaDateContentEvent = page.locator("//*[contains(text(),'26-02-2023')]");
        this.CustomMetaBasedTokenValueEvent = page.locator("//*[contains(text(),'og:locale:alternate')]");
        this.CustomMetaBasedTokenContentEvent = page.locator("//*[contains(text(),'en,ar,es')]");
        this.OpenGraphStaticValueValueEvent = page.locator("//*[contains(text(),'og:admins')]");
        this.OpenGraphStaticValueContentEvent = page.locator("//*[contains(text(),'Automation Admin')]");
        this.FallBackTestValueEvent = page.locator("//*[contains(text(),'Event Title')]");
        this.FallBackTestContentEvent = page.locator("//*[contains(text(),'Event Summary')]");
        this.FallBackGroupTestValue = page.locator("//*[contains(text(),'og:site_name')]");
        this.FallBackGroupTestContent = page.locator("//*[contains(text(),'This Value Should Be Displayed')]");

     }

    async OpenPageSourceofMetaTagsPage(){
        await this.page.goto(pageSource+`${pagename}/AutoData/Automation%20MetaTags%20Page`);
    }

    async OpenPageSourceofMetaTagsEvent(){
        await this.page.goto(pageSource+`${pagename}/AutoData/Automation%20MetaTags%20Event`);
    }

}
export default CDMetaTagsConfigPage;    