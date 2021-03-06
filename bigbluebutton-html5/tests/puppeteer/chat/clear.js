// Test: Cleaning a chat message

const Page = require('../core/page');
const e = require('./elements');
const util = require('./util');
const { chatPushAlerts } = require('../notifications/elements');

class Clear extends Page {
  constructor() {
    super('chat-clear');
  }

  async test(testName) {
    await util.openChat(this);
    if (process.env.GENERATE_EVIDENCES === 'true') {
      await this.screenshot(`${testName}`, `01-before-chat-message-send-[${testName}]`);
    }
    // sending a message
    await this.type(e.chatBox, e.message);
    await this.click(e.sendButton, true);

    if (process.env.GENERATE_EVIDENCES === 'true') {
      await this.screenshot(`${testName}`, `02-after-chat-message-send-[${testName}]`);
    }

    const chat0 = await this.page.evaluate(() => document.querySelectorAll('p[data-test="chatClearMessageText"]').length === 0);

    // clear
    await this.click(e.chatOptions, true);
    if (process.env.GENERATE_EVIDENCES === 'true') {
      await this.screenshot(`${testName}`, `03-chat-options-clicked-[${testName}]`);
    }
    await this.click(e.chatClear, true);
    await this.page.waitForFunction(
      'document.querySelector("body").innerText.includes("The public chat history was cleared by a moderator")',
    );
    if (process.env.GENERATE_EVIDENCES === 'true') {
      await this.screenshot(`${testName}`, `04-chat-cleared-[${testName}]`);
    }

    const chat1 = await this.page.evaluate(() => document.querySelectorAll('p[data-test="chatClearMessageText"]').length === 1);

    return chat0 === chat1;
  }
}

module.exports = exports = Clear;
