import tweepy

client = tweepy.Client(
    bearer_token='AAAAAAAAAAAAAAAAAAAAACoaZgEAAAAA%2FrOfCNrnhwph9Q9qZbbnhLweZbM%3DHPFqwB7RlYzDf72Rypqch1uw46iLdye4kaUic84G7KNn8AMD76'
)

# User's tweet timeline
id = '1277453652924366848'
# tweets = client.get_users_tweets(
#     id=id,
#     tweet_fields=[
#         'context_annotations',
#         'created_at',
#         'geo'
#     ],
#     # tweet_limit=10,
#     media_fields=['preview_image_url'],
#     expansions='attachments.media_keys',
# )
# for tweet in tweets.data:
#     print(tweet)


# tweets = client.search_recent_tweets(
tweets = client.get_users_tweets(
    id=id,
    tweet_fields=['context_annotations', 'created_at'],
    media_fields=['preview_image_url'],
    expansions='attachments.media_keys',
    max_results=10
)

# Get list of media from the includes object
media = {m["media_key"]: m for m in tweets.includes['media']}

for tweet in tweets.data:
    attachments = tweet.data['attachments']
    media_keys = attachments['media_keys']
    print(tweet.text)
    if media[media_keys[0]].preview_image_url:
        print(media[media_keys[0]].preview_image_url)
