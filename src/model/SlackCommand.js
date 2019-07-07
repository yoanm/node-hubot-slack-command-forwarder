'use strict';

class SlackCommand
{
    /**
     * @param {string} name
     * @param {string} argsString
     * @param {string} aliasTo
     * @param {string} triggerId
     * @param {string} responseUrl
     */
    constructor(name, argsString, aliasTo, triggerId, responseUrl) {
        this.name = name;
        this.argsString = argsString;
        this.aliasTo = aliasTo;
        this.triggerId = triggerId;
        this.responseUrl = responseUrl;
    }

    /**
     * @public
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @public
     * @returns {string}
     */
    getArgsString() {
        return this.argsString;
    }

    /**
     * @public
     * @returns {string}
     */
    getAliasTo() {
        return this.aliasTo;
    }

    /**
     * @public
     * @returns {string}
     */
    getTriggerId() {
        return this.triggerId;
    }

    /**
     * @public
     * @returns {string}
     */
    getResponseUrl() {
        return this.responseUrl;
    }

    /**
     * @public
     * @returns {string}
     */
    toString() {
        if (!this.full) {
            this.full = '/' + this.name + (this.argsString.length ? ' ' + this.argsString : '');
        }

        return this.full;
    }

}

module.exports = SlackCommand;

