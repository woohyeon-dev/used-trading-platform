import React from 'react';
import styled from 'styled-components';
import timeForToday from '../../../utils/timeForToday';
import ReplyCreate from './ReplyCreate';

const ReplyListBlock = styled.div`
  .total {
    margin: 20px 0 20px 5px;
    font-size: 23px;
    font-weight: bold;
  }
`;

const Reply = styled.div`
  background-color: lightgrey;
  padding: 10px 10px 0 10px;
  border: 2px solid black;
  font-size: 16px;
  margin-bottom: 20px;

  .replyBox {
    display: grid;
    grid-template-columns: 1fr 7fr 2fr;
    grid-template-rows: 30px 30px;
    grid-gap: 10px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f3f3f3;
    color: black;
    border: 2px solid black;
  }

  .replyInfo {
    letter-spacing: 2px;
  }

  .replyId {
    grid-row: 1 / span 2;
    line-height: 80px;
    text-align: center;
  }

  .nickname {
    padding-left: 10px;
    line-height: 30px;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 1px solid black;
  }

  .content {
    line-height: 30px;
  }

  .time {
    text-align: right;
    color: grey;
  }
`;

function ReplyList({ replies, reader }) {
  return (
    <ReplyListBlock>
      <ReplyCreate reader={reader} />
      <div className='total'>총 댓글 수: {replies.length}</div>
      {replies.length > 0 &&
        replies.map((reply, index) => (
          <Reply key={index}>
            <div className='replyBox'>
              <div className='replyId replyInfo'>{reply.reply_id}</div>
              <div className='nickname replyInfo'>{reply.nickname}</div>
              <div className='time replyInfo'>
                {timeForToday(reply.regdate)}
              </div>
              <div className='content replyInfo'>{reply.content}</div>
            </div>
          </Reply>
        ))}
    </ReplyListBlock>
  );
}

export default ReplyList;
