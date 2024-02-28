import DesktopLayoutContainer from 'salesforce-pageobjects/navex/pageObjects/desktopLayoutContainer';
import PersonAccount from '../../utam-renovo/pageObjects/personAccount';
import PersonAccountIframeContent from '../../utam-renovo/pageObjects/personAccountIframeContent';

import { login } from './utilities/salesforce-test';
import { TestEnvironment } from './utilities/test-environment';

const TEST_ENVIRONMENT_PREFIX = 'sandbox';

// yarn test --spec force-app/test/create-account.spec.js

describe('Record creation tests', () => {
    const testEnvironment = new TestEnvironment(TEST_ENVIRONMENT_PREFIX);

    beforeAll(async () => {
        await login(testEnvironment, 'home');
    });

    it('Create a new Account Record', async () => {
        const desktopLayoutContainer = await utam.load(DesktopLayoutContainer);
        const appNav = await desktopLayoutContainer.getAppNav();
        const appNavBar = await appNav.getAppNavBar();
        const accounts = await appNavBar.getNavItem('Accounts & Contacts');
        await accounts.clickAndWaitForUrl('lightning/n/Create_Account');

        const homepage = await utam.load(PersonAccount);
        const forceAlohaPages = await homepage.getForceAlohaPage();
        // Note: it seems that the number of force-aloha-page elements on the page varies (sometimes 1, sometimes 2)
        // The next two lines should accomodate that assuming the iframe is being loaded in the first force-aloha-page
        // when only one force-aloha-page element is present
        const iframeIndex = forceAlohaPages.length - 1;
        const forceAlohaPage = forceAlohaPages[iframeIndex];

        if (forceAlohaPage) {
            const alohaIframe = await forceAlohaPage.getAlohaPageFrame();
            const iframeContent = await utam.enterFrameAndLoad(alohaIframe, PersonAccountIframeContent);
            const radioGroup = await iframeContent.getRadioGroup();
            await radioGroup.selectRadioWithValue('personAcc');
            const nextButton = await iframeContent.waitForButton();
            await nextButton.click();

            // TODO continue writing POs and test to fill out the form
        }
    });
});
