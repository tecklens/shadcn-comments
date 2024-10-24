import {useState} from "react";
import {Terminal} from "lucide-react";
import {useTheme} from "./theme-provider.tsx";
import {Alert, AlertDescription, AlertTitle, Button, CommentSection, ACTIONS_TYPE} from 'shadcn-comments'

export default function DemoComment() {
  const {theme, setTheme} = useTheme()
  const [value, setValue] = useState<any[]>([
    {
      user: {
        id: '1',
        userProfile: '',
        fullName: 'victorcesae',
        avatarUrl: ''
      },
      id: '2',
      text: 'Another utility is to add text adornments, doing some simple typechecking so if a string is passed you can style a background, else render the react node.',
      replies: [],
      createdAt: new Date('2024-06-01'),
      selectedActions: [ACTIONS_TYPE.UPVOTE, ACTIONS_TYPE.ROCKET, ACTIONS_TYPE.HEART],
      actions: {
        [ACTIONS_TYPE.UPVOTE]: 1,
        [ACTIONS_TYPE.ROCKET]: 10,
        [ACTIONS_TYPE.HEART]: 10,
      }
    },
    {
      user: {
        id: '4',
        userProfile: '',
        fullName: 'UltimateGG',
        avatarUrl: ''
      },
      id: '3',
      text: 'Another utility is to add text adornments, doing some simple typechecking so if a string is passed you can style a background, else render the react node.',
      replies: [{
        user: {
          id: '4',
          userProfile: '',
          fullName: 'UltimateGG',
          avatarUrl: ''
        },
        id: '8',
        text: 'Another utility is to add text adornments',
        replies: [],
        createdAt: new Date('2024-09-02')
      }],
      createdAt: new Date('2024-09-01')
    }
  ])

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex align-center justify-start flex-col min-h-[100vh] p-3 md:p-4`}>
      <div className={'flex flex-col w-full items-center'}>
        <h1 className="text-xl md:text-3xl font-bold underline">
          Built using shadcn-comments
        </h1>
        <div className='py-4'>
          <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>
        </div>
        <div className='py-4'>
          <Alert>
            <Terminal className="h-4 w-4"/>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <CommentSection
        theme={theme}
        currentUser={{
          id: '1',
          userProfile: '',
          fullName: 'Me',
          avatarUrl: 'https://github.com/shadcn.png'
        }}
        value={value}
        onChange={(val) => {
          setValue(val)
        }}
        className={''}
        allowUpVote={true}
      />
    </div>
  )
}