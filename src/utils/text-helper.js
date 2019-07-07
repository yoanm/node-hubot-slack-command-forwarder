'use strict';

const {SlackCommand, SlackCommandMessage} = require('../model');

const translateCommandForHubot = (robot, commandName, commandArgsString, isFromBotChat, isRootBotCommand) => {
    // Clean input
    const header = isRootBotCommand ? '' : commandName;
    const footer = commandArgsString.length ? ((header.length ? ' ' : '') + commandArgsString) : '';

    const rawText = robot.name
        + ((header.length || footer.length) ? ' ' : '')
        + header
        + footer;

    // In case text is empty (=>like when using `/ubot` command inside "direct chat" to the app bot)
    // => append the bot name
    return rawText.length ? rawText : robot.name;
};

const findCommandAlias = (robot, commandName, commandArgsString, isFromBotChat, isRootBotCommand) => {
    // Clean input
    const header = isRootBotCommand ? '' : commandName;
    const footer = commandArgsString.length ? ((header.length ? ' ' : '') + commandArgsString) : '';

    const tmpAliasTo =
        (isFromBotChat
                ? ''
                : robot.name + ((header.length || footer.length) ? ' ' : '')
        )
        + header
        + footer;

    // In case text is empty (=>like when using `/ubot` command inside "direct chat" to the app bot)
    // => append the bot name
    return tmpAliasTo.length ? tmpAliasTo : robot.name;
};

module.exports = {
    translateCommandForHubot,
    findCommandAlias
};
