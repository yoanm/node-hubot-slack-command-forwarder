'use strict';

const {WebClient} = require('@slack/client');
const requestBodyToMessage = require('./request-body-to-message');
const postCommandTranslatingMessage = require('./post-command-translating-message');

/**
 * @param {Robot} robot
 *
 * @returns {function(req): Promise<undefined|Error>}
 */
module.exports = (robot, webApiToken) => {
    const slackWebClient = new WebClient(webApiToken);

    return (req) => requestBodyToMessage(req.body, robot)
        .then(commandMessage => {
            return postCommandTranslatingMessage(slackWebClient, commandMessage, robot)
                .then((messageId) => commandMessage.setMessageId(messageId), () => {})// on error just skip
                .then(() => {
                    robot.logger.info("Reroute command back to robot", {from: commandMessage.getCommand().toString(), to: commandMessage.getText()});

                    return robot.receive(commandMessage);
                })
        })
        .catch(error => {
            robot.logger.error('Command translating error !', {error});
            robot.emit('error', error)
        })
    ;
};

