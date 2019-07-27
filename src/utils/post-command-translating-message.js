'use strict';

/**
 * @param {WebClient}           slackWebClient
 * @param {SlackCommandMessage} commandMessage
 * @param {Robot}               robot
 *
 * @returns {Promise<string|Error>} Will return the message id
 */
module.exports = (slackWebClient, commandMessage, robot) => {
  const messageText = 'Forwarding `'+commandMessage.getCommand().toString()+'`'
      + (commandMessage.isFromBotChat() ? '' : ' for <@' + commandMessage.getUser().id + '>')
  ;
  const infoText = ':information_source: Alias for `'+commandMessage.getCommand().getAliasTo()+'`.';

  const messageFallback = messageText + ' ' + infoText;
  const messageOptions = {
    as_user: true, // Send it as bot user instead of app user
    link_names: 1, // Translate '<@XXXX>' into '@user' mention
    attachments: [
      {
        fallback: messageFallback,
        color: '#36a64f',
        pretext: messageText,
        text: infoText,
        //ts: (Date.now()/1000)
      }
    ],
    channel: commandMessage.getChannel()
  };

  return slackWebClient.chat.postMessage(messageOptions)
      .then(res => {
        if (res.ok) {
          return res.ts;
        } else {
          throw new Error(`slackWebClient.chat.postMessage() Response not ok: ${res}`);
        }
      })
      .catch(error => {
        robot.logger.error(`slackWebClient.chat.postMessage() error: ${error.message}`);
        throw error;
      });
};

