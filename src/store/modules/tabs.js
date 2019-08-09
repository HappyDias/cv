import bibliography from '@/bib.json';

function orderByDate(a,b){
  if(a.year < b.year) return -1;
  if(a.year > b.year) return 1;
  return 0;
}

function homogenize(obj){
  const toReturn = {...obj};
  const testKeys = {
    year : ['date'],
    url : ['adsurl'],
    journal: ['journaltitle', 'booktitle']
  }

  Object.keys(testKeys).forEach(testKey =>{
    if(!(testKey in toReturn)){
      testKeys[testKey].forEach(checkKey =>{
        if(toReturn[checkKey]){
          toReturn[testKey] = toReturn[checkKey];
        }
      })
    }
  })

  if(toReturn.author[0].includes('Dias')){
    toReturn['authType'] = 'Main Author'
  }
  else{
    toReturn['authType'] = 'Co-Author'
  }

  return toReturn;
}

export default {
  namespaced: true,
  state() {
    return {
      tabs: [
        {
          title: "Interests",
          content: {
            Professional: [
              {title: 'Plasma Physics', comment: 'Anything related to the study of plasmas in the universe, but especially low energy plasmas'},
              {title: 'Web applications', comment: 'The use of web technologies to influence the flow of data that generates a user\'s experience, from conception to consumption'},
              {title: 'Embeded systems', comment: 'SoC devices provide solutions for remote sensing and actuation problems with scalibililty concerns'},
              {title: 'Modeling', comment: 'The prediction of the behavior of a system according to its physical properties when done correctly provides valuable insights for future implementations'}
            ],
            Personal: [
              {title: 'Swimming', comment: 'An all-rounded sport, soothing to the mind'},
              {title: 'Team Sports', comment: 'Football, Voleyball, Water Polo. They emphasise communication and reinforce bonds'},
              {title: 'Scuba', comment: 'Exploring places where the human body by itself cannot go is always a thrill'},
              {title: 'Cooking', comment: 'Fun activity that emphasises creativity'},
              {title: 'Traveling', comment: 'New cultures, ways of thinking. Aiming to visit every country in the world'}
            ]
          }
        },
        {
          title: "Education",
          content: {
            events: [
               {title: 'Master Student', department: 'Physics Engineering', location: 'Instituto Superior Técnico, Lisbon, Portugal', 'date': '2007-2012', ref: null, extra: {} },
               {title: 'Master Thesis', department: 'Physics Engineering', location: 'Instituto Superior Técnico, Lisbon, Portugal', 'date': 'November 2012', ref: {href: 'https://fenix.tecnico.ulisboa.pt/downloadFile/395144990230/disserta%C3%A7%C3%A3o.pdf', text: 'Source'}, extra: {Title: 'Modeling of Low Pressure Plasmas in CH4-H2 Mixtures', Supervisors: 'Luís Lemos Alves'}},
               {title: 'PhD Student', department: 'Physics Engineering', location: 'Faculdade de Ciências, Lisbon, Portugal', 'date': '2014-Today', ref: null, extra: {} }
            ]
          }
        },
        {
          title: "Experience",
          content: {
            events: [
               {title: 'Marie Curie Fellow', department: 'DAQ expert: CLOUD experiment', location: 'Centre Européen pour la Recherche Nucléaire (CERN), Switzerland', 'date': '2013 - 2016', ref: null, extra: {} },
               {title: 'Consultant', department: 'DAQ: CLOUD experiment', location: 'Centre Européen pour la Recherche Nucléaire (CERN), Switzerland', 'date': '2016 - 2017', ref: null, extra: {}},
               {title: 'Full-stack developer', department: 'DevOps & mentor', location: 'Mov.AI, Portugal', 'date': 'Jan-Jun 2019', ref: null, extra: {} },
               {title: 'Developer', department: 'Founder & main developer', location: 'DAQBroker', 'date': '2015 - Today', ref: {href:'https://www.daqbroker.com/', text: 'Site'}, extra: {} }
            ]
          }
        },
        {
          title: "Skills",
          skills: {
            "Operating Systems" : [
              {name: 'Linux', description: 'General development platform for personal & professional projects'},
              {name: 'Unix', description: 'Specific distributions in specialized architectures'},
              {name: 'Windows', description: 'Platform for small and/or simple projects'}
            ],
            Programming: [
              {name: 'C/C++', description: 'Classic platform for highly performant applications and/or embeded systems'},
              {name: 'Fortran', description: 'Classic platform for performant modelling applications'},
              {name: 'PHP', description: 'Backend language for enterprise solutions of web page templating'},
              {name: 'Bash scripting', description: 'Scripts for startup/periodic small actions '},
              {name: 'Python', description: 'Scripting language for numerically heavy applications, also useful for quick REST APIs'},
              {name: 'Javascript', description: 'All-around performant single-threaded language for both front-end and back-end applications'}
            ],
            Scientific: [
              {name: 'R', description: 'Open source set of scientific programming tools with a strong emphasis on statistical analysis'},
              {name: 'Matlab', description: 'Enterprise scientific programming application with modules for interaction with several statistics packages'},
              {name: 'LabVIEW', description: 'National Instruments software for visual programming data acquisition'},
              {name: 'AutoCAD', description: 'Enterprise tool for computer generated engineering grade drawings'},
              {name: 'Solid', description: 'Enterprise tool for computer generated engineering grade drawings'},
              {name: 'Latex', description: 'Open source tool for programatic document generation'}
            ],
            "Web Front End": [
              {name: 'HTML', description: 'Markup language for web pages'},
              {name: 'CSS', description: 'Style definitions for web pages'},
              {name: 'Progressive Web Apps', description: 'Design pattern providing offline-ready native app-like user experiences with web apps'},
              {name: 'React', description: 'Javascript framework for component-based single page applications (experience with class and function components)'},
              {name: 'Vue', description: 'Open source javascript framework for component-based single page applications'},
              {name: 'Material UI', description: 'Suite of frontend components for application building provided by Google'},
              {name: 'jQuery', description: 'Javascript framework for simplifying direct interactions with webpages'},
              {name: 'Webpack', description: 'Tool for javascript code bundling (size decrease, for download performance)'},
              {name: 'Bootstrap', description: 'Classic library for prototyping web user interfaces'},
              {name: 'D3', description: 'Javascript library for data-driven graphics visualizations'},
              {name: 'webGL', description: 'Javascript library for 2d and 3d graphics'},
              {name: 'Internationalization', description: 'Specifically i18next & vue-i18n, libraries for handling languages in web applications'}
            ],
            "Web Back end": [
              {name: 'Flask', description: 'Python framework for generating simple server-side web applications (ex: REST API, DBMS connections)'},
              {name: 'Django', description: 'Python framework for generating enterprise-grade server-side web applications'},
              {name: 'AioHTTP', description: 'Python framework for generating single-threaded server-side web applications leveraging python\'s async module'},
              {name: 'NodeJS', description: 'Javascript runtime for server-side developmnent of web applications (ex: REST API, DBMS connections)'},
              {name: 'Celery', description: 'Task queue for distributed message/task management'},
              {name: 'ZeroMQ', description: 'Open source task queue for performant distributed message/task management'},
              {name: 'HTTPS', description: 'Secure HTTP communication between client and server'}
            ],
            "Data Storage": [
              {name: 'MySQL', description: 'One of the most popular database management system to generate relational databases'},
              {name: 'Postgres', description: 'Popular open source database management system for relational databases'},
              {name: 'Oracle', description: 'Enterprise-grade database management system for relational databases'},
              {name: 'Redis', description: 'Popular in-memory key-value store for highly performant data throughput'},
              {name: 'SQLite', description: 'File based key-value store for simple applications'},
              {name: 'FaunaDB', description: 'Serverless NoSQL database for data storage in a serverless architecture'}
            ],
            "Administation": [
              {name: 'Apache', description: 'Classic server application for file distribution, traffic shaping and reverse proxying of APIs'},
              {name: 'Nginx', description: 'Popular server application for file distribution, traffic shaping and reverse proxying of APIs'},
              {name: 'JSON Web Tokens', description: 'Authorization objects to share between server and client to authenticate users'},
              {name: 'oAuth', description: 'Authorization objects to authenticate a user on remote 3rd party applications'}
            ]
          }
        },
        {
          title: "Languages",
          content: {
            mother: 'Portuguese',
            languages:{
              English: {
                understanding: {
                  Listening: 'C2 - Proficient',
                  Reading: 'C2 - Proficient'
                },
                speaking: {
                  "Day-to-day": 'C2 - Proficient',
                  Profession: 'C2 - Proficient'
                },
                writing: 'C2 - Proficient'
              },
              French: {
                understanding: {
                  Listening: 'B2 - Independent',
                  Reading: 'B2 - Independent'
                },
                speaking: {
                  "Day-to-day": 'A2 - Basic',
                  Profession: 'A2 - Basic'
                },
                writing: 'A2 - Basic'
              },
              Spanish: {
                understanding: {
                  Listening: 'B2 - Independent',
                  Reading: 'B2 - Independent'
                },
                speaking: {
                  "Day-to-day": 'B2 - Independent',
                  Profession: 'B2 - Independent'
                },
                writing: 'B2 - Independent'
              }
            }
          }
        },
        {
          title: "Publications",
          bibliography : bibliography.map(homogenize).sort(orderByDate)
        }
      ],
      tab: 0,
      userInfo: [
      {
        icon: 'mdi-email',
        text: 'amcbd89@gmail.com',
        'redirect': 'mailto:amcbd89@gmail.com'
      },
      {
        icon: 'mdi-phone',
        text: '(+351) 96 9875 025',
        'redirect': 'tel:+351969875025'
      },
      {
        icon: 'mdi-skype',
        text: 'amcbd89',
        'redirect': 'skype:amcbd89?chat'
      },
      {
        icon: 'mdi-home',
        text: 'Rua dos Escritores, 7, 7C, <br />2685-207, Portela LRS, Portugal',
        'redirect': 'https://www.google.com/maps/search/?api=1&query=38.783029,-9.108888'
      },
      {
        icon: 'mdi-gender-male-female',
        text: 'Male',
        'redirect': ''
      },
      {
        icon: 'mdi-cake-variant',
        text: '21<sup>st</sup> of November 1989',
        'redirect': ''
      }
    ]
    };
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
    }
  },
  actions: {
    set(context, payload) {
      context.commit("set", payload);
    }
  }
};
