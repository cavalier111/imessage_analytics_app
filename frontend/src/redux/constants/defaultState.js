export const defaultState = {
  freuquencyLists: {
    words: [],
    emojis: [],
    links: [],
  },
  unfilteredFreuquencyLists: {
    words: [],
    emojis: [],
    links: [],
  },
  wordcloudLayout: {
    words: null,
    emojis: null,
    links: null,
  },
  dataType: 'words',
  vizType: 'wordcloud',
  filters: {
    words: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
      stopWordsEnabled: true,
      stopWordsUser:[],
      stopWordsDefault:[]
    },
    emojis: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
    },
    links: {
      startEnd: [1,1],
      maxEnd: 1,
    }
  },
  styles : {
    background: '#fff',
    words: {
      wordcloud: {
        colorCodedBy: 'none',
        codeByOpacity: false,
        color: 'rainbow',
        font: 'monospace',
      },
      bargraph: {
        colorCodedBy: 'none',
        codeByOpacity: false,
        color: '#007bff',
      },
    },
    emojis: {
      wordcloud: {
        colorCodedBy: 'none',
        codeByOpacity: false,
        color: 'rainbow',
      },
      bargraph: {
        colorCodedBy: 'none',
        codeByOpacity: false,
        color: '#007bff',
      },
    },
    links: {
      wordcloud: {
        color: 'rainbow',
        font: 'monospace',
        colorCodedBy: 'none',
        codeByOpacity: false,
      },
      bargraph: {
        color: '#007bff',
        colorCodedBy: 'none',
        codeByOpacity: false,
      },
    }
  },
};