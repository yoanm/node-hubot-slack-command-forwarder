'use strict';
###*
# /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
# THIS CLASS MUST BE IN COFFEE SCRIPT !
# Else there is weird issue with inerithance
# (maybe due to some tricks to make class compatabible with coffeescript)
# /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
###
{TextMessage} = require.main.require('hubot');

class SlackCommandMessage extends TextMessage
    ###*
    # @param {SlackCommand} command
    # @param {string}       channel
    # @param {User}         user
    # @param {string}       text
    # @param {boolean}      isFromBotChat
    # @param {boolean}      isRootBotCommand
    # @param {string}       id
    ###
    constructor: (@command, @channel, user, @text, isFromBotChat, isRootBotCommand, id = undefined) ->
        @_isFromBotChat = isFromBotChat
        @_isRootBotCommand = isRootBotCommand;
        super user, text, id;

    getUser: () ->
        return @user

    getText: () ->
        return @text

    getCommand: () ->
        return @command

    getChannel: () ->
        return @channel

    isFromBotChat: () ->
        return @_isFromBotChat

    isRootBotCommand: () ->
        return @_isRootBotCommand

    setMessageId: (id) ->
        @id = id;



module.exports = SlackCommandMessage;

