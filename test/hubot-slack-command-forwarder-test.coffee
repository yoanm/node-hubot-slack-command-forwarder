Helper = require('hubot-test-helper')
process.env.SLACK_APP_TOKEN = 'FAKE_SLACK_APP_TOKEN';
chai = require 'chai'

expect = chai.expect

helper = new Helper('../index.coffee')

describe 'hubot-slack-command-forwarder', ->
  beforeEach ->
    @room = helper.createRoom()

  afterEach ->
    @room.destroy()

  it 'responds to hello', ->
    @room.user.say('alice', '@hubot hello').then =>
      expect(@room.messages).to.eql [
        ['alice', '@hubot hello']
        ['hubot', '@alice hello!']
      ]

  it 'hears orly', ->
    @room.user.say('bob', 'just wanted to say orly').then =>
      expect(@room.messages).to.eql [
        ['bob', 'just wanted to say orly']
        ['hubot', 'yarly']
      ]
