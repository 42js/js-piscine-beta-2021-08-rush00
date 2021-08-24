import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const BoardContent = ({ contentId }) => {
  const [title, setTitle] = useState('title');
  const [text, setText] = useState('text');
  const [writername, setWriterName] = useState('writer');

  axios
    // .get(`/board/content?board_id=${contentId}`)
    .get(`/board/content/board_id=${contentId}`)
    .then((res) => {
      setTitle(res.data.title);
      setText(res.data.text);
      setWriterName(res.data.writername);
    })
    .catch(console.log);

  // text html로 변환해야함
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <section>{text}</section>
      </div>
      <small>{writername}</small>
    </div>
  );
};

BoardContent.propTypes = {
  contentId: PropTypes.number.isRequired,
};

export default BoardContent;
