import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react'

// TinyMCE so the global var exists

import tinymce from 'tinymce/tinymce'
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver'
// Toolbar icons
import 'tinymce/icons/default'
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css'

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis'

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from 'tinymce/skins/content/default/content.min.css?raw'
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?raw'

export default function TextEditor({ text, save, height, width }) {
  const editorRef = useRef(null)

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={text || '<p>You can write your content here!</p>'}
      init={{
        height: height,
        width: width,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'charmap',
          'searchreplace',
          'quickbars',
          'code',
          'emoticons',
          'insertdatetime',
          'table',
          'codesample',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat',
        skin: false,
        content_css: false,
        content_style: [contentCss, contentUiCss].join('\n'),
      }}
      onBlur={save}
    />
  )
}

TextEditor.propTypes = {
  text: PropTypes.string,
  save: PropTypes.func,
  height: PropTypes.string,
  width: PropTypes.string,
}
