import tweepy

client = tweepy.Client(
    bearer_token='AAAAAAAAAAAAAAAAAAAAACoaZgEAAAAA%2FrOfCNrnhwph9Q9qZbbnhLweZbM%3DHPFqwB7RlYzDf72Rypqch1uw46iLdye4kaUic84G7KNn8AMD76'
)

# Replace user ID
id = '1277453652924366848'

tweets = client.get_users_tweets(
    id=id, tweet_fields=['context_annotations', 'created_at', 'geo'])

for tweet in tweets.data:
    print(tweet)
