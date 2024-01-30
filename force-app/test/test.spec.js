import DesktopLayoutContainer from 'salesforce-pageobjects/navex/pageObjects/desktopLayoutContainer';
import { login, openRecordModal } from './utilities/salesforce-test';
import { TestEnvironment } from './utilities/test-environment';
import PersonAccount from 'utam-preview/pageObjects/personAccount'
import PersonAccountContent from 'utam-preview/pageObjects/personAccountIframeContent'

// TODO: replace with prefix of the environment from .env file
const TEST_ENVIRONMENT_PREFIX = 'sandbox';

describe('Record creation tests', () => {
    const testEnvironment = new TestEnvironment(TEST_ENVIRONMENT_PREFIX);
    const baseUrl = testEnvironment.redirectUrl;

    beforeAll(async () => {
        await login(testEnvironment, 'home');
    });

    it('Create a new Account Record', async () => {
        
        const pageObject = await utam.load(DesktopLayoutContainer);
        const utamVar1 = await pageObject.getAppNav();
        const utamVar2 = await utamVar1.getAppNavBar();
        const utamVar3 = await utamVar2.getNavItem('Accounts & Contacts');
        await utamVar3.clickAndWaitForUrl('https://renovo--uat2.sandbox.lightning.force.com/lightning/n/Create_Account');
        
        const personAccountPage = await utam.load(PersonAccount); 
        const LI_INDEX = 1;
        const personIframe = await personAccountPage.getIFrames(LI_INDEX);
        console.log(personIframe);
        await utam.enterFrame(personIframe);
        const personAccountIframeContent = await utam.load(PersonAccountContent); 
        const anchor = await personAccountIframeContent.getLink();
        console.log(anchor);
        
      
    });

});