import fetch from 'node-fetch'

const forbiddenx = '16645550'

const getData = async (
  url: string,
  method: string,
  data?: any,
  cursor?: string
) => {
  const URL = `${url}${cursor ? `&after=${cursor}` : ''}`
  console.log(JSON.stringify(data))
  return fetch(URL, {
    method,
    headers: {
      'Client-ID': process.env.TWITCH_ID,
      Authorization: `Bearer ${process.env.TWITCH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

class TwitchService {
  constructor() {}
  async getFollowers() {
    try {
      const res = await getData(
        'https://api.twitch.tv/helix/users/follows?to_id=16645550&first=100',
        'GET'
      )
      const data = await res.json()
      return data
    } catch (e) {
      console.log(e)
      return { message: e }
    }
  }

  async subscribe() {
    try {
      const res = await getData(
        'https://api.twitch.tv/helix/webhooks/hub',
        'POST',
        {
          'hub.callback': 'http://211b4cc318b5.ngrok.io/twitch/updates',
          'hub.mode': 'subscribe',
          'hub.topic': `https://api.twitch.tv/helix/streams?user_id=${forbiddenx}`,
          'hub.lease_seconds': 864000,
        }
      )
      const data = await res.text()
      console.log(res)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  async setTitle(title: string) {
    const res = await getData(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${forbiddenx}&title=${encodeURIComponent(
        title
      )}`,
      'PATCH'
    )
    const data = await res.text()
    return data
  }

  async createMarker(description: string) {
    const res = await getData(
      `https://api.twitch.tv/helix/channels?user_id=${forbiddenx}`,
      'POST',
      {
        description,
      }
    )
    const data = await res.json()
    return data
  }

  async clip(title: string) {
    const channelurl = `https://api.twitch.tv/helix/channels?broadcaster_id=${forbiddenx}`
    const curentRes = await getData(channelurl, 'GET')
    const currentData = await curentRes.json()
    const oldTitle = currentData.data[0].title
    await this.setTitle(title)
    const clipRes = await getData(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${forbiddenx}`,
      'POST'
    )
    const clipData = await clipRes.json()
    console.log(clipData)
    await this.setTitle(oldTitle)
    return clipData
  }
}

const twitchInstance = new TwitchService()

export default twitchInstance
