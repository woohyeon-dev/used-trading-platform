import React from 'react';
import styled from 'styled-components';
import timeForToday from '../../../utils/timeForToday';
import ReplyCreate from './ReplyCreate';

const ReplyListBlock = styled.div`
  .total {
    margin: 20px 0 20px 5px;
    font-size: 20px;
  }
`;

const Reply = styled.div`
  display: grid;
  grid-template-columns: 7fr 1fr;
  grid-gap: 15px;
  padding: 15px 10px;
  border: 1px solid lightgrey;
  margin: 15px 0;

  .replyInfo {
    font-size: 18px;
  }

  .nickname {
    font-weight: bold;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }

  .content {
    height: 20px;
    line-height: 20px;
  }

  .time {
    text-align: right;
    font-size: 15px;
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
            <div className='nickname replyInfo'>
              {reply.nickname} ({reply.user_id})
            </div>
            <div className='time replyInfo'>{timeForToday(reply.regdate)}</div>
            <div className='content replyInfo'>{reply.content}</div>
          </Reply>
        ))}
    </ReplyListBlock>
  );
}

export default ReplyList;
