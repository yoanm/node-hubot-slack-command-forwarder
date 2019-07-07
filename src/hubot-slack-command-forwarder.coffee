# Description
#   Hubot script to manage slack command forwarding to hubot
#
# Configuration:
#   SLACK_APP_TOKEN in case you want to use another token than the one used for hubot-slack adapter
#
# Commands:
#   /hubot => hubot
#   /hubot test2 => hubot test2
#   /hubot test3 arg1 arg2 => hubot test3 arg1 arg2
#   /subCommand => hubot subCommand
#   /subCommand arg1 arg2 => hubot subCommand arg1 arg2
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Yoanm <yoanm@users.noreply.github.com>

forwardToRobotFactory = require './utils/forward-to-robot';

module.exports = (robot) ->
  webApiToken = process.env.SLACK_APP_TOKEN || robot.adapter.options.token;
  forwardToRobot = forwardToRobotFactory robot, webApiToken;

  robot.router.post '/slack-command-forwarder', (req, res) ->
    try
      # Confirm reception before anything
      res.send();

      robot.logger.debug("Command received : translating ...", {body: req.body});

      return forwardToRobot(req);
    catch error
      robot.emit 'error', error;
