# Shadcn Comments

---
[Demo](https://shadcn-comment.pages.dev/)
## Install 

Install the latest version!

```shell
npm i shadcn-comments
```
--- 

`shadcn-comments` is a simple but multi-functional shadcn-react comment section component that helps you create 
comments section similar to github for your React App. `shadcn-comments` is very useful for react beginners 
who want a comment section in their project but want to skip it's commplexity. 
This library will give a fully functional comment section with the 
following features:

- User can reply to comments
- User can edit his/her comments
- User can delete his/her comments

Live demo of the library: [here](#)

---

## Default Example

You can find the source code [here](#)
### Mobile 
![mobile](/public/mobile.png)
### Desktop (max-w-screen-md)
![desktop](/public/desktop.png)

### Desktop editing (max-w-screen-md)
![desktop - edit](/public/desktop2.png)

---

## Usage

Following is a basic example to start testing the library in your project. This library works on a user basis system and here are a few important points to remember:

| Props        | Data Types                    | Default |
|--------------|-------------------------------|---------|
| theme        | 'light' \| 'dark' \| 'system' | light   |
| currentUser  | [User](#types)                | default |
| value        | [Comment\[\]](#types)         | []      |
| onChange     | (comments: Comment[]) => void |         |
| className    | string                        |         |
| allowUpVote  | boolean                       | false   |
| onVoteChange | (checked: boolean) => void    | false   |

```tsx
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
```
---

### Types

```typescript
// User
export type User = {
  id: string,
  fullName: string,
  userProfile?: string,
  avatarUrl?: string,
}
```

```typescript
// Comment
export type Comment = {
  user: User,
  id: string,
  parentId?: string;
  text: string,
  replies?: Comment[],
  createdAt: Date;
}
```
---
## Change log 

v1.0.3: add edit/delete/copy link/actions emoji for comment
--- 

## License

MIT © [dieptv1999](https://github.com/dieptv1999)