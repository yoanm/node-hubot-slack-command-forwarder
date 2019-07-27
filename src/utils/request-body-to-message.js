'use strict';

const {SlackCommand, SlackCommandMessage} = require('../model');

const {translateCommandForHubot, findCommandAlias} = require('./text-helper');

module.exports = async (reqBody, robot) => {
    const ts = (Date.now() / 1000)+"000";
    const {
        channel_id: channel,
        channel_name: channelName,
        text: commandArgs,
        user_id: userId,
        team_id: teamId,
        trigger_id: triggerId, // In case you need to open a dialog, this id must be provided
        command: commandStart,
        response_url: responseUrl
    } = reqBody;

    // Parse command
    const match = commandStart.match(/^\/(.+)$/);
    const commandName = match[1];

    const isFromBotChat = ('directmessage' === channelName);
    const isRootBotCommand = (commandName === robot.name || (robot.alias && commandName === robot.alias));

    const cleanText = translateCommandForHubot(robot, commandName, commandArgs, isFromBotChat, isRootBotCommand);
    const aliasTo = findCommandAlias(robot, commandName, commandArgs, isFromBotChat, isRootBotCommand)

    // Fetch user
    const user = robot.brain.userForId(userId);
    user.room = channel;

    return new SlackCommandMessage(
        new SlackCommand(commandName, commandArgs, aliasTo, triggerId, responseUrl),
        channel,
        user,
        cleanText,
        isFromBotChat,
        isRootBotCommand
    );
};
