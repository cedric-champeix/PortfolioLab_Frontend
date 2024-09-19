import React from 'react';
import { TextEditor } from '../TextEditor.tsx';
import { Component } from '../../../../types/entities/Component.ts';
import { Editor as TinyMCEEditor } from 'tinymce';

interface Props {
  component: Component,
  update: (id: string, body: { type: string, data: object }) => void
}

export const TextComponent: React.FunctionComponent<Props> = ({ component, update }) => {

  const saveText = (_: any, editor: TinyMCEEditor) => {
    let temp = component;
    temp.data.text = editor.getContent({ format: 'html' });
    update(component.id, temp);
  };

  return (
    <TextEditor
      text={component.data.text}
      save={saveText}
      height="300px"
      width="100%"
    />
  );
};
