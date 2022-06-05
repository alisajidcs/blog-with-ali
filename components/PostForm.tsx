import { ChangeEventHandler, useState } from 'react'

import { Event } from 'three'

import { post } from './Post'

export type createPost = (post: Pick<post, 'title' | 'content'>) => void

type props = { createPost: createPost }

const PostForm = ({ createPost }: props) => {
  const [titleChange, title] = useOnChange()
  const [contentChange, content] = useOnChange()

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    createPost({ title, content })
  }

  return (
    <form onSubmit={handleSubmit} action="#">
      Title: <input name="title" onChange={titleChange} />
      Content: <input name="content" onChange={contentChange} />
      <button>Post</button>
    </form>
  )
}

export default PostForm

type UseOnChange = () => [ChangeEventHandler<HTMLInputElement>, string]
const useOnChange: UseOnChange = () => {
  const [value, changeValue] = useState<string>('')
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.value) {
      changeValue(e.target.value)
    }
  }

  return [onChange, value]
}
