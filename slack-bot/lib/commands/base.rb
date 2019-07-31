module Commands
  # https://api.slack.com/docs/message-formatting#message_formatting
  # it says 40k chars, but apparently it's more like 3k chars...
  # we know that per block it's 3k chars, so maybe it's using that and mis-documented.
  MAX_CHARS_PER_MSG = 3_000

  class Base
    def initialize(client, data, match)
      @client = client
      @data = data
      @match = match
    end

    private

    def say_in_channel(text)
      @client.say(text: text, channel: @data.channel)
    end

    def say_in_thread(text)
      thread_ts = @client.channels[@data.channel] ? @data.thread_ts || @data.ts : nil
      @client.say(text: text, channel: @data.channel, thread_ts: thread_ts)
    end

    def adv_say_in_thread(text)
      thread_ts = @client.channels[@data.channel] ? @data.thread_ts || @data.ts : nil
      options = {
        text: text, channel: @data.channel, thread_ts: thread_ts, username: "frekky",
        icon_url: "https://ca.slack-edge.com/T60EVHHM4-UHWVDTWK0-b90c1787e914-48",
      }
      response = @client.web_client.chat_postMessage(options)
      response.ts
    end

    def update(text, output, msg_ts)
      msg_length = text.length + 8
      new_text = "#{text}\n\n```#{output.chars.last(MAX_CHARS_PER_MSG - msg_length).join.strip}```"
      @client.web_client.chat_update(channel: @data.channel, ts: msg_ts, text: new_text)
    end

    def say_in_context(text)
      @client.say(text: text, channel: @data.channel, thread_ts: @data.thread_ts)
    end

    def in_channel?(channel_name)
      channel = @client.channels[@data.channel]
      channel && channel.name == channel_name
    end
  end
end
