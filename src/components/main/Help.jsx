import React, { useState } from 'react'

function Help() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'study-tips', title: 'Study Tips', icon: '📚' },
    { id: 'features', title: 'Features Guide', icon: '⚡' },
    { id: 'techniques', title: 'Study Techniques', icon: '🎯' },
    { id: 'faq', title: 'FAQ', icon: '❓' },
  ]

  const content = {
    'getting-started': {
      title: 'Getting Started with Effective Study',
      items: [
        {
          subtitle: 'Create Your Study Space',
          text: 'Find a quiet, well-lit area free from distractions. Keep your study materials organized and within reach. A dedicated space helps signal to your brain that it\'s time to focus.'
        },
        {
          subtitle: 'Set Clear Goals',
          text: 'Define what you want to accomplish in each study session. Break large topics into smaller, manageable chunks. Use SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound.'
        },
        {
          subtitle: 'Plan Your Schedule',
          text: 'Create a realistic study timetable that fits your lifestyle. Include breaks, review sessions, and time for practice. Consistency is more important than marathon sessions.'
        },
        {
          subtitle: 'Gather Resources',
          text: 'Collect textbooks, notes, online resources, and practice materials before starting. Having everything ready prevents interruptions and maintains your focus.'
        }
      ]
    },
    'study-tips': {
      title: 'Proven Study Tips',
      items: [
        {
          subtitle: 'Active Recall',
          text: 'Instead of passively rereading notes, actively quiz yourself. Close your books and try to recall key concepts. This strengthens memory pathways and identifies knowledge gaps.'
        },
        {
          subtitle: 'Spaced Repetition',
          text: 'Review material at increasing intervals over time. Study a topic today, review it tomorrow, then in 3 days, a week, and a month. This technique combats the forgetting curve.'
        },
        {
          subtitle: 'The Pomodoro Technique',
          text: 'Study in 25-minute focused intervals followed by 5-minute breaks. After 4 pomodoros, take a longer 15-30 minute break. This maintains concentration and prevents burnout.'
        },
        {
          subtitle: 'Teach Someone Else',
          text: 'Explaining concepts to others (or even to yourself out loud) reveals gaps in understanding. If you can teach it clearly, you truly understand it.'
        },
        {
          subtitle: 'Use Multiple Senses',
          text: 'Combine reading with writing notes, speaking concepts aloud, and creating visual diagrams. Multi-sensory learning creates stronger memory connections.'
        }
      ]
    },
    'features': {
      title: 'Platform Features',
      items: [
        {
          subtitle: 'Progress Tracking',
          text: 'Monitor your learning journey with detailed analytics. View completed topics, time spent studying, and performance trends. Use insights to adjust your study strategy.'
        },
        {
          subtitle: 'Custom Study Plans',
          text: 'Create personalized study schedules based on your goals and deadlines. The system adapts to your pace and suggests optimal review times.'
        },
        {
          subtitle: 'Resource Library',
          text: 'Access a curated collection of study materials, practice questions, and reference guides. Filter by subject, difficulty level, or topic.'
        },
        {
          subtitle: 'Note-Taking Tools',
          text: 'Organize your notes with tags, categories, and search functionality. Sync across devices and share with study groups.'
        },
        {
          subtitle: 'Practice Tests',
          text: 'Take timed practice exams that simulate real test conditions. Get instant feedback and detailed explanations for each answer.'
        }
      ]
    },
    'techniques': {
      title: 'Advanced Study Techniques',
      items: [
        {
          subtitle: 'Mind Mapping',
          text: 'Create visual diagrams that connect related concepts. Start with a central idea and branch out to subtopics. This reveals relationships and aids holistic understanding.'
        },
        {
          subtitle: 'Cornell Note-Taking',
          text: 'Divide your page into three sections: notes, cues, and summary. During lectures, take notes in the main section. Add cue questions in the left margin. Summarize at the bottom.'
        },
        {
          subtitle: 'SQ3R Method',
          text: 'Survey, Question, Read, Recite, Review. Preview the material, formulate questions, read actively to find answers, recite key points, and review regularly.'
        },
        {
          subtitle: 'Interleaving',
          text: 'Mix different subjects or topics in one study session rather than blocking by subject. This improves ability to discriminate between concepts and enhances problem-solving.'
        },
        {
          subtitle: 'Elaborative Interrogation',
          text: 'Ask yourself "why" and "how" questions about the material. Connect new information to what you already know. This deep processing improves retention.'
        }
      ]
    },
    'faq': {
      title: 'Frequently Asked Questions',
      items: [
        {
          subtitle: 'How long should I study each day?',
          text: 'Quality beats quantity. Aim for 2-4 focused hours daily rather than 8 hours of distracted studying. Adjust based on your energy levels and the complexity of material.'
        },
        {
          subtitle: 'What\'s the best time to study?',
          text: 'Study when you\'re most alert and focused. For many, this is morning or late afternoon. Experiment to find your peak performance times and schedule challenging topics then.'
        },
        {
          subtitle: 'How often should I take breaks?',
          text: 'Take a 5-10 minute break every 25-50 minutes of studying. During breaks, move around, hydrate, and rest your eyes. Longer study sessions need proportionally longer breaks.'
        },
        {
          subtitle: 'Should I study with music?',
          text: 'It depends on the task and your preference. Instrumental music may help with routine tasks, but silence or white noise is better for complex learning and reading comprehension.'
        },
        {
          subtitle: 'How do I stay motivated?',
          text: 'Set achievable short-term goals, reward yourself for milestones, study with peers, connect material to your interests, and remember your long-term objectives. Track progress to see improvement.'
        },
        {
          subtitle: 'What if I feel overwhelmed?',
          text: 'Break tasks into smaller steps, prioritize based on urgency and importance, ask for help when needed, and remember that perfect is the enemy of done. Take care of your mental health.'
        }
      ]
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-orange-50'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#F67280] to-[#F67280] text-white py-12 px-6 shadow-lg'>
        <div className='max-w-6xl mx-auto mt-20'>
          <h1 className='text-4xl font-bold mb-3'>Help & Study Guide</h1>
          <p className='text-lg text-rose-50'>Your comprehensive resource for effective learning</p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-8'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Sidebar Navigation */}
          <div className='lg:w-64 flex-shrink-0'>
            <div className='bg-white rounded-lg shadow-md p-4 sticky top-4'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Topics</h2>
              <nav className='space-y-2'>
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-rose-50'
                    }`}
                  >
                    <span className='text-xl'>{section.icon}</span>
                    <span className='font-medium'>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            <div className='bg-white rounded-lg shadow-md p-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                {content[activeSection].title}
              </h2>
              
              <div className='space-y-6'>
                {content[activeSection].items.map((item, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-rose-400 pl-6 py-2 hover:border-rose-600 transition-colors'
                  >
                    <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                      {item.subtitle}
                    </h3>
                    <p className='text-gray-600 leading-relaxed'>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className='mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-lg p-6'>
              <div className='flex items-start gap-3'>
                <span className='text-3xl'>💡</span>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>Quick Tip</h3>
                  <p className='text-gray-700'>
                    Remember: Everyone learns differently. Experiment with these techniques to discover what works best for you. The most effective study method is the one you'll actually stick with consistently.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className='mt-6 bg-rose-50 border-2 border-rose-200 rounded-lg p-6'>
              <h3 className='text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <span>📧</span>
                Need More Help?
              </h3>
              <p className='text-gray-700 mb-4'>
                If you have questions not covered here, our support team is here to assist you.
              </p>
              <button className='bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2 rounded-lg transition-colors'>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help