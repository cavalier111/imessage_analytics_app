import numpy as np
import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import os
import re
import emoji


def getTextFrequencyDictForText(texts, isEmoji = False):
    stop_words = getStopWords()
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    wordsList = []
    if not isEmoji:
        for text in texts:
            wordsList += [removeEmoji(alphaNumeric(word).lower()) for word in text['text'].split()]
    else:
        for text in texts:
            wordsList += [char for char in text['text'] if char in emoji.UNICODE_EMOJI]
    for word in genExample():
        wordsList.append(alphaNumeric(word).lower())
    if '' in wordsList: wordsList.remove('')
    fullTermsDict = Counter(wordsList)
    frequencyList = []
    for key, value in fullTermsDict.items():
        if key in stop_words:
            continue
        else:
            frequencyList.append(dict({"text": key,"value": value}))
    print(texts, frequencyList)
    return frequencyList

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

def genExample():
    x = "In some ways, podcasts are among the most quarantine-proof forms of entertainment right now. Maybe some bigger hosts have been forced to move their microphones and wall padding to a home office, or they're now hiding in closets for better sound quality (but not as an anxious reaction to terrifying and confusing news headlines). But that doesn't mean all podcasts currently in production are a perfect fit for a nerd's listening diet, whether because they're too flippant or too doom-and-gloom. In my case, at least, I seek a mix of emotional support, comfort, and normalcy in my regular podcast library. Hence, I'm recommending the five podcasts below as my favorites if you're looking for that much-needed connection to the outside world. (These are in addition to other podcasts I've previously recommended at Ars.)" 
    x+= "Let's start with a podcast that literally helps me get out of bed. A Way with Words is an upbeat call-in show about how people use language. Hosts Grant Barrett and Martha Barnette answer questions from listeners across North America about odd words and phrases. Callers can be anyone from any background, from recent immigrants looking for a better grasp on the nuances of English prepositions, to a child pondering the distinction between barely and nearly to a person from one state who just moved to another and discovered that nobody in their new hometown knows a phrase they grew up with. They looked at me like I had two heads is a common sentiment among A Way with Words callers, yet Grant and Martha expertly dispel that feeling of alienation with good humor and meticulously researched facts about the regional distribution of words" 
    x += "Between callers, Grant and Martha trade fun language facts they've recently learned. These include a recent story about Hungarian popular humor centered around the aggressive piglet joke and a conversation about what members of hobbyist groups call themselves, including for an Adult Fan of Lego. They also review books, give occasional writing advice, and solve brainteasers presented by co-host John Chaneski. A Way with Words overflows with get-up-and-go morning radio energy, and waking up on Monday morning with a new episode (or a rerun from its extensive archive) on my phone to accompany me through my day is always a treat."
    x+= "Feet evil to hold long he open knew an no. Apartments occasional boisterous as solicitude to introduced. Or fifteen covered we enjoyed demesne is in prepare. In stimulated my everything it literature. Greatly explain attempt perhaps in feeling he. House men taste bed not drawn joy. Through enquire however do equally herself at. Greatly way old may you present improve. Wishing the feeling village him musical. Blind would equal while oh mr do style. Lain led and fact none. One preferred sportsmen resolving the happiness continued. High at of in loud rich true. Oh conveying do immediate acuteness in he. Equally welcome her set nothing has gravity whether parties. Fertile suppose shyness mr up pointed in staying on respect. She literature discovered increasing how diminution understood. Though and highly the enough county for man. Of it up he still court alone widow seems. Suspected he remainder rapturous my sweetness. All vanity regard sudden nor simple can. World mrs and vexed china since after often. So delightful up dissimilar by unreserved it connection frequently. Do an high room so in paid. Up on cousin ye dinner should in. Sex stood tried walls manor truth shy and three his. Their to years so child truth. Honoured peculiar families sensible up likewise by on in. Now for manners use has company believe parlors. Least nor party who wrote while did. Excuse formed as is agreed admire so on result parish. Put use set uncommonly announcing and travelling. Allowance sweetness direction to as necessary. Principle oh explained excellent do my suspected conveying in. Excellent you did therefore perfectly supposing described. Respect forming clothes do in he. Course so piqued no an by appear. Themselves reasonable pianoforte so motionless he as difficulty be. Abode way begin ham there power whole. Do unpleasing indulgence impossible to conviction. Suppose neither evident welcome it at do civilly uncivil. Sing tall much you get nor. Passage its ten led hearted removal cordial. Preference any astonished unreserved mrs. Prosperous understood middletons in conviction an uncommonly do. Supposing so be resolving breakfast am or perfectly. Is drew am hill from mr. Valley by oh twenty direct me so. Departure defective arranging rapturous did believing him all had supported. Family months lasted simple set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected he resolving agreement perceived at an. Was justice improve age article between. No projection as up preference reasonably delightful celebrated. Preserved and abilities assurance tolerably breakfast use saw. And painted letters forming far village elderly compact. Her rest west each spot his and you knew. Estate gay wooded depart six far her. Of we be have it lose gate bred. Do separate removing or expenses in. Had covered but evident chapter matters anxious. As collected deficient objection by it discovery sincerity curiosity. Quiet decay who round three world whole has mrs man. Built the china there tried jokes which gay why. Assure in adieus wicket it is. But spoke round point and one joy. Offending her moonlight men sweetness see unwilling. Often of it tears whole oh balls share an. Old unsatiable our now but considered travelling impression. In excuse hardly summer in basket misery. By rent an part need. At wrong of of water those linen. Needed oppose seemed how all. Very mrs shed shew gave you. Oh shutters do removing reserved wandered an. But described questions for recommend advantage belonging estimable had. Pianoforte reasonable as so am inhabiting. Chatty design remark and his abroad figure but its."
    
    return x.split()
