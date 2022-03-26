import boto3
import json

s3 = boto3.resource('s3')

content_object = s3.Object(
    'dailykpoptwitter',
    '2022/03/23/13/DailyKpop_Twitter-1-2022-03-23-13-43-24-3942ad59-8c74-303d-92f8-1a10c8a861e3'
)
file_content = content_object.get()['Body'].read().decode('utf-8')
json_content = json.loads(file_content)
print(json_content['Details'])
