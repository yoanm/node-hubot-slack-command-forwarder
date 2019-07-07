'use strict';

const {TextMessage} = require('hubot');

class SlackCommandMessage extends TextMessage {
    /**
     * @param {SlackCommand} command
     * @param {string}       channel
     * @param {User}         user
     * @param {string}       text
     * @param {boolean}      isFromBotChat
     * @param {boolean}      isRootBotCommand
     * @param {string}       id
     */
    constructor (command, channel, user, text, isFromBotChat, isRootBotCommand, id = undefined) {
        this.channel = channel;
        this.command = command;
        this._isFromBotChat = isFromBotChat;
        this._isRootBotCommand = isRootBotCommand;

        // Hack to return the real class instead of TextMessage
        if ('function' === typeof TextMessage) {
//            this.__proto__ = SlackCommandMessage.prototype;
        }

        super(user, text, id);
    }

    /**
     * @public
     */
    getUser() {
        return this.user;
    }

    /**
     * @public
     */
    getText() {
        return this.text;
    }

    /**
     * @public
     */
    getCommand() {
        return this.command;
    }

    /**
     * @public
     */
    getChannel() {
        return this.channel;
    }

    /**
     * @public
     * @returns {boolean}
     */
    isFromBotChat() {
        return this._isFromBotChat;
    }

    /**
     * @public
     * @returns {boolean}
     */
    isRootBotCommand() {
        return this._isRootBotCommand;
    }

    /**
     * @public
     * @param {string} id
     */
    setMessageId(id) {
        this.id = id;
    }
}



module.exports = SlackCommandMessage;

