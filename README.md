# hubot-hubot-slack-command-forwarder

Hubot script to manage slack command forwarding to hubot

See [`src/hubot-slack-command-forwarder.coffee`](src/hubot-slack-command-forwarder.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-hubot-slack-command-forwarder --save`

Then add **hubot-hubot-slack-command-forwarder** to your `external-scripts.json`:

```json
[
  "hubot-hubot-slack-command-forwarder"
]
```

## Sample Interaction

```
user1>> /hubot
hubot>> Forwarding `/hubot` for @user1
        ! Alias for `hubot`.
        
user1>> /hubot test2
hubot>> Forwarding `/hubot test2` for @user1
        ! Alias for `hubot test2`.

user1>> /hubot test3 arg1 arg2
hubot>> Forwarding `/hubot test3 arg1 arg2` for @user1
        ! Alias for `hubot test3 arg1 arg2`.

user1>> /subCommand
hubot>> Forwarding `/subCommand` for @user1
        ! Alias for `hubot subCommand`.
                
user1>> /subCommand arg1 arg2
hubot>> Forwarding `/subCommand arg1 arg2` for @user1
        ! Alias for `hubot subCommand arg1 arg2`.
```

## NPM Module

https://www.npmjs.com/package/hubot-hubot-slack-command-forwarder
