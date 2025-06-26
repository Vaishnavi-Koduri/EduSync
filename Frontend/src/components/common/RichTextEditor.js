import React, { useState, useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(value || '');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [heading, setHeading] = useState('p');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    onChange(newContent);
  };

  const toggleStyle = (style) => {
    document.execCommand(style, false, null);
    editorRef.current.focus();
    updateButtonStates();
  };

  const toggleHeading = (level) => {
    document.execCommand('formatBlock', false, level);
    setHeading(level);
    editorRef.current.focus();
  };

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
    
    // Get current heading level
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const parentElement = selection.getRangeAt(0).startContainer.parentElement;
      const tagName = parentElement.tagName.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(tagName)) {
        setHeading(tagName);
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="toolbar">
        <button
          type="button"
          className={`toolbar-btn ${isBold ? 'active' : ''}`}
          onClick={() => toggleStyle('bold')}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={`toolbar-btn ${isItalic ? 'active' : ''}`}
          onClick={() => toggleStyle('italic')}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className={`toolbar-btn ${isUnderline ? 'active' : ''}`}
          onClick={() => toggleStyle('underline')}
          title="Underline"
        >
          <u>U</u>
        </button>
        <select
          value={heading}
          onChange={(e) => toggleHeading(e.target.value)}
          className="toolbar-select"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => toggleStyle('insertUnorderedList')}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => toggleStyle('insertOrderedList')}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={insertLink}
          title="Insert Link"
        >
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onMouseUp={updateButtonStates}
        onKeyUp={updateButtonStates}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default RichTextEditor;