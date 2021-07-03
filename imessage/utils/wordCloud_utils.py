import numpy as np
import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import os
import re
import emoji
import emojis
from textblob import TextBlob
from urllib.parse import urlparse
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def createFrequencyListsDict(texts):
    global analyzer
    analyzer = SentimentIntensityAnalyzer()
    # print(TextBlob("heart").sentiment, TextBlob("red").sentiment)
    global alphaNumeric
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)

    listDict = dict({"wordsList": [], "emojiList": [], "linkList": []})
    for text in texts:
        listDict["wordsList"] += extractWords(text)
        listDict["emojiList"] += extractEmojis(text)
        listDict["linkList"] += extractLinks(text)
    return {
        'wordList': getDataForTexts(listDict["wordsList"], 'word'),
        'emojiList': getDataForTexts(listDict["emojiList"], 'emoji'),
        'linkList': getDataForTexts(listDict["linkList"], 'link'),
    }

def getDataForTexts(wordsList, dataType):
    if dataType == 'word':
        stop_words = getStopWords()
    fullTermsDict = Counter(wordsList)
    frequencyList = []
    for key, value in fullTermsDict.items():
        if key == "":
            continue
        textObject = dict({"text": key,"frequency": value })
        if dataType == 'word':
            textObject["isStopWord"] = key in stop_words
            textObject["polarity"] = analyzer.polarity_scores(key)["compound"]
            textObject["subjectivity"] = TextBlob(key).sentiment[1]
        elif dataType == 'emoji':
            textObject.update(getEmojiTagsAndCategories(key))
            textObject["polarity"] = analyzer.polarity_scores(textObject['searchTerm'])["compound"]
            textObject["subjectivity"] = TextBlob(textObject['searchTerm']).sentiment[1]
        frequencyList.append(textObject)
    return sorted(frequencyList, key=lambda word: word["frequency"], reverse=True)

def getStopWords():
    #get list stop words txt file
    module_dir = os.path.dirname(__file__)   #get current directory
    stop_words_file_path = os.path.join(module_dir, 'terrier-stop.txt') 

    #combine nltk stop wirds with extra stop words from text file
    stop_words_punctuation=set(stopwords.words("english")) | set(open(stop_words_file_path, "r").read().split())

    #replace stop words with alphanumeric version
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    stop_words = set()
    for word in stop_words_punctuation:
        stop_words.add(alphaNumeric(word))

    #join stop words with some more
    extra_stop_words = {"a","the","an","the","to","in","for","of","or","by","with","is","on","that","be","was","this","it","said","from","have","get","yea",
                       "gonna", "going", "ok"}
    stop_words |= extra_stop_words
    return stop_words

def extractWords(text):
    wordList = []
    for word in text['text'].split():
        alphaNumericWord = removeEmoji(alphaNumeric(word).lower())
        parsed = urlparse(alphaNumericWord)
        if not parsed.netloc:
            wordList.append(alphaNumericWord)
    return wordList

#method to get emojis out of text, required due to ambiguity since some emojis are multiple chars
def extractEmojis(text):
    emojiOnlyText = ''.join([char for char in text['text'] if char in emoji.UNICODE_EMOJI])
    emojiCodes = emoji.demojize(emojiOnlyText)
    splitDemoji = emojiCodes.split('::')
    for i in range(len(splitDemoji)-1):
        splitDemoji[i] +=':'
    for i in range(1,len(splitDemoji)):
        splitDemoji[i] = ':' + splitDemoji[i]
    emojiString = emoji.emojize(' '.join(splitDemoji))
    return emojiString.split(' ')

def extractLinks(text):
    linkList = []
    for word in text['text'].split():
        parsed = urlparse(word)
        if parsed.netloc:
            currLink = parsed.netloc
            if parsed.netloc[0:4] == 'www.':
                currLink = currLink[4:]
            linkList += [currLink]
    return linkList


def getEmojiTagsAndCategories(emoj):
    emojDetails = dict({"name": ' '.join(emoji.demojize(emoj)[1:-1].split('_'))})
    details = emojis.db.get_emoji_by_code(emoj)
    searchTerm = emojDetails["name"]
    if details:
        emojDetails['aliases'] = [' '.join(alias.split('_')) for alias in details.aliases]
        for alias in emojDetails['aliases']:
            searchTerm += " " + alias
        emojDetails['tags'] = details.tags
        for tag in emojDetails['tags']:
            searchTerm += " " + tag
        emojDetails['category'] = details.category
    emojDetails['searchTerm'] = searchTerm
    return emojDetails

def removeEmoji(string):
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F"  # emoticons
                           u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                           u"\U0001F680-\U0001F6FF"  # transport & map symbols
                           u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           u"\U00002702-\U000027B0"
                           u"\U000024C2-\U0001F251"
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)
def addDateFormatted(text):
    text['date_formatted']=datetime.fromtimestamp(text['date']/1000000000+time.mktime(datetime.strptime('01/01/2001', '%d/%m/%Y').timetuple()))
