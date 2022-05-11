
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()


beforeEach(async () => {
    driver.get('http://localhost:3000/');
});

afterEach(async () => {
    await driver.sleep(2000)
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'));
    const displayed = await title.isDisplayed();
    expect(displayed).toBe(true);
});

test('Draw button displays the div with id="choices"', async () => {
    const drawButton = await driver.findElement(By.id('draw'));
    drawButton.click();
    const choices = await driver.findElement(By.id('choices'));
    expect(await choices.isDisplayed());
});

test('Add to Duo button displays the div with id="player-duo"', async () => {
    const duelBotton = await driver.findElement(By.id('duel'));
    duelBotton.click();
    const player-duo = await driver.findElement(By.id('player-duo'));
    expect(await player-duo.isDisplayed());
});

test('When a bot is "Removed from Dou" it goes back to "choices"', async () => {
    const bot-btn = await driver.findElement(By.id('draw'));
    drawButton.click();
    const player-dou = await driver.findElement(By.id('player-dou'));
    expect(await player-dou.isDisplayed());
});

