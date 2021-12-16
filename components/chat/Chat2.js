import React, { useState } from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { GiftedChat } from 'react-native-gifted-chat'
import emojiUtils from 'emoji-utils'

import SlackMessage from './SlackMessage'

export default function Chat() {
  const [message, setMessage] = useState([])

  function componentDidMount() {
    setMessage({
      message: [
        {
          _id: 1,
          text: '안녕하세요! Thank you very much for using the App! Please help us improve by asking, suggesting, telling us anything!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'dailyKPOP Team 🇰🇷',
            avatar: 'https://i.imgur.com/7nLX3Yb.png',
          },
        }
      ]
    })
  }

  function onSend(messages = []) {
    setMessage(previousState => ({
      message: GiftedChat.append(previousState.message, messages),
    }))
  }

  function renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props
    let messageTextStyle
    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
  }

  return (
    <GiftedChat
      messages={message}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderMessage={renderMessage}
    />
  )

}

