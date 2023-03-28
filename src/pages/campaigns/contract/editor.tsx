import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from 'react'

interface MainProps {
  content: string
}

const ContractEditorForm = ({ content }: MainProps) => {
  const [loading, setLoading] = useState(true)
  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content)
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2500)
  }, [])
  return (
    <>
      {loading && <center className="mt-2">Loading..</center>}

      <div style={{ visibility: `${loading ? 'hidden' : 'visible'}` }}>
        <Editor
          onChange={(e, d) => console.log(e.target.value, d)}
          initialValue={content}
          onInit={(e, editor) => {
            setLoading(false)
          }}
          init={{
            height: 650,
            width: '100%',
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </>
  )
}

export default ContractEditorForm
